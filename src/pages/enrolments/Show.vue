<template>
	<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="enrolment.course.title"
						color="accent"
						label="Course"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="enrolment.lecturer.name"
						color="accent"
						label="Lecturer"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="enrolment.date"
						color="accent"
						label="Date"
						readonly
						type="date"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="enrolment.time"
						color="accent"
						label="Time"
						readonly
						type="time"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-text-field
						v-model="enrolment.status"
						color="accent"
						label="Status"
						readonly
					></v-text-field>
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
					<v-btn block color="accent" class="black--text" @click="back()">
						Back
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="2" md="2">
					<v-btn block color="black" class="accent--text" @click="backToAll()">
						Enrolments
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "EnrolmentView",
	components: {

	},
	data() {
		return {
			enrolment: {},
			enrolmentCreated: Date,
			enrolmentUpdated: Date,
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			let token = localStorage.getItem('token')
			axios
			.get(`enrolments/${this.$route.params.id}`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(response => {
				console.log("getData() response: ", response.data.data)
				this.enrolment = response.data.data
				this.enrolmentCreated = new Date(this.enrolment.created_at)
				this.enrolmentUpdated = new Date(this.enrolment.updated_at)
			})
			.catch(error => console.log("getData() error caught: ", error))
		},
		backToAll() {
			this.$router.push({
				name: 'All Enrolments'
			})
		},
		back(){
			this.$router.go(-1)
		}
	}
};
</script>
