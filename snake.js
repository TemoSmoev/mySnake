var rightStep=0; // the steps snake makes
var downStep=0;  // the steps snake makes

var previousKey=0; // the previous key I used while moving the snake

var leftInt=0;   //setinterval function variable
var rightInt=0;  //setinterval function variable
var upInt=0;     //setinterval function variable
var downInt=0;   //setinterval function variable

var milisec=0     // timer

var snake=$(".snake"); // the snake's body
var food=$(".food");  // the snake's food

var r=0;
var l=0;
var u=0;
var d=0;

pixelsX=[];
pixelsY=[];

for(var i=0;i<1200;i+=30){
    if(i<600){
        pixelsX.push(i);
        pixelsY.push(i);
    }
    else pixelsX.push(i);
}   // pushes the coordinates into arrays

function gameOver(){
  $("#box").fadeOut('3s',function(){
      $('body').html("");
      $('body').append('<p id="game-over">GAME OVER</p>');
      $('body').append('<div class="blue-button"><a>play again</a></div>')
      $('a').click(function(){
        location.reload();
      })
  });
}

function foodCreate(){
   randomX=Math.floor(Math.random()*pixelsX.length);
   randomY=Math.floor(Math.random()*pixelsY.length);

   for(i=0;i<snake.length;i++){
       if((pixelsX[randomX]==parseInt($(snake[i]).css('marginLeft')) && pixelsY[randomY]==parseInt($(snake[i]).css('marginTop')))||
          (pixelsX[randomX]+30==parseInt($(snake[i]).css('marginLeft')) && pixelsY[randomY]==parseInt($(snake[i]).css('marginTop')))||
          (pixelsX[randomX]-30==parseInt($(snake[i]).css('marginLeft')) && pixelsY[randomY]==parseInt($(snake[i]).css('marginTop')))||
          (pixelsX[randomX]==parseInt($(snake[i]).css('marginLeft')) && pixelsY[randomY]+30==parseInt($(snake[i]).css('marginTop')))||
          (pixelsX[randomX]==parseInt($(snake[i]).css('marginLeft')) && pixelsY[randomY]-30==parseInt($(snake[i]).css('marginTop')))
        ){
           console.log('temo');
           foodCreate();
       }
   }
    // ne dopustit poyavlenia edi na meste zmeiki
        food.css({
            marginLeft:pixelsX[randomX]+`px`,
            marginTop :pixelsY[randomY]+`px`
        })
}

function snakeTaleCreate() {
    $("#box").prepend('<div class="snake"></div>')
    snake=$(".snake");
}

