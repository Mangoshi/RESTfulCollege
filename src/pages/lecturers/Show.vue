<template>
	<b-col>
		<h2>{{ lecturer.name }} [{{ "ID: " + lecturer.id }}]</h2>
		<hr>
		<p>Email: {{ lecturer.email }}</p>
		<p>Phone: {{ lecturer.phone }}</p>
		<p>Address: {{ lecturer.address }}</p>
	</b-col>
</template>

<script>
import axios from 'axios'

export default {
	name: "LecturerView",
	components: {
		
	},
	data(){
		return{
			lecturer: {}
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`https://college-api-mo.herokuapp.com/api/lecturers/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("Lecturers index response:", response.data.data)
						this.lecturer = response.data.data
					}
				)
				.catch(error => console.log("Lecturers index error caught:", error))
		}
	}
};
</script>
