<template>
<div>
		<el-row class='title'>
		<el-col :offset='2' :span='6'>
			<span style='color:red;'>新歌推荐</span>
		</el-col>
		<el-col :offset='12' :span='4'>
			<span @click='addlimit'>更多</span>
		</el-col>
		</el-row>
		<ul>
			<li @click='playSong(song)' class="c-song__item" v-for="(song,index) in songRes" :key='index' v-if="limit.num>index">
				<img class="c-song__img" :src="song.song.album.picUrl"/>
				<div class="c-song__info">
					<p class="c-song__name">{{song.name}}</p>
					<p class="c-song__art">{{getArt(song)}}</p>
				</div>
				<span class="c-song__playbtn">〉</span>
			</li>
		</ul>
		<el-row :span='24'   >
			<el-col class='c-song__morebtn'>
				<div @click='addlimit'>{{limit.msg}}</div>
			</el-col>
		</el-row>
	</div>
	
</template>

<script>
import bus from '../../../bus'
export default {
  name: 'newsong',
  props: {
    songRes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      limit: {msg: '点击更多', num: 1}
    }
  },
  methods: {
    getArt (song) {
      return song.song.album.artists.reduce((p, c) => { return p + '/' + c.name }, '')
    },
    addlimit () {
      if (this.limit.num + 2 < this.songRes.length) {
        this.limit.num += 2
      } else {
        this.limit.num = this.songRes.length
        this.limit.msg = '没有更多'
      }
    },
    playSong (r) {
      console.log('store emit', r.id, r.name)
      bus.$emit('reload', r.id)
    }
  }
}
</script>

<style>
.c-song{
	background: #ccc;
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
	border-bottom: 1px solid #ccc;
	padding: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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