var HeroDetails = function() {
  this.load = function() { browser.get('/#'); };

  this.contactHero = function() {
    $('button.contact').click();
  };

};

module.exports = HeroDetails;

