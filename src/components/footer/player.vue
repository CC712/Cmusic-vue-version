<template>
<el-row id='player' v-on:reload='reload' >
		<div class='avatar' >
			<img :src="picUrl" />
		</div>
		<div  class='info'>
			<p class='ellip'>{{name}}</p>
			<p class='ellip'>{{artist}}</p>
		</div>
		<div class='btns'>
			<div class="btn" @click='pushList'>
				<i :class='loveBtn' ></i>
			</div>
			<div class="btn" @click='togglePlay' >
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
      songData: null
    }
  },
  methods: {
    pushList () {
    },
    togglePlay () {
      this.isPlay = !this.isPlay
      this.isPlay ? this.audio.play() : this.audio.pause()
    },
    reload (r) {
      this.songData = r.songData
      this.mp3Url = r.url
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
      this.artist = this.songData.artists[0].name
      this.picUrl = this.songData.album.picUrl
    }
  },
  created () {
    bus.$off('reload')
    bus.$on('reload', (r) => {
      console.log('getget', r)
      this.reload(r)
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
  }
}
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
#player {
	position: relative;
	display: flex;
	height: 64px;
	padding: 5px 15px;
	vertical-align: bottom;
	.avatar {
		height: 80%;
		vertical-align: middle;
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
	.info {
		flex: 1;
		margin-left: 10px;
		font-size: 20px;
		vertical-align: bottom;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		.ellip {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		}
	}
	.btns {
		flex: 0 0 auto;
		display: flex;
		.btn {
			display: flex;
			width: 40px;
			height: 40px;
			justify-content: center;
			align-items: center;
		}
	}
}

</style>