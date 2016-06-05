$(document).foundation()

var megaRoster = {
  init: function(listSelector) {
    this.studentList = document.querySelector(listSelector);
    this.setupTemplates();
    this.setupEventListeners();
    this.students = [];
    this.load();
    this.max = 0;
  },

  load: function() {
    try {
      var storedRoster = localStorage.getItem('roster');
      if (storedRoster) {
        JSON.parse(storedRoster).map(function(student) {
          this.addStudent(student, true);
        }.bind(this));
      }
    }
    catch(err) {
      return false;
    }
  },

  save: function() {
    try {
      localStorage.setItem('roster', JSON.stringify(this.students));
    }
    catch(err) {
      return false;
    }
  },

  setupTemplates: function() {
    this.studentItemTemplate = this.studentList.querySelector('.student.template');
    this.studentItemTemplate.remove();
  },

  setupEventListeners: function() {
    document.querySelector('form#student_form').onsubmit = this.addStudentViaForm.bind(this);
  },

  addStudentViaForm: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    this.addStudent({
      id: (this.max + 1),
      name:  f.studentName.value
    });
    f.reset();
    f.studentName.focus();
  },

  addStudent: function(student, addToEnd) {
    var listItem = this.buildListItem(student);

    if (addToEnd) {
      this.students.push(student);
      this.studentList.appendChild(listItem);
    }
    else {
      this.students.unshift(student);
      this.prependChild(this.studentList, listItem);
    }
    this.max ++;
    this.save();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem: function(student) {
    var listItem = this.studentItemTemplate.cloneNode(true);
    listItem.querySelector('.student-name').innerText = student.name;
    listItem.setAttribute('data-id', student.id);
    if(student.promoted) {
      this.promote(listItem);
    }
    this.removeClassName(listItem, 'hide');
    this.activateLinks(listItem);

    return listItem;
  },

  activateLinks: function(listItem) {
    listItem.querySelector('a.edit').onclick = this.toggleEditable.bind(this, listItem);
    listItem.querySelector('a.promote').onclick = this.promote.bind(this, listItem);
    listItem.querySelector('a.move-up').onclick = this.moveUp.bind(this, listItem);
    listItem.querySelector('a.move-down').onclick = this.moveDown.bind(this, listItem);
    listItem.querySelector('a.remove').onclick = this.removeStudent.bind(this, listItem);

    listItem.querySelector('form').onsubmit = this.saveStudent.bind(this, listItem);
    listItem.querySelector('button.cancel').onclick = this.toggleEditable.bind(this, listItem);
  },

  findStudentFromItem: function(item) {
    var student;
    this.students.map(function(s) {
      if (s.id == item.getAttribute('data-id')) {
        student = s;
      }
    });
    return student;
  },

  removeStudent: function(listItem, ev) {
    if (ev) { ev.preventDefault(); }
    var id = listItem.getAttribute('data-id');
    this.students = this.students.filter(function(student) {
      return student.id != id;
    });
    listItem.remove();
    this.save();
  },

  saveStudent: function(listItem, ev) {
    if (ev) { ev.preventDefault(); }
    var studentName = listItem.querySelector('form').studentName.value;
    this.findStudentFromItem(listItem).name = studentName;
    this.toggleEditable(listItem);
    listItem.querySelector('.editable').innerText = studentName;
    this.save();
  },

  toggleEditable: function(listItem, ev) {
    if (ev) { ev.preventDefault(); }
    var el = listItem.querySelector('.editable');
    var actions = listItem.querySelector('.actions');
    var editForm = listItem.querySelector('form');
    if (editForm.className.indexOf('hide') >= 0) {
      editForm.studentName.value = el.innerText;
      this.addClassName(el, 'hide');
      this.addClassName(actions, 'hide');
      this.removeClassName(editForm, 'hide');
      editForm.studentName.focus();
      editForm.studentName.select();
    }
    else {
      this.addClassName(editForm, 'hide')
      this.removeClassName(el, 'hide');
      this.removeClassName(actions, 'hide');
    }
  },

  promote: function(listItem, ev) {
    if (ev) { ev.preventDefault(); }
    var student = this.findStudentFromItem(listItem);
    if (student) {
      student.promoted = !student.promoted;
    };
    this.toggleClassName(listItem, 'promoted');
    this.save();
  },

  moveUp: function(listItem, ev) {
    if (ev) { ev.preventDefault(); }
    var student = this.findStudentFromItem(listItem);
    var oldIndex = this.students.indexOf(student);
    this.students.splice(oldIndex - 1, 0, this.students.splice(oldIndex, 1)[0]);
    if (listItem !== this.studentList.firstElementChild) {
      var previousItem = listItem.previousElementSibling;
      this.studentList.insertBefore(listItem, previousItem);
    }
    this.save();
  },

  moveDown: function(listItem, ev) {
    if (ev) { ev.preventDefault(); }
    if (listItem !== this.studentList.lastElementChild) {
      this.moveUp(listItem.nextElementSibling);
    }
    this.save();
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
