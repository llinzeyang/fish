//海葵
var aneObj=function(){
  this.rootx=[];
  this.headx=[];
  this.heady=[];
  this.amp=[];//摆动幅度
  this.alpha=0;
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
  for(var i=0;i<this.num;i++){
  	this.rootx[i]=i*16+Math.random()*20;
  	this.headx[i]=this.rootx[i];
  	this.heady[i]=canHeight-250+Math.random()*50;
  	this.amp[i]=Math.random()*50+50;
  }
}

//绘制
aneObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);//l=-1~1
	cxt2.save();
	cxt2.globalAlpha=0.6;
	cxt2.lineWidth=20;
	cxt2.lineCap='round';
	cxt2.strokeStyle='#3b154e';
  for(var i=0;i<this.num;i++){
  	cxt2.beginPath();
  	cxt2.moveTo(this.rootx[i],canHeight);
  	this.headx[i]=this.rootx[i]+l*this.amp[i];
  	cxt2.quadraticCurveTo(this.rootx[i],canHeight-130,this.headx[i],this.heady[i]);//二次贝塞尔曲线
  	
  	cxt2.stroke();
  }
  cxt2.restore();
}