$(document).foundation()

var megaRoster = {
  init: function() {
    document.querySelector('form').onsubmit = this.addStudent;
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var studentName = this.studentName.value;
    console.log(studentName);
  }
};
megaRoster.init();
