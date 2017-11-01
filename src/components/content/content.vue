<template>
<div id='content'>
	<transition name='pageTrans' mode='out-in'>
		<keep-alive>
			<router-view class='item'></router-view>
		</keep-alive>
	</transition>
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
.pageTrans-enter-active, .pageTrans-leave-active {
  transition: all 0.5s;
}
.pageTrans-enter, .pageTrans-leave-to /* .pageTrans-leave-active in below version 2.1.8 */ {
  opacity: 0;
}
</style>