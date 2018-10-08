
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
	
	var endNum = NumberProc();
	var curNum = endNum-1;
	
	var Canvas = document.getElementById(elm);
	if( !Canvas ) return;
	var context = Canvas.getContext("2d");
	
	// 响应式处理
	PageProc();
	
	// 设置画布尺寸
	Canvas.width = CanvasWidth;
	Canvas.height = CanvasHeight;
	
	timer1 = setInterval(function(){
		ClockProc();
		console.log(balls.length);
	},100);
	
	timer2 = setInterval(function(){
		endNum = endNum<0?0:endNum;
		endNum--;
		//console.log("xxxx",endNum);
	},1000);
	
	// =============================================================================================

	function ClockProc()
	{
		var num11 = parseInt(endNum/100);
		var num12 = parseInt((endNum-num11*100)/10);
		var num13 = endNum%10;
		
		if( curNum!=endNum )
		{
			var num21 = parseInt(curNum/100);
			var num22 = parseInt((curNum-num21*100)/10);
			var num23 = curNum%10;
			
			if( num11!=num21 )
			{
				addBalls(context,CanvasLeft,CanvasTop,num11);
			}
			if( num12!=num22 )
			{
				addBalls(context,CanvasLeft+CanvasGrid*8,CanvasTop,num12);
			}
			if( num13!=num23 )
			{
				addBalls(context,CanvasLeft+CanvasGrid*16,CanvasTop,num13);
			}
			
			curNum = endNum;
		}
		
		context.clearRect(0,0,CanvasWidth,CanvasHeight);
		CanvasDrawing(context,CanvasLeft,CanvasTop,num11);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*8,CanvasTop,num12);
		CanvasDrawing(context,CanvasLeft+CanvasGrid*16,CanvasTop,num13);
		CanvasDrawing2(context);
	}

	function addBalls(cxt,x,y,num)
	{
		// 生成小球
		num = num>=0 && num<=9?num:0;
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
		cxt.fillStyle = "#f77";
		num = num>=0 && num<=10?num:0;
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
		
		if( balls.length<=0 )
		{
			clearInterval(timer1);
			clearInterval(timer2);
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
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/20*6/24-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/20*6/24-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*4;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/5;
				break;
			case CanvasWidth<=1024:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/20*4/24-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/20*4/24-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*6;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/5;
				break;
			case CanvasWidth<=1600:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/20*3/24-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/20*3/24-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*7;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/5;
				break;
			default:
				CanvasGap = typeof(opt.gap)!="undefined" ? parseInt(opt.gap) : 1;
				CanvasRadius = typeof(opt.radius)!="undefined" ? parseInt(opt.radius) : CanvasWidth/20*2/24-CanvasGap;
				CanvasGap = CanvasRadius>0?CanvasGap:1;
				CanvasRadius = CanvasRadius>0?CanvasRadius:CanvasWidth/20*2/24-CanvasGap;
				CanvasGrid = 2*(CanvasRadius+CanvasGap);
				CanvasLeft = typeof(opt.left)!="undefined" ? parseInt(opt.left) : CanvasWidth/20*8;
				CanvasTop = typeof(opt.top)!="undefined" ? parseInt(opt.top) : CanvasHeight/5;
		}
	}
	
	function NumberProc()
	{
		var num = opt.endNum || 999;
		num = num>999?999:num;
		num = num<0?0:num;
		return num;
	}
}
