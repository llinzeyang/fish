//判断大鱼和果实的距离
function momFruitsCollision(){
	if(!data.gameOver){
    for(var i=0;i<fruit.num;i++){
		  if(fruit.alive[i]){
			  var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);//距离的平方
  			if(l<900){//果实被吃掉
          fruit.dead(i);
          data.fruitNum++;
          mom.momBodyCount++;
          if(mom.momBodyCount>7){
          	mom.momBodyCount=7;
          }
          if(fruit.fruitType[i]=='blue'){
          	data._double=2;
          }else{
          	data._double=1;
          }
          wave.born(fruit.x[i],fruit.y[i]);
		  	}
		  }
	  }
	}
}
//大鱼小鱼的距离
function momBabyCollision(){
	if(data.fruitNum>0 && !data.gameOver){
  	var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	  if(l<900){
      if(data._double==1){
		    baby.babyBodyCount=0;
  		  mom.momBodyCount=0;
	  	  data.addScore();
		    halo.born(baby.x,baby.y);
      }else{
        data.gameOver=true;
      }
	  }
  }
}