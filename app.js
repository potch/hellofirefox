window.addEventListener("load", function() {
  console.log("Hello World!");
});

var App = {
  setMode: function(m, obj) {
    console.log('setting mode', m);

    this.mode = m;

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
    
    if (m in this._listeners) {
      this._listeners[m].forEach(function(fn) {
        fn(obj);
      });
    }
  },
  _listeners: {},
  on: function(m, fn) {
    var l = this._listeners;
    if (!l[m]) {
      l[m] = [];
    }
    l[m].push(fn);
  }
}

// Set up navigation
document.querySelector('.nav').addEventListener('click', function (e) {
  var target = e.target.getAttribute('data-target');
  var i;
  e.preventDefault();
  if (target) {
    App.setMode(target);
  }
});

// Fetch gifs from Reddit
function getGifs(done) {
  getJSON('http://www.reddit.com/r/perfectloops.json', function (error, data) {
    if (data) {
      var posts = data.data.children;
      done(null, posts.filter(function (post) {
        if ((/\.gif$/).test(post.data.url)) {
          return true;
        } else {
          return false;
        }
      }).map(function (p) {
        return post.data.url;
      }));
    } else {
      done('no posts', null);
    }
  });
}

function getJSON(url, done) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = this.responseText;
    if (response) {
      var obj;
      try {
        obj = JSON.parse(response);
      } catch (e) {
        done('could not parse', null);
        return;
      }
      if (obj) {
        done(null, obj);
      } else {
        done('no data', null);
      }
    } else {
      done('no response', null);
    }
  };
  xhr.onerror = function() {
    done('connection error', null);
  };
  xhr.open('get', url);
  xhr.send();
}

App.setMode('home');
