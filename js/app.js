$(document).foundation()

var megaRoster = {
  init: function(listSelector) {
    this.studentList = document.querySelector(listSelector);
    this.listItemTemplate = this.studentList.querySelector('li.template');
    this.listItemTemplate.remove();
    this.setupEventListeners();
    this.count = 0;
  },

  setupEventListeners: function() {
    document.querySelector('form#student_form').onsubmit = this.addStudent.bind(this);
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
    var listItem = this.listItemTemplate.cloneNode(true);
    listItem.querySelector('.student-name').innerText = studentName;
    listItem.className = listItem.className.replace('hide', '').trim();
    this.activateLinks(listItem);

    return listItem;
  },

  activateLinks: function(listItem) {
    listItem.querySelector('a.edit').onclick = function() {
      this.toggleEditable(listItem.querySelector('span.student-name'));
    }.bind(this);
    listItem.querySelector('a.promote').onclick = function() {
      this.promote(listItem);
    }.bind(this);
    listItem.querySelector('a.move-up').onclick = function() {
      this.moveUp(listItem);
    }.bind(this);
    listItem.querySelector('a.move-down').onclick = function() {
      this.moveDown(listItem);
    }.bind(this);
    listItem.querySelector('a.remove').onclick = function() {
      listItem.remove();
    }.bind(this);
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
megaRoster.init('#student_list');
