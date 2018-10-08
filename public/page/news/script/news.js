
$(document).ready(function(){
	
	if( $(".news_list").length>0 ) news_list();
	if( $(".news_detail").length>0 ) news_detail();
	
});

// =================================================================================================

function news_list()
{
	var vm = new Vue({
		el: ".framepage",
		data: {
			Cate: {
				items: [],
				active: ""
			},
			Banner: {
				items: [],
				swiper: ""
			},
			List: []
		},
		mounted: function()
		{
			// 初始化
			this.CateInit();
			 
			// 加载更多
			this.PullToLoad();
		},
		methods: {
			// 分类初始化
			CateInit: function()
			{
				url = "http://pub.houheaven.com/api/news/news_cate_list.php";
				Ajax(url,function(ret){
					if( ret.state )
					{
						// 加载菜单
						vm.Cate.items = [{name:"全部",id:0}].concat(ret.data);
						vm.CateProc(vm.Cate.items[0]);
						
						// 菜单滑动
						var Cate = new Swiper(".topbar",{
							spaceBetween: 0,
							slidesPerView: "auto",
							freeMode: true
						});
					}
				});
			},
			// 分类的点击
			CateProc: function(cate)
			{
				var cid = cate.id;
				vm.Cate.active = cid;
				vm.BannerInit();
				vm.NewsInit(cid);
			},
			// 轮播图初始化
			BannerInit: function()
			{
				// 分类不是“全部”，直接返回
				if( vm.Cate.active!=0 ) return;
				
				// 轮播图已加载，重新计算，然后自动播放
				if( vm.Banner.swiper!="" )
				{
					// Vue 与 js 渲染冲突
					setTimeout(function(){
						vm.Banner.swiper.startAutoplay();
						vm.Banner.swiper.reLoop();
					},0);
					return;
				}
				
				url = "http://pub.houheaven.com/api/news/news_top_list.php";
				Ajax(url,function(ret){
					if( ret.state )
					{
						for(var i=0;i<ret.data.length;i++)
						{
							ret.data[i].image += "?imageView2/1/w/400/h/200";
							ret.data[i].url = "news_detail.html?id="+ret.data[i].id;
						}
						vm.Banner.items = ret.data;
						
						// 图片滑动
						setTimeout(function(){
							vm.Banner.swiper = new Swiper(".banner",{
								loop: true,
								autoplay: 4000,
								autoplayDisableOnInteraction: false,
								pagination: ".p1",
								preloadImages: false,
								lazyLoading: true,
								lazyLoadingInPrevNext: true
							});
						},50);
					}
				});
			},
			// 新闻列表初始化
			NewsInit: function(cid)
			{
				url = "http://pub.houheaven.com/api/news/news_list.php";
				param = {cate:cid};
				Ajax(url,param,function(ret){
					if( ret.state )
					{
						vm.List = ret.data;
						pullToLoad.start();
					}
					else
					{
						vm.List = [];
						pullToLoad.stop();
					}
				});
			},
			// 上拉加载
			PullToLoad: function()
			{
				url = "http://pub.houheaven.com/api/news/news_list.php";
				param = {cate:this.Cate.active,page:1};
				pullToLoad(url,param,function(data){
					vm.List = vm.List.concat(data);
				});
			}
		},
		computed: {
			NewsList: function()
			{
				var list = this.List;
				for(var i=0;i<list.length;i++)
				{
					list[i].image += "?imageView2/1/w/170/h/140";
					list[i].url = "news_detail.html?id="+list[i].id;
					list[i].date = hhdate.fromNow(list[i].created);
				}
				
				setTimeout(function(){ $(".lazy").lazyload(); },50);
				return list;
			}
		}
	});
}

function news_detail()
{
	var vm = new Vue({
		el: ".framepage",
		data: {
			nid: hhStr.getQueryValue("id"),
			uid: localdata.get("userinfo").id,
			title: "",
			cover: "",
			content: "",
			infos: "",
			comment_num: 0,
			comment_txt: "",
			favor_num: 0,
			favor_state: false
		},
		mounted: function()
		{
			// 初始化
			this.Init();
			
			// 头部处理
			if( hhStr.getQueryValue("from")=="share" )
			{
				$(".hd-return").hide();
				$(".hd-title").removeClass("hide");
			}
			
			// 查看评论
			$(".comments").attr({"href":$(".comments").data("href")+"?nid="+this.nid});
		},
		methods: {
			// 初始化
			Init: function()
			{
				url = "http://pub.houheaven.com/api/news/news_detail.php";
				param = {nid:this.nid,uid:this.uid};
				Ajax(url,param,function(ret){
					if( ret.state )
					{
						news = ret.data;
						vm.title = news.title;
						vm.cover = news.image?news.image+"?imageView2/1/w/500/h/250":"";
						vm.content = news.content;
						vm.infos = "<span>"+hhdate.fromNow(news.created)+"</span><span>作者："+news.author+"</span><span>阅读："+news.view+"</span>";
						vm.comment_num = news.comment_num;
						vm.favor_num = news.favor_num;
						vm.favor_state = news.is_favor;
					}
				});
			},
			// 收藏
			Favor: function()
			{
				url = "http://pub.houheaven.com/api/news/news_favor.php";
				param = {nid:vm.nid,uid:vm.uid};
				Ajax(url,param,function(ret){
					if( ret.state )
					{
						vm.favor_state = true;
						vm.favor_num++;
						layer.msg("收藏成功");
					}
					else
					{
						vm.favor_state = false;
						vm.favor_num--;
						layer.msg("取消收藏");
					}
				});
			},
			// 分享
			Share: function()
			{
				hhPanel.wxhelp({
					img: "http://pub.houheaven.com/hhframe_mob/image/wx_share_tip.png",
					shade: 0.6,
					blur: 2
				});
			},
			// 添加评论
			CommentAdd: function()
			{
				// 是否登录
				user = localdata.get("userinfo");
				if( !user )
				{
					layer.confirm("您未登录，是否登录一个临时账号？",function(){
						location.href = "index.html";
					});
					return;
				}
				
				// 评论内容检测
				if( vm.comment_txt=="" )
				{
					return;
				}
				
				url = "http://pub.houheaven.com/api/news/news_comment_add.php";
				param = {nid:vm.nid,uid:vm.uid,content:vm.comment_txt,pid:"",rid:""};
				Ajax(url,param,function(ret){
					if( ret.state )
					{
						vm.comment_txt = "";
						vm.comment_num = ret.data.comment_num;
						layer.msg("评论成功");
					}
					else
						layer.msg(ret.msg);
				});
			}
		}
	});
	
	
	
	// 添加新评论
	$(".comment_wrap input").keyup(function(evt){
		if( vm.comment_txt!="" )
			$(this).next().addClass("active");
		else
			$(this).next().removeClass("active");
		
		if( evt.which==13 )
		{
			vm.CommentAdd();
		}
	});
	
	$(".comment_wrap input").focus(function(){
		$(".footer").addClass("focus");
		$(this).next().addClass(vm.comment_txt!=""?"active":"");
	});
	
	$(".comment_wrap input").blur(function(){
		setTimeout(function(){
			$(".footer").removeClass("focus");
		},50);
	});
	
}


