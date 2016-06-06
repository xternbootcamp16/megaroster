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

    this.setupAjax();
    this.setupMutantAjax();
    $('.ajax-buttons .alert').on('click', function(ev) {
      ev.preventDefault();
      localStorage.clear();
      this.studentList.empty();
    }.bind(this));
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
};
