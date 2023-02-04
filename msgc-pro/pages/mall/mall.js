$(function () {
  let pno = 1 // 当前页
  let lock = false //锁定状态
  let hasMore = true //有更多

  // 请求数据
  function getData(page) {
    if (lock) return // 如果锁定, 则不做事
    if (!hasMore) return//如果没有更多, 则不做事

    lock = true //加锁
    var url = 'https://serverms.xin88.top/mall?page=' + page

    $.get(url, data => {
      console.log(data)

      $('.list').append(
        data.data.map(value => {
          const { name, pic, price, sale_count } = value

          return `<li>
        <img src="./assets/img/mall/${pic}" alt="">
        <p>${name}</p>
        <div>
          <b>¥${price}</b>
          <span>月售${sale_count}</span>
        </div>
      </li>`
        })
      )

      const { page, pageCount } = data

      if (page == pageCount) {
        $('.loadmore').text("没有更多商品")
        hasMore = false
      }

      pno = page //更新当前页

      lock = false // 解锁
    })
  }

  getData(1)

  $(window).scroll(function () {
    var st = $(window).scrollTop() //滚动距离
    var win_h = $(window).height() //窗口高
    var content_h = $(document).height() //内容高

    // 滚动距离 > 内容高-窗口高  就相当于触底
    if (st + 150 > content_h - win_h) {
      getData(pno + 1)
    }
  })
})