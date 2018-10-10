
$(function(){
    page_debug();
    page_init();
});

// =============================================================================================== //

function page_init()
{
    var body_w=$(window).width();
    var body_h=$(window).height();
    
    // 主页介绍
    $("#home").backparallax("50%",0.4);
    $("#home .intro1").backparallax("50%",0.4);
    $("#home .intro2").backparallax("60%",-0.2);
    
    // 二维码
    $(".qrcode").each(function(){
        url = $(this).parent().data("href");
        url && $(this).qrcode(url);
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
    $("#home").css({minHeight:body_h});
    
    // ===========================================================================================================
    
    $("#home").removeAttr("class").addClass("wrap");
    
    switch(true)
    {
        case body_w <= 1024: $("#home").addClass("lt1024"); break;
        case body_w <= 1152: $("#home").addClass("lt1152"); break;
        case body_w <= 1280: $("#home").addClass("lt1280"); break;
        case body_w <= 1360: $("#home").addClass("lt1360"); break;
        case body_w <= 1440: $("#home").addClass("lt1440"); break;
        case body_w <= 1600: $("#home").addClass("lt1600"); break;
        case body_w > 1600 : $("#home").addClass("gt1600"); break;
    }
    
    // ===========================================================================================================
    
    $("#works_wx").removeAttr("class").addClass("wrap");
    $("#works_wx .content li").show();
    
    switch(true)
    {
        case body_w <= 1024: $("#works_wx").addClass("lt1024"); $("#works_wx .content li:gt(2)").hide(); break;
        case body_w <= 1152: $("#works_wx").addClass("lt1152"); $("#works_wx .content li:gt(2)").hide(); break;
        case body_w <= 1280: $("#works_wx").addClass("lt1280"); $("#works_wx .content li:gt(3)").hide(); break;
        case body_w <= 1360: $("#works_wx").addClass("lt1360"); $("#works_wx .content li:gt(3)").hide(); break;
        case body_w <= 1440: $("#works_wx").addClass("lt1440"); $("#works_wx .content li:gt(3)").hide(); break;
        case body_w <= 1600: $("#works_wx").addClass("lt1600"); $("#works_wx .content li:gt(3)").hide(); break;
        case body_w <= 1920: $("#works_wx").addClass("lt1920"); $("#works_wx .content li:gt(4)").hide(); break;
        case body_w > 1920 : $("#works_wx").addClass("gt1920"); $("#works_wx .content li:gt(4)").hide(); break;
    }
    
    // ===========================================================================================================
    
    $("#works_pg").removeAttr("class").addClass("wrap");
    
    switch(true)
    {
        case body_w <= 1024: $("#works_pg").addClass("lt1024"); break;
        case body_w <= 1152: $("#works_pg").addClass("lt1152"); break;
        case body_w <= 1280: $("#works_pg").addClass("lt1280"); break;
        case body_w <= 1360: $("#works_pg").addClass("lt1360"); break;
        case body_w <= 1440: $("#works_pg").addClass("lt1440"); break;
        case body_w <= 1600: $("#works_pg").addClass("lt1600"); break;
        case body_w <= 1920: $("#works_pg").addClass("lt1920"); break;
        case body_w > 1920 : $("#works_pg").addClass("gt1920"); break;
    }
    
    // ===========================================================================================================
    
    $("#member .content").removeAttr("class").addClass("content");
    
    switch(true)
    {
        case body_w <= 220*4+340: $("#member .content").addClass("grid3"); break;
        case body_w <= 220*5+340: $("#member .content").addClass("grid4"); break;
        case body_w <= 220*6+340: $("#member .content").addClass("grid5"); break;
    //  case body_w <= 220*7+340: $("#member .content").addClass("grid6"); break;
        default: $("#member .content").addClass("grid5"); 
    }
    
    // ===========================================================================================================
}

/*   
$(document).ready(function(){
 function get_android_version() {
        var ua = navigator.userAgent.toLowerCase();
        var version = null;
        if (ua.indexOf("android") > 0) {
            var reg = /android [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号4.2.2
            //version = parseInt(version.split('.')[0]);// 得到版本号第一位
        }

        return version;
    }

    alert(get_android_version())
    alert(window.navigator.userAgent)
})
*/