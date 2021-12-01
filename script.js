// Constants
var NUM = "_numTasks";
// make item checked when clicked on
var tasks = document.querySelector('ul');
tasks.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Add new task when clicking the + button
function newTask(update) {
  // update param determines whether or not to change cookies
  update = typeof update !== 'undefined' ? update : true;

  // update cookies
  var li = document.createElement("li");
  var name = document.getElementById("taskName").value;
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(name);
  span.className = "itemName";
  span.appendChild(txt);
  li.appendChild(span);
  document.getElementById("taskList").appendChild(li);

  // add finish button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7"); // multiply sign
  span.className = "finish"; // finish button
  span.appendChild(txt);
  li.appendChild(span);

  // hide task when clicking finish button
  var finish = document.getElementsByClassName("finish");
  var i;
  for (i=0;i<finish.length;i++) {
    finish[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      var j;
      var found = false;
      for (j=0;j<Number(get_cookie(NUM));j++) {
        if (get_cookie(j)==this.getElementsByClassName("itemName").value) {
          found = true;
        }
        if (found) {
          set_cookie(j,get_cookie(j+1));
        }
      }
      set_cookie(NUM,Number(get_cookie(NUM))-1);
    }
  }
  if (update) {
    set_cookie(Number(get_cookie(NUM)),name);
    set_cookie(NUM,Number(get_cookie(NUM))+1);
  }
}

// Cookies
function set_cookie(cname, cvalue) {
  var exdays = 365;
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function get_cookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function check_cookie(x, backup) {
  if (get_cookie(x) == "") {
    set_cookie(x, backup, 365);
  }
}

function initialise() {
  check_cookie(NUM,0);
  var i;
  for (i=0;i<Number(get_cookie(NUM));i++) {
    document.getElementById("taskName").value = get_cookie(i);
    newTask(false);
  }
  document.getElementById("taskName").value = "";
}

initialise();
