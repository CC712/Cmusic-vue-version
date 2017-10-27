<template>
	<div  id='carousel'>
		<ul class='stage'>
			<li class="img" v-for="url in imgUrls">
			</li>
		</ul>
		<ul class='dots' v-if='"false"'>
			<li class='dot' v-for="dot in dots">
				<span></span>
			</li>
		</ul>
	</div>
</template>

<script>
	
export default {
  name: 'stage',
  data () {
    return {
    }
  },
  methods: {
    imgUrls () {
      return ['']
    }
  }
}
</script>

<style>
</style>