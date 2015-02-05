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
	
	$('.donate').on('click', function () {
		event.preventDefault();
		swal({title: "", text: "扫描支付宝向开发者赞助一点小心意", imageUrl: "http://ww4.sinaimg.cn/large/5fd37818jw1eoyj39p6t5j207i07i3zb.jpg", imageSize: "180x180"});
	});
	
});