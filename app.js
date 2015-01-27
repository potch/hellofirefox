window.addEventListener("load", function() {
  console.log("Hello World!");
});

var mode = document.querySelector('#app').getAttribute('data-mode');

function setMode(m) {
  console.log('setting mode', m);

  mode = m;

  document.querySelector('#app').setAttribute('data-mode', m) ;

  var cards = document.querySelectorAll('.card');
  for (i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.getAttribute('data-name') === m) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  }

  var navs = document.querySelectorAll('.nav a');
  for (i = 0; i < navs.length; i++) {
    var nav = navs[i];
    if (nav.getAttribute('data-target') === m) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  }
}

document.querySelector('.nav').addEventListener('click', function (e) {
  var target = e.target.getAttribute('data-target');
  var i;
  e.preventDefault();
  if (target) {
    setMode(target);
  }
});

setMode('home');
