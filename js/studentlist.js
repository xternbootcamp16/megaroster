$.extend(megaRoster, {
  addStudent: function(student, append) {
    var listItem = this.buildListItem(student);
    this.incrementCounter(student.id);
    if (append) {
      this.studentList.append(listItem)
    }
    else {
      this.studentList.prepend(listItem);
    }
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
});
