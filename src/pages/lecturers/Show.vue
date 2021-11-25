<template>
	<v-col>
		<h2>{{ lecturer.name }} [{{ "ID: " + lecturer.id }}]</h2>
		<hr>
		<p>Email: {{ lecturer.email }}</p>
		<p>Phone: {{ lecturer.phone }}</p>
		<p>Address: {{ lecturer.address }}</p>
	</v-col>
</template>

<script>
import axios from '@/config/college.js'

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
				.get(`lecturers/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("getData() response: ", response.data.data)
						this.lecturer = response.data.data
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
		}
	}
};
</script>
