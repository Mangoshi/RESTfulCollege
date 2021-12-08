<template>
	<v-container fluid>
		<v-row>
			<v-text-field 
				class="ml-3 mr-3"
				label="Search Enrolments"
				color="accent"
				v-model="searchQuery">
			</v-text-field>
			<v-btn class="addBtn mr-3 mt-4 float-right" @click="add()">Add</v-btn>
		</v-row>
		<v-divider class="mt-3"></v-divider>
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2">
				<v-switch
					v-model="expandToggle"
					label="Expand All"
					color="accent"
				></v-switch>
			</v-col>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2">
				<v-switch
					v-model="filterToggle"
					label="Filter By Lecturer"
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
							<h4>{{ item.course.title }}</h4>
							<hr>
							<small>{{ item.lecturer.name }}</small>
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
								<v-list-item-subtitle class="ml-4 accent--text">Course</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										<span>{{item.course.title}} <sup>[{{item.course.id}}]</sup></span>
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 mt-2 accent--text">Lecturer</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										<span>{{item.lecturer.name}} <sup>[{{item.lecturer.id}}]</sup></span>
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 mt-2 accent--text">Status</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{item.status}}
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 mt-2 accent--text">Date</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{item.date}}
									</v-list-item-content>
								</v-list-item>
								<v-list-item-subtitle class="ml-4 mt-2 accent--text">Time</v-list-item-subtitle>
								<v-list-item>
									<v-list-item-content class="align-end">
										{{item.time}}
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
							<v-card-text>This will permanently delete the {{ clickedEnrolment.course.title }} // {{ clickedEnrolment.lecturer.name }}  enrolment from the API...</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="green darken-1" text @click="dialog = false">
									Go back!
								</v-btn>
								<v-btn color="red darken-1" text @click="dialog = false, del(clickedEnrolment, clickedIndex)">
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
	name: "EnrolmentsIndex",
	title: `Enrolments • RESTful College`,
	components: {
		
	},
	data(){
		return{
			// Common variables
			enrolments: [],
			searchQuery: "",
			// Data-iterator variables
			filterToggle: false,
			expandToggle: false,
			expand: [],
			page: 1,
			itemsPerPage: 12,
			// Delete pop-up variables
			dialog: false,
			clickedEnrolment: {},
			clickedIndex: null
		}
	},
	computed:{
		filtered(){
			return this.enrolments.filter(enrolment  => {
				if(!this.filterToggle){
					return enrolment.course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
				} else {
					return enrolment.lecturer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				}
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
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
			.get(`enrolments`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
					console.log("getData() response: ", response.data.data)
					this.enrolments = response.data.data
				}
			)
			.catch(error => console.log("getData() error caught: ", error))
		},
		view(enrolment){
			this.$router.push({
				name: 'Enrolment Viewer',
				params:{ 
					id: enrolment.id 
				},
			})
		},
		edit(enrolment){
			this.$router.push({
				name: 'Enrolment Editor',
				params:{ 
					id: enrolment.id 
				},
			})
		},
		delDialog(enrolment, index){
			// Show dialogue box
			this.dialog = !this.dialog
			// Assign clickedEnrolment to the value of the clicked enrolment's data
			this.clickedEnrolment = enrolment
			console.log("delDialog(enrolment):", enrolment)
			// Assign clickedIndex to the value of the clicked course's index in array
			this.clickedIndex = this.realIndex(index)
			console.log("delDialog(index):", this.realIndex(index))
			
		},
		del(enrolment, index){
			console.log("del() Enrolment data: ", enrolment)
			console.log("del() Index data: ", index)
			let token = localStorage.getItem('token')
			axios
			.delete(`enrolments/${enrolment.id}`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
					console.log("del() response: ", response.data.status)
					this.enrolments.splice(index, 1)
					alert(`Enrolment with course: ${enrolment.course.title} / lecturer ${enrolment.lecturer.name} has been deleted successfully!`)
				}
			)
			.catch(error => {
				console.log("del() error caught: ", error)
				alert(`Enrolment with course: ${enrolment.course.title} / lecturer ${enrolment.lecturer.name} failed to be deleted.`)
				}
			)
		},
		add(){
			this.$router.push({ name: 'Add Enrolment' })
		},
		nextPage () {
			if (this.page + 1 <= this.numberOfPages) this.page += 1
		},
		formerPage () {
			if (this.page - 1 >= 1) this.page -= 1
		},
		// Had to figure this function out so the returned index from the data iterator would match this.enrolments
		// For example, the first item on page 3 would return index 0, not index 24..
		// To fix this you add the index to the amount of items per page mutliplied by one less than the current page
		// First item, first page = (0 * 12) + 0 = 0
		// First item, second page = (1 * 12) + 0 = 12
		// Third item, third page = (3 * 12) + 3 = 39
		// and so on...
		realIndex(index){
			let returned = index + (this.page -1) * this.itemsPerPage
			return returned
		}
	}
};
</script>
