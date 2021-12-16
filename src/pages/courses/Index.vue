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
		<v-row justify="center" v-if="dialog">
			<v-dialog v-model="dialog" persistent max-width="500">
				<v-card class="unselectable pa-3">
					<v-card-title class="text-h5 justify-center">Are you sure? &#128556;</v-card-title>
					<div v-if="hasEnrolments">
					<v-card-text class="text-center"><span class="text-h4">&#9888;</span></v-card-text>
					<v-card-text class="text-center"><b>This course has enrolments!</b></v-card-text>
					<v-card-text class="text-center">This will <i>permanently</i> delete the <b>{{ clickedCourse.title }}</b> course and <b>all enrolments associated with it</b> from the API...</v-card-text>
					</div>
					<div v-else>
					<v-card-text class="text-center">This will <i>permanently</i> delete the <b>{{ clickedCourse.title }}</b> course from the API...</v-card-text>
					</div>
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
import axios from 'axios'

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
			clickedIndex: null,
			hasEnrolments: false
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
			let baseURL = 'https://college-api-mo.herokuapp.com/api/'
			axios
			.get(`${baseURL}courses`,
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

			console.log("delDialog(course):", course)
			console.log("delDialog(index):", index)


		if(course.enrolments.length !== 0){
				console.log("delDialog() hasEnrolments=true:", course.enrolments)
				this.hasEnrolments = true
			} else {
				console.log("delDialog() hasEnrolments=false:", course.enrolments)
				this.hasEnrolments = false
			}
		},
		del(course, index){
			var outerScope = this
			console.log("del() Course data: ", course)
			console.log("del() Index data: ", index)
			let token = localStorage.getItem('token')
			let baseURL = 'https://college-api-mo.herokuapp.com/api/'
			if(course.enrolments.length !== 0){
				console.log("del() w/enrolments started")
				let listOfDeleteRequests = course.enrolments.map((enrolment) => axios.delete(`${baseURL}enrolments/${enrolment.id}`, 
					{ headers: { Authorization: `Bearer ${token}` }}
				));
				console.log("listOfDeleteRequests:",listOfDeleteRequests)
				axios
				.all(listOfDeleteRequests)
				.then( function() {
					axios
					.delete(`${baseURL}courses/${course.id}`,
					{
						headers: {
							"Authorization" : `Bearer ${token}`
						}
					})
					.then(response => {
							console.log("del() [course] response: ", response.data.status)
							outerScope.courses.splice(index, 1)
							alert(`Course ${course.title} & all associated enrolments have been deleted successfully!`)
						}
					)
					.catch(error => {
						console.log("del() [course] error caught: ", error)
						alert(`Course ${course.title} failed to be deleted.`)
						}
					)
				})
				.catch(error => {
					console.log("del() [course enrolments] error caught: ", error)
					alert(`Course ${course.title} failed to be deleted.`)
				})
			} else {
				console.log("del() wo/enrolments started")
				axios
				.delete(`${baseURL}courses/${course.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("del() response: ", response.data.status)
						this.courses.splice(index, 1)
						alert(`Course ${course.title} has been deleted successfully!`)
					}
				)
				.catch(error => {
					console.log("del() error caught: ", error)
					alert(`Course ${course.title} failed to be deleted.`)
					}
				)
			}
		},
		add(){
			this.$router.push({ name: 'Add Course' })
		}
	}
}
</script>
