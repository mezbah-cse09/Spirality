// canvas.js

Page({
  data: {
    windowWidth: 0, 
    color: '#feeeed', // 画笔颜色
    count: 30,  // 阵列数量
    isPen: true,  // 是否使用钢笔
    isAblePre: true,  // 可以使用上一步
    isAbleNext: true, // 可以使用下一步
    isShowTool: true, // 左边工具栏展示
    isShowColorPicker: false, // 颜色选择器
  },
  // contextArray:[],
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    this.setData({
      windowWidth: res.windowWidth,
    })
  },
  touchstart(e) {
    if (e.touches.length > 1) { return; }
    
    let { clientX, clientY } = e.touches[0];
    this.prePointX = clientX;
    this.prePointY = clientY;
    this.context = wx.createCanvasContext("firstCanvas")
    this.context.setStrokeStyle(this.data.color)
    this.context.setLineWidth(1)
    this.context.setLineCap('round')
  },
  touchmove(e) {
    if (e.touches.length > 1) { 
      this.touchcancel()
      return; 
    }
    if (this.data.isShowTool) {
      this.setData({
        isShowTool: false
      })
    }

    let { clientX, clientY } = e.touches[0];
    this.context.moveTo(this.prePointX, this.prePointY)
    this.context.lineTo(clientX, clientY)
    this.context.stroke()
    this.prePointX = clientX;
    this.prePointY = clientY;
    
    // 实时渲染
    let context = this.context;
    wx.drawCanvas({
      canvasId: "firstCanvas",
      reserve: true,
      actions: context.getActions()
    })
  },
  touchend(e) {
    this.setData({
      isShowTool: true
    })
  },
  touchcancel(e) {
    this.setData({
      isShowTool: true
    })
  },
  // 画笔类型
  penChange: function (e) {
    console.log('penchanged', e)

    let isPen = !this.data.isPen;
    console.log(isPen);

    this.setData({
      isPen: isPen
    })
  },
  triggerPicker(e) {
    let isShowColorPicker = this.data.isShowColorPicker;
    this.setData({
      isShowColorPicker: !isShowColorPicker
    })
  },
  // 画笔颜色
  colorChange(e) {
    console.log('colorChange', e)
    let color = e.currentTarget.dataset.color;
    this.setData({
      color: color,
      isShowColorPicker: false
    })
  },
  // 画笔阵列
  countChange(e){
    console.log('countChange', e)

    let count = this.data.count + 1;
    this.setData({
      count: count
    })
  },
  // 清楚画板
  clean(e){
    console.log('clean', e)

  },
  // 上一步
  rollBack(e) {
    console.log('rollBack', e)

  },
  // 下一步
  moveForward(e) {
    console.log('moveForward', e)

  },
  // 保存为图片
  save(e){
    console.log('save', e)

  },
  // 播放
  play(e){
    console.log('play', e)

  }
})