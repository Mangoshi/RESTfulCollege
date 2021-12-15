<template>
	<v-container fluid>
		<v-row>
			<v-text-field 
				class="ml-3 mr-3"
				label="Search Lecturers"
				color="accent"
				v-model="searchQuery">
			</v-text-field>
			<v-btn class="addBtn mr-3 mt-4 float-right" @click="add()">Add</v-btn>
		</v-row>
		<v-divider class="mt-3"></v-divider>
		<v-row align-content="space-between">
			<v-col cols="12" sm="6" md="4" lg="3" xl="2">
				<v-switch
					v-model="expandToggle"
					label="Expand All"
					color="accent"
				></v-switch>
			</v-col>
			<v-spacer></v-spacer>
			<div class="mt-7 mr-3">
				<span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
				<v-btn dark color="accent" class="mr-1 black--text" @click="formerPage">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-btn dark color="accent" class="ml-1 black--text" @click="nextPage">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</div>
		</v-row>
		<v-divider class="mb-5"></v-divider>
		<v-data-iterator
			:items="filtered"
			item-key="id"
			:items-per-page="itemsPerPage"
			hide-default-footer
			:expanded="expanded"
			:page.sync="page"
			>
			<template v-slot:default="{ items, isExpanded, expand }">
				<v-row>
					<v-col
						v-for="(item, index) in items"
						:key="item.id"
						cols="12"
						sm="6"
						md="4"
						lg="3"
						xl="2"
						>
						<v-card>
							<v-img 
								:src="`https://avatars.dicebear.com/api/${item.gender}/${item.realName}.svg`"
								height="3em"
								width="3em"
								class="float-right"
							></v-img>
							
							<v-card-title>
								<h4>{{ item.name }}</h4>
							</v-card-title>
							<v-switch
								:input-value="isExpanded(item)"
								:label="isExpanded(item) ? 'Expanded' : 'Closed'"
								class="pl-4 mt-0"
								@change="(v) => expand(item, v)"
								color="accent"
							></v-switch>
							<v-divider></v-divider>
							<v-item-group class="d-flex justify-space-between btnGroup pa-2">
								<v-btn class="v-btn--outlined viewBtn" @click="view(item)">View</v-btn>
								<v-btn class="v-btn--outlined editBtn" @click="edit(item)">Edit</v-btn>
								<v-btn class="v-btn--outlined deleteBtn" @click="delDialog(item, index)">Delete</v-btn>
							</v-item-group>
							<v-divider></v-divider>
							<v-list
								v-if="isExpanded(item)"
								dense
								>
								<v-list-item-subtitle class="ml-4 accent--text">ID</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{ item.id }}
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 accent--text">Phone</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{ item.phone }}
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 accent--text">Email</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{ item.email }}
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 accent--text">Address</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{ item.address }}
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
				<v-row justify="center" v-if="dialog">
					<v-dialog v-model="dialog" persistent max-width="500">
						<v-card class="unselectable">
							<v-card-title class="text-h5 justify-center">Are you sure? &#128556;</v-card-title>
							<div v-if="hasEnrolments">
							<v-card-text class="text-center"><span class="text-h4">&#9888;</span></v-card-text>
							<v-card-text class="text-center"><b>This lecturer has enrolments!</b></v-card-text>
							<v-card-text class="text-center">This will <i>permanently</i> delete <b>{{ clickedLecturer.name }}</b> and <b>all of their enrolments</b> from the API...</v-card-text>
							</div>
							<div v-else>
							<v-card-text>This will <i>permanently</i> delete <b>{{ clickedLecturer.name }}</b> from the API...</v-card-text>
							</div>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="green darken-1" text @click="dialog = false">
									Go back!
								</v-btn>
								<v-btn color="red darken-1" text @click="dialog = false, del(clickedLecturer, clickedIndex)">
									Delete it! 
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-row>
			</template>
		</v-data-iterator>
	</v-container>
</template>

<script>
import axios from 'axios'

