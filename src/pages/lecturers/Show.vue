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
						readonly
					></v-textarea>
				</v-col>
				<!-- 
				<v-col cols="12" md="12" v-for="enrolment in lecturer.enrolments" :key="enrolment.id">
					<v-checkbox
						:label="enrolment.course.title"
						color="accent"
						value="1"
						readonly
						>
					</v-checkbox>
				</v-col> 
				-->
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
