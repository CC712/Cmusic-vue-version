<template>
<div id='store' >
	<carousel :imgUrls='carouselRes'></carousel>
	<personal :resData='personalRes'></personal>
	<djprogram :djres='djprogramRes'></djprogram>
	<newsong :songRes='newsongRes'></newsong>
</div>
</template>

<script>
import url from '../../../common/js/requestUrl.json'
import carousel from './store-carousel'
import personal from './store-personalized'
import djprogram from './store-djprogram'
import newsong from './store-newsong'
export default {
  name: 'store',
  components: {
    carousel,
    personal,
    djprogram,
    newsong
  },
  data () {
    return {
      data: [{ title: '123', value: 'dgus' }, { title: 'sqd', value: '12' }, { title: '123', value: 'dgus' }, { title: 'sqd', value: '12' }],
      carouselRes: [],
      personalRes: [],
      djprogramRes: [],
      newsongRes: []
    }
  },
  created () {
    let personalReq = url.others + url.personalized
    this.$http.get(personalReq).then((r) => { this.personalRes = r.body.result; console.log(r, this.personalRes) })
    let djprogramReq = url.others + url.djprogram
    this.$http.get(djprogramReq).then((r) => { this.djprogramRes = r.body.result; console.log(r, this.djprogramRes) })
    let newsongReq = url.others + url.newsong
    this.$http.get(newsongReq).then((r) => { this.newsongRes = r.body.result; console.log('songsong', r, this.newsongRes) })
  },
  methods: {
    say () {
      console.log('store ')
    }
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
.card {
	margin: 3px;
}
.title {
	font-size: 20px;
	line-height: 40px;
	min-height: 40px;
}

</style>