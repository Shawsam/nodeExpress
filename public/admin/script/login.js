
$(document).ready(function(e) {

	$("input").keyup(function(e){
		if( e.which==13 )
			$(".btn_sub").trigger("click");
	});
	
	$(".btn_sub").on("click",function(){
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
		
		// 登录
	    var url="/api/admin/login?"+$(".loginFm").serialize();
		Ajax(url,function(ret){
			if( ret.state )
			{
				if($("#go_url").val()!=""){
				    window.location.replace($("#go_url").val());
				}else{
					window.location.replace("/admin/index");
				}
			}
			else
				layer.msg(ret.msg);
		});
		
	});
	
});

