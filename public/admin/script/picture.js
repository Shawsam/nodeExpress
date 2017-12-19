
$(function(){

    var tpl1 = '<script type="text/html" id="tpl_menu">';
	    tpl1 += '{{# for(var i=0;i<d.length;i++){ }}';
		    tpl1 += '{{# if(i==0){ }}';
		    tpl1 +=    '<li data-id="{{d[i].tag_id}}" class="cate{{d[i].tag_id}}">';
		    tpl1 +=      '<span>{{d[i].tag_name}}</span><i class="num"> ({{d[i].count}})</i>';
		    tpl1 +=    '</li>';
	        tpl1 += '{{# } }}';
	        tpl1 += '{{# if(i!=0) { }}';
		    tpl1 +=    '<li data-id="{{d[i].tag_id}}" class="cate{{d[i].tag_id}}">';
		    tpl1 +=      '<span>{{d[i].tag_name}}</span><i class="num"> ({{d[i].count}})</i>';
		    tpl1 +=      '<img class="btn_edit" src="/public/admin/img/btn_edit.png" />';
		    tpl1 +=      '<img class="btn_del" src="/public/admin/img/btn_delete.png" />';
		    tpl1 +=    '</li>';
		    tpl1 +=  '{{# } }}';
	    tpl1 +=  '{{# } }}';
	    tpl1 +=  '<li><a class="btn_create">+ 创建</a></li>';
	    tpl1 +='</script>';
    
    var tpl2 = '<script type="text/html" id="tpl_menu2">';
		tpl2 +=	      '<li data-id="{{d.tag_id}}" class="cate{{d.tag_id}}">';
		tpl2 +=	        '<span>{{d.tag_name}}<i class="num">({{d.count}})</i></span>';
		tpl2 +=	        '<img class="btn_edit" src="/public/admin/img/btn_edit.png" />';
		tpl2 +=	        '<img class="btn_del" src="/public/admin/img/btn_delete.png" />';
		tpl2 +=	      '</li>';
		tpl2 +=	'</script>';
    
    var tpl3 = '<script type="text/html" id="tpl_img">';
		tpl3 +=     '{{# for(var i=0;i<d.length;i++){ }}';
		tpl3 +=       '<li data-id="{{d[i].file_id}}">';
		tpl3 +=         '<div>';
		tpl3 +=         '<a class="fancybox" href="{{d[i].url}}" title="{{d[i].file_name}}">';
		tpl3 +=         '<img class="lazy" src="/public/admin/img/lazy_200x200.jpg" data-src="{{d[i].url}}?imageView2/1/w/200/h/200" />';
		tpl3 +=         '<p>{{d[i].attr_width+" x "+d[i].attr_heigth}}</p>';
		tpl3 +=         '</a>';
		tpl3 +=         '<label class="btn_select"><input type="checkbox" /><span>{{d[i].file_name}}</span></label>';
		tpl3 +=         '<div class="btns">';
		tpl3 +=         '<a href="javascript:;" class="btn_link">链接</a>';
		tpl3 +=         '<a href="javascript:;" class="btn_group">分组</a>';
		tpl3 +=         '<a href="javascript:;" class="btn_delete">删除</a>';
		tpl3 +=         '</div>';
		tpl3 +=         '</div>';
		tpl3 +=       '</li>';
	 	tpl3 +=     '{{# } }}';
        tpl3 += '</script>';

	$("body").append(tpl1);
	$("body").append(tpl2);
	$("body").append(tpl3);


	// 页面初始化
	body_h = $(window).height();
	$(".menu").css({minHeight:body_h-130});
	$(".imgs").css({minHeight:body_h-235});
	
	// 分组初始化
	size = 20;
	Pages = {};  // 记录各个分组的图片数（可以转化为页数），目的为了分组图片分页，当分组操作（添加、删除、修改）、图片操作（上传、删除、修改分组）时，Pages 会随之变动
	Cates = {};  // 记录各个分组的分组名，目的为了在修改图片分组时，提供分组内容，当分组操作（添加、删除、修改）时，Cates 会随之变动
	$(PageInit=function(){
		// url = "/public/admin/json/album_cate_list.json";
		url = "/api/admin/album/categoryList";
		Ajax(url,function(ret){
			if( ret.state )
			{
				Cates = {};  // 防止删除分组之后，Cates 对象残留
				tpl = $("#tpl_menu").html();
				laytpl(tpl).render(ret.data,function(html){ $(".menu ul").html(html); });
				ret.data.map(function(item,idx){
					Cates[item.tag_id] = item.tag_name;
					Pages[item.tag_id] = item.count;
				});
				
				$(".menu li:eq(0)").trigger("click");
			}
			else
				layer.msg(ret.msg);
		});
	});
	
	// 分组事件
	var cid = 0;
	$(".menu").on("click","li",function(){
		
		// 创建按钮拦截、样式切换
		if( $(this).index()==$(this).siblings().length ) return;
		$(this).addClass("active").siblings().removeClass("active");
		
		// 重置操作栏
		$(".actionsGp .btn_select input").prop({checked:false});
		$(".actionsGp .btn_group").addClass("disable");
		$(".actionsGp .btn_delete").addClass("disable");
		
		// 加载分组图片
		cid = $(this).data("id");
		// rand = Math.floor(Math.random()*4);		// 调试用
		// url = "/public/admin/json/album_img"+rand+".json";
		url = "/api/admin/album/list?tag_id="+cid+"&pagesize="+size;
		Ajax(url,function(ret){
			if( ret.state )
			{
				pages = Math.ceil(Pages[cid]/size);
				laypage({
				    cont: 'pagination',
				    skin: 'molv',
				    //skip: true, //是否开启跳页
				    curr: 1, //初始化当前页
				    pages: pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
				    jump: function(e, first){ //触发分页后的回调
				        if(!first){ //一定要加此判断，否则初始时会无限刷新
				        	url = "/api/admin/album/list?tag_id="+cid+"&pageNumber="+e.curr+"&pagesize="+size;
				        	Ajax(url,function(ret){
				        		if( ret.state )
				        		{
				        			// 重置操作栏
				        			$(".actionsGp .btn_select input").prop({checked:false});
				        			$(".actionsGp .btn_group").addClass("disable");
				        			$(".actionsGp .btn_delete").addClass("disable");			        		

				        			// 图片加载
				    				tpl = $("#tpl_img").html();
				    				laytpl(tpl).render(ret.data,function(html){ $(".imgs ul").html(html); });
				    				$(".imgs").removeClass("empty");
				    				$(".lazy").lazyload();
				        		}
				        		else
				        			layer.msg(ret.msg);
				        	});
				        }
				    }
				});
				
				// 分页处理
				if( pages==1 )
					$("#pagination").addClass("hide2");
				else
					$("#pagination").removeClass("hide2");
				
                //数量
                $(".menu li.active").find(".num").text('('+ret.data.length+')')

				// 图片加载
				tpl = $("#tpl_img").html();
				laytpl(tpl).render(ret.data,function(html){ $(".imgs ul").html(html); });
				$(".imgs").removeClass("empty");
				$(".lazy").lazyload();


			}
			else
			{
				$("#pagination").addClass("hide2");
				$(".imgs").addClass("empty");
				$(".imgs ul").html("");
				// layer.msg(ret.msg);
			}
		});
	});
	
	// 创建分组
	$(".menu").on("click",".btn_create",function(){
		btn = $(this).parent();
		layer.prompt({
			title:"创建分组",
			yes:function(idx,elm){
				val = elm.find("input").val();
				// url = "/public/admin/json/album_cate_add.json";
				url = "/api/admin/album/categoryList/add?tag_name="+val;
				Ajax(url,function(ret){
					if( ret.state )
					{
						tpl = $("#tpl_menu2").html();
						laytpl(tpl).render(ret.data,function(html){ btn.before(html); });
						btn.prev().trigger("click");
						Pages[ret.data.tag_id] = 0;
						Cates[ret.data.tag_id] = ret.data.tag_name;
					}
					else
						layer.msg(ret.msg);
				});
			}
		});
	});
	
	// 修改分组名称
	$(".menu").on("click",".btn_edit",function(evt){
		evt.stopPropagation();
		btn = $(this).parent();
		layer.prompt({
			title:"修改分组",
			value:btn.find("span").text(),
			yes:function(idx,elm){
				tag_id = btn.data("id");
				val = elm.find("input").val();
				//url = "/public/admin/json/proc.json";
				url = "/api/admin/album/categoryList/changeName?tag_id="+tag_id+"&tag_name="+val;
				Ajax(url,function(ret){
					if( ret.state )
					{
						layer.closeAll();
						Cates[tag_id] = val;
						btn.find("span").text(val);
					}
					else
						layer.msg(ret.msg);
				});
			}
		});
	});
	
	// 删除分组
	$(".menu").on("click",".btn_del",function(evt){
		evt.stopPropagation();
		btn = $(this);
		cate_id = btn.parent().data("id");
		cate_name = btn.siblings("span").text();
		layer.confirm("<br>删除全部：分组与分组图片一并删除<br>仅删除分组：分组删除，图片移动到 <b>默认分组</b><br><br>",{
			title:"删除分组："+cate_name,
			btn:["删除全部","仅删除分组","取消"],
			btn1:function(){
				// 删除全部
				// url = "/public/admin/json/proc.json";
				url = "/api/admin/album/categoryList/del_tag?tag_id="+cate_id+"&type=1";
				Ajax(url,function(ret){
					if( ret.state )
						PageInit();
					else
						layer.msg(ret.msg);
				});
			},
			btn2:function(){
				// 删除全部
				//url = "/public/admin/json/proc.json";
				url = "/api/admin/album/categoryList/del_tag?tag_id="+cate_id+"&type=2";
				Ajax(url,function(ret){
					if( ret.state )
						PageInit();
					else
						layer.msg(ret.msg);
				});
			},
			btn3:function(){
				// 取消
				layer.closeAll();
			}
		});
	});
	
	// =====================================================================================================
	
	// 选择全部
	$(".actionsGp .btn_select input").change(function(){
		check = $(this).prop("checked");
		if( check )
		{
			$(".actionsGp .btn_group").removeClass("disable");
			$(".actionsGp .btn_delete").removeClass("disable");
			$(".imgs li input").prop({checked:true});
			$(".imgs li").addClass("selected");
		}
		else
		{
			$(".actionsGp .btn_group").addClass("disable");
			$(".actionsGp .btn_delete").addClass("disable");
			$(".imgs li input").prop({checked:false});
			$(".imgs li").removeClass("selected");
		}
	});
	
	// 批量分组
	$(".actionsGp .btn_group").click(function(){
		
		// 未选中任何图片
		check = $(this).is(".disable");
		if( check ) return;
		
		// 处理选中的图片
		layer.open({
			title:"修改分组",
			btn:["取消","确定"],
			skin:"group_panel",
			content:$(".group_contt").html(),
			success:function(layelm){
				for(item in Cates)
				{
					if( item!=cid )
					{
						layelm.find("select").append("<option value='"+item+"'>"+Cates[item]+"</option>");
					}
				}
			},
			yes:function(idx,layelm){
				
				// 分组不能不选
				elm = layelm.find("select");
				val = elm.val();
				if( val=="" )
				{
					elm.css({borderColor:"#f66"});
					setTimeout(function(){ elm.focus().css({borderColor:"#ccc"}); },1000);
					return;
				}
				
				// 收集选中图片
				files = [];
				items = $(".imgs li.selected");
				items.each(function(){
					files.push($(this).data("id"));
				});

				// 修改分组、跳到分组
				url = "/api/admin/album/list/imgMove?tag_id="+val+"&file_id="+files.join(",");
				Ajax(url,function(ret){
					if( ret.state )
					{
						layer.closeAll();
						Pages[cid] -= items.length;
						Pages[val] += items.length;
						//数量
                        $(".menu li.active").find(".num").text('('+Pages[cid]+')')

						$(".menu .cate"+val).trigger("click");
					}
					else
						layer.msg(ret.msg);
				});
				
			}
		});
		
	});
	
	// 批量删除
	$(".actionsGp .btn_delete").click(function(){
		
		// 未选中任何图片
		check = $(this).is(".disable");
		if( check ) return;
		
		// 处理选中的图片
		layer.confirm("此操作不可撤销，确定要删除吗？",{
			title:"删除图片",
			yes:function(){
				
				files = [];
				items = $(".imgs li.selected");
				items.each(function(){
					files.push($(this).data("id"));
				});
				
				url = "/api/admin/album/list/imgDel?file_id="+files.join(",");
				Ajax(url,function(ret){
					if( ret.state )
					{
						// 删除选中图片
						items.remove();
						Pages[cid] -= items.length;
						//数量
                        $(".menu li.active").find(".num").text('('+Pages[cid]+')')

						if( $(".imgs li").length==0 )
						{
							// 如果当前不是第一页，删除当前页全部图片后，显示第一页图片
							// 如果当前就是第一页，删除当前页全部图片后，显示没有图片
							if( Pages[cid]>=size )
								$(".menu .active").trigger("click");
							else
								$(".imgs").addClass("empty");
						}
						layer.closeAll();
					}
					else
						layer.msg(ret.msg);
				});
			}
		});
		
	});
	
	// =====================================================================================================
	
	// 上传图片
	imgupload({
		elm : ".actionsGp .btn_upload",		// 标签，类名或 ID 不能重复
		thumb_w : 300,		// 返回缩略图的宽度
		thumb_h : 300,		// 返回缩略图的高度
		multi : true,		// 上传多张
		fsize : 50,			// 图片大小限制（MB），默认 100MB
		rery : 3,			// 上传失败重试次数，默认 1
		FileUploaded : function(img,thumb,all){
			url = "/api/admin/ablum/imgUpload";
			data = {tag_id:cid,filename:all.key,width:all.width,height:all.height};
			Ajax(url,data,function(ret){
				if( ret.state )
				{
					Pages[cid] += 1;
					$(".menu .active").trigger("click");
					tpl = $("#tpl_img").html();
					laytpl(tpl).render([ret.data],function(html){ $(".imgs ul").prepend(html); });
					$(".imgs").removeClass("empty");
					$(".lazy").lazyload();
				}
				else
					layer.msg(ret.msg);
			});
			
		}
	});
	
	// 查看大图
	$(".fancybox").fancybox({
		padding:8,
		openEffect:"none",
		closeEffect:"none"
	});
	
	// 选择图片
	$(".imgs").on("click",".btn_select span",function(evt){
		evt.stopPropagation();
	});
	$(".imgs").on("click",".btn_select",function(evt){
		
		// 迷之 Bug ：当各个图片的选择框快速切换点击时，toggleClass 失效
		// 使用 is(".selected")方法替换，还是会出现此问题，但是一般不用担心，
		// 你真的需要非常快的速度不断来回点击才会出现此 bug，点慢点咯 ~
		$(this).parents("li").toggleClass("selected");
		
		// 控制 "全选"
		items_all = $(".imgs li").length;
		items_sel = $(".imgs li.selected").length;
		if( items_sel == items_all )
			$(".actionsGp .btn_select input").prop({checked:true});
		else
			$(".actionsGp .btn_select input").prop({checked:false});

		// 控制 "修改分组"、"删除"
		if( items_sel == 0 )
		{
			$(".actionsGp .btn_group").addClass("disable");
			$(".actionsGp .btn_delete").addClass("disable");
		}
		else
		{
			$(".actionsGp .btn_group").removeClass("disable");
			$(".actionsGp .btn_delete").removeClass("disable");
		}
		
	});
	
	// 查看链接
	$(".imgs").on("click",".btn_link",function(){
		url = $(this).parent().siblings("a").attr("href");
		layer.alert(url,{title:"图片链接"});
	});
	
	// 设置分组
	$(".imgs").on("click",".btn_group",function(){
		
		fid = $(this).parents("li").data("id");
		
		layer.open({
			title:"修改分组",
			btn:["取消","确定"],
			skin:"group_panel",
			content:$(".group_contt").html(),
			success:function(layelm){
				for(item in Cates)
				{
					if( item!=cid )
					{
						layelm.find("select").append("<option value='"+item+"'>"+Cates[item]+"</option>");
					}
				}
			},
			yes:function(idx,layelm){
				
				elm = layelm.find("select");
				val = elm.val();
				if( val=="" )
				{
					elm.css({borderColor:"#f66"});
					setTimeout(function(){ elm.focus().css({borderColor:"#ccc"}); },1000);
					return;
				}
				
				url = "/api/admin/album/list/imgMove?tag_id="+val+"&file_id="+fid;
				Ajax(url,function(ret){
					if( ret.state )
					{
						layer.closeAll();
						Pages[cid] -= 1;
						Pages[val] += 1;
						//数量
                        $(".menu li.active").find(".num").text('('+Pages[cid]+')')
						$(".menu .cate"+val).trigger("click");
					}
					else
						layer.msg(ret.msg);
				});
				
			}
		});
	});
	
	// 删除图片
	$(".imgs").on("click",".btn_delete",function(){
		elm = $(this).parents("li");
		file_id = elm.data("id");
		file_name = elm.find("span").text();
		layer.confirm("确认要删除 <b>"+file_name+"</b> 吗？",{
			title:"删除图片",
			yes:function(){
				url = "/api/admin/album/list/imgDel?file_id="+file_id;
				Ajax(url,function(ret){
					if( ret.state )
					{
						elm.remove();
						Pages[cid] -= 1;
						//数量
                        $(".menu li.active").find(".num").text('('+Pages[cid]+')')
						if( $(".imgs li").length==0 )
						{
							if( Pages[cid]>=size )
								$(".menu .active").trigger("click");
							else
								$(".imgs").addClass("empty");
						}
						layer.closeAll();
					}
					else
						layer.msg(ret.msg);
				});
			}
		});
	});
	
});

