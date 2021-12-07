<template>
	<v-container>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="lecturer.name"
						color="accent"
						label="Name"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="lecturer.email"
						color="accent"
						label="Lecturer"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="lecturer.phone"
						color="accent"
						label="Phone"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="lecturer.address"
						color="accent"
						label="Address"
						auto-grow
						readonly
					></v-textarea>
				</v-col>
			</v-row>
				<h3 class="ml-3 mb-5">Enrolments</h3>
			<v-row class="mb-4">
				<v-col cols="12" md="6" lg="4" xl="3" v-for="enrolment in lecturer.enrolments" :key="enrolment.id">
					<v-card elevation="3" shaped>
						<v-card-title>{{enrolment.course.title}}</v-card-title>
						<v-card-subtitle>{{enrolment.status}}</v-card-subtitle>
					</v-card>
				</v-col> 
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="backToAll()">
						Back to Lecturers
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
	</v-container>
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
		},
		backToAll(){
			this.$router.push({ name: 'All Lecturers'})
		}
	}
};
</script>
