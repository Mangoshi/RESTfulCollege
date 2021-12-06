<template>
	<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.title"
						color="accent"
						label="Title"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.code"
						color="accent"
						label="Code"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.level"
						color="accent"
						label="Level"
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.points"
						color="accent"
						label="Points Required"
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="form.description"
						color="accent"
						label="Description"
					></v-textarea>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="submitForm()">
						Submit
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="backToAll()">
						Back to Courses
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "CourseAdd",
	data(){
		return{
			form:{
				title: '123',
				code: '234',
				level: '345',
				points: '456',
				description: '789',
			}
		}
	},
	methods: {
		submitForm(){
			let token = localStorage.getItem('token')
			axios
			.post(`courses`, this.form, {
				headers: {
					"Authorization" : `Bearer ${token}`,
					"Content-Type" : 'text/json'
				}
			})
			.then(response => {
				console.log("submitForm() response: ", response.data.data)
				this.$router.push({ name: "All Courses" })
				}
			)
			.catch(error => console.log("submitForm() error caught: ", error))
		},
		backToAll(){
			this.$router.push({ name: 'All Courses'})
		}
	}
};
</script>
