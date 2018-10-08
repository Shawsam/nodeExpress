
$(document).ready(function(){
	
	if( $(".Movies").length>0 ) Movies();
	if( $(".Animals").length>0 ) Animals();
	if( $(".Animation").length>0 ) Animation();
	
});

// =================================================================================================

function Movies()
{
	// 焦点卡片
	var MovieBanner = new Swiper(".swiper-container",{
		autoplay: 4000,
		slidesPerView: "auto",
		centeredSlides: true,
		spaceBetween: 5,
		autoplayDisableOnInteraction: false,
		pagination: ".swiper-pagination",
		paginationType: "fraction",
		preloadImages: false,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		//loop: true,
		onInit: function(swiper)
		{
			// 背景处理
			$(".blur_back").css({height:body_h*1.1,top:-head_h-body_h*0.05});
			
			// 获取滑块的宽度
			swiper.cur_width = $(".swiper-slide-active").width();
			
			// 平滑处理
			//$(".swiper-slide a").addClass("smooth_swiper");
		},
		onTouchMove: function(swiper,evt)
		{
			// 正常角度
			swiper.over_angle = false;
			
			// 当前滑块
			var dist = swiper.touches.currentX-swiper.touches.startX;
			var scale_size = 0.05*Math.abs(dist/(swiper.cur_width));
			var cur_scale = 1-(scale_size<0.05?scale_size:0.05);
			var cur_idx = swiper.realIndex;
			$(".swiper-slide").eq(cur_idx).find("a").css({webkitTransform:"scale("+cur_scale+")",mozTransform:"scale("+cur_scale+")",transform:"scale("+cur_scale+")"});
			
			// 旁边滑块
			if( cur_idx>0 && cur_idx<$(".swiper-slide").length-1 )
			{
				var side_idx = cur_idx+(dist>0?-1:1);
				var side_scale = 0.95+(scale_size<0.05?scale_size:0.05);
				$(".swiper-slide").eq(side_idx).find("a").css({webkitTransform:"scale("+side_scale+")",mozTransform:"scale("+side_scale+")",transform:"scale("+side_scale+")"});
			}
		},
		onTouchMoveOpposite: function(swiper)
		{
			// 超过角度
			swiper.over_angle = true;
		},
		onTouchEnd: function(swiper,evt)
		{
			// 角度检测
			if( !swiper.over_angle )
			{
				// 正常角度
				
				// 当前滑块
				var dist = swiper.touches.diff;
				var cur_idx = swiper.realIndex;
				var cur_scale = (cur_idx!=0 || cur_idx!=$(".swiper-slide").length-1)?0.95:1;
				$(".swiper-slide").eq(cur_idx).find("a").css({webkitTransform:"scale("+cur_scale+")",mozTransform:"scale("+cur_scale+")",transform:"scale("+cur_scale+")"});
				
				// 旁边滑块
				if( cur_idx>0 && cur_idx<$(".swiper-slide").length-1 )
				{
					var side_idx = cur_idx+(dist>0?-1:1);
					$(".swiper-slide").eq(side_idx).find("a").css({webkitTransform:"scale(1)",mozTransform:"scale(1)",transform:"scale(1)"});
				}
			}
			else
			{
				// 超过角度
				$(".swiper-slide a").css({webkitTransform:"scale(0.95)",mozTransform:"scale(0.95)",transform:"scale(0.95)"});
				$(".swiper-slide-active a").css({webkitTransform:"scale(1)",mozTransform:"scale(1)",transform:"scale(1)"});
			}
		},
		onTransitionStart: function(swiper)
		{
			// 改变背景
			var idx = swiper.realIndex;
			var img = $(".swiper-slide").eq(idx).find("img").attr("src");
			$("body,.blur_back").css({backgroundImage:"url("+img+")"});
			
			// 滑块切换
			$(".swiper-slide a").css({webkitTransform:"scale(0.95)",mozTransform:"scale(0.95)",transform:"scale(0.95)"});
			$(".swiper-slide-active a").css({webkitTransform:"scale(1)",mozTransform:"scale(1)",transform:"scale(1)"});
		}
	});
  
}

function Animals()
{
	// 焦点卡片
	var AnimalBanner = new Swiper(".swiper-container",{
		autoplay: 4000,
		slidesPerView: "auto",
		centeredSlides: true,
		spaceBetween: 15,
		autoplayDisableOnInteraction: false,
		pagination: ".swiper-pagination",
		paginationType: "fraction",
		preloadImages: false,
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		loop: true,
		onInit: function(swiper)
		{
			// 背景处理
			$(".blur_back").css({height:body_h*1.1,top:-head_h-body_h*0.05});
		},
		onTransitionStart: function(swiper)
		{
			// 改变背景
			var idx = swiper.realIndex;
			var img = $(".swiper-slide").eq(idx).find("img").attr("src");
			$("body,.blur_back").css({backgroundImage:"url("+img+")"});
		}
	});
  
}

function Animation()
{
	// 轮播图
	var Banner = new Swiper(".Banner",{
		loop: true,
		parallax: true,
		effect: "fade",
		fadeEffect: {crossFade:true},
		speed: 400,
//		autoplay: {
//			delay: 4000,
//			disableOnInteraction: false
//		},
		pagination: {
			el: ".Banner .swiper-pagination",
			clickable: true
		},
		navigation: {
			prevEl: ".Banner .swiper-button-prev",
			nextEl: ".Banner .swiper-button-next"
		}
	});
}
