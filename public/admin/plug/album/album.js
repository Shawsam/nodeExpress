// 依赖 : layer.js、laypage.js、AjaxGhost.web.1.0.5.js(+)、qn.web.1.1.4.js(+)

album_config = {};
album_config.cate_url = "/api/admin/album/categoryList";	// 相册分类请求地址
album_config.imgs_url = "/api/admin/album/list";			// 相册图片列表请求地址
album_config.upload_url = "/api/admin/album/imgUpload";		// 相册图片上传请求地址


$(function(){
	
	html  = '<!-- 相册面板 -->';
	html += '<div class="hide hhAlbum_contt">';
    html += '  ';
    html += '  <div class="hhAlbum_menu">';
    html += '  <ul>';
    html += '  <!--';
    html += '  <li data-id="1" class="active">默认分组</li>';
    html += '  <li data-id="12">分组 1</li>';
    html += '  <li data-id="13">分组 2</li>';
    html += '  <li data-id="14">分组 3</li>';
    html += '  -->';
    html += '  </ul>';
    html += '  </div>';
    html += '  <div class="hhAlbum_imgs">';
    html += '    <ul>';
    html += '    <!--';
    html += '    <li data-id="35" data-src="/pubilc/admin/img/a1.jpg" class="selected">';
    html += '      <div>';
    html += '      <img class="lazy" src="/public/admin/img/lazy_200x200.jpg" data-src="/pubilc/admin/img/a1.jpg" /><b></b>';
    html += '      </div>';
    html += '      <p>图片名称.jpg</p>';
    html += '    </li>';
    html += '    -->';
    html += '    </ul>';
    html += '    <p class="clear"></p>';
    html += '  </div>';
    html += '  ';
    html += '  <div class="hhAlbum_pages"></div>';
	html += '  <div class="hhAlbum_actions"><a class="hh_btn btn_upload">上传</a></div>';
    html += '  ';
    html += '  <div class="hhAlbum_footer">';
    html += '    <p class="hh_tip">提示</p>';
    html += '    <a class="hh_btn btn_sub">选择 <b>0</b> 张，确定</a>';
    html += '  </div>';
    html += '  ';
    html += '</div>';
    
	tpl1  = '<!-- 相册分组 -->';
    tpl1 += '<script type="text/html" id="tpl_album_menu">';
	tpl1 += '  {{# for(var i=0;i<d.length;i++){ }}';
	tpl1 += '    <li data-id="{{d[i].tag_id}}">{{d[i].tag_name}}<span>{{d[i].count}}</span></li>';
	tpl1 += '  {{# } }}';
	tpl1 += '</script>';
	
	tpl2  = '<!-- 相册图片 -->';
    tpl2 += '<script type="text/html" id="tpl_album_img">';
	tpl2 += '  {{# for(var i=0;i<d.length;i++){ }}';
	tpl2 += '    <li data-id="{{d[i].file_id}}" data-src="{{d[i].url}}" class="{{d[i].Class}}">';
    tpl2 += '      <div>';
    tpl2 += '        <img class="lazy" src="/public/admin/img/lazy_200x200.jpg" data-src="{{d[i].url}}?imageView2/1/w/200/h/200" /><b></b>';
	tpl2 += '        <p>{{d[i].attr_width+" x "+d[i].attr_heigth}}</p>';
    tpl2 += '      </div>';
    tpl2 += '      <p>{{d[i].file_name}}</p>';
    tpl2 += '      </div>';
    tpl2 += '    </li>';
	tpl2 += '  {{# } }}';
	tpl2 += '</script>';
	
	$("body").append(html);
	$("body").append(tpl1);
	$("body").append(tpl2);
	
});

