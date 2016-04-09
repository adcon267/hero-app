'use strict';

var HeroList    = require('../pages/HeroList.js');
var HeroDetails = require('../pages/HeroDetails.js');
var ContactHero = require('../pages/ContactHero.js');

describe('my app', function() {

  var heroes   = new HeroList();
  var details = new HeroDetails();
  var contact = new ContactHero();

  beforeEach(function() {
    heroes.loadAll();
  });

  it('should load a list of heroes', function() {
    expect(heroes.count()).toBeGreaterThan(1);
  });

  describe('selecting a hero', function() {

    beforeEach(function() {
      return details.contactHero();
    });

    it('should set focus on first button in the bottomsheet view', function() {
      expect( contact.buttons().count() ).toBe(4);
      expect( contact.buttons().first().getText() ).toEqual( 'PHONE' );
      expect( contact.focusedButton().getText() ).toEqual( 'PHONE' );
    });

  });
});
