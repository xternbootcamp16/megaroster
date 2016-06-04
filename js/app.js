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

    this.formGroupTemplate = document.querySelector('.input-group.template');
    this.formGroupTemplate.remove();
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
    listItem.className = listItem.className.replace('hide', '').trim();
    this.activateLinks(listItem);

    return listItem;
  },

  activateLinks: function(listItem) {
    listItem.querySelector('a.edit').onclick = function() {
      this.toggleEditable(listItem);
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

  toggleEditable: function(listItem) {
    var el = listItem.querySelector('.editable');
    var actions = listItem.querySelector('.actions');
    var group, saveButton;
    if (el.isContentEditable) {
      group = listItem.querySelector('.input-group');
      group.remove();
      el.className = el.className.replace('input-group-field', '').trim();
      this.prependChild(listItem, el);
      el.contentEditable = 'false';
      actions.className = actions.className.replace('hide', '').trim();
    }
    else {
      group = this.formGroupTemplate.cloneNode(true);
      saveButton = group.querySelector('.button.success');
      saveButton.onclick = function() {
        this.toggleEditable(listItem);
      }.bind(this);
      actions.className += ' hide';
      el.className += ' input-group-field';
      this.prependChild(group, el);
      listItem.appendChild(group);
      group.className = group.className.replace('hide', '').trim();
      el.contentEditable = 'true';
      el.focus();
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
