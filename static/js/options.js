function closeWindow() {
    window.close();
}

function douyou() {
    window.open('http://www.douban.com/doumail/write?to=gangsta','newwindow','height=600,width=1000,top=20,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
}

function weibo() {
	var _url = "http://t.cn/z8XPRJh";
	var title = "灰常好用的Chrome浏览器扩展,可以通过Google搜索豆瓣条目在百度网盘的资源哦~";
    window.open('http://service.weibo.com/share/share.php?url=' + _url + '&title='+ title +'&type=button&language=zh_cn&appkey=Fptz1&searchPic=true&style=simple');
}

function github() {
	var _url = "https://github.com/Suxiaogang/doubanXbaidu";
    window.open(_url);
}

function toggleWechat(){
	$("#qr").slideToggle("normal");
}

function toggleUL() {
	$('.nav-tabs li').click(function() {
		var index = $(this).index();
		$('.nav-tabs').find("li").removeClass('active').addClass('off');
		$(this).removeClass('off').addClass('active');
	});
}

var doubanXbaiduData;

$(document).ready(function(){
	$(".close").click(closeWindow);
	$("#avatar").click(douyou);
	$("#weibo").click(weibo);
	$("#github").click(github);
	$("#toggleWechat").click(toggleWechat);//
	//切换显示
	toggleUL();
	var version = chrome.runtime.getManifest().version;
	$(".current_version").text(version);
	
	chrome.storage.local.get('dbEngine', function (result) {
        var dbe = result.dbEngine;
        if(dbe == undefined) {
        	chrome.storage.local.set({'dbEngine': 'Google'});
        } else {
        	$('input:radio[name="engine"][value='+dbe+']').prop("checked", true);
        }
    });
	
	$('.alipay').on('click', function () {
		event.preventDefault();
		swal({title: "", text: "请扫描支付宝二维码", imageUrl: "http://ww4.sinaimg.cn/large/5fd37818jw1eoyj39p6t5j207i07i3zb.jpg", imageSize: "280x280"});
	});
	
	$('.btn-primary').on('click', function () {
		var engine = $('input:radio[name="engine"]:checked').val();
		event.preventDefault();
		chrome.storage.local.set({'dbEngine': engine});
		swal({title: "", text:"您的设置已经保存!", type:"success", timer: 2500});
	});
	
	var $tab_li = $('.pill-tabs li');
	$tab_li.click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $tab_li.index(this);
		$('#send_email_feedback > div').eq(index).show().siblings().hide();
	});
	
});