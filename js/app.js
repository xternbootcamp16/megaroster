$(document).foundation()

var megaRoster = {
  init: function(listSelector) {
    this.studentList = document.querySelector(listSelector);
    this.setupTemplates();
    this.setupEventListeners();
    this.count = 0;
  },

  setupTemplates: function() {
    this.studentItemTemplate = this.studentList.querySelector('.student.template');
    this.studentItemTemplate.remove();
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
    var listItem = this.studentItemTemplate.cloneNode(true);
    listItem.querySelector('.student-name').innerText = studentName;
    this.removeClassName(listItem, 'hide');
    this.activateLinks(listItem);

    return listItem;
  },

  activateLinks: function(listItem) {
    listItem.querySelector('a.edit').onclick = this.toggleEditable.bind(this, listItem, false);
    listItem.querySelector('a.promote').onclick = this.promote.bind(this, listItem, false);
    listItem.querySelector('a.move-up').onclick = this.moveUp.bind(this, listItem, false);
    listItem.querySelector('a.move-down').onclick = this.moveDown.bind(this, listItem, false);
    listItem.querySelector('a.remove').onclick = function() {
      listItem.remove();
    }.bind(this);
    
    listItem.querySelector('form').onsubmit = this.saveStudent.bind(this, listItem, false);
    listItem.querySelector('button.cancel').onclick = this.toggleEditable.bind(this, listItem, false);
  },

  saveStudent: function(listItem) {
    var studentName = listItem.querySelector('form').studentName.value;
    this.toggleEditable(listItem);
    listItem.querySelector('.editable').innerText = studentName;
  },

  toggleEditable: function(listItem) {
    var el = listItem.querySelector('.editable');
    var actions = listItem.querySelector('.actions');
    var editForm = listItem.querySelector('form');
    if (editForm.className.indexOf('hide') >= 0) {
      console.log('showing');
      editForm.studentName.value = el.innerText;
      this.addClassName(el, 'hide');
      this.addClassName(actions, 'hide');
      this.removeClassName(editForm, 'hide');
      editForm.studentName.focus();
      editForm.studentName.select();
    }
    else {
      console.log('hiding');
      this.addClassName(editForm, 'hide')
      this.removeClassName(el, 'hide');
      this.removeClassName(actions, 'hide');
    }
  },

  promote: function(listItem) {
    this.toggleClassName(listItem, 'promoted');
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

  toggleClassName: function(el, className) {
    if (el.className.indexOf(className) === -1) {
      this.addClassName(el, className);
    }
    else {
      this.removeClassName(el, className);
    }
  },

  addClassName: function(el, className) {
    el.className += ' ' + className;
  },

  removeClassName: function(el, className) {
    el.className = el.className.replace(className, '').trim();
  },
};
megaRoster.init('#student_list');
