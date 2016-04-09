(function() {

    angular
        .module('heroes')
        .controller('HeroController', [
            '$scope', 'heroService', '$mdSidenav', '$mdToast', '$log',
            HeroController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param heroService
     * @param $mdSidenav
     * @param $log
     * @constructor
     */
    function HeroController($scope, heroService, $mdSidenav, $mdToast, $log) {
        var self = this;

        self.selected = {
            weaknesses: [],
            powers: []
        };
        self.displayRealName = false;
        self.updating = false;
        self.addIsOpen = false;
        self.combineScreenOpen = false;
        self.heroes = [];
        self.combineHeroes = [];
        self.combineHeroPowers = [];
        self.searchText = null;
        self.selectedItem = null;
        self.selectHero = selectHero;
        self.toggleList = toggleHeroesList;
        self.heroChange = heroChange;
        self.showToast = showToast;
        self.addHero = addHero;
        self.heroSave = heroSave;
        self.heroDelete = heroDelete;
        self.combineScreen = combineScreen;
        self.querySearch = querySearch;
        self.heroCombineSave = heroCombineSave;
        self.heroPowerChange = heroPowerChange;
        self.combinePowers = combinePowers;

        // Load all heroes
        heroService
            .getAllHeroes()
            .then(function(heroes) {
                self.heroes = [].concat(heroes);
                self.selected = heroes[0];
                self.showToast('apiKey is appended to url, refresh will maintain current API Key');
            });
        
        self.apiKey = heroService.getApiKey();

        // *********************************
        // Internal methods
        // *********************************

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleHeroesList() {
            $mdSidenav('left').toggle();
        }

        /**
         * makes the selected hero active
         * @param hero either the hero object or its index
         */
        function selectHero(hero) {
            self.selected = angular.isNumber(hero) ? $scope.hero[hero] : hero;
            self.combineScreenOpen = false;
        }

        /**
         * changes have been made to the selected hero
         */
        function heroChange() {
            self.updating = true;
            heroService.updateHero(self.selected).then(function(hero) {
                //don't need the updated hero, but we can update the UI here
                self.updating = false;
                self.showToast('Hero successfully updated.');
            }).catch(function() {
                self.updating = false;
            });
        }
        
        /**
         * Saves a new hero
         */
        function heroSave() {
            self.updating = true;
            heroService.saveNewHero(self.selected, self.heroes).then(function() {
                self.updating = false;
                self.selected = self.heroes[self.heroes.length - 1];
                showToast(self.selected.hero_name + ' successfuly created');
            });
        }

        /**
         * deletes a hero, only can be used on "saved" heros
         */
        function heroDelete() {
            self.updating = true;
            heroService.deleteHero(self.selected.id).then(function() {
                self.updating = false;
                var idx = 0;
                for (var i = 0; i < self.heroes.length; i++) {
                    if (self.heroes[i].id === self.selected.id) {
                        idx = i;
                    }
                }
                self.heroes.splice(idx, 1);
                self.selected = self.heroes[0];
                showToast('hero successfuly deleted');
            });
        }

        /**
         * Used to create a new hero object and add it to the list
         */
        function addHero() {
            self.combineScreenOpen = false;
            self.displayRealName = true;
            heroService.newHero(self.heroes).then(function() {
                self.selected = self.heroes[self.heroes.length - 1];
            });
        }

        /**
         * Show a Toaster
         * @param text - text to display in toaster
         */
        function showToast(text) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .position('bottom right')
                .hideDelay(1500)
            );
        };
        
        /**
         * changes the UI to show the merge screen
         */
        function combineScreen() {
            addHero();
            self.combineScreenOpen = true;
        }

        /**
         * Used to save a merged hero
         */
        function heroCombineSave() {
            self.updating = true;
            heroService.saveNewHero(self.selected, self.heroes).then(function() {
                self.updating = false;
                self.combineScreenOpen = false;
                self.selected = self.heroes[self.heroes.length - 1];
                showToast(self.selected.hero_name + ' successfuly created');
            });
        }

        /**
         * Used for combine 2 heroes powers and weaknesses on merge
         */
        function combinePowers() {
            if (self.combineHeroes.length == 2) {
                self.combineHeroPowers.splice(0, self.combineHeroPowers.length);
                for (var i = 0; i < self.combineHeroes[0].powers.length; i++) {
                    var power = {
                        name: self.combineHeroes[0].powers[i],
                        selected: false
                    };
                    self.combineHeroPowers.push(power);
                }
                for (var i = 0; i < self.combineHeroes[1].powers.length; i++) {
                    var power = {
                        name: self.combineHeroes[1].powers[i],
                        selected: false
                    };
                    self.combineHeroPowers.push(power);
                }
                self.selected.weaknesses.splice(0, self.selected.weaknesses.length);
                for (var i = 0; i < self.combineHeroes[0].weaknesses.length; i++) {
                    self.selected.weaknesses.push(self.combineHeroes[0].weaknesses[i]);
                }
                for (var i = 0; i < self.combineHeroes[1].weaknesses.length; i++) {
                    self.selected.weaknesses.push(self.combineHeroes[1].weaknesses[i]);
                }
            }
        }

        /**
         * Used to update merged hero powers on checkbox change **this should be improved
         */
        function heroPowerChange() {
            $log.info(self.combineHeroPowers);
            self.selected.powers.splice(0, self.selected.powers.length);
            for (var i = 0; i < self.combineHeroPowers.length; i++) {
                if (self.combineHeroPowers[i].selected == true) {
                    self.selected.powers.push(self.combineHeroPowers[i].name);
                }
            }
        }
                
        /**
         * Used for autocomplete search
         * @param query - text to filter super hero names
         */
        function querySearch(query) {
            var results = [];
            for (var i = 0; i < self.heroes.length; i++) {
                if (self.heroes[i].hero_name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                    results.push(self.heroes[i]);
                }
            }

            return results;
        }

    }

})();