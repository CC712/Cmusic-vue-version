<template>
	<div id="personalized">
	<el-row class='title'>
		<el-col :offset='2' :span='6'>
			<span style='color:red;'>推荐歌单</span>
		</el-col>
		<el-col :offset='12' :span='4'>
			<span>更多</span>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span='8' :offset='0' v-for='res in resData' :key='res.id'>
			<el-card  :body-style='{padding:"0px"}' class='card'>
				<img class='image' :src='res.picUrl' alt="" />

				<div class='info'>
					<span>{{res.name}}</span>
				</div>
			</el-card>
		</el-col>
	</el-row>
</div>
</template>

<script>
export default {
  name: 'personal',
  props: {
    resData: {
      type: Array,
      required: true
    },
    col: {
      type: Number
    },
    row: {
      type: Number
    }
  },
  data () {
    return {
      defaultImgUrl: []
    }
  }
}
</script>

<style lang="scss">
.info{
	padding:12px;
	height: 32px;
	overflow: hidden;
	span{
	height: 32px;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	}
}
</style>