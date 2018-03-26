var can;
var ctx;
var girlPic = new Image();
var starPic = new Image();
var num =60;
var stars=[];
var lastTime;//上一个刷新的时间
var deltaTime;//当前帧刷新的时间和上一个刷新时间的间隔
var life =0; //鼠标划入最亮，鼠标划出为0

//鼠标做记号(监测是否在图片范围内)
var switchy =false;



function init(){
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");     //2d场景

	w=can.width;
	h=can.height;

	//添加一个鼠标监听事件
	document.addEventListener("mousemove",mousemove,false);

	girlPic.src="src/girl.jpg";
	starPic.src="src/star.png";

	for(var i=0;i<num;i++){
		var obj=new starObj();
		stars.push(obj);
		stars[i].init();
	}

	lastTime =Date.now();  //获取当前时间

	gameloop();
}

document.body.onload=init;

//序列帧  一帧一帧的渲染，每隔一段时间刷新canvas使里面的东西动起来
function gameloop(){
	//循环调用
	window.requestAnimFrame(gameloop); //requestAnimFrame需要适配，已经封装好在js中
	
	var now =Date.now();
	deltaTime=now-lastTime;
	lastTime=now;


	drawBackground();
	drawGirl();
	drawStars();
	aliveUpdate()
}

//绘制背景
function drawBackground(){
	//填充颜色
	ctx.fillStyle ="#393550";  
	ctx.fillRect(0,0,w,h);
}

//绘制图片
function drawGirl(){
	//drawImage(img,x,y,width,height)
	//x轴坐标正方向向右，y轴是向下(0,0)在canvas的左上角
	ctx.drawImage(girlPic,100,150,600,300);
}

function mousemove(e){
	if(e.offsetX || e.layerX){
		var px = e.offsetX == undefined? e.layerX:e.offsetX;
		var py =e.offsetY == undefined?e.layerY:e.offsetY;

		//out  switchy=false;   in  switchy=true;
		//px在范围内并且py也在范围内
		if(px>100&&px<700 &&py>150&&py<450){
			switchy =true;
		}else{
			switchy=false;
		}
		
	}
}