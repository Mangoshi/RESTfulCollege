<template>
	<v-container>
			<v-row class="mt-10">
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.title"
						color="accent"
						label="Title"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.code"
						color="accent"
						label="Code"
						readonly
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.level"
						color="accent"
						label="Level"
						readonly
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="course.points"
						color="accent"
						label="Points Required"
						readonly
						type="number"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="12">
					<v-textarea
						v-model="course.description"
						color="accent"
						label="Description"
						readonly
					></v-textarea>
				</v-col>
			</v-row>
				<h3 class="ml-3 mb-5">Enrolments</h3>
			<v-row class="mb-4">
				<v-col cols="12" md="6" lg="4" xl="3" v-for="enrolment in course.enrolments" :key="enrolment.id">
					<v-card elevation="3" shaped>
						<v-card-title>
							<router-link class="accent--text" :to="{
								name: 'Enrolment Viewer', 
								params:{ id: enrolment.id }}"
								>
								{{enrolment.lecturer.name}}
							</router-link>
						</v-card-title>
						<v-card-subtitle>{{enrolment.status}}</v-card-subtitle>
					</v-card>
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
						Courses
					</v-btn>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "CourseView",
	components: {
		
	},
	data(){
		return{
			course: {}
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
				.get(`courses/${this.$route.params.id}`,
				{
					headers: {
						"Authorization" : `Bearer ${token}`
					}
				})
				.then(response => {
						console.log("getData() response: ", response.data.data)
						this.course = response.data.data
					}
				)
				.catch(error => console.log("getData() error caught: ", error))
		},
		backToAll(){
			this.$router.push({ name: 'All Courses'})
		},
		back(){
			this.$router.go(-1)
		}
	}
};
</script>
