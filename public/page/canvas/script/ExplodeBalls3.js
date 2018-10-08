
function ExplodeCountdown(param)
{
	var opt = param || {};
	var elm = opt.elm;
	var CanvasWidth = opt.width || 1200;
	var CanvasHeight = opt.height || 850;
	var CanvasGap = 0;    // 倒计时小球间空隙的一半
	var CanvasRadius = 0; // 倒计时小球的半径
	var CanvasGrid = 0;   // 倒计时小球格子的长度（包括小球间隙）
	var CanvasLeft = 0;   // 倒计时与画布左侧的距离
	var CanvasTop = 0;    // 倒计时与画布上侧的距离
	
	var balls = [];
	var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
	
	var curTime = new Date();
	
	var Canvas = document.getElementById(elm);
	if( !Canvas ) return;
	var context = Canvas.getContext("2d");
	
	// 响应式处理
	PageProc();
	
	// 设置画布尺寸
	Canvas.width = CanvasWidth;
	Canvas.height = CanvasHeight;
	
	timer = setInterval(function(){
		ClockProc();
		//console.log(balls.length);
	},100);
	
	// =============================================================================================

	function ClockProc()
	{
		var nextTime = new Date();
		var hh2 = nextTime.getHours();
		var mm2 = nextTime.getMinutes();
		var ss2 = nextTime.getSeconds();
		
		var hh2n1 = parseInt(hh2/10);
		var hh2n2 = hh2%10;
		var mm2n1 = parseInt(mm2/10);
		var mm2n2 = mm2%10;
		var ss2n1 = parseInt(ss2/10);
		var ss2n2 = ss2%10;
		
		if( curTime!=nextTime )
		{
			var hh1 = curTime.getHours();
			var mm1 = curTime.getMinutes();
			var ss1 = curTime.getSeconds();
			
			if( hh2n1!=parseInt(hh1/10) )
			{
				addBalls(context,CanvasLeft,CanvasTop,hh2n1);
			}
			if( hh2n2!=hh1%10 )
			{
				addBalls(context,CanvasLeft+CanvasGrid*8,CanvasTop,hh2n2);
			}

			if( mm2n1!=parseInt(mm1/10) )
			{
				addBalls(context,CanvasLeft+CanvasGrid*21,CanvasTop,mm2n1);
			}
			if( mm2n2!=mm1%10 )
			{
				addBalls(context,CanvasLeft+CanvasGrid*29,CanvasTop,mm2n2);
			}

			if( ss2n1!=parseInt(ss1/10) )
			{
				addBalls(context,CanvasLeft+CanvasGrid*42,CanvasTop,ss2n1);
			}
			if( ss2n2!=ss1%10 )
			{
				addBalls(context,CanvasLeft+CanvasGrid*50,CanvasTop,ss2n2);
			}
			
			curTime = nextTime;
		}
		
		context.clearRect(0,0,CanvasWidth,CanvasHeight);
		CanvasDrawing(context,CanvasLeft,CanvasTop,hh2n1);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*8,CanvasTop,hh2n2);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*16,CanvasTop,10);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*21,CanvasTop,mm2n1);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*29,CanvasTop,mm2n2);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*37,CanvasTop,10);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*42,CanvasTop,ss2n1);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*50,CanvasTop,ss2n2);
		CanvasDrawing2(context);
	}

	function addBalls(cxt,x,y,num)
	{
		// 生成小球
		for(var i=0;i<digit[num].length;i++)
		{
			for(var j=0;j<digit[num][i].length;j++)
			{
				if( digit[num][i][j]==1 )
				{
					balls.push({
						x: x+CanvasGrid*(j+0.5),
						y: y+CanvasGrid*(i+0.5),
						r: CanvasRadius,
						g: 3.5*Math.random()+5,
						vx: Math.pow(-1,Math.ceil(Math.random()*10))*6,
						vy: -5,
						color: colors[Math.floor(Math.random()*colors.length)]
					});
				}
			}
		}
	}

	function CanvasDrawing(cxt,x,y,num)
	{
		// 时间1
		cxt.fillStyle = "#f77";
		for(var i=0;i<digit[num].length;i++)
		{
			for(var j=0;j<=digit[num][i].length;j++)
			{
				if( digit[num][i][j]==1 )
				{
					cxt.beginPath();
					cxt.arc(x+CanvasGrid*(j+0.5),y+CanvasGrid*(i+0.5),CanvasRadius,0,Math.PI*2);
					cxt.closePath();
					cxt.fill();
				}
			}
		}
	}

	function CanvasDrawing2(cxt)
	{
		// 小球运动
		for(var i=0;i<balls.length;i++)
		{
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;

			if( balls[i].y>=cxt.canvas.height-balls[i].r )
			{
				balls[i].y = context.canvas.height-balls[i].r;
				balls[i].vy = -balls[i].vy*0.5;
			}

			if( balls[i].x+balls[i].r<0 || balls[i].x-balls[i].r>CanvasWidth )
			{
				balls[i].x = balls[i].r;
				balls.splice(i,1);
			}

			if( balls.length<=0 ) clearInterval(timer);
			
//			if( balls[i].x<=balls[i].r )
//			{
//				balls[i].x = balls[i].r;
//				balls[i].vx = -balls[i].vx*1.5;
//			}
//
//			if( balls[i].x>=context.Canvas.width-balls[i].r )
//			{
//				balls[i].x = context.Canvas.width-balls[i].r;
//				balls[i].vx = -balls[i].vx*1.5;
//			}
		}

		// 炸裂小球
		for(var i=0;i<balls.length;i++)
		{
			cxt.fillStyle = balls[i].color;
			cxt.beginPath();
			cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2);
			cxt.closePath();
			cxt.fill();
		}
	}
	
	// =============================================================================================
	
	function PageProc()
	{
		switch(true)
		{
			case CanvasWidth<=500:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/10*8/116-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/10*8/116-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/10;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/10*3;
				break;
			case CanvasWidth<=1024:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/10*7/116-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/10*7/116-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*3;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/10*2;
				break;
			case CanvasWidth<=1600:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/10*6/116-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/10*6/116-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*4;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/10*2;
				break;
			default:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/10*5/116-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/10*5/116-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*5;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/10*2;
		}
	}
}
