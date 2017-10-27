/*
 *2017年10月22日16:51:54
 *哈哈 自己写出来的第一个封装函数，模仿了 ZXX 大神11年写的一个小插件
 * 没有拥抱es6，因为ide总报错，很烦。
 * 而且箭头函数 的this绑定父域   用起来还不顺手，所以为了减少BUG出现的可能
 * 保守的使用了es5
 */
/* eslint-disable */
var CCscroll = {
  //约束运动方向
  //参数
  width: 0,
  pageWidth: 0,
  pageNum: 0,
  pageIndex: 0,
  pagesPosition: [],
  timer: null,
  el: null,
  velocity: 0,
  dir:0, //   h v default 0
  //限定方向
  forbi_dir:null,
  //钩子
  onMove: function() {},
  onEnd: function() {},
  onStart: function() {},
  //暴露  方法
  goIndex: function(index) {
    //执行动画。并且返回一个promise对象 内部有一个钩子 作为回调
    //  return this.pageScrolling(this.el.scrollLeft, this.pagesPosition[index], 300)
    //console.log(index, 'gotogoto')
  },

  //内部方法
  startHandler: function(ev) {
    clearInterval(this.timer)
    ev.preventDefault()
    var touch = ev.changedTouches[0];
    this.startX = touch.pageX
    this.startY = touch.pageY
    this.durTime = Date.now()
    console.log()
    //初始方向
	this.dir = 0
  },
  moveHandler: function(ev) {
    this.durTime = Date.now() - this.durTime
    ev.preventDefault();
    var touch = ev.changedTouches[0];
    //水平
    this.endX = touch.pageX
    var Xlen = this.endX - this.startX
    this.velocity = Xlen / this.durTime
    //垂直
    this.endY = touch.pageY
    var Ylen = this.endY - this.startY
    //与手的方向相反
    console.log('ylen',this.endY,this.startY)
    // 优先判断 是否有方向限制
    //不够 应该一开始就判断
    if(Math.abs(Ylen)>Math.abs(Xlen)&&this.dir === 0){
    	this.dir = 'v'
    }else if(Math.abs(Ylen)<Math.abs(Xlen)&&this.dir === 0){
    	this.dir = 'h'
    }
    //触发 方向限制 
    console.log('dir',this.dir,'x:',Xlen,"y:",Ylen)
    if(this.dir === 'v'){
    	Xlen=0
    	this.velocity=0
    }else if(this.dir === 'h'){
    	Ylen=0
    }
    this.el.scrollLeft -= Xlen
    console.log(this.el.scrollTop,this.el)
    this.el.scrollTop -= Ylen
    //初始化位置 起点 
    this.startX = this.endX
    this.startY = this.endY
    this.durTime = Date.now()
  },
  endHandler: function(ev) {
  	clearInterval(this.timer)
  	ev.preventDefault()
  	this.timer=null
    //  ////console.log('is_next', pageIndex)
    ev.preventDefault();
    var touch = ev.changedTouches[0],
      dir = this.velocity < 0 ? 1 : -1;
    //判断条件	
    var con1 = Math.abs(this.velocity) > 0.7,
      con2 = this.pagesPosition[this.pageIndex] < this.el.scrollLeft - this.pageWidth / 2, //+
      con3 = this.pagesPosition[this.pageIndex] > this.el.scrollLeft + this.pageWidth / 2; //- 1right -1left
    //  	////console.log('con2',!!con2)
    if(con1) {
      //console.log('speed	change 1', this.pageIndex)

      this.pageIndex += dir
      //console.log('speed	change 2', this.pageIndex)

    } else {
      //console.log('position change 1', this.pageIndex)
      if(con2) this.pageIndex++
        if(con3) this.pageIndex--
          //console.log('position change 2', this.pageIndex)
    }
    if(this.pageIndex < 0) {
      this.pageIndex = 0
    }
    if(this.pageIndex >= this.pageNum) {
      this.pageIndex = this.pageNum - 1
    }
    //初始化各个参数
    this.velocity = 0
    //vm.$emit('pageChange',pageindex)
    //console.log('js 内部确定index', this.pageIndex)
    //内部的 确定的index怎么给外部啊？回调也不行啊
    var endPos = this.pageIndex * this.pageWidth;
    this.pageScrolling(this.el.scrollLeft, endPos, 300)
  },
  pageScrolling: function(startPos, endPos, time) {
  	//初始化 timer 必须
  	clearInterval(this.timer)
  	this.timer=null
      //console.log('参数：', startPos, endPos)
    var s = endPos - startPos,
      v = s / time,
      old;
      var self=this
      this.timer = setInterval(function() {
        old = self.el.scrollLeft
          console.log('go', self.el.scrollLeft - endPos)
        //改变
        self.el.scrollLeft += v * 16
        //停止条件 
        // 边界  到达某一页
        if(Math.abs(self.el.scrollLeft - endPos) <= 20) {
          self.el.scrollLeft = endPos
          var nowIndex = self.el.scrollLeft / self.pageWidth
          clearInterval(self.timer)
            console.log('timer end', self.pageIndex)
        }
      }, 16)

    //
  },
  //事件

  //可以学习一下 vue的思想 数据驱动  彻底由Index  驱动事件，
  //如何返回index给vue？
  // vue 内部太多 call 来call去的 作用域很乱

  init: function(el, config) {
    //参数 引进来 钩子
    if(config) {
      for(var i in config) {
        this[i] = config[i]
        //console.log(i)
      }
    }

    //	初始化参数
    this.el = el
    this.width = el.scrollWidth
    this.pageWidth = el.clientWidth
    this.pageNum = Math.floor(this.width / this.pageWidth)
    for(var i = 0, len = this.pageNum; i < len; i++) {
      this.pagesPosition.push(i * this.pageWidth+1)
    }
    this.velocity = 0
    this.startX = 0
    this.endX = 0
    this.durTime = 0
    //绑定事件
    var self = this
    el.addEventListener('touchstart', function(e) {
      self.startHandler(e)
      self.onStart(self)
    }, false)
    el.addEventListener('touchmove', function(e) {
      self.moveHandler(e)
      self.onMove(self)
    }, false)
    el.addEventListener('touchend', function(e) {
      self.endHandler(e)
      self.onEnd(self)
    }, false)
    //封装
    return {
      goto: function(index) {
        var endPos = index * self.pageWidth;
        //必须有，不然就会导致 你外部获得的index和 内部的有差
        self.pageIndex = index
        self.pageScrolling(self.el.scrollLeft, endPos, 300)
      }
    }
  }

};
export {
  CCscroll
}