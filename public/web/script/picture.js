$(".imgChoose").click(function(){
	album({
		max:1,
		thumb_w:100,
		thumb_h:70,
		success:function(imgs){
			$(".img-content img").attr("src",imgs[0].thumb);
			$(".img-content img").data("src",imgs[0].img);
			$(".js-image-container").addClass("hidden");
		    $(".img-content").removeClass("hidden");
		}
	});
})