function album(param)
{
	var body_w = $(window).width();
	var body_h = $(window).height();
	var panel_w = body_w>860?860:730;
	var panel_h = body_h>625?625:470;
	var cols = body_w>860?5:4;			// 图片列数
	var rows = body_h>625?3:2;			// 图片行数
	var size = cols * rows;				// 图片个数（15、10、12、8）
	
	var hhab_cate_url = param.cate_url || album_config.cate_url;
	var hhab_imgs_url = param.imgs_url || album_config.imgs_url;
	var hhab_upload_url = param.upload_url || album_config.upload_url;
	
	var max = param.max && parseInt(param.max)>0 ? parseInt(param.max) : 1;
	var multi_upload = max>1?true:false;
	var thumb_w = param.thumb_w && parseInt(param.thumb_w)>0 ? parseInt(param.thumb_w) : 150;
	var thumb_h = param.thumb_h && parseInt(param.thumb_h)>0 ? parseInt(param.thumb_h) : 150;
	var thumb_format = "?imageView2/1/w/"+thumb_w+"/h/"+thumb_h;
	
	var prefix = param.prefix ? param.prefix : "hhAlbum/";
	var success = param.success && typeof(param.success)=="function" ? param.success : function(){};
	
	layer.open({
		title:"我的相册",
		btn:false,
		shadeClose:true,
		skin:"hhAlbum_panel",
		area: [panel_w+'px',panel_h+'px'],
		content:$(".hhAlbum_contt").html(),
		success:function(layelm,idx){
			
			// 初始化
			var imgs_num = 0;    // 图片数量，用户选中或者取消操作都会改变这个值，用来判断用户选中的图片是否超过了最大值（max）
			var imgs_obj = {};   // 图片对象，用户选中的图片集合（img、thumb），最终返回给回调函数（success）
			var cate_imgs = {};  // 记录各个分类的图片数（可以转化为页数），目的为了分类的图片分页，当上传图片时，其数目会随之变动
			
			var menu_elm = layelm.find(".hhAlbum_menu");
			var imgs_elm = layelm.find(".hhAlbum_imgs");
			var page_elm = layelm.find(".hhAlbum_pages");
			var btns_elm = layelm.find(".hhAlbum_actions");
			var foot_elm = layelm.find(".hhAlbum_footer");
			var tips_elm = layelm.find(".hhAlbum_footer .hh_tip");
			var count_elm = layelm.find(".hhAlbum_footer .hh_btn b");
			
			menu_elm.height(panel_h-42-60);
			imgs_elm.height(panel_h-42-60-50);
			page_elm.attr({id:"pagination"});
			
			//分组初始化
			url = hhab_cate_url;
			AjaxGhost(url,function(ret){
				if( ret.state )
				{
					tpl = $("#tpl_album_menu").html();
					laytpl(tpl).render(ret.data,function(html){ menu_elm.find("ul").html(html); });
					ret.data.map(function(item,idx){ cate_imgs[item.tag_id] = item.count; });
					menu_elm.find("li:eq(0)").trigger("click");
				}
				else
					layer.msg(ret.msg);
			});

			
			// 分组事件
			var cid = 0;
			menu_elm.on("click","li",function(){
				
				// 样式切换
				tips_elm.hide();
				$(this).addClass("active").siblings().removeClass("active");
				
				// 加载分组图片
				cid = $(this).data("id");
				url = hhab_imgs_url+"?tag_id="+cid+"&pagesize="+size;
				AjaxGhost(url,function(ret){
					if( ret.state )
					{
						pages = Math.ceil(cate_imgs[cid]/size);
						laypage({
						    cont: 'pagination',
						    skin: 'molv',
						    //skip: true, //是否开启跳页
						    curr: 1, //初始化当前页
						    pages: pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
						    jump: function(e, first){ //触发分页后的回调
						        if(!first){ //一定要加此判断，否则初始时会无限刷新
						        	url = hhab_imgs_url+"?tag_id="+cid+"&pageNumber="+e.curr+"&pagesize="+size;
						        	AjaxGhost(url,function(ret){
						        		if( ret.state )
						        		{
						        			ret.data.forEach(function(item){
												item.Class = imgs_obj[item.file_id]?"selected":"";
											});
						        			
						        			// 图片加载
						    				tpl = $("#tpl_album_img").html();
						    				laytpl(tpl).render(ret.data,function(html){ imgs_elm.find("ul").html(html); });
						    				imgs_elm.removeClass("empty");
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
							page_elm.addClass("hide3");
						else
							page_elm.removeClass("hide3");
						
						// 图片加载
						ret.data.forEach(function(item){
							Console(item);
							item.Class = imgs_obj[item.file_id]?"selected":"";
						});
						tpl = $("#tpl_album_img").html();
						laytpl(tpl).render(ret.data,function(html){ imgs_elm.find("ul").html(html); });
						imgs_elm.removeClass("empty");
						$(".lazy").lazyload();
					}
					else
					{
						page_elm.addClass("hide3");
						imgs_elm.addClass("empty");
						imgs_elm.find("ul").html("");
					}
				});
			});
			
			// 选择图片
			imgs_elm.on("click","li",function(){
				
				var $this = $(this);
				var imgid = $this.data("id");
				
				if( max==1 )   // 选择单张
				{
					imgs_obj = {};
					if( !$this.is(".selected") )
					{
						btns_elm.hide();
						imgs_elm.find(".selected").removeClass("selected");
						$this.addClass("selected");
						imgs_num = 1;
						imgs_obj[imgid] = {
							img : $this.data("src"),
							thumb : $this.data("src")+thumb_format
						};
					}
					else
					{
						$this.removeClass("selected");
						btns_elm.show();
						imgs_num = 0;
					}
				}
				else   // 选择多张
				{
					if( !$this.is(".selected") )
					{
						if( imgs_num<max )
						{
							$this.addClass("selected");
							imgs_num += 1;
							imgs_obj[imgid] = {
								img:$this.data("src"),
								thumb:$this.data("src")+thumb_format
							};
							if( imgs_num==max ) btns_elm.hide();
						}
						else
						{
							tips_elm.text("最多只能选择 "+max+" 张图片").show().delay(1000).fadeOut(100);
						}
					}
					else
					{
						btns_elm.show();
						$this.removeClass("selected");
						delete(imgs_obj[imgid]);
						imgs_num -= 1;
					}
				}
				
				// 图片选择个数
				count_elm.text(imgs_num);
				
			});
			
			// 上传图片
			imgupload({
				elm : ".hhAlbum_panel .btn_upload",		// 标签，类名或 ID 不能重复
				prefix : prefix,
				fsize : 50,			// 图片大小限制（MB），默认 100MB
				rery : 3,			// 上传失败重试次数，默认 1
				thumb_w : thumb_w,
				thumb_h : thumb_h,
				multi : multi_upload,
				UploadProgress : function(){ btns_elm.find(".btn_upload").text("上传中"); },
				UploadComplete : function(){ btns_elm.find(".btn_upload").text("上传"); },
				FileUploaded : function(img,thumb,all){
					
					imgs_elm.find(".btn_upload").text("上传");
					
					url = hhab_upload_url;
					data = {tag_id:cid,filename:all.key,width:all.width,height:all.height};
					AjaxGhost(url,data,function(ret){
						if( ret.state )
						{
							if( imgs_num<=max-1 )
							{
								cate_imgs[cid] += 1;
								menu_elm.find(".active span").text(cate_imgs[cid]);
								imgs_obj[ret.data.file_id] = {
									img:img,
									thumb:thumb
								};
								
								imgs_num += 1;
								count_elm.text(imgs_num);
								menu_elm.find(".active").trigger("click");
								if( imgs_num==max ) imgs_elm.find(".btn_upload").hide();
							}
						}
						else
							tips_elm.text(ret.msg).show();
					});
					
				}
			});
			
			// 确定上传
			foot_elm.on("click",".hh_btn",function(){
				
				if( imgs_num==0 )
				{
					tips_elm.text("未选中任何图片！").show();
					setTimeout(function(){ tips_elm.hide(); },1000);
				}
				
				imgs_arr = [];
				for(key in imgs_obj)
				{
					imgs_arr.push(imgs_obj[key]);
				}
				Console(imgs_arr);
				Console(imgs_obj);
				
				success(imgs_arr);
				layer.closeAll();
				
			});
			
		}
	});
}
