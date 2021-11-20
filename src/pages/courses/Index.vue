<template>
	<div>
		<h2 class="centered">Welcome to the Courses Index page</h2>
		<v-container>
			<v-row>
				<v-col
				v-for="course in courses"
				:key="course.id" 
				cols="12"
				sm="4">
					<v-card
					elevation="2"
					outlined
					shaped>
						<router-link :to="{ name: 'courses_show', params:{ id: course.id }}"> {{ course.title }} </router-link>
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
						console.log("Courses index response:", response.data.data)
						this.courses = response.data.data
					}
				)
				.catch(error => console.log("Courses index error caught:", error))
		}
	}
};
</script>
