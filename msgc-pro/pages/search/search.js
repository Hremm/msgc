$(function () {
  // 排序
  $('.sort>li').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
    //重新发请求
    getData(1)
  })

  // 读取路径中的参数kw, 拼接到url中, 进而获取不同的查询结果
  const kw = new URLSearchParams(location.search).get('kw')

  function getData(pno) {
    // 当前排序 激活项 的序号, 恰好和类型type的值 是 1 1 对应
    const i = $('.sort>.active').index()

    var url = `https://serverms.xin88.top/mall/search?type=${i}&kw=${kw}&page=${pno}`
    console.log('url', url)

    $.get(url, data => {
      console.log(data)

      $('.list').html(
        data.data.map(value => {
          const { name, pic, price, sale_count } = value
          return `<li>
        <img src="./assets/img/mall/${pic}" alt="">
        <div>
          <h3>${name}</h3>
          <b>¥${price}</b>
          <span>销量 ${sale_count}</span>
        </div>
      </li>`
        })
      )

      const { page, pageCount } = data

      // 上一页按钮的不可用状态 和 当前页关联
      $('.pager>button').eq(0).prop('disabled', page == 1)
      $('.pager>button').eq(1).prop('disabled', page == pageCount)

      //显示5页
      let minPage = page - 2
      let maxPage = page - -2 //page是字符串

      if (minPage < 1) {
        minPage = 1
        maxPage = minPage + 4
      }

      if (maxPage > pageCount) {
        maxPage = pageCount
        minPage = maxPage - 4
      }

      // 上方的页数算法, 都建立在 页数>=5个的基础上进行
      if (pageCount < 5) {
        minPage = 1
        maxPage = pageCount
      }

      $('.pager>ul').empty()

      for (let i = minPage; i <= maxPage; i++) {
        $('.pager>ul').append(`<li class="${i == page ? 'active' : ''}">${i}</li>`)
      }

      $(window).scrollTop(0) //回到顶部
    })
  }

  getData(1)

  // 页码
  $('.pager').on('click', 'li', function () {
    const pno = $(this).text()
    getData(pno)
  })

  // 下一页
  $('.pager>button').eq(1).click(function () {
    $('.pager>ul>.active').next().click()
  })

  $('.pager>button').eq(0).click(function () {
    $('.pager>ul>.active').prev().click()
  })
})