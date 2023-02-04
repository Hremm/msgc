$(function () {
  // 请求数据
  function getData(page) {
    var url = 'https://serverms.xin88.top/mall?page=' + page
    $.get(url, data => {
      console.log(data)

      $('.list').html(
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

      $('.pager>ul').empty()

      let minPage = page - 2
      let maxPage = page + 2

      if (minPage < 1) {
        minPage = 1
        maxPage = minPage + 4
      }

      if (maxPage > pageCount) {
        maxPage = pageCount
        minPage = maxPage - 4
      }

      for (let i = minPage; i <= maxPage; i++) {
        $('.pager>ul').append(`<li class="${i == page ? 'active' : ''}">${i}</li>`)
      }

      if (page == 1) {
        $('.pager>button').eq(0).hide()
      } else {
        $('.pager>button').eq(0).show()
      }

      if (page == pageCount) {
        $('.pager>button').eq(1).hide()
      } else {
        $('.pager>button').eq(1).show()
      }

      $(window).scrollTop(0)
    })
  }

  getData(1)

  $('.pager').on('click', 'li', function () {
    const pno = $(this).text()
    getData(pno)
  })

  //下一页
  $('.pager>button').eq(1).click(function () {
    $('.pager>ul>li.active').next().click()
  })

  // 上一页
  $('.pager>button').eq(0).click(function () {
    $('.pager>ul>li.active').prev().click()
  })
})