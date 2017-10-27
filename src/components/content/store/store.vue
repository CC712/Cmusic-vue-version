<template>
<div id='store' v-on:touchstart.stop='say'>
	<carousel></carousel>
	<el-row class='title'>
		<el-col :offset='2' :span='4'>
			<span style='color:red;'>推荐歌单</span>
		</el-col>
		<el-col :offset='14' :span='4'>
			<span>更多</span>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span='8' :offset='0' v-for='n in 3' :key='n'>
			<el-card :body-style='{padding:"0px"}' class='card'>
				<img class='image' src='../../../../static/img/login_023.jpg' alt="" />

				<div style='padding:12px;'>
					<p style="text-align:center;">{{n}}</p>
					<i class='el-icon-caret-right'></i>
					<span>151k</span>
				</div>
			</el-card>
		</el-col>

	</el-row>
	<el-row>
		<el-col :span='8' :offset='0' v-for='n in 3' :key='n'>
			<el-card :body-style='{padding:"0px"}' class='card'>
				<img class='image' src="../../../../static/img/login_023.jpg" alt="" />
				<div style='padding:12px;'>
					<p>名字</p>
					<i class='el-icon-caret-right'></i>
					<span>151k</span>
				</div>
			</el-card>
		</el-col>

	</el-row>
	<el-row class='title'>
		<el-col :offset='2' :span='4'>
			<span style='color:red;'>场景电台</span>
		</el-col>
		<el-col :offset='14' :span='4'>
			<span>更多</span>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span='8' :offset='0' v-for='n in 3' :key='n'>
			<el-card :body-style='{padding:"0px",overflow:"hidden",position:"relative"}' class='card'>
				<img class='circle-image' src='../../../../static/img/login_09.jpg' alt="" />
				<img class='blur-bg' src="../../../../static/img/login_09.jpg" alt="" />
				<div style='padding:12px;'>
					<p style="text-align:center;">{{n}}</p>
					<i class='el-icon-caret-right'></i>
					<span>151k</span>
				</div>
			</el-card>
		</el-col>

	</el-row>
</div>
</template>

<script>
import carousel from './carousel'
export default {
  name: 'store',
  data () {
    return {
      data: [{ title: '123', value: 'dgus' }, { title: 'sqd', value: '12' }, { title: '123', value: 'dgus' }, { title: 'sqd', value: '12' }]
    }
  },
  methods: {
    say () {
      console.log('store ')
    }
  },
  components: {
    carousel
  },
  mounted () {
  }
}
</script>

<style lang= 'scss'>
#store {
	overflow-y: scroll;
	overflow-x: hidden;
}
#store::-webkit-scrollbar {
	display: none;
}
.image {
	width: 100%;
}

.circle-image {
	width: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	border-radius: 50%;
	@extend .image;
}

.blur-bg {
	width: 100%;
	filter: blur(20px);
	position: absolute;
	top: 0;
	left: 0;
	z-index: -100;
}

.card {
	margin: 3px;
}

.title {
	font-size: 20px;
	line-height: 40px;
	min-height: 40px;
}

</style>