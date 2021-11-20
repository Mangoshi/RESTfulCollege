<template>
	<v-col>
		<h2>Welcome to the Enrolments Index page</h2>
		<ol>
			<li
			v-for="enrolment in enrolments"
			:key="enrolment.id" 
			>
				<router-link :to="{ name: 'enrolments_show', params:{ id: enrolment.id }}"> {{ "Enrolment "+enrolment.id }} </router-link>
				<p>Course: {{ enrolment.course.title +" ("+enrolment.course.code+")"}}</p>
				<p>Lecturer: {{ enrolment.lecturer.name +" ("+enrolment.lecturer.email+")"}}</p>
				<p>Enrolment made: {{ enrolment.date +" ("+enrolment.time+")"}}</p>
			</li>
		</ol>
	</v-col>
</template>

<script>
import axios from 'axios'

export default {
	name: "EnrolmentsIndex",
	components: {
		
	},
	data(){
		return{
			enrolments: []
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`https://college-api-mo.herokuapp.com/api/enrolments`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("Enrolments index response:", response.data.data)
						this.enrolments = response.data.data
					}
				)
				.catch(error => console.log("Enrolments index error caught:", error))
		}
	}
};
</script>
