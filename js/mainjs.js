var bin_score = 0;
var fruit_score = 0;
var word_score = 0;
var close_score_timeout;

function MainFunction() {

// MENU 
  var menu_items = document.getElementsByClassName("menu_item");
  var btns = document.getElementsByClassName("menu_btn");

  var menu = document.getElementById("side_menu");


  // BINS
  var tr_imgs = document.getElementsByClassName("tr_img");
  var tr_blue = document.getElementsByClassName("btr");
  var blue_bin = document.getElementById("blue_bin");
  var green_bin = document.getElementById("green_bin");

  
  window.onscroll = function () {
    
    // MENU --------
    OnscrollSetActive();

    OnscrollSetBg();

    // MOVE TAXI -------
    MoveTaxi();

  };

  
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
    if (!$(btn).hasClass("active")){
      $(".active").removeClass("active");
      $(btn).addClass("active");
    }
  }

  function OnscrollSetBg() {
    let things = $(".auto_bg");
    for (let thing of things) {
      let current_position = $(thing).offset().top + (thing.offsetHeight/3);
      for(let menu_item of menu_items){
        if(current_position >= $(menu_item).offset().top && current_position <= $(menu_item).offset().top+$(menu_item).outerHeight()){
          if(!$(thing).hasClass(menu_item.className.split(" ")[0])){
            $(thing).addClass(menu_item.className.split(" ")[0])
          }
        }else{
          $(thing).removeClass(menu_item.className.split(" ")[0])
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


    // --- SETTINGS ---

    $("#change_font").on("click",function(){
      $("body").toggleClass("body_simpler_font");
      $("h1").toggleClass("h_simpler_font");
      $("h2").toggleClass("h_simpler_font");
    });
  
    $("#change_contrast").on("click",function(){
      for(let menu_item of menu_items){
        $(menu_item).toggleClass("black_bg");
      }
      $(".auto_bg").toggleClass("black_bg");
      $(".header").toggleClass("black_bg");
      $("body").toggleClass("black_bg");
    });
  
    $(".setting_tab").on("click", function() {
      if ($(".settings").attr("state-open")=="true") {
        $(".settings").attr("state-open",false);
        $(".settings").animate({'left' : '-80px' },140);
      }
      else {
        $(".settings").attr("state-open",true);
        $(".settings").animate({'left' : '0px' },100);     
      }
    });


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

  // $("#metro_img").on("click",function(){
  //   $("#modal").css("display", "block");
  // });



  // --- MOVING CAR ---
  function MoveTaxi() {

    var offset = $("#taxi").offset().top;
    if ((pageYOffset <= offset + 0) && (pageYOffset >= offset - window.innerHeight + 0)) {
      var taxileft = (pageYOffset - offset + window.innerHeight - 0) * window.innerWidth / (window.innerHeight - 0);
      $("#taxi").css("left",taxileft + 'px');

    }
  }

  // --- CLICKING LETTERS ---

  var letters_row="";

   $(".letter_card").on("click", function(event){
    let target_li = $(event.target)
    if(!target_li.is("li")){
      target_li = target_li.parent()
    }
    var letter = target_li.attr("letter");
    letters_row +=letter;
    if (letters_row.indexOf("ΚΑΛΗΜΕΡΑ")>-1){
      showScore ("word");
      letters_row = "";
    }
   });




  // --- EATING FRUITS --- 
  
  $(".fruit_img").on("click",function(event){
    // console.log(event.target);
    var fruit = $(event.target);
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
    // console.log(fruit.attr("src").split(".")[0] + fruit.attr("no") + "." + fruit.attr("src").split(".")[1]);
  });



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
    
    $("#score-container").css("display", "block");
    if (window[n] ==1) {
      var parentdiv = n+"_container";
      console.log(parentdiv);
      document.getElementById(parentdiv).style.display = "block";
    }   
    if (close_score_timeout) {
      clearTimeout(close_score_timeout);
    }
    close_score_timeout = setTimeout(function () {
      $("#score-container").css("display", "none");

    }, 10000);
  }
}


// $ (document).ready (function() {
//     MainFunction();
//   });

window.onload = function WindowLoad(event) {
  MainFunction();
}
