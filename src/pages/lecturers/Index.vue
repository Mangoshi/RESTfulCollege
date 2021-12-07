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
					<v-dialog v-model="dialog" persistent max-width="290">
						<v-card>
							<v-card-title class="text-h5">Are you sure? &#128556;</v-card-title>
							<v-card-text>This will permanently delete {{ clickedLecturer.name }} from the API...</v-card-text>
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
import axios from '@/config/college.js'

export default {
	name: "LecturersIndex",
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
			clickedIndex: null
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
			axios
			.get(`lecturers`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
					console.log("getData() response: ", response.data.data)
					this.lecturers = response.data.data
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
			this.dialog = !this.dialog
			this.clickedLecturer = lecturer
			console.log("delDialog(lecturer):", lecturer)
			this.clickedIndex = this.realIndex(index)
			console.log("delDialog(index):", this.realIndex(index))
			
		},
		del(lecturer, index){
			console.log("del() Lecturer data: ", lecturer)
			console.log("del() Index data: ", index)
			let token = localStorage.getItem('token')
			axios
			.delete(`lecturers/${lecturer.id}`,
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
		}
	}
};
</script>
