$(function () {
  // 点击搜索按钮后, 读取输入框的值, 修改url地址, 跳转到搜索页面 并 传递搜索的内容
  $('.search>button').click(function () {
    const kw = $(this).prev().val()
    // kw : keyword - 关键词
    location.assign(`?p=search&kw=${kw}`)
  })

  // 读取路径参数中的 kw, 设置为输入框的默认值
  const kw = new URLSearchParams(location.search).get('kw')
  $('.search>input').val(kw)

  // 在输入框中按回车, 也能触发搜索操作
  // keyup: 按键抬起
  $('.search>input').keyup(function (e) {
    // 回车的按键编号: 13
    if (e.keyCode == 13) {
      $('.search>button').click()
    }
  })

  // 定时器: logo动画
  setInterval(() => {
    // 添加 -3秒-> 移除 -3秒-> 添加 : 即6秒动一次
    $('img.logo').toggleClass('animate__animated animate__rubberBand')
  }, 3000);
})