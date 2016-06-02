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
    studentList.appendChild(listItem);

    this.count += 1;
  },

  buildListItem: function(studentName) {
    var listItem = document.createElement('li');
    listItem.innerText = studentName;
    return listItem;
  },
};
megaRoster.init();
