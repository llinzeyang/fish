var can1,can2,cxt1,cxt2;
var lastTime,deltaTime;
var bgPic=new Image();//背景图片
var canWidth,canHeight;
var mx,my;//鼠标

var ane;
var fruit;
var mom;
var baby;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];

var momBodyOra=[];
var momBodyBlue=[];

var data;

var wave;//白色圈
var halo;

var dust;//漂浮物
var dustPic=[];
document.body.onload=game;

function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}

//初始化
function init(){
	can1=document.getElementById('canvas1');
	can2=document.getElementById('canvas2');
	cxt1=can1.getContext('2d');
	cxt2=can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src='img/background.jpg';

	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();//实例化海葵
	ane.init();

	fruit=new fruitObj();//实例化果实
	fruit.init();

	mom=new momObj();//实例化大鱼
	mom.init();

	baby=new babyObj();
	baby.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	for(var i=0;i<8;i++){
	  babyTail[i]=new Image();
		babyTail[i].src='img/babyTail'+i+'.png';

		momTail[i]=new Image();
		momTail[i].src='img/bigTail'+i+'.png';

		momBodyOra[i]=new Image();
		momBodyOra[i].src='img/bigSwim'+i+'.png';
		momBodyBlue[i]=new Image();
		momBodyBlue[i].src='img/bigSwimBlue'+i+'.png';
	}

	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src='img/babyEye'+i+'.png';

		momEye[i]=new Image();
		momEye[i].src='img/bigEye'+i+'.png';
	}

	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src='img/babyFade'+i+'.png';
	}

	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src='img/dust'+i+'.png';
	}

	data=new dataObj();

	cxt1.font='30px Verdana';
	cxt1.textAlign='center';

	wave=new waveObj();
	wave.init();

	halo=new haloObj();
	halo.init();

	dust=new dustObj();
	dust.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);//循环
	var now=Date.now(); //当前时间
	deltaTime=now-lastTime;//每两帧之间的时间间隔
	lastTime=now;
	if(deltaTime>40){deltaTime=40;}

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	cxt1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
  baby.draw();
  momFruitsCollision();
  momBabyCollision();

  data.draw();
  wave.draw();
  halo.draw();
  dust.draw();
}

//鼠标
function onMouseMove(e){
	if(!data.gameOver){
    if(e.offSetX||e.layerX){
		  mx=e.offSetX==undefined?e.layerX:e.offSetX;
		  my=e.offSetY==undefined?e.layerY:e.offSetY;
	  }
	}
}