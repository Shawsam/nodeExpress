
$(document).ready(function(){
	page_debug();
	page_init();
});

// =============================================================================================== //

function page_init()
{
	// 二维码
	$(".qrcode").each(function(){
        url = $(this).parent().data("href");
		url && $(this).qrcode(url);
    });
	
	$(".cate li").click(function(){ 
        $(this).addClass("active").siblings().removeClass("active")
	});
	
	// 浏览器重置大小
	$(window).resize(function(){
		page_debug();
	});
}

function page_debug()
{
	var body_w=$(window).width();
	var body_h=$(window).height();
	
	$(".wrapper").css({paddingTop:body_h*0.5});
	$(".wrapper .content").css({minHeight:body_h*0.35});
	
	
	$("#member .mmlist > div:even").css({marginRight:"2%"});
}

