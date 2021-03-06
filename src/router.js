import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		//// HOME ////
		{
			path: "/",
			name: "Home",
			component: Home
		},
		//// COURSES ////
		{
			path: "/courses",
			name: "All Courses",
			// This is lazy-loading syntax to import the Component
			component: () => import("./pages/courses/Index.vue")
		},
		{
			path: "/courses/add",
			name: "Add Course",
			component: () => import("./pages/courses/Add.vue")
		},
		{
			path: "/courses/:id",
			name: "Course Viewer",
			component: () => import("./pages/courses/Show.vue")
		},
		{
			path: "/courses/edit/:id",
			name: "Course Editor",
			component: () => import("./pages/courses/Edit.vue")
		},
		//// ENROLMENTS ////
		{
			path: "/enrolments",
			name: "All Enrolments",
			component: () => import("./pages/enrolments/Index.vue")
		},
		{
			path: "/enrolments/add",
			name: "Add Enrolment",
			component: () => import("./pages/enrolments/Add.vue")
		},
		{
			path: "/enrolments/:id",
			name: "Enrolment Viewer",
			component: () => import("./pages/enrolments/Show.vue")
		},
		{
			path: "/enrolments/edit/:id",
			name: "Enrolment Editor",
			component: () => import("./pages/enrolments/Edit.vue")
		},
		//// LECTURERS ////
		{
			path: "/lecturers",
			name: "All Lecturers",
			component: () => import("./pages/lecturers/Index.vue")
		},
		{
			path: "/lecturers/add",
			name: "Add Lecturer",
			component: () => import("./pages/lecturers/Add.vue")
		},
		{
			path: "/lecturers/:id",
			name: "Lecturer Viewer",
			component: () => import("./pages/lecturers/Show.vue")
		},
		{
			path: "/lecturers/edit/:id",
			name: "Lecturer Editor",
			component: () => import("./pages/lecturers/Edit.vue")
		},
	]
});
