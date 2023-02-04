// 接口文档: xin88.top 中的 接口文档

// 1. DOM元素加载完毕后, 再执行
// 2. 单独的局部作用域, 避免全局污染
$(function () {
  function getData(page) {
    var url = 'https://serverms.xin88.top/video?page=' + page

    $.get(url, data => {
      console.log(data)

      $('.list').html(
        data.data.map(value => {
          const { duration, pic, title, views } = value

          return `<li>
          <div>
            <img src="./assets/img/video/${pic}" alt="">
            <div>
              <span>${views}次播放</span>
              <span>${duration}</span>
            </div>
          </div>
          <p>${title}</p>
        </li>`
        })
      )

      //    当前页   总页数
      const { page, pageCount } = data

      // 显示的页数, 最多5个, 由当前页决定

      // 常规状态: 当前页在中间时
      let maxPage = page + 2
      let minPage = page - 2

      // 最小是1
      if (minPage < 1) {
        minPage = 1
        maxPage = minPage + 4
      }

      // 最大值不能超过总页数
      if (maxPage > pageCount) {
        maxPage = pageCount
        minPage = maxPage - 4
      }

      // 新增页数之前, 先删除旧的
      $('.pager>ul').empty()  // empty: 清空子元素

      for (let i = minPage; i <= maxPage; i++) {
        // 如果生成的是当前页, 则添加激活样式
        $('.pager>ul').append(`<li class="${i == page ? 'active' : ''}">${i}</li>`)
      }

      // 回到页面的顶部, 让用户从头开始浏览
      $(window).scrollTop(0) // 0: 代表滚动距离为 0

      // 切换上一页按钮的显示状态
      if (page == 1) {
        $('.pager>button').eq(0).hide() //藏
      } else {
        $('.pager>button').eq(0).show() //显示
      }

      // 切换 下一页 按钮的显示状态
      if (page == pageCount) {
        $('.pager>button').eq(1).hide() //藏
      } else {
        $('.pager>button').eq(1).show() //显示
      }

    })
  }

  getData(1) //初始化

  // 页数是请求后才添加的, 属于异步操作实现 
  // 利用委托方式, 监听子元素 li 的点击
  $('.pager').on('click', 'li', function () {
    // 获取页数文字
    const pno = $(this).text()
    getData(pno)
  })

  // 下一页按钮
  $('.pager>button').eq(1).click(function () {
    // 下一页: 当前页的下一个
    $('.pager>ul>li.active').next().click()
  })

  // 上一页
  $(".pager>button").eq(0).click(function () {
    // prev(): 获取上一个兄弟元素
    $('.pager>ul>li.active').prev().click()
  })
})