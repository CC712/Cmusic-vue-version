<template>
  <div id="app">
  <v-header  v-bind:pageIndex='pageIndex' v-on:pageChange='getIndex'></v-header>
  <v-content  class='content' v-bind:pageIndex='pageIndex' v-on:pageChange='getIndex' >
  	
  </v-content>
  <player  v-model='songData'></player>
  </div>
</template>

<script>
import header from './components/header/header'
import content from './components/content/content'
import player from './components/footer/player'
export default {
  name: 'app',
  data () {
    return {
      pageIndex: 0,
      songData: null
    }
  },
  methods: {
    getIndex (index) {
      console.log('app  get', index)
      this.pageIndex = index
    }
  },
  components: {
    'v-header': header,
    'v-content': content,
    player
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
