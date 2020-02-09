function MainFunction() {

// MENU 
  var menu_items = document.getElementsByClassName("menu_item");
  var btns = document.getElementsByClassName("menu_btn");

  var current = document.getElementsByClassName("active");
  var prev = "";

  var menu = document.getElementById("side_menu");

  var score = document.getElementById("score-container");
  var open_score = false;
  var close_score_timeout;
  var bin_score = 0;

  // BINS
  var tr_imgs = document.getElementsByClassName("tr_img");
  var tr_blue = document.getElementsByClassName("btr");
  var blue_bin = document.getElementById("blue_bin");
  var green_bin = document.getElementById("green_bin");

  
  window.onscroll = function () {
    
    // MENU --------
    OnscrollSetActive();

    // MOVE TAXI -------
    MoveTaxi();

  };


  
  function OnscrollSetActive() {
    if (screen.width > 700) {
      var screenheight = screen.height / 3;
    } else {
      var screenheight = 50;
    }
    // var screenheightscore = 50;
    

    var firstoffset = document.getElementById("transport").offsetTop;

    if (window.pageYOffset < firstoffset - screen.height / 3) {
      SetActive(0);
      SetBg(menu);
      if (open_score) {  SetBg(score); }

    } else {
      for (let i = 0; i < menu_items.length; i++) {
        if (i < menu_items.length - 1) {
          var nextoffset = menu_items[i + 1].offsetTop;
        } else {
          var nextoffset = body.offsetHeight;
        }
        if ((window.pageYOffset >= menu_items[i].offsetTop - screenheight) &&
          (window.pageYOffset < nextoffset - screenheight)) {
          SetActive(btns[i]);
          SetBg(menu);
          if (open_score) {  SetBg(score); }
        }
      }
    }

  }
  
  function SetActive(btn) {
    if (current.length > 0) {
      prev = " " + current[0].firstChild.text;
      current[0].className = current[0].className.replace(" active", "");
    }
    if (btn != 0) {
      btn.className += " active";
    }
  }

  function SetBg(thing) {
    if (prev.length > 0) {
      thing.className = thing.className.replace(prev, "");
    }
    if (current[0]) {
      thing.className += " " + current[0].firstChild.text;
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
  var btn = document.getElementById("metro_img");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  }
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  // --- MOVING CAR ---
  function MoveTaxi() {

    var taxi = document.getElementById('taxi');
    var offset = taxi.offsetTop;
    if ((pageYOffset <= offset + 0) && (pageYOffset >= offset - window.innerHeight + 0)) {
      var taxileft = (pageYOffset - offset + window.innerHeight - 0) * window.innerWidth / (window.innerHeight - 0);
      taxi.style.left = taxileft + 'px';

    }
  }


  // --- TRASH MINI GAME ---

  blue_bin.addEventListener("click", showThing);
  green_bin.addEventListener("click", showThing);

  for (let i = 0; i < tr_imgs.length; i++) {
    tr_imgs[i].width = 50;
    tr_imgs[i].onthemove = false;
  }

  function showThing(bin) {
    var t = tr_imgs.length + 1;

    do {
      if (bin.toElement.id == "blue_bin") {
        var r = Math.floor(Math.random() * (tr_blue.length));
      } else {
        var r = tr_blue.length + Math.floor(Math.random() * (tr_imgs.length - tr_blue.length));
      }
      t--;
    }
    while (tr_imgs[r].onthemove && t >= 0);

    if (t >= 1) {
      tr_imgs[r].onthemove = true;
      ThrowThing(tr_imgs[r], bin);
    }

    if (bin.toElement.id == "blue_bin") {
      showScore (true, "bin");
    }
  }

  function ThrowThing(thing, bin) {
    // console.log("there i am!");

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

    var startw = 100;
    var endw = 20;

    var id = setInterval(frame, 5);

    function frame() {
      if (time == max_time) {
        clearInterval(id);
        thing.style.visibility = "hidden";
        thing.onthemove = false;

      } else {
        var vx = (endx - startx) / max_time;
        posx += vx;
        var vy = (endy - starty) / max_time;
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


  function showScore(flag,game) {
    if (flag) {
      open_score = true;
      score.style.display = "block";
      closeScore();
      
      if (game) {

        if (game == "bin") {
          bin_score ++;
          document.getElementById("bin_score").innerHTML = bin_score;
        }
      }
    }
    else {
      score.style.display = "none";
    }

  }


  function closeScore() {
    if (close_score_timeout) {
      clearTimeout(close_score_timeout);
    }
    close_score_timeout = setTimeout(function () {
        showScore(false);
    }, 5000);
  }


}