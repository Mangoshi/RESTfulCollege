<template>
	<div>
		<v-container fluid>
			<v-row>
				<v-text-field 
					class="ml-3 mr-3"
					label="Search Courses"
					color="accent"
					v-model="searchQuery">
				</v-text-field>
			</v-row>
			<v-row>
				<v-col
				v-for="course in filtered"
				:key="course.id" 
				cols="12"
				sm="6"
				md="4"
				lg="3"
				xl="2">
					<v-card
					elevation="2"
					outlined
					color="secondary">
						<v-img
						:src="`https://via.placeholder.com/600x200/000/999/?text=${course.title}`"
						height="200px"
						></v-img>
						<v-item-group class="d-flex justify-space-between btnGroup pa-2">
							<v-btn class="v-btn--outlined viewBtn" @click="view(course)">View</v-btn>
							<v-btn class="v-btn--outlined editBtn" @click="edit(course)">Edit</v-btn>
							<v-btn class="v-btn--outlined deleteBtn" @click="del(course)">Delete</v-btn>
						</v-item-group>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "CoursesIndex",
	components: {
		
	},
	data(){
		return{
			courses: [],
			searchQuery: ""
		}
	},
	computed:{
		filtered(){
			return this.courses.filter(course  => {
				return course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
			})
		}
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
			.get(`courses`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
					console.log("getData() response: ", response.data.data)
					this.courses = response.data.data
				}
			)
			.catch(error => console.log("getData() error caught: ", error))
		},
		view(course){
			this.$router.push({
				name: 'Course Viewer',
				params:{ 
					id: course.id 
				},
			})
		},
		edit(course){
			this.$router.push({
				name: 'Course Editor',
				params:{ 
					id: course.id 
				},
			})
		},
		del(){
		
		},
		
	}
};
</script>
