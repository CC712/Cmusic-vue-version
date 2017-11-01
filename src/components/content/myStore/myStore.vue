<template>
<div id='mystore'>
	<ul >
		<li @click='reload(song.id)' class="c-song" v-for="( song, index ) in idList" :key='song.id'>
			<img class="c-song__img" :src="song.data.al.picUrl"/>
				<div class="c-song__info">
					<p class="c-song__name">{{song.data.name}}</p>
					<p class="c-song__art">{{song.data.ar[0].name}}</p>
				</div>
				<span class="c-song__playbtn">〉</span>
		</li>
	</ul>

</div>
</template>

<script>
import bus from '../../../bus'
export default {
  name: 'myStore',
  data () {
    return {
      idList: [],
      idMap: {}
    }
  },
  created () {
    bus.$off('store')
    bus.$on('store', (r) => {
      if (this.idMap[r.id] !== undefined) return
      this.idList.push(r)
      this.idMap[r.id] = r.data
      console.log('store get')
    })
  },
  mounted () {
    console.log('my', this.songs)
  },
  beforeUpdate () {
  },
  destroyed () {
    bus.$off('store')
  },
  methods: {
    reload (r) {
      console.log('reload mystore')
      bus.$emit('reload', r)
    }
  }
}
</script>

<style lang= 'scss'>
#mystore{
	overflow:auto;
}
#mystore::-webkit-scrollbar{
	display: none;
}
.c-song{
	display: flex;
	align-items: center;
	margin-bottom: 5px;
}

</style>