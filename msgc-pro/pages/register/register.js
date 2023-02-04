$(function () {
  // 失去焦点: blur

  $('#phone')
    .blur(function () {
      var phone = $(this).val()

      // 如果输入框没有值, 则不做判定
      if (phone == '') return

      // 判定格式正确与否
      if (/^1[3-9]\d{9}$/.test(phone)) {
        // 利用接口询问服务器, 手机号是否已经注册过
        var url = 'https://serverms.xin88.top/users/checkPhone'
        // 请求分多种方式, 其中 GET(获取) 和 POST(传递) 最常见
        // get: 适合从服务器获取数据, 对应 SQL的查询操作
        // post: 适合向服务器传递数据, 对应 SQL 的增删改操作
        // 实战中, 请求方式由服务器决定. 前端工程师只负责使用即可

        // post请求中, 参数和接口地址 要分开传递
        // 参数1: 请求地址;  
        // 参数2: 请求参数支持两种语法 - 字符串 和 对象
        //   -- 字符串:  '参数名=值&参数名=值...'
        //   -- 对象  :  {参数名: 值, 参数名: 值}
        // 参数3: 成功后的回调函数

        // 糖: {属性名: 变量名} - 如果恰好相同, 可以合写  { 属性名 }
        // {phone: phone} -> { phone }
        // 通常, 会对变量名进行设计, 专门凑这种糖
        $.post(url, { phone }, data => {
          console.log(data)
          if (data.code == 200) {
            $(this).next().show()
          }
          if (data.code == 202) {
            // nextAll: 下方所有兄弟元素
            // last : 其中最后一个
            $(this).addClass('err').nextAll().last().show()
          }
        })

      } else {
        $(this).addClass('err').next().next().show()
      }
    })
    .focus(function () {
      // nextAll(): 下方所有的兄弟标签
      $(this).removeClass('err').nextAll().hide()
    })

  $('#password')
    .blur(function () {
      var pwd = $(this).val()

      if (pwd == '') return

      if (pwd.length >= 6 && pwd.length <= 12) {
        $(this).next().next().show()
      } else {
        $(this).addClass('err').next().show()
      }
    })
    .focus(function () {
      $(this).removeClass('err').nextAll().hide()
    })

  $('#repassword')
    .blur(function () {
      var repwd = $(this).val()
      var pwd = $('#password').val()

      if (repwd == '') return

      if (repwd == pwd) {
        $(this).next().next().show()
      } else {
        $(this).addClass('err').next().show()
      }
    })
    .focus(function () {
      $(this).removeClass('err').nextAll().hide()
    })


  // 注册
  $('.agree+button').click(function () {
    // 读取勾选状态
    var checked = $('.agree input').prop('checked')
    console.log('checked', checked);

    if (!checked) {
      $('.agree').addClass('animate__animated animate__bounce')
      return
    }

    // 练习: 如果有输入框带有 err 样式, 则抖动提示
  })

  // 监听动画完毕后, 删除样式;  才能重复动画
  $('.agree').on('animationend', function () {
    $(this).removeClass('animate__bounce')
  })
})