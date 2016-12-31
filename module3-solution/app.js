(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItemsDirective', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        //var ctrl.status="true";

        var searchTerm = "chicken";

        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

        promise.then(function(response) {
                ctrl.found = response.data;
                console.log(ctrl.found);
            })
            .catch(function(error) {
                console.log("Something went terribly wrong.");
            });

        ctrl.onRemove = function(index) {
            ctrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            });

            console.log(response);
            return response;

        };

    }

})();
