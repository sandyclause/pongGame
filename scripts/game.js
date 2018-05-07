const musicLoaded = $("#thefile");
const windowWidth = $(window).width();
let gameStatus = true;
let score = 0;
let lastBall; //name of last ball added for unique classname
let runBallUp = false; //if ball should go up by collision


const app = {
  initStyles() {
    //hide start button and text
    $(".description").css("display", "none");
    $("#content").css("display", "block");
    
    //change screen colors
    $("header").css("background", "#000000");
    $("footer").css("background", "#1b1b1b");
    $("main").css("background", "none");
    
    //change sizes
    $("header").css("height", "20vh");
    $("main").css("height", "72vh");
  },
  
  init() {
    
    //change the text on the description. no paddle and click only on mobile
    if (windowWidth < 786) {
      $("#instructionMain").text("The goal of the game is to not let the balls fall through the bottom by touching the balls.");
    }
    //start game once music is loaded
    $(musicLoaded).change(function() {

      app.counter();
      app.initStyles();
      app.paddleMouse();
      //add balls
      setInterval(function() {
        app.addBall();
        requestAnimationFrame(app.repeatOften);
      }, 10000);
  
      //game is touch only when under 786px window width
      //paddle is hidden
      if (windowWidth < 786) {
        $(".paddle").css("display", "none");
      } else {
        $(".paddle").css("display", "block");
        //display paddle and hide cursor
        $("main").on("mouseover", function() {
          $(".paddle").css("display", "block");
          $("main").css("cursor", "none");
        });
        //hide paddle if on header or footer
        $("footer, header").on("mouseover", function() {
          $(".paddle").css("display", "none");
        });
      }
      
    });//end of music onload

  }, //end of init
  
  randomColor() {
    //all possible make up of color hex code
    const val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let color = "#";
  
    for (let i = 0; i < 6; i++) {
      //appends 6 times to the color string
      color += val[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  
  addBall() {
    $(".game").append(`<div class="ball"></div>`);
    $(".ball").each(function(index, ball) {
      $(ball).attr("class", "ball" + " " + "ball" + index);
      lastBall = index;
    });
  
    //randomly assigns color to the last ball created
    $(".ball" + lastBall).css("background", app.randomColor());
  
    //randomly position ball
    app.randomStart();
  },
  
  //random ball starting position
  randomStart() {
    const screenSize = $("main").width() - 100;
    let horizontalStart = Math.floor(Math.random() * screenSize);
    $(".ball" + lastBall).css("left", horizontalStart + 20 + "px");
    $(".ball" + lastBall).css("top", "20%");
  },
  
  collisionCheck(gameStatus) {
    if (gameStatus) {
      let n = $(".ball").length;
  
      for (let i = 0; i < n; i++) {
        let dynamicBall = ".ball" + i;
  
        //get the cords of the ball and paddle
        app.setCords(dynamicBall);
  
        var ball = $(dynamicBall).data("coordinates");
        var paddle = $(".paddle").data("coordinates");
  
        if (app.isCollide(ball, paddle)) {
          score++;
          app.moveBack(dynamicBall);
  
          //changes color of paddle on collision
          $(".paddle").css("background", app.randomColor());
          runBallUp = true;
        } else {
          if ((runBallUp = true)) {
            app.move(ball.y, dynamicBall);
          } else {
            return;
          }
        }
  
        //mobile click
        $(dynamicBall).on("click", function() {
          score++;
          app.moveBack(dynamicBall);
        });
      } //end of for loop
    } //end of game status
    else {
      app.endgame();
    }
  },
  
  //endgame function
  //check if ball has passed boundaries. if so, endgame
  endgame() {
    audio.pause();
  
    $(".endgameContainer").css("display", "flex");
    twttr.widgets.load(
      document.getElementById("dynamicTwitterContainer")
    );
    $(".paddle").css("display", "none");
    $(".endgameContainer .gameScore").html(`Your score is: ${score}`);
    $("body").css("cursor", "auto");
  },
  
  //constant check collision status
  repeatOften() {
    app.collisionCheck(gameStatus);
    requestAnimationFrame(app.repeatOften);
  },
  
  //setting the x and y values
  setCords(ball) {
    $(ball).data("coordinates", {
      x: $(ball).offset().left,
      y: $(ball).offset().top,
      height: $(ball).outerHeight(),
      width: $(ball).outerWidth()
    });
  
    $(".paddle").data("coordinates", {
      x: $(".paddle").offset().left,
      y: $(".paddle").offset().top,
      height: $(".paddle").outerHeight(),
      width: $(".paddle").outerWidth()
    });
  },
  
  //set interval
  //request animation
  move(ballY, dynamicBall) {
    let ballSpeed = "+=1";
  
    //checks when ball passes to the footer
    const mainHeight = $("main").height() + $("header").height();
    if (ballY > mainHeight) {
      gameStatus = false;
    } else {
      //move ball down
      $(dynamicBall).css("top", ballSpeed);
    }
  },
  
  moveBack(dynamicBall) {
    $(dynamicBall).css("top", 0);
  },
  
  // collision function
  isCollide(a, b) {
    return !(
      a.y + a.height < b.y ||
      a.y > b.y + b.height ||
      a.x + a.width < b.x ||
      a.x > b.x + b.width
    );
  },

  paddleMouse(){
    //mouse as paddle
    $(document).on("mousemove", function(e) {
      $(".paddle").css("top", e.pageY);
      $(".paddle").css("left", e.pageX);
    });
  },
  
  
  //counter before game start
  counter() {
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

}//end of app obj



$(function() {
  
  //start game
    app.init();

});
