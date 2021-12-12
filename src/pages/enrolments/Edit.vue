<template>
	<v-container>
			<v-row class="mt-10">
				<v-col cols="12" md="6">
					<v-select
						:items="courses"
						item-text="title"
						item-value="id"
						v-model="form.course_id"
						color="accent"
						label="Course"/>
						<small v-if="errors.course_id" class="unselectable accent--text">{{errors.course_id[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-select
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
					/>
						<small v-if="errors.date" class="unselectable accent--text">{{errors.date[0]}}</small>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="form.time"
						color="accent"
						label="Time"
						type="time"
					/>
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
					/>
						<small v-if="errors.status" class="unselectable accent--text">{{errors.status[0]}}</small>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<small>
						Created:
						{{ enrolmentCreated.toLocaleTimeString() }}
						{{ enrolmentCreated.toLocaleDateString() }}
					</small>
				</v-col>
				<v-spacer></v-spacer>
				<v-col class="d-flex flex-column align-end">
					<small>
						Updated:
						{{ enrolmentUpdated.toLocaleTimeString() }}
						{{ enrolmentUpdated.toLocaleDateString() }}
					</small>
				</v-col>
			</v-row>
			<v-row>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="cancelForm()">
						Cancel
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
	name: "EnrolmentEdit",
	title: `Enrolment Editor • RESTful College`,
	components: {
		
	},
	data(){
		return{
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
			enrolmentCreated: Date,
			enrolmentUpdated: Date,
			errors: {}
		}
	},
	mounted(){
		this.getData()
		this.getCourses()
		this.getLecturers()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`enrolments/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("getData() response: ", response.data.data)
						let enrolment = response.data.data
						this.form.course_id = enrolment.course_id
						this.form.lecturer_id = enrolment.lecturer_id
						this.form.date = enrolment.date
						this.form.time = enrolment.time
						this.form.status = enrolment.status
						this.enrolmentCreated = new Date(enrolment.created_at)
						this.enrolmentUpdated = new Date(enrolment.updated_at)
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
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
		},
		submitForm(){
			let token = localStorage.getItem('token')
			axios
			.put(`enrolments/${this.$route.params.id}`, this.form, {
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response =>{
				console.log(response.data)
				this.$router.push({
					name: "Enrolment Viewer",
					params: {
						id: this.$route.params.id
					}
				})
			})
			.catch(error => {
				console.log(error)
				this.errors = error.response.data.errors
				console.log(error.response.data)
			})
		},
		cancelForm(){
			this.$router.go(-1)
		},
	}
};
</script>
