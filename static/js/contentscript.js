//过滤掉不显示注入结果的页面.
var currentURL = document.URL;
if(currentURL.indexOf('discussion') != -1  
	|| currentURL.indexOf('doulist') != -1 //推荐****的豆列
	|| currentURL.indexOf('collections') != -1 //看过"****"的豆瓣成员
	|| currentURL.indexOf('wishes') != -1 //想看"****"的豆瓣成员
	|| currentURL.indexOf('review') != -1 //影评 review
	|| currentURL.indexOf('mupload') != -1 //海报 mupload
	|| currentURL.indexOf('all_photos') != -1 //全部图片 all_photos
	|| currentURL.indexOf('new_review') != -1 //
	|| currentURL.indexOf('comments') != -1 //comments
	|| currentURL.indexOf('group_collectors') != -1 //group_collectors
	|| currentURL.indexOf('offers') != -1 //offers
	|| currentURL.indexOf('new_offer') != -1 //new_offer
	|| currentURL.indexOf('doings') != -1 //doings
	|| currentURL.indexOf('questions') != -1//questions
	)
{
  return;
} else {
	inject();
}

function inject(){
	var title = $('html head title').text();
	var keyword = title.replace( '(豆瓣)', '' ).trim();
	var dck = encodeURIComponent(keyword);
	var imgURL = chrome.extension.getURL("static/icons/icon_128.png");
	
	var imgPlus = "http://img3.douban.com/pics/add-doulist.gif";
	var imgMinus = chrome.extension.getURL("static/icons/-.gif");
	
	var html_title =  '<div id="dbbd" class="da3" style="margin-bottom:0px;padding-bottom:1px;background-color:#E9F3FA;">'
		+ '<dl><dt style="display:inline;font-size:11px;color:#999">'
		+ '<img id="toggleIMG" src="'+imgURL+'" style="margin-bottom:1px;margin-right:5px;width:16px;/>'
		+ '<b style="color:#888">' + keyword + '</b> 的搜索结果· · ·</dt> [' 
		+ '<a href="http://www.baidu.com/s?wd='+dck+'+site%3Apan.baidu.com" target="_blank">全部</a>'
		+ ']<img style="float:right;margin-top:4px;cursor:pointer;opacity:0.3;" id="toggleIcon" src="'+ imgPlus +'" title="试试其他关键字?">'

	    + '<div id="baidu-search" style="display:none">'
		+ '	<input id="query-keywords" type="text">'
		+ '	<img id="searchIcon" src="http://img3.douban.com/pics/icon/bn_srh_1.png" style="cursor:pointer">'
		+ '</div>'

		+ '</dl></div>';
	var html_body_start = '<div class="indent" id="db-doulist-section" style="padding-left:5px;padding-right:5px;padding-bottom:8px;border:1px #F4F4EC solid;"><ul class="bs bdresult">';

	var url='http://www.baidu.com/s?wd='+dck+'+site%3Apan.baidu.com';
	$.ajax({
		url:url,
		dataType: "html",
		success: function(data){
			for(var i = 1; i < 6; i ++){
				var content = "#content_left div#" + i + " div.c-abstract";
				var tempTitle = $(content, data).text().replace("文件名:", "");
				var tempURL = $("#content_left div#" + i + " h3.t a", data).attr("href");
				//搜索结果不为空时,加载显示...
				if (tempTitle != "") {
					$("ul.bdresult").append('<li><span class="badge badge-error">'+ i +'</span><a href='+tempURL+' target="_blank">' + tempTitle + '</li>');
				} else if (tempTitle == "" && i == 1) {
					$("ul.bdresult").append('<li>哇哦~,可能是该资源过于冷门,什么都没找到呀...</li>');
					return;
				} else {
					$("ul.bdresult").append('<li style="text-align:center">未找到更多搜索结果</li>');
					return;
				}
			}
		},
		error: function(responseData, textStatus, errorThrown) {
			$("ul.bdresult").append('<li>未能找到' + keyword + '的相关结果</li>');
		}
	});

	var html_body_end = '</ul></div>';

	$('.aside').prepend( html_title + html_body_start + html_body_end);
	
	var toggle_more_button = document.getElementById("toggleIcon");
	toggle_more_button.addEventListener("click", function() {
	  var origsrc = $(this).attr('src');
        var src = '';
        if (origsrc == imgPlus) {
        	src = imgMinus;
        } else {
        	src = imgPlus;
        }
        $(this).attr('src', src);
	  $('#baidu-search').fadeToggle("fast");
	}, false);

	var submit_search = document.getElementById("searchIcon");
	submit_search.addEventListener("click", function() {
		var queryWords = $('#query-keywords').val();
		if(queryWords.trim() == ""){
			alert("请输入搜索关键字哦^_^");
		}else{
			url_final = 'http://www.baidu.com/s?wd=' + queryWords + '+site:pan.baidu.com';
			window.open(url_final);
		}
	}, false);

}
