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
    var span = document.createElement('span');
    listItem.className += 'clearfix';
    span.innerText = studentName;
    span.className = 'studentName';
    listItem.appendChild(span);
    this.appendLinks(listItem);

    return listItem;
  },

  appendLinks: function(listItem) {
    var div = document.createElement('div');
    div.className += 'actions expanded button-group'
    div.appendChild(this.buildLink({
      contents: '<i class="fa fa-pencil">',
      className: 'edit button',
      handler: function() {
        this.toggleEditable(listItem.querySelector('span.studentName'));
      }.bind(this)
    }));
    div.appendChild(this.buildLink({
      contents: '<i class="fa fa-star"></i>',
      className: 'promote warning button',
      handler: function() {
        this.promote(listItem);
      }.bind(this)
    }));
    div.appendChild(this.buildLink({
      contents: '<i class="fa fa-arrow-up"></i>',
      className: 'moveUp button',
      handler: function() {
        this.moveUp(listItem);
      }.bind(this)
    }));
    div.appendChild(this.buildLink({
      contents: '<i class="fa fa-arrow-down"></i>',
      className: 'moveDown button',
      handler: function() {
        this.moveDown(listItem);
      }.bind(this)
    }));
    div.appendChild(this.buildLink({
      contents: '<i class="fa fa-trash-o"></i>',
      className: 'remove alert button',
      handler: function() {
        listItem.remove();
      }
    }));
    listItem.appendChild(div);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerHTML = options.contents;
    link.onclick = options.handler;
    link.className += (options.className || '');
    return link;
  },

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('a.edit');
    if (el.contentEditable === 'true') {
      el.contentEditable = 'false';
      toggleElement.className = toggleElement.className.replace('success', '').trim();
      toggleElement.innerHTML = '<i class="fa fa-pencil"></i>';
    }
    else {
      el.contentEditable = 'true';
      el.focus();
      toggleElement.className += ' success'
      toggleElement.innerHTML = '<i class="fa fa-check"></i>';
    }
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
