//小鱼
var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	//this.babyEye=new Image();
	this.babyBody=new Image();
	//this.babyTail=new Image();

	this.babyTailTimer=0;
	this.babyTailCount=0;

	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;//眨眼时间

	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	//this.babyEye.src='img/babyEye0.png';
	//this.babyBody.src='img/babyFade0.png';
	//this.babyTail.src='img/babyTail0.png';
}
babyObj.prototype.draw=function(){
	this.x=lerpDistance(mom.x,this.x,0.98);//小鱼趋向大鱼坐标
	this.y=lerpDistance(mom.y,this.y,0.98);

	var deltaY=mom.y-this.y;
  var deltaX=mom.x-this.x;
  var beta=Math.atan2(deltaY,deltaX)+Math.PI;
  //小鱼角度趋向大鱼角度
  this.angle=lerpAngle(beta,this.angle,0.6);
  //babyTail
  this.babyTailTimer+=deltaTime;
  if(this.babyTailTimer>50){
  	this.babyTailCount=(this.babyTailCount+1)%8;//0~7循环
  	this.babyTailTimer%=50;
  }
  //babyEye
  this.babyEyeTimer+=deltaTime;
  if(this.babyEyeTimer>this.babyEyeInterval){
  	this.babyEyeCount=(this.babyEyeCount+1)%2;
  	this.babyEyeTimer%=this.babyEyeInterval;
  	if(this.babyEyeCount==0){
  		this.babyEyeInterval=Math.random()*1500+2000;
  	}else{
  		this.babyEyeInterval=200;
  	}
  }

  //babyBody
  this.babyBodyTimer+=deltaTime;
  if(this.babyBodyTimer>300){
  	this.babyBodyCount=this.babyBodyCount+1;
  	this.babyBodyTimer%=300;
  	if(this.babyBodyCount>19){
  		this.babyBodyCount=19;
  		//game over
  		data.gameOver=true;
  	}
  }
	cxt1.save();
	cxt1.translate(this.x,this.y);
	cxt1.rotate(this.angle);

	var babyTailCount=this.babyTailCount;
	cxt1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	var babyBodyCount=this.babyBodyCount;
	cxt1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	cxt1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
  cxt1.restore();
}