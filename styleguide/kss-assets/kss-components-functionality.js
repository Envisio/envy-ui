(function (window, document) {
  'use strict';

  const indeterminateCheckboxes = document.getElementsByName("indeterminate-checkbox");

  if (indeterminateCheckboxes) {
    indeterminateCheckboxes.forEach(element => element.indeterminate = true);
    console.log();
  }

  // console.log('run something');

  const $envJsHomepageCardBlockCollapser = $(".env-js-homepage-card-block-collapser");

  $envJsHomepageCardBlockCollapser.each(function() {
    var $this = $(this);
    var $card = $this.next().find(".env-card");
    var $lastItem = $card.find(".env-js-last-item-in-homepage-card");
    // console.log($lastItem.position().left, $card.width());
    if ($lastItem.position().left < $card.width()) {
      // console.log('-------------');
      $this.find('.env-js-homepage-collapser').hide();
    }
  })

  if ($envJsHomepageCardBlockCollapser.length) {
    $envJsHomepageCardBlockCollapser.on("click", function() {
      $(this).find(".env-collapser").toggleClass("env-collapser--top");
      $(this).next().find(".env-card").toggleClass("env-a-f-wrap");
    });
  }

})(window, document);
