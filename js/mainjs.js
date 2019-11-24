function MainFunction() {

  var btnContainer = document.getElementById("side_menu");
  var menuContainer = document.getElementById("body");

  var menu_items = menuContainer.getElementsByClassName("menu_item");
  var btns = btnContainer.getElementsByClassName("menu_btn");

  // var trashimgs = document.getElementById("trash_imgs");
  var tr_imgs = document.getElementsByClassName("tr_img");
  var tr_blue = document.getElementsByClassName("btr");
  var blue_bin = document.getElementById("blue_bin");
  var green_bin = document.getElementById("green_bin");




  window.onscroll = function() {

    // MENU --------
    OnscrollSetActive();

    // MOVE TAXI -------
    MoveTaxi ();

  };

  function OnscrollSetActive() {
    var firstoffset = document.getElementById("transport").offsetTop;
    if (screen.width > 700) {
      var screenheight = screen.height / 3;
    }
    else { var screenheight = 50; }

    if (window.pageYOffset < firstoffset - screen.height / 3) {
        SetActive(0);
    }
    else {
      for (let i = 0; i < menu_items.length; i++) {
        var offset = menu_items[i].offsetTop;
        if (i < menu_items.length - 1) {
          var nextoffset = menu_items[i+1].offsetTop;
        }
        else {
          var nextoffset = body.offsetHeight;
        }
        if ((window.pageYOffset >= offset - screenheight) && 
            (window.pageYOffset < nextoffset - screenheight)) {
              SetActive(btns[i]);
        }
      }      
    }
  }
  var menu = document.getElementById("side_menu");

  function SetActive(btn) {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      menu.className = menu.className.replace(" " + current[0].firstChild.text, "");
      current[0].className = current[0].className.replace(" active", "");
    }
    if (btn != 0) {
      btn.className += " active";
      menu.className += " " + current[0].firstChild.text;
    }
  }

 // --- CHANGE WELCOME ---
  var text = ["Welcome to Greece", "Welcome to Athens", " Welcome to our place"];
  var counter = 0;
  var elem = document.getElementById("changeText");

  window.setInterval(function() {
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

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// --- MOVING CAR ---
function MoveTaxi() {

  var taxi = document.getElementById('taxi');
  var offset = taxi.offsetTop;

  if ((pageYOffset <= offset + 20) && (pageYOffset >= offset - window.innerHeight - 20)) {
    var taxileft = (pageYOffset - offset + window.innerHeight) * window.innerWidth / window.innerHeight;
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
      var t = tr_imgs.length+1;

      do {
        if (bin.toElement.id == "blue_bin"){
          var r = Math.floor(Math.random()*(tr_blue.length)); 
        }
        else{
          var r = tr_blue.length + Math.floor(Math.random()*(tr_imgs.length -tr_blue.length)); 
        }
        t--;
      }
      while (tr_imgs[r].onthemove && t >= 0);
      
      if (t>=1) {
        tr_imgs[r].onthemove = true;
        ThrowThing(tr_imgs[r],bin);
      }
    }

    function ThrowThing(thing,bin) {
      // console.log("there i am!");

      var time = 0;
      var max_time=300;
          
      var endx = bin.toElement.offsetLeft + (bin.toElement.offsetWidth/2) - thing.width;
      var endy = bin.toElement.offsetTop - window.pageYOffset + thing.height - 25;
      
      var side = Math.floor(Math.random() *2);
      if (side ==0) {  var startx = -50;  }
      else {           var startx = screen.width; }
      var starty = Math.floor(Math.random() * screen.height/2);

      thing.style.visibility = "visible";
      thing.style.left = startx + "px"; 
      thing.style.top = starty + "px"; 
      
      var posx=startx;
      var posy=starty;

      var accy = 2;
      var day = (accy*2) / max_time;

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
          posy += vy -accy;

          var dw = (startw - endw)/max_time;
          startw  -= dw;
          thing.style.width = startw + "px";

          thing.style.left = posx + "px"; 
          thing.style.top = posy + "px"; 
          time++; 

        }
      }

    }

  }
