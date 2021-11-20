<template>
	<v-col>
		<h2>Welcome to the Lecturers Index page</h2>
		<p
		v-for="lecturer in lecturers"
		:key="lecturer.id" 
		>
		<router-link :to="{ name: 'lecturers_show', params:{ id: lecturer.id }}"> {{ lecturer.name }} </router-link>
		</p>
	</v-col>
</template>

<script>
import axios from 'axios'

export default {
	name: "LecturersIndex",
	components: {
		
	},
	data(){
		return{
			lecturers: []
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`https://college-api-mo.herokuapp.com/api/lecturers`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("Lecturers index response:", response.data.data)
						this.lecturers = response.data.data
					}
				)
				.catch(error => console.log("Lecturers index error caught:", error))
		}
	}
};
</script>
