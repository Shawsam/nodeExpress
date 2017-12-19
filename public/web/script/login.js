$(document).ready(function(){
    $(".form input").on("focus",function(){
        $(this).parents('.fm').addClass("focus");
    })
    $(".form input").on("blur",function(){
        $(this).parents('.fm').removeClass("focus");
    })

    $(".toRegister").on("click",function(){
        $("input").val('');
    	$(".registerFm").removeClass("hide");
    	$(".loginFm").addClass("hide");
        $(".infoPanel").addClass("hide");
    })

    $(".toLogin").on("click",function(){
        $("input").val('');
    	$(".loginFm").removeClass("hide");
    	$(".registerFm").addClass("hide");
        $(".infoPanel").addClass("hide");
    })

    //提交数据
    $(".loginBtn").on("click",function(){
        elm = $(".user");
        val = elm.val();
        if( val=="" )
        {
            layer.msg("请输入用户名",{anim:6},function(){ elm.val("").focus(); });
            return;
        }
        
        elm = $(".pswd");
        val = elm.val();
        if( val=="" )
        {
            layer.msg("请输入密码",{anim:6},function(){ elm.val("").focus(); });
            return;
        }

       var url="/api/login?"+$(".loginFm").serialize();
       Ajax(url,function(ret){
         if(ret.state){
            window.location.reload();
         }else{
            layer.msg(ret.msg);
         }       
       })
    })

    $(".registerBtn").on("click",function(){

        elm = $(".user");
        val = elm.val();
        if( val=="" )
        {
            layer.msg("请输入用户名",{anim:6},function(){ elm.val("").focus(); });
            return;
        }
        
        elm = $(".pswd");
        val = elm.val();
        if( val=="" )
        {
            layer.msg("请输入密码",{anim:6},function(){ elm.val("").focus(); });
            return;
        }

        elm = $(".repswd");
        val = elm.val();
        if( val=="" )
        {
            layer.msg("请再次输入密码",{anim:6},function(){ elm.val("").focus(); });
            return;
        }

       var url="/api/register?"+$(".registerFm").serialize();
       Ajax(url,function(ret){
         if(ret.state){
            layer.msg(ret.msg);
            setTimeout(function(){
                $(".toLogin").trigger("click")
            },500)
         }else{
            layer.msg(ret.msg);
         }
       })
    })

    $(".logoutBtn").on("click",function(){
       var url="/api/logout";
       Ajax(url,function(ret){
         if(ret.state){
            window.location.reload();
         }else{
            layer.msg(ret.msg);
         }
       })
    })

})