(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItemsDirective', FoundItemsDirective)
        .constant('ApiBasePath', " https://davids-restaurant.herokuapp.com");

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
        ctrl.items=[];
        var searchTerm = "";

        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

        promise.then(function(response) {
                ctrl.items = MenuSearchService.found;
                console.log(ctrl.items);
            })
            .catch(function(error) {
                console.log("Something went terribly wrong.");
            });

        ctrl.onRemove = function(index) {
            MenuSearchService.remove(index);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.found = [];

        service.getMatchedMenuItems = function(searchTerm) {
            service.found = [];
            var response = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then(

                function(response) {
                    response.data.menu_items.map(

                        function(element) {
                          console.log(element);
                            if (element.description.indexOf(searchTerm) != -1 &&
                                searchTerm != "") {
                                service.found.push(element);
                            }
                        }
                    )
                },
                function(error) {
                    console.log('error');
                });
                //console.log(response);
            return response;
        }
        service.remove = function(index) {
            service.found.splice(index, 1);
        }

        //
        //     service.getMatchedMenuItems = function(searchTerm) {
        //         var response = $http({
        //             method: "GET",
        //             url: (ApiBasePath + '/menu_items.json')
        //         });
        //
        //         console.log(response);
        //         return response;
        //
        //     };
        //
        // }
    }

})();
