<template>
	<b-col>
		<h2>{{ course.title }} [{{ course.code }}]</h2>
		<hr>
		<p>{{ course.description }}</p>
	</b-col>
</template>

<script>
import axios from 'axios'

export default {
	name: "CourseView",
	components: {
		
	},
	data(){
		return{
			course: {}
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`https://college-api-mo.herokuapp.com/api/courses/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("Courses index response:", response.data.data)
						this.course = response.data.data
					}
				)
				.catch(error => console.log("Courses index error caught:", error))
		}
	}
};
</script>
