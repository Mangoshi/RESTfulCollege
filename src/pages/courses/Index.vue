<template>
	<v-container fluid>
		<v-row>
			<v-text-field 
				class="ml-3 mr-3"
				label="Search Courses"
				color="accent"
				v-model="searchQuery">
			</v-text-field>
			<v-btn class="addBtn mr-3 mt-4 float-right" @click="add()">Add</v-btn>
		</v-row>
		<v-row>
			<v-col
			v-for="(course, index) in filtered"
			:key="course.id" 
			cols="12"
			sm="6"
			md="4"
			lg="3"
			xl="2">
				<v-card
				elevation="2"
				outlined
				color="secondary"
				>
					<v-img
					:src="`https://via.placeholder.com/600x200/000/999/?text=${course.title}`"
					height="200px"
					></v-img>
					<v-item-group class="d-flex justify-space-between btnGroup pa-2">
						<v-btn class="v-btn--outlined viewBtn" @click="view(course)">View</v-btn>
						<v-btn class="v-btn--outlined editBtn" @click="edit(course)">Edit</v-btn>
						<v-btn class="v-btn--outlined deleteBtn" @click="delDialog(course, index)">Delete</v-btn>
					</v-item-group>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-dialog v-model="dialog" persistent max-width="290">
				<v-card>
					<v-card-title class="text-h5">Are you sure? &#128556;</v-card-title>
					<v-card-text>This will permanently delete the {{ clickedCourse.title }} course from the API...</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="green darken-1" text @click="dialog = false">
							Go back!
						</v-btn>
						<v-btn color="red darken-1" text @click="dialog = false, del(clickedCourse, clickedIndex)">
							Delete it! 
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "CoursesIndex",
	title: `Courses • RESTful College`,
	data(){
		return{
			// Common variables
			courses: [],
			searchQuery: "",
			// Delete pop-up variables
			dialog: false,
			clickedCourse: {},
			clickedIndex: null
		}
	},
	computed:{
		filtered(){
			return this.courses.filter(course  => {
				return course.title.toLowerCase().includes(
					this.searchQuery.toLowerCase()
					)
			})
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
			.get(`courses`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
					console.log("getData() response: ", response.data.data)
					this.courses = response.data.data
				}
			)
			.catch(error => console.log("getData() error caught: ", error))
		},
		view(course){
			this.$router.push({
				name: 'Course Viewer',
				params:{ 
					id: course.id 
				},
			})
		},
		edit(course){
			this.$router.push({
				name: 'Course Editor',
				params:{ 
					id: course.id 
				},
			})
		},
		delDialog(course, index){
			// Show dialogue box
			this.dialog = !this.dialog
			// Assign clickedCourse to the value of the clicked course's data
			this.clickedCourse = course
			// Assign clickedIndex to the value of the clicked course's index in array
			this.clickedIndex = index
		},
		del(course, index){
			console.log("del() Course data: ", course)
			console.log("del() Index data: ", index)
			let token = localStorage.getItem('token')
				axios
				.delete(`courses/${course.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("del() response: ", response.data.data)
						this.courses.splice(index, 1)
						alert(`Course ${course.title} has been deleted successfully!`)
					}
				)
				.catch(error => {
					console.log("del() error caught: ", error)
					alert(`Course ${course.title} failed to be deleted.`)
					}
				)
			},
		add(){
			this.$router.push({ name: 'Add Course' })
		}
	}
}
</script>
