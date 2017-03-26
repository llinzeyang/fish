//果实
var fruitObj=function(){
  this.alive=[];//是否活着
  this.x=[];
  this.y=[];
  this.aneNumber=[];
  this.l=[];//图片长度
  this.spd=[];//果实速度
  this.fruitType=[];//果实类型
  this.orange=new Image();//橙色果实
  this.blue=new Image();//蓝色果实
}

fruitObj.prototype.num=20;

fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=true;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNumber[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;
		this.fruitType[i]='';
	}
	this.orange.src='img/fruit.png';
	this.blue.src='img/blue.png';
}

fruitObj.prototype.draw=function(){
  for(var i=0;i<this.num;i++){
  	if(this.alive[i]){
  		if(this.fruitType[i]=='blue'){
  			var pic=this.blue;
  		}else{
  			var pic=this.orange;
  		}
  		if(this.l[i]<=14){//果实最大
  			var NO=this.aneNumber[i];
  			this.x[i]=ane.headx[NO];
  			this.y[i]=ane.heady[NO];
  		  this.l[i]+=this.spd[i]*deltaTime;
  	  }else{
  		  this.y[i]-=this.spd[i]*6*deltaTime;
  	  }

  		cxt2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
      if(this.y[i]<10){
    	  this.alive[i]=false;
      }
    }
  }
}

fruitObj.prototype.born=function(i){
	this.aneNumber[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	this.fruitType[i]=ran<0.2?'blue':'orange';
}

fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}

function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;
		}
		if(num<15){
			sendFruit();
			return;
		}
	}
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}