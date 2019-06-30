function MainFunction() {

  var btnContainer = document.getElementById("side_menu");
  var menuContainer = document.getElementById("body");

  var menu_items = menuContainer.getElementsByClassName("menu_item");
  var btns = btnContainer.getElementsByClassName("menu_btn");

  // var trashimgs = document.getElementById("trash_imgs");
  var tr_imgs = document.getElementsByClassName("tr_img");
  var blue_bin = document.getElementById("blue_bin");


  window.onscroll = function() {
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
  };


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



// --- TRASH GAME ---


    blue_bin.addEventListener("click", showThing);


    // console.log("there i am!");

    // window.onscroll = function() {
        
        for (let i = 0; i < tr_imgs.length; i++) {
            tr_imgs[i].width = (50 + i*10);
        }

    // }

    function showThing() {
      var r = Math.random()*(tr_imgs.length-1); 
      r = r.toFixed(0); 
      console.log (tr_imgs[r]);


      ThrowThing(tr_imgs[r]);
    }

    function ThrowThing(thing) {
          console.log("there i am!");

      var time = 0;
      var max_time=400;
      var accx=2;
      var accy = 2;
      var posx=0;
      var posy=200;

      var id = setInterval(frame, 5);
      function frame() {
        if (time == max_time) {
          clearInterval(id);
        } else {
          time++; 
          accx-=0.01;
          accy-=0.003;
          posx +=accy;
          posy -=accx;
          thing.style.left = posx + "px"; 
          thing.style.top = posy + "px"; 
        }
      }
    }

  }
