<template>
	<b-col>
		<h2>{{ enrolment.course.title }} [{{ "ID: " + enrolment.id }}]</h2>
		<hr>
		<p>{{ enrolment.description }}</p>
	</b-col>
</template>

<script>
import axios from 'axios'

export default {
	name: "EnrolmentView",
	components: {
		
	},
	data(){
		return{
			enrolment: {}
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`https://college-api-mo.herokuapp.com/api/enrolments/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("Enrolments index response:", response.data.data)
						this.enrolment = response.data.data
					}
				)
				.catch(error => console.log("Enrolments index error caught:", error))
		}
	}
};
</script>
