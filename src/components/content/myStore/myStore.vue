<template>
	<div id='mystore'>
		<ul>
			<li v-for="( song, index ) in songs" :key='index'>
				<el-row>
					<el-col :span='3' :offset='1'><span>{{index}}</span></el-col>
					<el-col :span='3' :offset='1'><span>{{song.name}}</span></el-col>
					<el-col :span='3' :offset='1'><span>{{song.art}}</span></el-col>
				</el-row>
			</li>
		</ul>
		
	</div>
</template>

<script>
export default {
  name: 'myStore',
  data () {
    return {
      songs: [{name: '我', art: '我'}]
    }
  },
  methods: {
  }
}
</script>

<style lang= 'scss'>
#mystore{
}
</style>