function right(){
    if(rightStep+30==pixelsX[randomX] && pixelsY[randomY]==downStep){
        foodCreate();
        snakeTaleCreate();
        rightStep+=30;
        $(snake[0]).css('marginLeft',`${rightStep}px`);
        $(snake[0]).css('marginTop',`${downStep}px`);

    }
    else{
        if(rightStep<1170){
            rightStep+=30;

            $(snake[snake.length-1]).remove();
            $("#box").prepend('<div class="snake"></div>')

            snake=$('.snake');

            r++;

            $(snake[0]).css('marginLeft',`${rightStep}px`);
            $(snake[0]).css('marginTop',`${downStep}px`);

            for(i=1;i<snake.length;i++){
              if(parseInt($(snake[0]).css("marginLeft"))==parseInt($(snake[i]).css("marginLeft"))
               && parseInt($(snake[0]).css("marginTop"))==parseInt($(snake[i]).css("marginTop"))){
                gameOver();
              }
            }


        }
        else{
            gameOver();
        }
    }

}
function left(){
    if(rightStep-30==pixelsX[randomX] && pixelsY[randomY]==downStep){
        foodCreate();
        snakeTaleCreate();
        rightStep-=30;
        $(snake[0]).css('marginLeft',`${rightStep}px`);
        $(snake[0]).css('marginTop',`${downStep}px`);
    }
    else{
        if(rightStep>0){
            rightStep-=30;

            $(snake[snake.length-1]).remove();          //removing the snake's tail
            $("#box").prepend('<div class="snake"></div>')    // adding snake's head

            snake=$('.snake');

            l++;

            $(snake[0]).css('marginLeft',`${rightStep}px`);
            $(snake[0]).css('marginTop',`${downStep}px`);

            for(i=1;i<snake.length;i++){
              if(parseInt($(snake[0]).css("marginLeft"))==parseInt($(snake[i]).css("marginLeft"))
               && parseInt($(snake[0]).css("marginTop"))==parseInt($(snake[i]).css("marginTop"))){
                gameOver();
              }
            }

        }
        else{
            gameOver();
        }
    }

}
function down(){
    if(rightStep==pixelsX[randomX] && pixelsY[randomY]==downStep+30){
        foodCreate();
        snakeTaleCreate();
        downStep+=30;
        $(snake[0]).css('marginLeft',`${rightStep}px`);
        $(snake[0]).css('marginTop',`${downStep}px`);
    }
    else{
        if(downStep<570){
            downStep+=30;

            $(snake[snake.length-1]).remove();
            $("#box").prepend('<div class="snake"></div>')

            snake=$('.snake');

            $(snake[0]).css('marginLeft',`${rightStep}px`);
            $(snake[0]).css('marginTop',`${downStep}px`);

            d++;

            for(i=1;i<snake.length;i++){
              if(parseInt($(snake[0]).css("marginLeft"))==parseInt($(snake[i]).css("marginLeft"))
               && parseInt($(snake[0]).css("marginTop"))==parseInt($(snake[i]).css("marginTop"))){
                gameOver();
              }
            }

        }
        else {
            gameOver();
        }
    }
}
function up(){
    if(rightStep==pixelsX[randomX] && pixelsY[randomY]==downStep-30){
        foodCreate();
        snakeTaleCreate();
        downStep-=30;
        $(snake[0]).css('marginLeft',`${rightStep}px`);
        $(snake[0]).css('marginTop',`${downStep}px`);
    }
    else{
        if(downStep>0){
            downStep-=30;

            $(snake[snake.length-1]).remove();
            $("#box").prepend('<div class="snake"></div>')

            snake=$('.snake');

            u++;

            $(snake[0]).css('marginLeft',`${rightStep}px`);
            $(snake[0]).css('marginTop',`${downStep}px`);

            for(i=1;i<snake.length;i++){
              if(parseInt($(snake[0]).css("marginLeft"))==parseInt($(snake[i]).css("marginLeft"))
               && parseInt($(snake[0]).css("marginTop"))==parseInt($(snake[i]).css("marginTop"))){
                gameOver();
              }
            }
        }
        else{
            gameOver();
        }
    }
}


document.addEventListener('keydown',direction);

function direction(event){
    if(event.keyCode==37 && previousKey!=39 && previousKey!=37){
        ////////////////////left/////////////////////////////
        r=0;l=0;
        if(previousKey==38 &&u==0){
          up();
        }
        if(previousKey==40 && d==0){
          down();
        }

        clearInterval(upInt)
        clearInterval(rightInt)
        clearInterval(downInt)

        leftInt= setInterval(left,100);
    }
    if(event.keyCode==38 && previousKey!=38 && previousKey!=40){
        ////////////////////////up//////////////////////
        u=0;d=0;
        if(previousKey==39 &&r==0){
          right();
        }
        if(previousKey==37 &&l==0){
          left();
        }

        clearInterval(leftInt)
        clearInterval(rightInt)
        clearInterval(downInt)

        upInt= setInterval(up,100);
    }
    if(event.keyCode==39  && previousKey!=37 && previousKey!=39){
        ///////////////////////right/////////////////////////////
        r=0;l=0;
        if(previousKey==38 &&u==0){
          up();
        }
        if(previousKey==40 &&d==0){
          down();
        }

        clearInterval(upInt)
        clearInterval(leftInt)
        clearInterval(downInt)

        rightInt=setInterval(right,100);
    }
    if(event.keyCode==40 && previousKey!=40 && previousKey!=38){
        ///////////////////////////down//////////////////////
        u=0;d=0;
        if(previousKey==39 &&r==0){
          right();
        }
        if(previousKey==37 &&l==0){
          left();
        }

        r=0;l=0;

        clearInterval(upInt)
        clearInterval(rightInt)
        clearInterval(leftInt)

        downInt=setInterval(down,100);
    }
    previousKey=event.keyCode;
}

foodCreate();
