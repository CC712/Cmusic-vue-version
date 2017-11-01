<template>
<div id='c-detail'>
	<div class="c-detail__header">
		<div><span class='c-detail--btn' v-on:click='goBack'>返回</span>
			<span class="c-detail__title">title</span></div>
		<div class="c-detail--btn"><i class="el-icon-share"></i></div>
	</div>
	<div  class='c-detail__content'>
		<transition name='card' appear>
			 <div v-if="!detailRes"><i class="el-icon-loading"></i> 载入中</div>
			 </transition>
		<transition name='card' appear>
			 
			<div class='c-detail__card' v-if='detailRes'>
				<img :src="detailRes.coverImgUrl" alt="" class="card__img" />
				<div class="card__info">
					<p class="card__name">{{detailRes.name}}</p>
					<p class="card__art">{{detailRes.creator.nickname}}</p>
				</div>
				<p class="card__ins" @click='toggleSlide' :class='isSlide' ref='ins'>
				{{detailRes.description}}
				</p>
				<span class='card__more'>更多</span>
			</div>
		</transition>
		<ul v-if='detailRes'>
			<li @click='reload(song.id)' class="c-song__item" v-for="song in detailRes.tracks" :key='song.id'>
				<div class="c-song__info">
					<p class="c-song__name">{{song.name}}</p>
					<p class="c-song__art">{{song.ar[0].name}}</p>
				</div>
				<span class="c-song__playbtn">〉</span>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import player from './footer/player'
import url from '../common/js/requestUrl.json'
import bus from '../bus'
export default {
  name: 'PersonalDetail',
  components: {
    player
  },
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      isSlide: 'card__ins--slideup',
      detailRes: null
    }
  },
  mounted () {
    console.log(this.id, 'upd detail')
    let u = url.others + url.detail + `?id=${this.id}`
    this.$http.get(u).then((r) => { this.detailRes = r.body.playlist; console.log(this.detailRes, 'upd detail') })
  },
  updated () {
    console.log('upd', this.id)
  },
  methods: {
    toggleSlide () {
      console.log('slide')
      this.isSlide ? this.isSlide = null : this.isSlide = 'card__ins--slideup'
    },
    goBack () {
      this.$emit('detailHide')
    },
    reload (r) {
      console.log('click load', r)
      bus.$emit('reload', r)
      bus.id = r
      console.log('bus id', bus.id)
    }
  }
}
</script>

<style lang="scss">
	.c-detail__player{
		flex:0 0 auto;
	}
#c-detail{
 position: fixed;
 display: flex;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 flex-flow: column;
 overflow: auto;
 z-index:1000;
 background:rgba(7,17,27,0.8);
 color:antiquewhite;
}
.c-detail__header{
	flex:0 0 auto;
	position:sticky;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	font-size:24px;
	padding-bottom:20px;
}
.c-detail__title{
	font-weight: 300;
	align-self: flex-start;
}
.c-detail--btn{
	padding:5px;
	font-size:80%;
}

.c-detail__content{
	overflow: auto;
	flex:1 1 100%;
}
.c-detail__content::-webkit-scrollbar{
	display: none;
}
.c-detail__card{
	background:#FFFF99;
	padding:15px;
	margin:15px;
	color:black;
	position:relative
}
.card-enter,.card-leave-to{
	opacity: 0;
}
.card-enter-active, .card-leave-active {
  transition: all 1.5s;
}
.card__more{
	color: deeppink;
	position: absolute;
	right: 15px;
	bottom:15px;
}
.card__img{
display: inline-block;
height:90px;
width:90px;
background-size: contain;
	}
.card__info{
	margin-left: 15px;
	display: inline-block;
	vertical-align: top;
	width: calc(100% - 120px);
	font-size:18px;
}
.card__ins{
	font-size:16px;
	position: relative;
	word-wrap: break-word;
	transition:all 2s;
	max-height: 300px;
	overflow: auto;
}
.card__ins--slideup{
	margin-top: 10px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-height: 18px;
}
.card__ins--fake{
	display: none;
	font-size:18px;
	position: relative;
	word-wrap: break-word;
	height:auto;
}
.card__art{
	font-size:16px;
	margin-top: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap	
}
.c-song__item{
	margin: 10px 15px;
	list-style: none;
	display: flex;
	align-items: center;
}
.c-song__img{
	height: 40px;
	width: 40px;
	vertical-align: middle;
}
.c-song__info{
	flex: 1 auto;
	margin-left: 20px;
	vertical-align: middle;
	border-bottom: 2px solid #FFFFFF;
	padding: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: all 0.5s;
}
.c-song__name{
	font-size: 300;
	font-size: 18px;
}
.c-song__art{
	font-size: 14px;
}
.c-song__playbtn{
}
.c-song__morebtn{
	text-align: center;
	padding: 10px;
	font-size: 20px;
	background: #ECECEC;
	border-radius: 10px;
}
</style>