<template>
	<div id="personalized">
	<el-row class='title'>
		<el-col :offset='2' :span='6'>
			<span style='color:red;'>推荐歌单</span>
		</el-col>
		<el-col :offset='12' :span='4'>
			<span @click.native="toggleDetail(res)">更多</span>
		</el-col>
	</el-row>
	<el-row>
		<el-col   :span='8' :offset='0' v-for='res in resData' :key='res.id'>
			<el-card @click.native="toggleDetail(res.id)"  :body-style='{padding:"0px"}' class='card' >
				<img class='image' :src='res.picUrl' alt="" />
				<div class='info'>
					<span>{{res.name}}</span>
				</div>
			</el-card>
		</el-col>
	</el-row>
	<pd v-if='detailshow' :id="detailid" :detailShow='detailshow' @detailHide='toggleDetail'></pd>
</div>
</template>

<script>
import pd from '../../PersonalDetail'
export default {
  name: 'personal',
  components: {
    pd
  },
  props: {
    resData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      defaultImgUrl: [],
      detailshow: false,
      detailid: undefined
    }
  },
  created () {
  },
  destroyed () {
  },
  methods: {
    toggleDetail (r) {
      if (r) this.detailid = r
      this.detailshow = !this.detailshow
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