import './../css/bootstrap.min.css'
import './../css/global.less'
import './../css/page/detail.less'

(function () {
	$.fn.startProgress = function (data) {
		/*初始化*/
		var ele = this;
		ele.append(
			'<div class="xianpa">' +
			'<div class="hengxian">' +
			'<div class="hongxian"></div>' +
			'</div></div>' +
			'<div class="flexbox djwai"></div>'
		);
		if (data && data.nodes) {
			var hStr = '',
				dateStr = '';
			/*构造节点数据*/
			for (var node in data.nodes) {
				if (!!data.nodes[node].date) {
					dateStr = '<div class="jucolnext">' + data.nodes[node].date + '</div>'
				} else {
					dateStr = ''
				}
				hStr = '<div class="yifen dengji ' + (!data.nodes[node].date ? 'gray' : '') + '">' +
					'<span class="node"></span>' +
					'<div class="jucol">' + data.nodes[node].name + '</div>' +
					dateStr +
					'</div>';
				ele.find(".djwai").append(hStr);
			}
			/*计算进度条位置*/
			var boxLeft = $('.xianpa')[0].getBoundingClientRect().left,
					lastHasDateNodeLeft = $('.gray').eq(0).prev().find('.node')[0].getBoundingClientRect().left,
					firstGrayNodeLeft = $('.gray').find('.node')[0].getBoundingClientRect().left,
					lastNodeLeft = $('.yifen').last().find('.node')[0].getBoundingClientRect().left
			var xianLength = lastNodeLeft - boxLeft
			var hongxianLength = (firstGrayNodeLeft - boxLeft - (lastHasDateNodeLeft - boxLeft)) / 2 + (lastHasDateNodeLeft - boxLeft)
			var width = ((hongxianLength / xianLength) * 100).toFixed(0)
			// console.log(width)
			$('.hongxian').css('width', width + '%')
		}
	}
})();

$(function () {
  console.log('detail')
  $(".progressed").startProgress({
    "nodes": [{
        "name": "申请",
        "date": '2015/01/19'
      },
      {
        "name": "初审",
        "date": '2015/01/19'
      },
      {
        "name": "注册",
        // "date": '2015/01/19'
      },
      {
        "name": "终止",
        // "date": '2015/01/19'
      }
    ]
  });
})