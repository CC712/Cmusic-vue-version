<template>
	<div id='carousel'>
	<el-carousel height="200px">
      <el-carousel-item  v-for="(item,index) in imgUrls" :key="index">
      	<div class="c-carousel__item">
        <img class="c-carousel__img" :src="item"/>
      	</div>
      </el-carousel-item>
    </el-carousel>	
	</div>
</template>

<script>
import url from '../../../common/js/requestUrl.json'
export default {
  name: 'carousel',
  data () {
    return {
      imgUrls: [],
      slideSpeed: 1.2,
      curIndex: 2,
      startP: 0,
      endP: 0,
      dir: false,
      ele: null,
      timer: null
    }
  },
  created () {
    let imgReq = url.others + url.banner
    this.$http.get(imgReq).then((r) => { this.imgUrls = r.body.banners.reduce((pre, cur, index) => { pre.push(cur.pic); return pre }, []); console.log(r, this.imgUrls) })
    console.log(this.itemWidth)
  },
  update () {
    this.geiHeight()
  },
  methods: {
    getHeight () {
      return '100px'
    }
  }
}
</script>

<style lang="scss">
#carousel {
}
.c-carousel__stage{
	white-space: nowrap;
	display: inline-block;
	overflow-x:auto;
}
.c-carousel__stage::-webkit-scrollbar{
	display: none;
}
.c-carousel__item{
	display: flex;
	height:100%;
	width:100%;
	text-align: center;
	font-size: 0;
}
.c-carousel__img{
	width:100%;
	margin:0 auto;
	vertical-align: middle;
	border:1px solid #ECECEC;
	box-shadow: #ECECEC 1px 1px 5px; 
	}
.c-carousel--cur{
	transform: scale(1.1,1.1);
	z-index: 100;
}
</style>