
$(function() {
    const musicLoaded = $('#thefile');

    //start game once music is loaded
    $(musicLoaded).change(function(){
        let gameStatus = true;
        let score = 0;
      

          //start game
            init();
            initStyles();

        function initStyles(){
            //hide start button and text
            $('.description').css('display', 'none');
            $('#content').css('display', 'block');
  
            //change screen colors
            $('header').css('background', '#000000');
            $('footer').css('background', '#1b1b1b');
            $('main').css('background', 'none');

            //change sizes
            $('header').css('height', '20vh');
            $('main').css('height', '72vh');
       

        }

      
        function init() {
            counter();
          //add balls
          // let randomTimer = (Math.floor(Math.random()*3) * 1000);
          setInterval(function() {
            addBall();
            requestAnimationFrame(repeatOften);
            console.log("added ball");
          }, 10000);
      
          //display paddle and hide cursor
          $('main').on('mouseover', function(){
              $(".paddle").css("display", "block");
              $("body").css("cursor", "none");
              console.log('on main');

          });
          $('footer, header').on('mouseover', function(){
            $(".paddle").css("display", "none");
            $("body").css("cursor", "auto");
            console.log('on footer');
          });
        }
      
        //loop through balls to add unique classname
        let lastBall;
        
        function randomColor(){
            //
            const val = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
            let color = "#";

            for(let i = 0; i < 6; i++){
                color += val[Math.floor(Math.random() * 16)];
            }

        }
      
        randomColor();

        function addBall() {
          $(".game").append(`<div class="ball"></div>`);
          $(".ball").each(function(index, ball) {
            $(ball).attr("class", "ball" + " " + "ball" + index);
            lastBall = index;
          });
      
          //randomly position ball
          randomStart();
        }
      
        //random ball starting position
        function randomStart() {
          const screenSize = ($("main").width() - 100);
          let horizontalStart = Math.floor(Math.random() * screenSize);
          $(".ball" + lastBall).css("left", horizontalStart + 20 + "px");
          $(".ball" + lastBall).css("top", "20%");
        }
      
        //collision function
        let runBallUp = false;
      
        function collisionCheck(gameStatus) {
          if (gameStatus) {
            let n = $(".ball").length;
            // console.log('number of balls ' + n);
            for (let i = 0; i < n; i++) {
              // console.log('inside for loop' + i);
              let dynamicBall = ".ball" + i;
              //get the cords of the ball and paddle
              setCords(dynamicBall);
      
              var ball = $(dynamicBall).data("coordinates");
              var paddle = $(".paddle").data("coordinates");
      
              if (isCollide(ball, paddle)) {
                score++;
                console.log(score);
                moveBack(dynamicBall);
      
                runBallUp = true;
              } else {
                if ((runBallUp = true)) {
                  move(ball.y, dynamicBall);
                } else {
                  return;
                }
              }
            }
          } //end of game status
          else {
            endgame();
          }
        }
      
        //endgame function
        //check if ball has passed boundaries. if so, endgame
        function endgame() {
            audio.pause();
        
        
          $(".endgameContainer").css("display", "flex");
          $(".paddle").css("display", "none");
          $(".endgameContainer .gameScore").html(`Your score is: ${score}`);
          $("body").css("cursor", "auto");
 
        }
      

      
        //constant check collision status
        function repeatOften() {
          collisionCheck(gameStatus);
          requestAnimationFrame(repeatOften);
        }
      
        //setting the x and y values
        function setCords(ball) {
          // console.log($(ball));
      
          $(ball).data("coordinates", {
            x: $(ball).offset().left,
            y: $(ball).offset().top,
            height: $(ball).outerHeight(),
            width: $(ball).outerWidth()
          });
      
          //sets moving down intial value to true
          $(ball).data("moveDown");
          $(ball).data("moveUp");
      
          $(".paddle").data("coordinates", {
            x: $(".paddle").offset().left,
            y: $(".paddle").offset().top,
            height: $(".paddle").outerHeight(),
            width: $(".paddle").outerWidth()
          });
        }
      
        //set interval
        //request animation
      
        let ballSpeed = "+=1";
        function move(ballY, dynamicBall) {
          const mainHeight = $("main").height() + $("header").height();
      
          if (ballY > mainHeight) {
            gameStatus = false;
          } else {
            //move ball down
            $(dynamicBall).css("top", ballSpeed);
          }
        }
      
        function moveBack(dynamicBall) {
          // $(dynamicBall).css('top', '-=2');
          $(dynamicBall).css("top", 0);
        }
      
        // collision function
        function isCollide(a, b) {
          return !(
            a.y + a.height < b.y ||
            a.y > b.y + b.height ||
            a.x + a.width < b.x ||
            a.x > b.x + b.width
          );
        }
      
        //mouse as paddle
      
        $(document).on("mousemove", function(e) {
          $(".paddle").css("top", e.pageY);
          $(".paddle").css("left", e.pageX);
        });
      
        //counter function
        function counter() {
          let startDelay = 9;
          setInterval(function() {
            if (startDelay > 0) {
              $(".timer").html(startDelay);
              startDelay--;
            } else {
              $(".timer").css("display", "none");
            }
          }, 1000);
        }
      

    });
}); //end of doc ready