export default {
	name: "LecturersIndex",
	title: `Lecturers • RESTful College`,
	components: {
		
	},
	data(){
		return{
			lecturers: [],
			searchQuery: "",
			expandToggle: false,
			expand: [],
			page: 1,
			itemsPerPage: 12,
			// Delete pop-up variables
			dialog: false,
			clickedLecturer: {},
			clickedIndex: null,
			hasEnrolments: false
		}
	},
	computed:{
		filtered(){
			return this.lecturers.filter(lecturer  => {
				return lecturer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
			})
		},
		expanded(){
			if(!this.expandToggle){
				return []
			} else {
				return this.filtered
			}
		},
		numberOfPages () {
			return Math.ceil(this.filtered.length / this.itemsPerPage)
		},
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			let baseURL = 'https://college-api-mo.herokuapp.com/api/'
			axios
			.get(`${baseURL}lecturers`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
				console.log("getData() response: ", response.data.data)
				let lecturers = response.data.data
				let toggle = true
				lecturers.forEach((lecturer, index) => {
					console.log(index, ": ", lecturer.name)
					lecturer.realName = this.nameProcessor(lecturer.name)
					// Hardcoding a gender while rate-limited 
					if(toggle){
						lecturer.gender = "female"
					} else {
						lecturer.gender = "male"
					}
					toggle = !toggle
					})
				this.lecturers = lecturers
				}
			)
			.catch(error => console.log("getData() error caught: ", error))
		},
		view(lecturer){
			this.$router.push({
				name: 'Lecturer Viewer',
				params:{ 
					id: lecturer.id 
				},
			})
		},
		edit(lecturer){
			this.$router.push({
				name: 'Lecturer Editor',
				params:{ 
					id: lecturer.id 
				},
			})
		},
		delDialog(lecturer, index){
			// show dialog
			this.dialog = !this.dialog
			// pass clicked lecturer details
			this.clickedLecturer = lecturer
			// log clicked lecturer
			console.log("delDialog(lecturer):", lecturer)
			// set clickedIndex to the true index in the array (not the index of the array of 12 on that page)
			this.clickedIndex = this.realIndex(index)
			// log the real index
			console.log("delDialog(index):", this.realIndex(index))
			if(lecturer.enrolments.length !== 0){
				console.log("delDialog() hasEnrolments=true:", lecturer.enrolments)
				this.hasEnrolments = true
			} else {
				console.log("delDialog() hasEnrolments=false:", lecturer.enrolments)
				this.hasEnrolments = false
			}
		},
		del(lecturer, index){
			var outerScope = this
			console.log("del() Lecturer data: ", lecturer)
			console.log("del() Index data: ", index)
			let token = localStorage.getItem('token')
			let baseURL = 'https://college-api-mo.herokuapp.com/api/'
			if(lecturer.enrolments.length !== 0){
				console.log("del() w/enrolments started")
				let listOfDeleteRequests = lecturer.enrolments.map((enrolment) => axios.delete(`${baseURL}enrolments/${enrolment.id}`, 
					{ headers: { Authorization: `Bearer ${token}` }}
				));
				console.log("listOfDeleteRequests:",listOfDeleteRequests)
				axios
				.all(listOfDeleteRequests)
				// .then(response => {
				// 	console.log("del() [lecturer enrolments] response: ", response.data.status)
				// 	console.log("Lecturer's enrolments have been deleted successfully!")
				// })
				.then( function() {
					axios
					.delete(`${baseURL}lecturers/${lecturer.id}`,
					{
						headers: {
							"Authorization" : `Bearer ${token}`
						}
					})
					.then(response => {
							console.log("del() [lecturer] response: ", response.data)
							outerScope.lecturers.splice(index, 1)
							alert(`Lecturer ${lecturer.name} has been deleted successfully!`)
						}
					)
					.catch(error => {
						console.log("del() [lecturer] error caught: ", error)
						alert(`Lecturer ${lecturer.name} failed to be deleted.`)
						}
					)
				})
				.catch(error => {
					console.log("del() [lecturer enrolments] error caught: ", error)
					alert(`Lecturer ${lecturer.name} failed to be deleted.`)
				})
			} else {
				console.log("del() wo/enrolments started")
				axios
				.delete(`${baseURL}lecturers/${lecturer.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("del() response: ", response.data.status)
						this.lecturers.splice(index, 1)
						alert(`Lecturer ${lecturer.name} has been deleted successfully!`)
					}
				)
				.catch(error => {
					console.log("del() error caught: ", error)
					alert(`Lecturer ${lecturer.name} failed to be deleted.`)
					}
				)
			}
		},
		add(){
			this.$router.push({ name: 'Add Lecturer' })
		},
		nextPage () {
			if (this.page + 1 <= this.numberOfPages) this.page += 1
		},
		formerPage () {
			if (this.page - 1 >= 1) this.page -= 1
		},
		realIndex(index){
			let returned = index + (this.page -1) * this.itemsPerPage
			return returned
		},
		nameProcessor(name){
			// RegEx which reads "select everything until you find a period followed by a space, including the period and space"
			let realName = name.replace(/(.*)\. /, '')
			// console.log(`nameProcessor(${name}) => ${realName}`)
			// this.genderCheck(realName)
			return realName
		},
		genderCheck(name){
			let nameSplit = name.split(' ')
			let firstName = nameSplit[0]
			let gender = axios
			.get(`https://api.genderize.io?name=${firstName}`)
			.then(response => {
					console.log(`genderCheck(${firstName}) response: ${response.data.gender}`)
					response.data.gender
				}
			)
			.catch(error => console.log("genderCheck() error caught: ", error))
			return gender
		}
	}
};
</script>
