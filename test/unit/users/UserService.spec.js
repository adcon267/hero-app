describe('HeroService', function () {

  beforeEach(module('heroes'));

  it('should provide a valid hero list', inject(function (heroService, $timeout) {
    var list= [];

    heroService
      .loadAllHeroes()
      .then(function(knownHeroes){
        list = knownHeroes;
      });
    $timeout.flush();

    expect(list.length).toBe(6);
  }));

});
