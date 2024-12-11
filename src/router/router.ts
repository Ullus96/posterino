import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

export interface ICustomRouteMeta {
	title: string;
}

const routes: Array<RouteRecordRaw & { meta?: ICustomRouteMeta }> = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
		meta: {
			title: 'Home',
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	// Get the page title from the route meta data that we have defined
	const title: any = to.meta.title;
	// If the route has a title, set it as the page title of the document/page
	if (title) {
		document.title = title;
	}

	next();
});

export default router;
