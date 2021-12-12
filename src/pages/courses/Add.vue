<template>
	<v-container>
			<v-row class="mt-10">
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.title"
						color="accent"
						label="Title"
						clearable
					></v-text-field>
					<small v-if="errors.title" class="unselectable accent--text">{{errors.title[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.code"
						color="accent"
						label="Code"
						clearable
					></v-text-field>
					<small v-if="errors.code" class="unselectable accent--text">{{errors.code[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.level"
						color="accent"
						label="Level"
						type="number"
						clearable
					></v-text-field>
					<small v-if="errors.level" class="unselectable accent--text">{{errors.level[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.points"
						color="accent"
						label="Points Required"
						type="number"
						clearable
					></v-text-field>
					<small v-if="errors.points" class="unselectable accent--text">{{errors.points[0]}}</small>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="form.description"
						color="accent"
						label="Description"
						clearable
					></v-textarea>
					<small v-if="errors.description" class="unselectable accent--text">{{errors.description[0]}}</small>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="backToAll()">
						Courses
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
	name: "CourseAdd",
	title: `Add Course • RESTful College`,
	data() {
		return {
			form: {
				title: '123',
				code: '234',
				level: '345',
				points: '456',
				description: '789',
			},
			errors: {}
		}
	},
	methods: {
		submitForm() {
			let token = localStorage.getItem('token')
			axios
				.post(`courses`, this.form, {
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": 'text/json'
					}
				})
				.then(response => {
					console.log("submitForm() response: ", response.data.data)
					this.$router.push({
						name: "All Courses"
					})
				})
				.catch(error => {
					console.log("submitForm() error message: ", error.response.data.message)
					this.errors = error.response.data.errors
					console.log("All error data: ", error)
				})
		},
		backToAll() {
			this.$router.push({
				name: 'All Courses'
			})
		}
	}
};
</script>
