<template>
	<div class="emb-aside-banner-v2">
		<router-link :to="'/'+$i18n.locale+'/products'">
			<img class="emb-card" :src="img"  width="547" height="215" alt="aside-banner">
		</router-link>
	</div>
</template>

<script>
	export default {
		props: ['img'],    
	}
</script>
