<template>
	<v-container>
			<v-row class="mt-10">
				<v-col cols="12" md="4">
					<v-text-field
						v-model="form.name"
						color="accent"
						label="Name"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="form.email"
						color="accent"
						label="Lecturer"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="form.phone"
						color="accent"
						label="Phone"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="form.address"
						color="accent"
						label="Address"
						auto-grow
					></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="backToAll()">
						Lecturers
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="accent" class="black--text" @click="submitForm()">
						Submit
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "LecturerAdd",
	title: `Add Lecturer • RESTful College`,
	components: {
		
	},
	data(){
		return{
			form: {
				name: 'Fred Fredricson',
				email: 'fred@gmail.com',
				phone: '012-345-6789',
				address: 'Freds House, Fredricksberg, Fuckerson',
				}
		}
	},
	methods: {
		submitForm() {
			let token = localStorage.getItem('token')
			axios
				.post(`lecturers`, this.form, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": 'text/json'
					}
				})
				.then(response => {
					console.log("submitForm() response: ", response.data.data)
					this.$router.push({
						name: "All Lecturers"
					})
				})
				.catch(error => {
					console.log("submitForm() error message: ", error.response.data.message)
					console.log("All error data: ", error)
				})
			},
		backToAll(){
			this.$router.push({ name: 'All Lecturers'})
		}
	}
};
</script>
