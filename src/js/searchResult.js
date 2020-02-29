import './../css/bootstrap.min.css'
import './../css/global.less'
import './../css/page/searchResult.less'

(function ($, window, document, undefined) {
  'use strict';

  function Paging(element, options) {
    this.element = element;
    this.options = {
      nowPage: options.nowPage || 1, // 当前页码
      pageNum: options.pageNum, // 总页码
      canJump: options.canJump || 0, // 是否能跳转。0=不显示（默认），1=显示
      showOne: options.showOne || 0, //只有一页时，是否显示。0=不显示,1=显示（默认）
      buttonNum: (options.buttonNum >= 5 ? options.buttonNum : 5) || 7, // 页面显示页码数量
      callback: options.callback // 回调函数
    };
    this.init();
  }
  Paging.prototype = {
    constructor: Paging,
    init: function () {
      this.createHtml();
      this.bindClickEvent();
      this.disabled();
    },
    createHtml: function () {
      var me = this;
      var nowPage = this.options.nowPage;
      var pageNum = this.options.pageNum;
      var buttonNum = this.options.buttonNum;
      var canJump = this.options.canJump;
      var showOne = this.options.showOne;
      var content = [];
      //对nowPage进行判断
      nowPage = nowPage > pageNum ? pageNum : nowPage;
      nowPage = nowPage < 1 ? 1 : nowPage;
      //如果pageNum小于等于0则不渲染
      if (pageNum <= 0) {
        return '';
      }
      //如果只有一页并且设置为不显示，则不进行渲染
      if (!showOne && pageNum === 1) {
        return '';
      }
      content.push("<ul>");
      content.push("<li class='xl-prevPage'>上一页</li>");
      //页面总数小于等于当前要展示页数总数，展示所有页面
      if (pageNum <= buttonNum) {
        for (var i = 1; i <= pageNum; i++) {
          if (nowPage !== i) {
            content.push("<li>" + i + "</li>");
          } else {
            content.push("<li class='xl-active'>" + i + "</li>");
          }
        }
      } else if (nowPage <= Math.floor(buttonNum / 2)) {
        //当前页面小于等于展示页数总数的一半（向下取整），从1开始
        for (var i = 1; i <= buttonNum - 2; i++) {
          if (nowPage !== i) {
            content.push("<li>" + i + "</li>");
          } else {
            content.push("<li class='xl-active'>" + i + "</li>");
          }
        }
        content.push("<li class='xl-disabled'>...</li>");
        content.push("<li>" + pageNum + "</li>");
      } else if (pageNum - nowPage <= Math.floor(buttonNum / 2)) {
        //当前页面大于展示页数总数的一半（向下取整）
        content.push("<li>" + 1 + "</li>");
        content.push("<li class='xl-disabled'>...</li>");
        for (var i = pageNum - buttonNum + 3; i <= pageNum; i++) {
          if (nowPage !== i) {
            content.push("<li>" + i + "</li>");
          } else {
            content.push("<li class='xl-active'>" + i + "</li>");
          }
        }
      } else {
        //前半部分页码
        if (nowPage - Math.floor(buttonNum / 2) <= 0) {
          for (var i = 1; i <= Math.floor(buttonNum / 2); i++) {
            if (nowPage !== i) {
              content.push("<li>" + i + "</li>");
            } else {
              content.push("<li class='xl-active'>" + i + "</li>");
            }
          }
        } else {
          content.push("<li>" + 1 + "</li>");
          content.push("<li class='xl-disabled'>...</li>");
          for (var i = nowPage - Math.floor(buttonNum / 2) + (buttonNum % 2 == 0 ? 3 : 2); i <= nowPage; i++) {
            if (nowPage !== i) {
              content.push("<li>" + i + "</li>");
            } else {
              content.push("<li class='xl-active'>" + i + "</li>");
            }
          }

        }
        //后半部分页码
        if (pageNum - nowPage <= 0) {
          for (var i = nowPage + 1; i <= pageNum; i++) {
            content.push("<li>" + i + "</li>");
          }
        } else {
          for (var i = nowPage + 1; i <= nowPage + Math.floor(buttonNum / 2) - 2; i++) {
            content.push("<li>" + i + "</li>");
          }
          content.push("<li class='xl-disabled'>...</li>");
          content.push("<li>" + pageNum + "</li>");
        }
      }
      content.push("<li class='xl-nextPage'>下一页</li>");
      if (canJump) {
        content.push("<li class='xl-jumpText xl-disabled'><span class='all-page-num'>共" + pageNum + "页</span> 第<input min='1' type='number' id='xlJumpNum'>页</li>");
        content.push("<li class='xl-jumpButton'>GO</li>");
      }
      content.push("</ul>");
      me.element.html(content.join(''));
      // DOM重新生成后每次调用是否禁用button
      setTimeout(function () {
        me.disabled();
      }, 20);

    },
    bindClickEvent: function () {
      var me = this;
      me.element.off('click', 'li');
      me.element.on('click', 'li', function () {
        var cla = $(this).attr('class');
        var num = parseInt($(this).html());
        var nowPage = me.options.nowPage;
        if ($(this).hasClass('xl-disabled') || cla === 'xl-jumpText') {
          return '';
        }
        if (cla === 'xl-prevPage') {
          if (nowPage !== 1) {
            me.options.nowPage -= 1;
          }
        } else if (cla === 'xl-nextPage') {
          if (nowPage !== me.options.pageNum) {
            me.options.nowPage += 1;
          }
        } else if (cla === 'xl-jumpButton') {
          if (Number($('#xlJumpNum').val()) < 1) {
            return false;
          }
          me.options.nowPage = Number($('#xlJumpNum').val());
        } else {
          me.options.nowPage = num;
        }
        me.createHtml();
        if (me.options.callback) {
          me.options.callback(me.options.nowPage);
        }
      });

    },
    disabled: function () {
      var me = this;
      var nowPage = me.options.nowPage;
      var pageNum = me.options.pageNum;
      if (nowPage === 1) {
        me.element.children().children('.xl-prevPage').addClass('xl-disabled');
      } else if (nowPage === pageNum) {
        me.element.children().children('.xl-nextPage').addClass('xl-disabled');
      }
    }
  }
  $.fn.paging = function (options) {
    return new Paging($(this), options);
  }
})(jQuery, window, document);

$(function () {
  console.log('searchResult')
  $("#page").paging({
    nowPage: 1, // 当前页码,默认为1
    pageNum: 40, // 总页码
    buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
    canJump: 1, // 是否能跳转。0=不显示（默认），1=显示
    showOne: 0, //只有一页时，是否显示。0=不显示,1=显示（默认）
    callback: function (num) { //回调函数,num为当前页码
      console.log(num);
    }
  });

  $('.result-list').click(function () {
    location.href = './detail.html'
  })
})