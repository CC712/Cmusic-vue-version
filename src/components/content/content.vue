<template>
	<div id='content'>
	<router-view class='item'></router-view>
	</div>
</template>

<script>
export default {
  name: 'content',
  props: {
    pageIndex: {
      type: Number
    }
  },
  data () {
    return {
      pageMap: ['store', 'mystore', 'search'],
      nowIndex: 0,
      nowLeft: 0
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
#content {
	flex: 1;
	overflow-x: auto;
	display: flex;
}

#content::-webkit-scrollbar {
	display: none;
}

.item {
	flex: 0 0 100%;
	overflow-y: auto;
}

.item::-webkit-scrollbar {
	display: none;
}
</style>