var bin_score = 0;
var fruit_score = 0;

function MainFunction() {

// MENU 
  var menu_items = document.getElementsByClassName("menu_item");
  var btns = document.getElementsByClassName("menu_btn");

  var current = document.getElementsByClassName("active");

  var menu = document.getElementById("side_menu");

  var score = document.getElementById("score-container");
  var close_score_timeout;

  // BINS
  var tr_imgs = document.getElementsByClassName("tr_img");
  var tr_blue = document.getElementsByClassName("btr");
  var blue_bin = document.getElementById("blue_bin");
  var green_bin = document.getElementById("green_bin");

  var taxi = document.getElementById('taxi');

  var fruits = document.getElementsByClassName("fruit_img");


  
  window.onscroll = function () {
    
    // MENU --------
    OnscrollSetActive();
    OnscrollSetBg(menu);
    OnscrollSetBg(score);

    // MOVE TAXI -------
    MoveTaxi();

  };

//it works..
  //  $(".menu_btn").on("click", function() {
  //   alert("aloha2");
  //  });


  
  function OnscrollSetActive() {
    var screenheight = menu.offsetTop + (menu.offsetHeight/3);
    if (window.pageYOffset < menu_items[0].offsetTop - screen.height / 3) {
      SetActive(0);
    } 
    else {
      for (let i = 0; i < menu_items.length; i++) {
        var nextoffset = menu_items[i].offsetHeight + menu_items[i].offsetTop;
        if ((window.pageYOffset >= menu_items[i].offsetTop - screenheight) &&
          (window.pageYOffset < nextoffset - screenheight)) {
          SetActive(btns[i]);
        }
      }
    }
  }

  function SetActive(btn) {
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    if (btn != 0) {
      btn.className += " active";
    }
  }

  function OnscrollSetBg(thing) {
    var screenheight = thing.offsetTop + (thing.offsetHeight/3);
    var firstclass = "" + thing.className.split(" ")[0];
    if (thing.className!=firstclass) {
      thing.className = thing.className.replace(thing.className,firstclass);
    }
    if (window.pageYOffset >= menu_items[0].offsetTop - screenheight) {
      for (let i = 0; i < menu_items.length; i++) {
        var nextoffset = menu_items[i].offsetHeight + menu_items[i].offsetTop;
        if ((window.pageYOffset >= menu_items[i].offsetTop - screenheight) &&
          (window.pageYOffset < nextoffset - screenheight)) {
          thing.className += " " + menu_items[i].className.split(" ")[0];
        }
      }
    }
  }


  // --- CHANGE WELCOME ---
  var text = ["Welcome to Greece", "Welcome to Athens", " Welcome to our place"];
  var counter = 0;
  var elem = document.getElementById("changeText");

  window.setInterval(function () {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
      counter = 0;
    }
  }, 1200);


  // --- MODAL ---
  var modal = document.getElementById("mapModal");
  var mdl_btn = document.getElementById("metro_img");
  var mdl_span = document.getElementsByClassName("close")[0];

  mdl_btn.onclick = function () {
    modal.style.display = "block";
  }
  mdl_span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  // --- MOVING CAR ---
  function MoveTaxi() {

    var offset = taxi.offsetTop;
    if ((pageYOffset <= offset + 0) && (pageYOffset >= offset - window.innerHeight + 0)) {
      var taxileft = (pageYOffset - offset + window.innerHeight - 0) * window.innerWidth / (window.innerHeight - 0);
      taxi.style.left = taxileft + 'px';
    }
  }

  // --- EATING FRUITS --- 
  


  $(".fruit_img").on("click",function(event){
    // console.log(event.target);
    var fruit = $(event.target);
    if (!fruit.attr("disable")) {
      if ((fruit.attr("no")!=4)) {
      if (!fruit.attr("no")) {
        fruit.attr("no",1);
      }
      else if (fruit.attr("no")==4) {
        fruit.attr("no",0);
      }
      else {
        fruit.attr("no",parseInt(fruit.attr("no")) + 1);
      }
  
      var new_src = fruit.attr("src").split(".")[0].slice(0, -1) + fruit.attr("no") + ".png";
      fruit.attr("src",new_src);
      console.log(fruit.attr("no"));
      
      if (fruit.attr("no") == 4) {
        showScore ("fruit");
        fruit.animate({ top: "+=120px" }, 1500 );
        fruit.queue(function() {
          fruit.attr("no",0);
          var new_src = fruit.attr("src").split(".")[0].slice(0, -1) + fruit.attr("no") + ".png";
          fruit.attr("src",new_src);
          fruit.css("top", "-120px");
          fruit.dequeue();
        });
        fruit.animate({ top: "+=120px" }, 1500 );

    }
  }


    }
      
    // console.log(fruit.attr("src").split(".")[0] + fruit.attr("no") + "." + fruit.attr("src").split(".")[1]);
  })

  // src="img/apple.png"
  // $( ".block" ).animate({ "left": "+=50px" }, "slow" );



  // --- TRASH MINI GAME ---

  blue_bin.addEventListener("click", showThing);
  green_bin.addEventListener("click", showThing);

  for (let i = 0; i < tr_imgs.length; i++) {
    tr_imgs[i].width = 50;
    tr_imgs[i].onthemove = false;
  }

  function showThing(bin) {
    var t = tr_imgs.length;

    do {
      if (bin.toElement.id == "blue_bin") {
        var r = Math.floor(Math.random() * (tr_blue.length));
      } else {
        var r = tr_blue.length + Math.floor(Math.random() * (tr_imgs.length - tr_blue.length));
      }
      t--;
    }
    while (tr_imgs[r].onthemove && t > 0);

    if (t >= 1) {
      tr_imgs[r].onthemove = true;
      ThrowThing(tr_imgs[r], bin);
      if (bin.toElement.id == "blue_bin") {
        showScore ("bin");
      }
    }
  }

  function ThrowThing(thing, bin) {
    var time = 0;
    var max_time = 300;

    var endx = bin.toElement.offsetLeft + (bin.toElement.offsetWidth / 2) - thing.width;
    var endy = bin.toElement.offsetTop - window.pageYOffset + thing.height - 25;

    var side = Math.floor(Math.random() * 2);
    if (side == 0) {
      var startx = -50;
    } else {
      var startx = screen.width;
    }
    var starty = Math.floor(Math.random() * screen.height / 2);

    thing.style.visibility = "visible";
    thing.style.left = startx + "px";
    thing.style.top = starty + "px";

    var posx = startx;
    var posy = starty;
    var accy = 2;
    var day = (accy * 2) / max_time;
    var startw = 120;
    var endw = 10;
    var vx = (endx - startx) / max_time;
    var vy = (endy - starty) / max_time;
    
    var id = setInterval(frame, 5);
    
    function frame() {
      if (time == max_time) {
        clearInterval(id);
        thing.style.visibility = "hidden";
        thing.onthemove = false;
        
      } else {
        posx += vx;
        accy -= day;
        posy += vy - accy;
        var dw = (startw - endw) / max_time;
        startw -= dw;
        thing.style.width = startw + "px";
        thing.style.left = posx + "px";
        thing.style.top = posy + "px";
        time++;

      }
    }

  }


  function showScore(game) {
    var n = game+"_score";
    window[n] ++;
    document.getElementById(n).innerHTML = window[n];
    
    score.style.display = "block";   
    if (window[n] ==1) {
      var parentdiv = n+"_container";
      console.log(parentdiv);
      document.getElementById(parentdiv).style.display = "block";
    }   
    if (close_score_timeout) {
      clearTimeout(close_score_timeout);
    }
    close_score_timeout = setTimeout(function () {
      score.style.display = "none";
    }, 10000);
  }
}


// $ (document).ready (function() {
//     MainFunction();
//   });

window.onload = function WindowLoad(event) {
  MainFunction();
}
