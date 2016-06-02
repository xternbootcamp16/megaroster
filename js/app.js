$(document).foundation()

var megaRoster = {
  init: function() {
    this.setupEventListeners();
    this.count = 0;
  },

  setupEventListeners: function() {
    document.querySelector('form#studentForm').onsubmit = this.addStudent.bind(this);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var listItem = this.buildListItem(studentName);
    var studentList = document.querySelector('#studentList');

    // studentList.appendChild(listItem);
    this.prependChild(studentList, listItem);

    f.reset();
    this.count += 1;

    f.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem: function(studentName) {
    var listItem = document.createElement('li');
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        listItem.remove();
      }
    });
    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        listItem.style.border = '2px CornflowerBlue dashed';
      }
    });
    listItem.innerText = studentName;
    listItem.appendChild(removeLink);
    listItem.appendChild(promoteLink);

    return listItem;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    return link;
  },
};
megaRoster.init();
