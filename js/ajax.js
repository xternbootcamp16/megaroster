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

  setupMutantAjax: function() {
    $('a[data-remote-mutants="true"]').on('click', function(ev) {
      ev.preventDefault();
      $.ajax({
        url: $(ev.currentTarget).attr('href'),
        method: 'get',
        success: function(data) {
          this.loadMutants(data);
        }.bind(this)
      })
    }.bind(megaRoster));
  },

  loadMutants: function(data) {
    $.each(data, function(i, mutant) {
      this.addStudent({
        name: mutant.mutant_name + ' (' + mutant.power + ')',
        id: mutant.id
      });
    }.bind(this));
  },

  loadResults: function(data) {
    if (data.students) {
      $.each(data.students, function(index, student) {
        this.addStudent(student, true);
      }.bind(this));
    }
  },
});
