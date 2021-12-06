<template>
	<v-container fluid>
		<v-row>
			<v-text-field 
				class="ml-3 mr-3"
				label="Search Enrolments"
				color="accent"
				v-model="searchQuery">
			</v-text-field>
			<v-btn class="addBtn mt-4 mr-3 float-right">Add</v-btn>
		</v-row>
		<v-divider class="mt-3"></v-divider>
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2">
				<v-switch
					v-model="expandToggle"
					label="Expand All"
					color="accent"
				></v-switch>
			</v-col>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2">
				<v-switch
					v-model="filterToggle"
					label="Filter By Lecturer"
					color="accent"
				></v-switch>
			</v-col>
			<v-spacer></v-spacer>
			<div class="mt-7 mr-3">
				<span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
				<v-btn dark color="accent" class="mr-1 black--text" @click="formerPage">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<v-btn dark color="accent" class="ml-1 black--text" @click="nextPage">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</div>
		</v-row>
		<v-divider class="mb-5"></v-divider>
		<!-- TO-DO: -->
		<!-- Figure out pagination with data iterators -->
		<!-- Maybe figure out their own sorting & filtering methods -->
		<v-data-iterator
			:items="filtered"
			item-key="id"
			:items-per-page="itemsPerPage"
			hide-default-footer
			:expanded="expanded"
			:page.sync="page"
			>
			<template v-slot:default="{ items, isExpanded, expand }">
				<v-row>
					<v-col
						v-for="item in items"
						:key="item.id"
						cols="12"
						sm="6"
						md="4"
						lg="3"
						xl="2"
						>
						<v-card>
							<v-card-title>
							<h4>{{ item.course.title }}</h4>
							<hr>
							<small>{{ item.lecturer.name }}</small>
							</v-card-title>
							<v-switch
								:input-value="isExpanded(item)"
								:label="isExpanded(item) ? 'Expanded' : 'Closed'"
								class="pl-4 mt-0"
								@change="(v) => expand(item, v)"
								color="accent"
							></v-switch>
							<v-divider></v-divider>
							<v-item-group class="d-flex justify-space-between btnGroup pa-2">
								<v-btn class="v-btn--outlined viewBtn" @click="view(enrolment)">View</v-btn>
								<v-btn class="v-btn--outlined editBtn" @click="edit(enrolment)">Edit</v-btn>
								<v-btn class="v-btn--outlined deleteBtn" @click="del(enrolment)">Delete</v-btn>
							</v-item-group>
							<v-divider></v-divider>
							<v-list
								v-if="isExpanded(item)"
								dense
								>
								<v-list-item>
									<v-list-item-content>Course ID:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.course_id }}
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>Lecturer name:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.lecturer.name }}
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</template>
		</v-data-iterator>
	</v-container>
</template>

<script>
import axios from '@/config/college.js'

export default {
	name: "EnrolmentsIndex",
	components: {
		
	},
	data(){
		return{
			enrolments: [],
			searchQuery: "",
			filterToggle: false,
			expandToggle: false,
			expand: [],
			page: 1,
			itemsPerPage: 12
		}
	},
	computed:{
		filtered(){
			return this.enrolments.filter(enrolment  => {
				if(!this.filterToggle){
					return enrolment.course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
				} else {
					return enrolment.lecturer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
				}
			})
		},
		expanded(){
			if(!this.expandToggle){
				return []
			} else {
				return this.filtered
			}
		},
		numberOfPages () {
			return Math.ceil(this.filtered.length / this.itemsPerPage)
		},
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			let token = localStorage.getItem('token')
			axios
			.get(`enrolments`,
			{
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			.then(response => {
					console.log("getData() response: ", response.data.data)
					this.enrolments = response.data.data
				}
			)
			.catch(error => console.log("getData() error caught: ", error))
		},
		view(enrolment){
			this.$router.push({
				name: 'Enrolment Viewer',
				params:{ 
					id: enrolment.id 
				},
			})
		},
		edit(enrolment){
			this.$router.push({
				name: 'Enrolment Editor',
				params:{ 
					id: enrolment.id 
				},
			})
		},
		del(){
		
		},
		nextPage () {
			if (this.page + 1 <= this.numberOfPages) this.page += 1
		},
		formerPage () {
			if (this.page - 1 >= 1) this.page -= 1
		},
	}
};
</script>
