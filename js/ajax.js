$.extend(megaRoster, {
  setupAjax: function() {
    $('a[data-remote="true"]').on('click', function(ev) {
      ev.preventDefault();
      $.ajax({
        url: $(ev.currentTarget).attr('href'),
        method: 'get',
        dataType: 'jsonp',
        jsonpCallback: "callback",
        context: this,
        success: function(data) {
          this.loadResults(data);
        }
      });
    }.bind(megaRoster));
  },

  loadResults: function(data) {
    if (data.students) {
      $.each(data.students, function(index, student) {
        this.addStudent(student, true);
      }.bind(this));
    }
  },
});
