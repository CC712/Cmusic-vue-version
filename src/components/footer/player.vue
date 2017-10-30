<template>
<el-row id='c-player' v-on:reload='reload' >
		<div class='c-player__avatar' >
			<img :src="picUrl" />
		</div>
		<div  class='c-player__info'>
			<p class='ellip'>{{name}}</p>
			<p class='ellip'>{{artist}}</p>
		</div>
		<div class='c-player__btns'>
			<div class="c-player__btn" @click='pushList'>
				<i :class='loveBtn' ></i>
			</div>
			<div class="c-player__btn" @click='togglePlay' >
				<i :class='playBtn'></i>
			</div>
		</div>
		<audio :src="mp3Url" ref='audio'></audio>
</el-row>
</template>

<script>
import bus from '../../bus'
export default {
  data () {
    return {
      isPlay: false,
      isLove: false,
      model: 0,
      vol: 0.5,
      mp3Url: '',
      name: '',
      artist: '',
      picUrl: '../../static/login_03.jpg',
      audio: null,
      songData: null,
      remote: 'http://139.199.188.25:3000',
      remote2: 'http://musicapi.leanapp.cn'
    }
  },
  computed: {
    playBtn () {
      let name = { false: 'el-icon-caret-right', true: 'el-icon-menu' }
      return name[this.isPlay]
    },
    loveBtn () {
      let name = { false: 'el-icon-star-off', true: 'el-icon-star-on' }
      return name[this.isLove]
    }
  },
  watch: {
    songData () {
      this.name = this.songData.name
      this.artist = this.songData.ar[0].name
      this.picUrl = this.songData.al.picUrl
      console.log(this.artist, this.name)
    }
  },
  created () {
    bus.$off('reload')
    bus.$on('reload', (id) => {
      console.log('getget', id)
      this.reload(id)
    })
  },
  mounted () {
    this.audio = this.$refs.audio
    this.audio.addEventListener('canplay', () => { this.togglePlay() })
    this.audio.volume = 0.5
    this.audio.loop = true
  },
  destroy () {
    bus.$off('reload')
  },
  methods: {
    pushList () {
    },
    togglePlay () {
      this.isPlay = !this.isPlay
      this.isPlay ? this.audio.play() : this.audio.pause()
    },
    reload (id) {
      this.detailReq(id)
      this.urlReq(id)
    },
    detailReq (id) {
      let url = this.remote2 + `/song/detail?ids=` + id
      return this.$http.get(url).then((r) => {
        this.songData = r.body.songs[0]
      })
    },
    urlReq (id) {
      let url = this.remote2 + `/music/url?id=` + id
      return this.$http.get(url).then((r) => {
        this.mp3Url = r.body.data[0].url
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
#c-player {
	position: relative;
	display: flex;
	height: 64px;
	padding: 5px 15px;
	vertical-align: bottom;
	.c-player__avatar {
		height: 80%;
	}
	&:before {
		position: absolute;
		left: 0;
		top: 0;
		content: '';
		height: 1px;
		width: 100%;
		border-bottom: 1px solid #ccc;
	}
	img {
		height: 50px;
		width: 50px;
		line-height: 64px;
	}
	.c-player__info {
		flex: 1;
		margin-left: 10px;
		font-size: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		.ellip {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		}
	}
	.c-player__btns {
		flex: 0 0 auto;
		display: flex;
		.c-player__btn {
			display: flex;
			width: 40px;
			height: 40px;
			justify-content: center;
			align-items: center;
		}
	}
}

</style>