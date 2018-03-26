//定义一个星星的类
var starObj = function(){
	this.x;
	this.y;

	this.picNo;
	this.timer;

	//添加x轴和y轴的速度
	this.xSpd;
	this.ySpd;
}
starObj.prototype.init =function(){
	// this.x=300;
	// this.y=400;
	//给随机位置
	this.x=Math.random()*600+100;  //Math.random()返回的是包含0不包含1[0,1) 的0到1
	this.y=Math.random()*300+150;
	//初始化序列号
	//this.picNo =0; //所有星星都同步的一闪一闪
	this.picNo = Math.floor(Math.random()*7); //[0,7)
	//初始化timer
	this.timer=0;
	//初始化x轴和y轴速度值
	// this.xSpd =Math.random()*3; [0,3)
	this.xSpd =Math.random()*3 - 1.5;//[-1.5,-.5)
	// this.ySpd =Math.random()*3;
	this.ySpd =Math.random()*3 - 1.5;//[-1.5,-.5)
}
starObj.prototype.updata=function(){
	//x和y在每一帧的时候速度都是变化的
	this.x +=this.xSpd *deltaTime*0.004;
	this.y +=this.ySpd *deltaTime*0.004;
	//星星超过画布范围，重生判断
	//this.x超过范围，重生init()
	if(this.x<100 ||this.x>700){
		this.init();
		return;  //跳出循环
	}
	//this.y超过范围，重生init()
	if(this.y<150 ||this.y>450){
		this.init();
		return;  //跳出循环
	}


	this.timer += deltaTime;
	if(this.timer>50){
		this.picNo += 1;
		this.picNo %= 6;
		this.timer = 0;
		// if(this.picNo>=7){
		// 	this.picNo=0;
		// }

	}
	
	
}
starObj.prototype.draw=function(){
	//save()  restore() 成对出现  让globalAlpha只在这区间出现

	ctx.save();
	//globalAlpha  全局透明度
	ctx.globalAlpha =life;
	// ctx.drawImage(starPic,this.x,this.y)
	//drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
	ctx.drawImage(starPic,this.picNo*7,0,7,7,this.x,this.y,7,7);

	ctx.restore();
}
//绘制一个星星
// function drawStar(){
// 	ctx.drawImage(starPic,300,400);
// }

//绘制很多个星星
function drawStars(){
	for(var i=0;i<num;i++){
		stars[i].updata();
		stars[i].draw();
	}
}
//星星显示或隐藏
function aliveUpdate(){
	if(switchy){   //in
		//show
		life +=0.03*deltaTime * 0.05;
		if(life>1){
			life =1;
		}
	}else{   //out
		//hide
		life -=0.03*deltaTime * 0.05;
		if(life<0){
			life=0;
		}
	}
}