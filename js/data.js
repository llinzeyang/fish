var dataObj=function(){
	this.fruitNum=0;//果实数量
	this._double=1;//是否吃到蓝色果实?吃到=2
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}

dataObj.prototype.draw=function(){
	var w=can1.width;
	var h=can1.height;
	cxt1.save();
	cxt1.shadowBlur=10;
	cxt1.shadowColor='white';
	cxt1.fillStyle='white';
	cxt1.fillText('score:'+this.score,w*0.5,h-20);
	if(this.gameOver){
		this.alpha+=deltaTime*0.0001;
		if(this.alpha>1){
			this.alpha=1;
		}
		cxt1.fillStyle='rgba(255,255,255,'+this.alpha+')';
		cxt1.fillText('GAMEOVER',w*0.5,h*0.5);
	}
	cxt1.restore();
}

dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this._double;
	this.fruitNum=0;
	this._double=1;
}