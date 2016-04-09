(function() {
    'use strict';

    angular.module('heroes')
        .service('heroService', ['$q', '$http', '$log','$location', HeroService]);

    /**
     * Heroes DataService
     * Connects to Hero Api
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function HeroService($q, $http, $log, $location) {
        var apiKey = '4d1fcfd9';
        var apiUrl = '//hero-merge.herokuapp.com/';
        var heroDefer = $q.defer();

        function getApiKey() {
            return apiKey;
        }

        function _loadHeroes() {
            if ($location.url() > '')
                {
                    apiKey = $location.url().slice(1);
                }
            $http({
                method: 'GET',
                url: apiUrl + apiKey + '/heroes'
            }).then(function successCallback(response) {
                //response.data represents the array of heroes 
                $log.info(response);
                heroDefer.resolve(response.data);
                $location.url(apiKey);
            }, function errorCallback(response) {
                //this is happening usually when the APIKey is no longer valid, let's update it.
                $log.warn('api Key not valid, generating temp. Update code if you want it to persist')
                _updateAPIKey();
            });
        }

        function _updateAPIKey() {
            $http({
                method: 'GET',
                url: apiUrl + 'getApiKey'
            }).then(function successCallback(response) {
                $log.info('api Key: ', response);
                apiKey = response.data.apiKey;
                _loadHeroes();
            }, function errorCallback(response) {
                //not the API Key, maybe the API is down, connection issue?
                $log.error('cannot retrieve API Key, check network');
                heroDefer.reject(response);
            });
        }

        _loadHeroes();

        function getAllHeroes() {
            return heroDefer.promise;
        }

        function updateHero(hero) {
            var updateDefer = $q.defer();
            if (hero.id) {
                $http({
                    method: 'PATCH',
                    url: apiUrl + apiKey + '/heroes/' + hero.id,
                    data: hero
                }).then(function successCallback(response) {
                    $log.info('successful update', response);
                    updateDefer.resolve(response.data);
                }, function errorCallback(response) {
                    updateDefer.reject(response.data);
                    $log.error('error updating', response);
                });

            } else {
                //is this hero valid? we should create it here
                updateDefer.reject();
            }
            return updateDefer.promise;
        }

        function newHero(heroList) {
            var hero = new Hero();
            heroList.push(hero);

            return $q.when(hero);
        }

        function saveNewHero(hero, heroList) {
            var saveDefer = $q.defer();
            $http({
                method: 'POST',
                url: apiUrl + apiKey + '/heroes',
                data: hero
            }).then(function successCallback(response) {
                $log.info('successful create', response);
                heroList.pop();
                heroList.push(response.data);
                saveDefer.resolve(response.data);
            }, function errorCallback(response) {
                saveDefer.reject(response.data);
                $log.error('error creating', response);
            });
            return saveDefer.promise;
        }

        function deleteHero(id) {
            var deleteDefer = $q.defer();
            $http({
                method: 'DELETE',
                url: apiUrl + apiKey + '/heroes/' + id
            }).then(function successCallback(response) {
                $log.info('successful delete', response);
                deleteDefer.resolve(response.data);
            }, function errorCallback(response) {
                deleteDefer.reject(response.data);
                $log.error('error deleting', response);
            });
            return deleteDefer.promise;
        }

        function Hero() {
            this.hero_name = '';
            this.real_name = '';
            this.gender = '';
            this.attributes = {
                combat: 1,
                durability: 1,
                intelligence: 1,
                power: 1,
                speed: 1,
                strength: 1
            };
            this.powers = [];
            this.weaknesses = [];
        }


        return {
            getAllHeroes: getAllHeroes,
            updateHero: updateHero,
            newHero: newHero,
            saveNewHero: saveNewHero,
            deleteHero: deleteHero,
            getApiKey: getApiKey
        };
    }

})();