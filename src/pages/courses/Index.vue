<template>
	<div>
		<v-container>
			<v-row>
				<v-col
				v-for="course in courses"
				:key="course.id" 
				cols="12"
				sm="4">
					<v-card
					elevation="2"
					outlined>
						<v-img
						:src="`https://via.placeholder.com/600x200/000/999/?text=${course.title}`"
						height="200px"
						></v-img>
						<router-link :to="{ name: 'Course Viewer', params:{ id: course.id }}"> {{ course.title }} </router-link>
						<v-item-group class="d-flex">
							<v-btn class="btn-outline-info v-btn--outlined viewBtn" @click="viewCourse(course)">View</v-btn>
							<v-btn class="btn-outline-warning v-btn--outlined editBtn" @click="editCourse(course)">Edit</v-btn>
							<v-btn class="btn-outline-error v-btn--outlined deleteBtn" @click="deleteCourse(course)">Delete</v-btn>
						</v-item-group>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: "CoursesIndex",
	components: {
		
	},
	data(){
		return{
			courses: []
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
			.get(`https://college-api-mo.herokuapp.com/api/courses`,
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
		viewCourse(course){
			this.$router.push({
				name: 'Course Viewer',
				params:{ 
					id: course.id 
				},
			})
		},
		editCourse(course){
			this.$router.push({
				name: 'Course Editor',
				params:{ 
					id: course.id 
				},
			})
		},
		deleteCourse(){
		
		},
		
	}
};
</script>

<!--#00FFFF #FFD600 #FF0000-->

<style>
	.viewBtn{
		color: #00FFFF !important;
		border-color: #00FFFF !important;
		background-color: black !important;
	}
	.viewBtn:hover{
		color: black !important;
		border-color:black !important;
		background-color:  #00FFFF !important;
	}
	.editBtn{
		color: #FFD600 !important;
		border-color: #FFD600 !important;
		background-color: black !important;
	}
	.editBtn:hover{
		color: black !important;
		border-color:black !important;
		background-color:  #FFD600 !important;
	}
	.deleteBtn{
		color: #FF0000 !important;
		border-color: #FF0000 !important;
		background-color: black !important;
	}
	.deleteBtn:hover{
		color: black !important;
		border-color:black !important;
		background-color:  #FF0000 !important;
	}
</style>
