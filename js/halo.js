var haloObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
}
haloObj.prototype.num=5;
haloObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}

haloObj.prototype.draw=function(){
	cxt1.save();
	cxt1.lineWidth=2;
	cxt1.shadowBlur=10;
	cxt1.shadowColor='rgba(203,91,0,1)';
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
      this.r[i]+=deltaTime*0.05;
      if(this.r[i]>70){
      	this.alive[i]=false;
      	continue;
      }
      var alpha=1-this.r[i]/70;
      cxt1.beginPath();
      cxt1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
      cxt1.closePath();
      cxt1.strokeStyle='rgba(203,91,0,'+alpha+')';
      cxt1.stroke();
		}
	}
	cxt1.restore();
}

haloObj.prototype.born=function(x,y){
  for(var i=0;i<this.num;i++){
  	if(!this.alive[i]){//闲置状态调用
      this.x[i]=x;
      this.y[i]=y;
      this.r[i]=10;
      this.alive[i]=true;
      return;
  	}
  }
}