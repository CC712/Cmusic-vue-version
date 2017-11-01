<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import TheHome from './components/TheHome'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    TheHome
  }
}
</script>

<style lang= 'scss'>
@import './common/css/reset.css';
	$MAIN_COLOR: midnightblue;
	#app{
		overflow: auto;
		color:$MAIN_COLOR;
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		.content{
			flex:1;
              overflow-x:auto;
              display: flex;
		}
	}
	
</style>
