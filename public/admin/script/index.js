$(function(){
    $("#main").css("min-height",$(window).height()-230+"px");//跳转默认的高度窗口

    $(".searchBox input").on("focus",function(){
        $(".searchBox").addClass("active");
    })

    $(".searchBox input").on("blur",function(){
        $(".searchBox").removeClass("active");
    })

    $(".optionList").on("click","li label",function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
})