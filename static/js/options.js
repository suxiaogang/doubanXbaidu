function closeWindow() {
    window.close();
}

function douyou() {
    window.open('http://www.douban.com/doumail/write?to=gangsta','newwindow','height=600,width=1000,top=20,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
}

function weibo() {
	var _url = "http://t.cn/z8XPRJh";
    window.open('http://service.weibo.com/share/share.php?appkey=3015934887&url=' + _url,'newwindow','height=600,width=500,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
}

function github() {
	var _url = "https://github.com/Suxiaogang/doubanXbaidu";
    window.open(_url);
}

function toggleWechat(){
	$("#qr").slideToggle("normal");
}

function toggleUL() {
	$('.nav-tabs li').click(
		function() {
			if ($(this).hasClass('off')) {
				$('.nav-tabs').find("li").removeClass('active').addClass('off');
				$(this).addClass('active');
				if($(this).text().trim() ==  '反馈'){
					$(".well").hide();
					$("#send_email_feedback_wrap").show();
				} else {
					$("#send_email_feedback_wrap").hide();
					$(".well").show();
				}//else
			}
		}
	);
}

$(document).ready(function(){
	$(".close").click(closeWindow);
	$("#avatar").click(douyou);
	$("#weibo").click(weibo);
	$("#github").click(github);
	$("#toggleWechat").click(toggleWechat);//
	//切换显示
	toggleUL();
});