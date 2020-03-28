(function (window, document) {
  'use strict';

  var KssGuides = function (config) {
    this.bodyClass = config.bodyClass || 'kss-guides-mode';

    this.init();
  };

  KssGuides.prototype.init = function () {
    var self = this;
    this.bodyNode = document.getElementsByTagName('body')[0];
    this.bgModesClasses = ['kss-guides-none', 'kss-guides-mode', 'kss-guides-light-bg-mode', 'kss-guides-dark-bg-mode'];
    console.log('init');
    this.currentClass = 0;
    // Initialize all guides toggle buttons.
    var elementList = document.querySelectorAll('a[data-kss-guides]');
    for (var button of elementList) {
      button.onclick = self.showGuides.bind(self);
    }
  };

  // Toggle the guides mode.
  KssGuides.prototype.showGuides = function (e) {
    e.preventDefault();

    if (this.currentClass < this.bgModesClasses.length - 1) {
      this.currentClass++;
    } else {
      this.currentClass = 0;
    }

    this.bodyNode.classList.remove(...this.bgModesClasses);
    this.bodyNode.classList.add(this.bgModesClasses[this.currentClass]);
  };

  // Export to DOM global space.
  window.KssGuides = KssGuides;

})(window, document);
