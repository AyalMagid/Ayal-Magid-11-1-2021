<template>
	<header class="grid-container">
		<div class="site-header-wrapper grid-pos-center flex align-center space-between">
			<section class="logo">
				<h2>Logo</h2>
			</section>
			<nav>
				<ul class="flex-center nav-links" :class="{ open: menuIsOpen }">
					<router-link tag="li" to="about">Link1 </router-link>
					<router-link tag="li" to="contact">Link </router-link>
					<router-link tag="li" to="special">Link </router-link>
				</ul>
			</nav>
			<section class="hamburger" @click="openMenu" />
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			menuIsOpen: false,
		};
	},
	methods: {
		openMenu() {
			this.menuIsOpen = !this.menuIsOpen;
		},
	},
};
</script>
