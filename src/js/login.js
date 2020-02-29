import './../css/bootstrap.min.css'
import './../css/global.less'
import './../css/page/login.less'

$(function(){
  console.log('login')
})

$(function () {
  var reg = /^1[3456789]\d{9}$/

  $('.change').click(function () {
    var cName = 'active'
    if ($(this).hasClass(cName)) {
      return
    }
    $('.change').removeClass(cName)
    $(this).addClass(cName)
    var formBox = $('.form-box'),
      className = 'changed'
    formBox.hasClass(className) ? formBox.removeClass(className) : formBox.addClass(className)
  })

  $('#get-code').click(function () {
    if ($(this).hasClass('clicked')) {
      return
    }
    if (!reg.test($('#phone').val())) {
      alert('请输入正确的手机号码')
      return
    }
    // 发送验证码

    // if success
    var num = 60,
      cName = 'clicked',
      _this = $(this)
    $(this).text(num + 's').addClass(cName)
    var timer = setInterval(function () {
      num += -1
      if (num < 0) {
        _this.text('发送验证码').removeClass(cName)
        clearInterval(timer)
        return
      }
      _this.text(num + 's')
    }, 1000)
  })

  $('.login-submit').click(function () {
    var input = $(this).parent().prev().find('input'), obj = {}
    input.each(function(idx) {
      var name = input.eq(idx).attr('name')
      var val = input.eq(idx).val()
      obj[name] = val
    })
    console.log(obj)
  })
})