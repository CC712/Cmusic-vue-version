<template>
	<div id='search'>
	<el-row>
		<el-col :span='22' class='input'>
			<el-input  placeholder="请输入内容" v-model="input" @keyup.enter.native='searchReq' >
					<el-select v-model="prepend" slot="prepend" placeholder="请选择">
						<el-option v-for='(type, index) in types' :key='index' :value='type.head'>{{type.type}}</el-option>
					</el-select>
				<el-button slot="append" icon="search" @click.stop='searchReq'></el-button>
			</el-input>
		</el-col>
	</el-row>
	<ul v-if="data">
	<li v-for="(song, index) in songs" :key='index'>
		<div class='song-item' v-on:click.stop='reload(index)'>
			<div class='avatar'>
				<img :src="song.album.picUrl" />
			</div>
			<div class='info'>
				<div class="info-l">
				<span class="song-name">{{song.name}}</span>
					<div class='song-arts'>
						<span class='art' v-for="art in song.artists">
						{{art.name}} - {{song.album.name}}
						</span>
					</div>	
				</div>
				<div class="info-r">
					<div v-if="false" class='playing'>
						<i class="">正</i>
					</div>
				</div>
				
			</div>
		</div>
	</li>
</ul>
</div>
</template>

<script>
import bus from '../../../bus'
export default {
  name: 'search',
  data () {
    return {
      input: '',
      remote: 'http://139.199.188.25:3000',
      remote2: 'http://musicapi.leanapp.cn',
      types: [{type: 'song', head: '/search?keywords='},
      {type: 'songUrl', head: '/music/url?id='}],
      prepend: '',
      data: null,
      urlData: null
    }
  },
  computed: {
    songs () {
      return this.data.songs
    }
  },
  methods: {
    searchReq () {
      if (!this.prepend) this.prepend = this.types[0].head
      let url = this.remote2 + this.prepend + this.input
      console.log(`req${this.input}`, url)
      this.$http.get(url).then(function (r) { console.log('pro', r); this.data = r.body.result })
    },
    urlReq (id) {
      let url = this.remote2 + `/music/url?id=` + id
      return this.$http.get(url).then((r) => { console.log('url', r.data.data[0]); this.urlData = r.data.data[0].url; return this.urlData }, (r) => { console.log('fail', r) })
    },
    reload (index) {
      let songData = this.data.songs[index]
      let p = this.urlReq(songData.id)
      p.then((r) => {
        console.log('emit', songData, r)
        bus.$emit('reload', {songData, 'url': r})
      })
    }
  }
}
</script>

<style lang= 'scss'>
@import '../../../common/scss/mixin.scss';
#search{
	display: inline-block;
	width: 100vw;
	.title{
		font-size: 20px;
		margin: 10px;
	}
	.input{
		margin: 15px;
		text-align: center;
	}
}
.song-item{
	margin:5px auto;
	padding: 5px 15px;
	display: flex;
	.avatar{
		flex: 0 0 auto;
	height: 80%;
	display: inline-block;
	vertical-align: top;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	img{
		height: 50px;
		width: 50px;
		line-height:64px;
	}
}

.info{
	flex: 1 auto;
	display: flex;
	margin:auto 10px;
	padding-bottom: 10px;
	font-size:20px;
	vertical-align: top;
	@include border-1px(#ccc);
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	.info-l{
		width: 90%;
		overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
		.song-name{
		color: black;
		font-size: 300;
		overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	}
	.song-arts{
		margin: 5px;
		color: #8391A5;
		font-size: 16px;
		overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	}
	}
	.info-r{
		display: flex;
	justify-content: center;
	align-items: center;
	}
	}
}
</style>