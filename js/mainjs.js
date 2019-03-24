function MainFunction() {

  var btnContainer = document.getElementById("side_menu");

  var transportoffset = document.getElementById("transport").offsetTop;
  var foodoffset = document.getElementById("food").offsetTop;
  var drinksoffset = document.getElementById("drinks").offsetTop;
  var trashoffset = document.getElementById("trash").offsetTop;

  var btns = btnContainer.getElementsByClassName("menu_btn");

  // for (var i = 0; i < btns.length; i++) {
  //   btns[i].addEventListener("click", function() {
  //     SetActive(this)
  //   });
  // }

  window.onscroll = function() {
    if (window.pageYOffset < transportoffset - screen.height / 3) {
      SetActive(0);
    }
    if (window.pageYOffset >= transportoffset - screen.height / 3) {
      SetActive(btns[0]);
    }
    if (window.pageYOffset >= foodoffset - screen.height / 3) {
      SetActive(btns[1]);
    }
  if (window.pageYOffset >= drinksoffset - screen.height / 3) {
    SetActive(btns[2]);
  }
    if (window.pageYOffset >= trashoffset - screen.height / 3) {
      SetActive(btns[3]);
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
    }, 2000);




  }
