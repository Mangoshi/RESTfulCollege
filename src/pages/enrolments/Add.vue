<template>
	<v-container>
			<v-row class="mt-10">
				<v-col cols="12" md="6">
					<v-autocomplete
						:items="courses"
						item-text="title"
						item-value="id"
						v-model="form.course_id"
						color="accent"
						label="Course"
						/>
						<small v-if="errors.course_id" class="unselectable accent--text">{{errors.course_id[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-autocomplete
						:items="lecturers"
						item-text="name"
						item-value="id"
						v-model="form.lecturer_id"
						color="accent"
						label="Lecturer"
						/>
					<small v-if="errors.lecturer_id" class="unselectable accent--text">{{errors.lecturer_id[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.date"
						color="accent"
						label="Date"
						type="date"
					></v-text-field>
					<small v-if="errors.date" class="unselectable accent--text">{{errors.date[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.time"
						color="accent"
						label="Time"
						type="time"
					></v-text-field>
					<small v-if="errors.time" class="unselectable accent--text">{{errors.time[0]}}</small>
				</v-col>
				<v-col cols="12" md="12">
					<v-select
						:items="statuses"
						item-text="text"
						item-value="value"
						v-model="form.status"
						color="accent"
						label="Status"
					>
					</v-select>
					<small v-if="errors.status" class="unselectable accent--text">{{errors.status[0]}}</small>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="backToAll()">
						Enrolments
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
	name: "EnrolmentAdd",
	title: `Add Enrolment • RESTful College`,
	data() {
		return {
			form: {
				course_id: '',
				lecturer_id: '',
				date: '',
				time: '',
				status: '',
			},
			courses: [],
			lecturers: [],
			statuses: [
				{ value:'interested', text:'Interested' },
				{ value: 'assigned', text: 'Assigned' },
				{ value: 'associate', text: 'Associate' },
				{ value: 'career_break', text: 'Career Break' }
			],
			errors: {}
		}
	},
	mounted() {
		this.getCourses(),
		this.getLecturers()
	},
	methods: {
		backToAll() {
			this.$router.push({
				name: 'All Enrolments'
			})
		},
		submitForm() {
			console.log("Course ID:" + this.form.course_id)
			console.log("Lecturer ID:" + this.form.lecturer_id)
			let token = localStorage.getItem('token')
			axios
			.post(`enrolments`, this.form, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": 'text/json'
				}
			})
			.then(response => {
				console.log("submitForm() response: ", response.data.data)
				this.$router.push({
					name: "All Enrolments"
				})
			})
			.catch(error => {
				console.log("submitForm() error message: ", error.response.data.message)
				this.errors = error.response.data.errors
				console.log("All error data: ", error)
			})
		},
		getCourses() {
			let token = localStorage.getItem('token')
			axios
			.get(`courses`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(response => {
				console.log("getCourses() response: ", response.data.data)
				this.courses = response.data.data
			})
			.catch(error => {
				console.log("getCourses() error message: ", error.response.data.message)
				console.log("All error data: ", error)
			})
		},
		getLecturers() {
			let token = localStorage.getItem('token')
			axios
			.get(`lecturers`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(response => {
				console.log("getLecturers() response: ", response.data.data)
				this.lecturers = response.data.data
			})
			.catch(error => {
				console.log("getLecturers() error message: ", error.response.data.message)
				console.log("All error data: ", error)
			})
		}
	}
};
</script>
