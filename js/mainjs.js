function MainFunction() {

  var btnContainer = document.getElementById("side_menu");
  var menuContainer = document.getElementById("body");

  var menu_items = menuContainer.getElementsByClassName("menu_item");
  var btns = btnContainer.getElementsByClassName("menu_btn");


  window.onscroll = function() {
    var firstoffset = document.getElementById("transport").offsetTop;

    if (window.pageYOffset < firstoffset - screen.height / 3) {
        SetActive(0);
    }
    else {
      for (let i = 0; i < menu_items.length; i++) {
        var offset = menu_items[i].offsetTop;
        if (window.pageYOffset >= offset - screen.height / 3) {
          SetActive(btns[i]);
        }      
      }
    }
  };


  function SetActive(btn) {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    if (btn != 0) {
      btn.className += " active";
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




  }
