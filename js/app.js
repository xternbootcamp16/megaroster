$(document).foundation()

var megaRoster = {
  students: [],
  max: 0,

  init: function(listSelector) {
    this.setupList(listSelector);
    this.setupTemplates();
    this.setupEventListeners();
    this.load();
  },

  setupList: function(selector) {
    this.studentList = $(selector);
  },

  load: function() {
    try {
      var storedRoster = localStorage.getItem('roster');
      if (storedRoster) {
        this.studentList
          .html(storedRoster)
          .find('.student').each(function(index, el) {
            this.incrementCounter($(el).data('id'));
          }.bind(this));
      }
    }
    catch(err) {
      return false;
    }
  },

  save: function() {
    try {
      localStorage.setItem('roster', this.studentList.html());
    }
    catch(err) {
      return false;
    }
  },

  setupTemplates: function() {
    this.studentItemTemplate = $('.student.template')
      .removeClass('template')
      .detach();
  },

  setupEventListeners: function() {
    var doc = $(document);
    $('form#student_form').on('submit', this.addStudentViaForm.bind(this));
    doc.on('click', '.student .edit', this.toggleEditable.bind(this));
    doc.on('click', '.student .promote', this.promote.bind(this));
    doc.on('click', '.student .move-up', this.moveUp.bind(this));
    doc.on('click', '.student .move-down', this.moveDown.bind(this));
    doc.on('click', '.student .remove', this.removeStudent.bind(this));
    doc.on('click', '.student .cancel', this.toggleEditable.bind(this));
    doc.on('submit', '.student form', this.saveStudent.bind(this));
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

  addStudent: function(student) {
    var listItem = this.buildListItem(student);
    this.incrementCounter(student.id);
    this.studentList.prepend(listItem);
    this.save();
  },

  incrementCounter: function(id) {
    if (id > this.max) {
      this.max = id;
    }
  },

  buildListItem: function(student) {
    var listItem = this.studentItemTemplate.clone();
    if(student.promoted) {
      listItem.addClass('promoted');
    }
    listItem.find('.student-name').text(student.name)
    return listItem.attr('data-id', student.id).removeClass('hide');
  },

  removeStudent: function(ev) {
    ev.preventDefault();
    var listItem = $(ev.currentTarget).closest('.student');
    listItem.remove();
    this.save();
  },

  saveStudent: function(ev) {
    ev.preventDefault();
    var listItem = $(ev.currentTarget).closest('.student');
    var studentName = listItem.find(':text').val();
    this.toggleEditable(ev);
    listItem.find('.editable').text(studentName);
    this.save();
  },

  toggleEditable: function(ev) {
    ev.preventDefault();
    var listItem = $(ev.currentTarget).closest('.student');
    var el = listItem.find('.editable');
    var editForm = listItem.find('form');
    var input = editForm.find(':text').eq(0);
    if (editForm.hasClass('hide')) {
      el.addClass('hide');
      listItem.find('.actions').addClass('hide');
      editForm.removeClass('hide');
      input.val(el.text()).focus().select();
    }
    else {
      editForm.addClass('hide')
      el.removeClass('hide');
      listItem.find('.actions').removeClass('hide');
    }
  },

  promote: function(ev) {
    ev.preventDefault();
    var listItem = $(ev.currentTarget).closest('.student');
    listItem.toggleClass('promoted');
    this.save();
  },

  moveUp: function(ev) {
    var listItem;
    if ($.isFunction(ev.preventDefault)){
      ev.preventDefault();
      listItem = $(ev.currentTarget).closest('.student');
    }
    else {
      listItem = ev;
    }
    if (listItem.prev().length > 0) {
      listItem.insertBefore(listItem.prev());
    }
    this.save();
  },

  moveDown: function(ev) {
    ev.preventDefault();
    var listItem = $(ev.currentTarget).closest('.student');
    if (listItem.next().length > 0) {
      this.moveUp(listItem.next());
    }
    this.save();
  },
};
megaRoster.init('#student_list');
