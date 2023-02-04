$(function () {
  let pno = 1 //当前页
  let lock = false
  let hasMore = true

  function getData(page) {
    if (lock) return

    if (!hasMore) return

    lock = true

    var url = 'https://serverms.xin88.top/note?page=' + page

    $.get(url, data => {
      console.log(data)

      // 为什么服务器的接口中要传递图片默认的宽和高?
      // 图片属于体积较大的资源, 需要通过网络加载, 加载完毕后, 才能知道宽高
      // 瀑布流: 要求在布局的同时就必须知道图片的宽和高, 进行实时的调整
      // 图片显示时的宽
      const li_w = (1000 - 3 * 10) / 4

      $('.list').append(data.data.map(value => {
        const { cover, favorite, head_icon, height, name, title, width } = value
        // 图片的显示大小, 宽度都相同.  所以需要等比例算出 显示时的高

        // 图片显示时的高 = 图片显示时的宽 / 原图宽 * 原图高
        const img_h = li_w / width * height

        return `<li>
        <img src="./assets/img/note/${cover}" 
        style="width:100%; height:${img_h}px;" alt="">

        <p>${title}</p>
        <div>
          <div>
            <img src="./assets/img/note/${head_icon}" alt="">
            <span>${name}</span>
          </div>
  
          <span>${favorite}</span>
        </div>
      </li>`
      }))

      // 存放已经摆放完毕的元素中, 最下面一排的4个
      const li_arr = []

      // 计算元素的底部偏移量
      function offset_bottom(el) {
        // 元素底部坐标 = 元素高度 + top值
        const height = $(el).height()
        const top = $(el).css('top') // 返回值是字符串 '..px'
        return height + parseInt(top) //转数字 再相加
      }

      // 找到所有的 li 元素, 挨个调整其 left 和 top 的值, 即布局的位置
      // each: 用于遍历查找出来的元素
      // index:元素序号;  elem: 元素本身
      $('.list>li').each((index, elem) => {
        console.log(index, elem);

        // 前4个元素, 即序号<4
        if (index < 4) {
          $(elem).css({ top: 0, left: index * (li_w + 10) })
          li_arr.push(elem)
        } else {
          // 找到之前的元素中, 底部最矮的, 放到其下方
          // 假设第一个最矮
          let min_el = li_arr[0]
          // 通过遍历, 找一找有没有更矮的
          li_arr.forEach(el => {
            // 如果 遍历的元素更小
            if (offset_bottom(el) < offset_bottom(min_el)) {
              min_el = el // 最小元素就是这个更小的
            }
          })

          // 新的元素 要放在最小元素的正下方: 左侧对齐
          $(elem).css({
            left: $(min_el).css('left'),
            top: 10 + offset_bottom(min_el)
          })

          // 更新存放最下方一排元素的数组
          li_arr.push(elem) //增加新的
          // 删掉旧的 : 如何从数组中删除指定的元素?
          // splice(序号, 个数): 从数组的指定序号开始, 删除指定个数的元素
          // 找到要删除的元素的序号
          const i = li_arr.indexOf(min_el) // 被替代的最小元素的序号
          li_arr.splice(i, 1) //删除
        }
      })

      // 当布局调整完毕后, 找到最下方一排中 底部偏移量最大的元素
      // 假设第一个元素最大
      let max_el = li_arr[0]
      // 遍历查看是否有更大的
      li_arr.forEach(el => {
        if (offset_bottom(el) > offset_bottom(max_el)) {
          max_el = el
        }
      })
      // 设置ul标签的高度: 
      $('.list').css('height', offset_bottom(max_el))

      const { page, pageCount } = data

      if (page == pageCount) {
        $('.loadmore').text("没有更多了")
        hasMore = false
      }

      pno = page //更新

      lock = false //开锁
    })
  }

  getData(1)

  // 触底判定:
  $(window).scroll(function () {
    // 获取当前的滚动距离
    var st = $(window).scrollTop()
    // 内容高
    var content_h = $(document).height()
    // 窗口高
    var win_h = $(window).height()

    // 内容高 - 窗口高 == 触底的滚动距离
    // 当前滚动距离 >= 触底的滚动距离  就说明触底
    if (st + 150 >= content_h - win_h) {
      getData(pno + 1)
    }
  })
})