// make item checked when clicked on
var tasks = document.querySelector('ul');
tasks.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
// Add new task when clicking the + button
function newTask() {
  var li = document.createElement("li");
  var name = document.getElementById("taskName").value;
  var txt = document.createTextNode(name);
  li.appendChild(txt);
  document.getElementById("taskList").appendChild(li);

  // add finish button
  var span = document.createElement("SPAN")
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
    }
  }
}
