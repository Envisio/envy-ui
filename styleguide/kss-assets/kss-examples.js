(function (window, document) {
  'use strict';

  var KssExamples = function (config) {
    this.bodyClass = config.bodyClass || 'kss-examples-on';

    this.init();
  };

  KssExamples.prototype.init = function () {
    var self = this;
    this.bodyNode = document.getElementsByTagName('body')[0];
    // this.bodyNode.classList.add('kss-examples-on');
    this.bgModesClasses = ['kss-examples-off', 'kss-examples-on'];
    this.currentClass = 0;
    // Initialize all guides toggle buttons.
    var elementList = document.querySelectorAll('a[data-kss-examples]');
    for (var button of elementList) {
      button.onclick = self.showExamples.bind(self);
    }
  };

  // Toggle the guides mode.
  KssExamples.prototype.showExamples = function (e) {
    e.preventDefault();

    if (this.currentClass < this.bgModesClasses.length - 1) {
      this.currentClass++;
    } else {
      this.currentClass = 0;
    }

    this.bodyNode.classList.toggle('kss-examples-off');
    $('.kss-js-bg-example').toggleClass('env-a-hide');
    // this.bodyNode.classList.add(this.bgModesClasses[this.currentClass]);
  };

  // Export to DOM global space.
  window.KssExamples = KssExamples;

})(window, document);
