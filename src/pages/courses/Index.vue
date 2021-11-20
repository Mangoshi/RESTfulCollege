<template>
	<v-col>
		<h2>Welcome to the Courses Index page</h2>
		<p
		v-for="course in courses"
		:key="course.id" 
		>
		<router-link :to="{ name: 'courses_show', params:{ id: course.id }}"> {{ course.title }} </router-link>
		</p>
	</v-col>
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
