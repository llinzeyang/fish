//大鱼
var momObj=function(){
  this.x;
  this.y;
  this.angle;

  this.momTailTimer=0;
  this.momTailCount=0;
  
  this.momEyeTimer=0;
  this.momEyeCount=0;
  this.momEyeInterval=1000;

  this.momBodyCount=0;
}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
}
momObj.prototype.draw=function(){
	this.x=lerpDistance(mx,this.x,0.98);//趋近目标值
	this.y=lerpDistance(my,this.y,0.98);
  //角度
  var deltaY=my-this.y;
  var deltaX=mx-this.x;
  var beta=Math.atan2(deltaY,deltaX)+Math.PI;
  //大鱼角度趋向鼠标角度
  this.angle=lerpAngle(beta,this.angle,0.6);
  //momTail
  this.momTailTimer+=deltaTime;
  if(this.momTailTimer>50){
  	this.momTailCount=(this.momTailCount+1)%8;
  	this.momTailTimer%=50;
  }
  //momEye
  this.momEyeTimer+=deltaTime;
  if(this.momEyeTimer>this.momEyeInterval){
  	this.momEyeCount=(this.momEyeCount+1)%2;
  	this.momEyeTimer%=this.momEyeInterval;
  	if(this.momEyeCount==0){
  		this.momEyeInterval=Math.random()*1500+2000;
  	}else{
  		this.momEyeInterval=200;
  	}
  }

	cxt1.save();
	cxt1.translate(this.x,this.y)
  cxt1.rotate(this.angle);
  var momTailCount=this.momTailCount;
  cxt1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
  var momBodyCount=mom.momBodyCount;
  if(data._double==1){
  	cxt1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
  }else{
  	cxt1.drawImage(momBodyBlue[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
  }
  
  var momEyeCount=this.momEyeCount;
  cxt1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);

  cxt1.restore();
}