$(document).foundation()

var megaRoster = {
  init: function(listSelector) {
    this.studentList = document.querySelector(listSelector);
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

    // studentList.appendChild(listItem);
    this.prependChild(this.studentList, listItem);

    f.reset();
    this.count += 1;

    f.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem: function(studentName) {
    var listItem = document.createElement('li');
    listItem.innerText = studentName;
    this.appendLinks(listItem);

    return listItem;
  },

  appendLinks: function(listItem) {
    var span = document.createElement('span');
    span.className += 'actions'
    var removeLink = this.buildLink({
      text: 'remove',
      handler: function() {
        listItem.remove();
      }
    });
    var promoteLink = this.buildLink({
      text: 'promote',
      handler: function() {
        this.promote(listItem);
      }.bind(this)
    });
    var moveUpLink = this.buildLink({
      text: 'up',
      className: 'moveUp',
      handler: function() {
        this.moveUp(listItem);
      }.bind(this)
    });
    var moveDownLink = this.buildLink({
      text: 'down',
      className: 'moveDown',
      handler: function() {
        this.moveDown(listItem);
      }.bind(this)
    });
    span.appendChild(removeLink);
    span.appendChild(promoteLink);
    span.appendChild(moveUpLink);
    span.appendChild(moveDownLink);
    listItem.appendChild(span);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.onclick = options.handler;
    link.className += (options.className || '');
    return link;
  },

  promote: function(listItem) {
    this.prependChild(this.studentList, listItem);
  },

  moveUp: function(listItem) {
    if (listItem !== this.studentList.firstElementChild) {
      var previousItem = listItem.previousElementSibling;
      this.studentList.insertBefore(listItem, previousItem);
    }
  },

  moveDown: function(listItem) {
    if (listItem !== this.studentList.lastElementChild) {
      this.moveUp(listItem.nextElementSibling);
    }
  },
};
megaRoster.init('#studentList');
