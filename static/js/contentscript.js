/* 
* @Author: sam_su
* @Date:   2014-05-09 10:20
* =_=! Sorry! I write JavaScript code with a lit bit of Java style
*/

//过滤掉不显示注入结果的页面.

var currentURL = document.URL;
var do_not_inject_page = new Array(
		"discussion","doulist","collections","wishes","review","mupload","all_photos",
		"new_review","comments","group_collectors","offers","new_offer","doings","questions");

var flag = true;
for (var i = 0; i < do_not_inject_page.length; i++) {
	if(currentURL.indexOf(do_not_inject_page[i]) != -1){
		flag = false;
		break;
	}
}

if(flag){
	inject();
}

function getRandomArrayElements(arr, count) {
	var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}

function inject(){
	var title = $('html head title').text();
	var keyword = title.replace( '(豆瓣)', '' ).trim();
	var dck = encodeURIComponent(keyword);
	var imgURL = chrome.extension.getURL("static/icons/icon_128.png");
	
	var imgPlus = "http://img3.douban.com/pics/add-doulist.gif";
	var imgMinus = chrome.extension.getURL("static/icons/-.gif");

	var optionURL = chrome.extension.getURL('options.html');
	
	var html_title =  '<div id="dbbd" class="da3" style="margin-bottom:0px;padding-bottom:1px;background-color:#F0F3F5;">'
		+ '<dl><dt style="display:inline;font-size:11px;color:#888;font-weight:bold;">'
		+ '<img id="toggleIMG" src="'+imgURL+'" style="margin-bottom:-3px;margin-right:5px;width:16px;cursor:pointer;" onclick="javascript:window.open('+"'"+optionURL+"'"+');">'
		+ '<b style="color:#888">' + keyword + '</b> 的搜索结果</dt>' 
		/*+ '<a href="http://www.baidu.com/s?wd='+dck+'+site%3Apan.baidu.com" target="_blank">全部</a>'*/
		+ '<img style="float:right;margin-top:4px;cursor:pointer;opacity:0.3;" id="toggleIcon" src="'+ imgPlus +'" title="试试其他关键字?">'

	    + '<div id="baidu-search" style="display:none">'
		+ '	<input id="query-keywords" type="text">'
		+ '	<img id="searchIcon" src="http://img3.douban.com/pics/icon/bn_srh_1.png" style="cursor:pointer;margin-top:-70px;">'
		+ '</div>'

		+ '</dl></div>';
	var html_body_start = '<div class="indent" id="db-doulist-section" style="padding-left:5px;padding-right:5px;padding-bottom:8px;border:1px #F0F3F5 solid;border-top:none;"><ul class="bs bdresult">';

	//var url='http://www.baidu.com/s?wd='+dck+'+site%3Apan.baidu.com';
	var url = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=filtered_cse&num=20&hl=en&prettyPrint=true&source=gcsc&gss=.com&sig=ee93f9aae9c9e9dba5eea831d506e69a&cx=018177143380893153305:yk0qpgydx_e&q='+dck;
	console.log(url);
	$.ajax({
		url:url,
		dataType: "json",
		success: function(data){
			console.log(data.results);
			var results = data.results;
			var pickNum = results.length > 5 ? 5 : results.length;
			var arrayNew = getRandomArrayElements(results, pickNum);
			for(var i = 0; i < pickNum; i ++){
				var content = arrayNew[i].contentNoFormatting;
				var tempTitle = arrayNew[i].titleNoFormatting.replace("|百度云网盘-分享无限制", "").replace("_免费高速下载", "").replace("|百度云网盘-分享无限制", "");//
				var tempURL = arrayNew[i].unescapedUrl;
				//搜索结果不为空时,加载显示...
				if (tempTitle != "") {
					$("ul.bdresult").append('<li><span class="badge badge-error">'+ (i+1) +'</span><a style="padding:2px;border-radius:3px;-webkit-transition:all .4s" class="outside" href='+tempURL+' target="_blank">' + tempTitle + '</li>');
					$("ul.bdresult").append('<li style="color:#AEAEAE">' + content + '</li>');
				} else if (tempTitle == "" && i == 1) {
					$("ul.bdresult").append('<li>哇哦~,可能是该资源过于冷门,什么都没找到呀...</li>');
					return;
				} else {
					$("ul.bdresult").append('<li style="text-align:center">未找到更多搜索结果</li>');
					return;
				}
			};
			
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
			//alert("请输入搜索关键字哦^_^");
			sweetAlert("Oops...", "请输入关键字哦~", "error");
		}else{
			//https://www.google.com/search?q=%E6%B6%88%E5%A4%B1%E7%9A%84%E7%88%B1%E4%BA%BA+site%3Apan.baidu.com
			//http://www.baidu.com/s?wd=' + queryWords + '+site:pan.baidu.com
			url_final = 'https://www.google.com/search?q='+ queryWords +'+site:pan.baidu.com';
			window.open(url_final);
		}
	}, false);

}
