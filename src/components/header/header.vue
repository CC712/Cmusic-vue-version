<template>
	<div id="header">
	<ul class="tabs">
		<li class="tab store" v-on:click='emitIndex(0)'>
			<router-link to='store'>
				<a v-bind:class='index[0]' href="javascript:void(0)">乐库</a>
			</router-link>

		</li>
		<li class="tab myStore" v-on:click='emitIndex(1)'>
			<router-link to='mystore'>
				<a v-bind:class='index[1]' href="javascript:void(0)">播放列表</a>
			</router-link>

		</li>
		<li class="tab search" v-on:click='emitIndex(2)'>
			<router-link to='search'>
				<a v-bind:class='index[2]' href="javascript:void(0)">搜索</a>
			</router-link>

		</li>
	</ul>
	<div class="border">

	</div>
</div>
</template>

<script>
export default {
  name: 'header',
  props: {
    pageIndex: {
      type: Number
    }
  },
  data () {
    return {
      headerMap: ['store', 'myStore', 'search']
    }
  },
  computed: {
    index () {
      let re = []
      for (let i = 0; i < 3; i++) {
        if (i === this.pageIndex) {
          console.log('head index', i)
          re.push('active')
        } else {
          re.push('')
        }
      }
      return re
    }
  },
  methods: {
    emitIndex (index) {
      console.log('head emit', index)
      this.$emit('pageChange', index)
    }
  }
}
</script>

<style lang= 'scss'>
@import '../../common/scss/mixin.scss';
	#header{
		width: 100%;
		position:relative;
		@include border-1px(rgba(255,121,123,0.1));
		background-color:#fff;
		.tabs{
			display:flex;
			width:100%;
			font-size: 24px;
			font-weight: 300;
			align-items: flex-start;
			.tab{
				list-style: none;
				flex:1 auto;
					a{
					padding: 10px;
					text-align: center;
					display: block;
					text-decoration: none;
				}
			}
			.active{
					color: red;
					/*@include border-1px(red);*/
				}
		}
		.search{
			margin-left: auto;
		}
	}
</style>