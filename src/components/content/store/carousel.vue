<template>
	<div  id='carousel'>
		<ul class='stage' v-on:touchstart.stop.prev='startHandler'v-on:touchmove.stop.prev='moveHandler'v-on:touchend.stop.prev='endHandler'>
			<li v-for="(url,index) in imgUrls" v-bind:key='index' v-bind:class='is_cur(index)'>
			<img  v-bind:src="url" :alt="index" />
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      itemWidth: 0,
      cur: 2,
      startP: 0,
      endP: 0,
      imgUrls: [require('./img/login_023.jpg'), require('./img/login_03.jpg'), require('./img/login_05.jpg'), require('./img/login_07.jpg'), require('./img/login_09.jpg')],
      dir: false,
      timer: null
    }
  },
  methods: {
    makeTimer () {
      this.timer = setTimeout(() => {
        this.changeCur(true)
        console.log('settimerout')
        this.timer = null
      }, 3000)
    },
    is_cur (i) {
      return i === this.cur ? 'cur' : ''
    },
    startHandler (e) {
      clearTimeout(this.timer)
      this.startP = e.touches[0].screenX
      this.originP = e.touches[0].screenX
    },
    moveHandler (e) {
      e.preventDefault()
      this.ulDom = this.$el.querySelector('.stage')
      this.nowItem = this.ulDom.querySelectorAll('li')[this.cur]
      this.endP = e.changedTouches[0].screenX
      this.ulDom.scrollLeft -= (this.endP - this.startP) * 2
      this.endP - this.startP > 0 ? this.dir = 1 : this.dir = -1
      if (this.nextItem) this.nextItem.style.transform = `scaleY(1)`
      this.nextItem = this.ulDom.querySelectorAll('li')[this.cur + (this.dir > 0 ? -1 : 1)]
      let ratio = Math.abs((this.endP - this.originP) / this.nowItem.clientWidth)
      if (1.1 - ratio <= 1.0) ratio = 0.1
      console.log(this.nowItem.clientWidth, ratio)
      this.nowItem.style.transform = `scaleY(${1.1 - ratio})`
      this.nextItem.style.transform = `scaleY(${1.1 + ratio})`
      this.startP = this.endP
    },
    endHandler (e) {
      console.log(this.dir === -1 ? 'goright' : 'goleft')
      this.nowItem.style.transform = `scaleY(1.1)`
      this.nextItem.style.transform = `scaleY(1)`
      this.changeCur(this.dir < 0)
      this.timer = true
    },
    changeCur (goright) {
      let head
      if (goright) {
        this.cur++
        head = this.imgUrls.shift()
        this.imgUrls.push(head)
        this.cur = 2
      } else {
        this.cur--
        head = this.imgUrls.pop()
        this.imgUrls.unshift(head)
        this.cur = 2
      }
      console.log(this.cur)
      this.$el.querySelector('.stage').scrollLeft = (this.cur - 0.13) * this.itemWidth
      this.nowItem.style.transform = 'inital'
    }
  },
  mounted () {
    this.itemWidth = this.$el.querySelector('ul li').clientWidth
    this.$el.querySelector('.stage').scrollLeft = (this.cur - 0.13) * this.itemWidth
  },
  watch: {
    timer (nval, oval) {
      if (!!oval === true && nval === null) this.makeTimer()
    }
  }
}
</script>

<style lang="scss">
#carousel{
	z-index:100;
	background:#CCCCCC;
	.stage{
		align-items: center;
		height:30vh;
		overflow:auto;
		line-height: 30vh;
		font-size:0;
		li{	
			display: inline-block;
			height:70%;
			width:80vw;
			font-size:0;
			text-align: center;
			border:1px solid #CCCCCC;
			z-index:50;
			background: #fff;
			list-style: none;
			vertical-align: middle;
			padding:10px;
			img{
				display: block;
				height: 100%;
				width:100%;
				z-index:50;
			}
		}
		.cur{
			transform: scale(1.1,1.1);
			margin:auto -20px;
			z-index: 200;
		}	
	}
	
}
</style>