<template>
	<div id="djprogram">
		<el-row class='title'>
		<el-col :offset='2' :span='6'>
			<span style='color:red;'>场景电台</span>
		</el-col>
		<el-col :offset='12' :span='4'>
			<span>更多</span>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span='8' :offset='0' v-for='item in djres' :key='item.id'>
			<div class='c-blur'>
				<div class="c-blur__body">
					<img class='c-blur__img' :src="item.picUrl" alt="" />	
					<span class="c-blur__info">{{item.name}}</span>
					<img class="c-blur__bg" :src="item.picUrl" alt="" />
				</div>
			</div>
		</el-col>
	</el-row>
	</div>
</template>

<script>
export default {
  name: 'djprogram',
  props: {
    djres: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='scss'>
	.c-blur{
		padding: 0;
		overflow: hidden;
		position: relative;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		margin: 3px;
		padding: 5px;
	}
	.c-blur__body{
		margin-top: 20px;
		text-align: center;
		.c-blur__info{
			height: 32px;
			display: block;
			margin-top: 10px;
			display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
			}
	}
.c-blur__img{
	width: 90%;
	border-radius: 50%;
}

.c-blur__bg {
	width: 200%;
	filter: blur(19px);
	opacity:0.4;
	position: absolute;
	top: 0;
	left: -50%;
	z-index: -100;
}
</style>