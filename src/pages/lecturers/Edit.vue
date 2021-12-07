<template>
	<v-container>
			<v-row>
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
					<v-btn block color="accent" class="black--text" @click="submitForm()">
						Submit
					</v-btn>
				</v-col>
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
			form: {
				name: 'Fred Fredricson',
				email: 'fred@gmail.com',
				phone: '012-345-6789',
				address: 'Freds House, Fredricksberg, Fuckerson',
				}
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
						let lecturer = response.data.data
						this.form.name = lecturer.name
                        this.form.email = lecturer.email
                        this.form.phone = lecturer.phone
                        this.form.address = lecturer.address
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
		},
		submitForm() {
			let token = localStorage.getItem('token')
			axios
			.put(`lecturers/${this.$route.params.id}`, this.form, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": 'text/json'
				}
			})
			.then(response => {
				console.log("submitForm() response: ", response.data.data)
				this.$router.push({
					name: "Lecturer Viewer"
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
