$(function() {
  let gameStatus = true;
  let score = 0;

  $("#play").click(function() {
    //start game
    init();

    //hide button
    $(".description").css("display", "none");
  });

  function init() {
    //add balls
    // let randomTimer = (Math.floor(Math.random()*3) * 1000);
    setInterval(function() {
      addBall();
      requestAnimationFrame(repeatOften);
      console.log("added ball");
    }, 10000);

    //display paddle and hide cursor
    $(".paddle").css("display", "block");
    $("body").css("cursor", "none");
  }

  //loop through balls to add unique classname
  let lastBall;

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
    const screenSize = $("main").width() - 100;
    let horizontalStart = Math.floor(Math.random() * screenSize + 100);
    $(".ball" + lastBall).css("left", horizontalStart + "px");
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
    $(".endgameContainer").css("display", "flex");
    $(".paddle").css("display", "none");
    $(".endgameContainer .gameScore").html(`Your score is: ${score}`);
    $("body").css("cursor", "block");
    // $('#playAgain').on('click', function(){
    //     reset();
    //     console.log('clicked');
    // });
  }

  function reset() {
    console.log("reseted");
    $(".endgameContainer").css("display", "none");
    $(".paddle").css("display", "block");
    init();
    score = 0;
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
    $(".paddle").css("display", "block");
    $("body").css("cursor", "none");
  }
}); //end of doc ready
