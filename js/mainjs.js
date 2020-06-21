var bin_score = 0;
var fruit_score = 0;
var word_score = 0;
var mask_score = 0;
var close_score_timeout;

function MainFunction() {

  
  window.onscroll = function () {
    // MENU --------
    OnscrollSetActive();

    OnscrollSetBg();

    // MOVE TAXI -------
    MoveTaxi();

  };

  // --- MENU ---
  var menu_items = document.getElementsByClassName("menu_item");
  var menu = document.getElementById("side_menu");
  
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
          SetActive($(".menu_btn")[i]);
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

  window.setInterval(function () {
    $("#changeText").text(text[counter]);
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
    // $("body").css("font-size", "14px");
  });
  var f_s = 1;
  $("#change_font-size").on("click",function(){
    if (f_s == 1) {
      $("body").css("font-size", "1.5rem");
      f_s = 2;
    } else if (f_s == 2) {
      $("body").css("font-size", "1.1rem");
      f_s = 3;
    } else {
      $("body").css("font-size", "1.3rem");
      f_s = 1;
    }
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

  // --- SHOW SCORE ---
  function showScore(game) {
    var n = game+"_score";
    window[n] ++;
    document.getElementById(n).innerHTML = window[n];
    
    $("#score-container").css("display", "block");
    if (window[n] ==1) {
      var parentdiv = n+"_container";
      document.getElementById(parentdiv).style.display = "block";
    }   
    if (close_score_timeout) {
      clearTimeout(close_score_timeout);
    }
    close_score_timeout = setTimeout(function () {
      $("#score-container").css("display", "none");

    }, 10000);
  }


  //  --- MASK MINI GAME --- 
  var mask_up=false;
  var mask_up_timeout;
  $(".mask_img").on("click", function(event){
    if (!mask_up) {
      var mask = $(event.target);
      mask.css("transform", "translate(2%,-15%)");
      mask_up=true;
      showScore ("mask");
      if (mask_up_timeout) {
        clearTimeout(mask_up_timeout);
      }
      mask_up_timeout = setTimeout(function () {
        mask_up=false;
        mask.css("transform", "translate(-15%, 5%) rotate(45deg)");
      }, 8000);
    }
  });


  // --- MODAL ---
  window.onclick = function (event) {
    if (event.target == document.getElementById("mapModal")) {
      $("#mapModal").css("display", "none");
    }
  }
  $("#metro_img").on("click", function(){
    $("#mapModal").css("display", "block");
  });
  $(".close").on("click", function(){
    $("#mapModal").css("display", "none");
  });


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
  var tr_imgs = $(".tr_img");
  var tr_blue = $(".btr");

  $("#blue_bin").on("click", showThing);
  $("#green_bin").on("click", showThing);

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

}

// $ (document).ready (function() {
//     MainFunction();
//   });

window.onload = function WindowLoad(event) {
  MainFunction();
}
