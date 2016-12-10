(function() {
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.itemName = "";
        toBuyList.itemQuantity = "";

        toBuyList.addItemToBuyList = function() {
            ShoppingListCheckOffService.addItemToBuyList(toBuyList.name, toBuyList.quantity);
        }

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyList.moveItem = function($index) {
            // console.log($index);
            // console.log(toBuyList.items[$index]);
            // console.log(toBuyList.items[$index].name);
            ShoppingListCheckOffService.addItemToBoughtList(toBuyList.items[$index].name, toBuyList.items[$index].quantity);
            ShoppingListCheckOffService.removeItemFromToBuyList($index);
        };

    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.itemName = "";
        boughtList.itemQuantity = "";

        boughtList.addItemToBoughtList = function() {
            ShoppingListCheckOffService.addItemToBoughtList(boughtList.name, boughtList.quantity);
        }

        boughtList.items = ShoppingListCheckOffService.getBoughtItems();

    }


    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [{
            name: "beer",
            quantity: "8"
        },{
            name: "wine",
            quantity: "7"
        },{
            name: "banana",
            quantity: "6"
        },{
            name: "cookies",
            quantity: "10"
        }, {
            name: "cola",
            quantity: "5"
        }, {
            name: "ice cream",
            quantity: "3"
        }];

        service.getToBuyItems = function() {
            console.log(toBuyItems);
            return toBuyItems;
        };

        service.addItemToBuyList = function(itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            toBuyItems.push(item);
        };

        service.removeItemFromToBuyList = function(itemIdex) {
            toBuyItems.splice(itemIdex, 1);
        };


        var boughtItems = [];

        service.getBoughtItems = function() {
            // console.log(boughtItems);
            return boughtItems;
        };

        service.addItemToBoughtList = function(itemName, itemQuantity) {
            console.log(itemName + " " + itemQuantity);
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            boughtItems.push(item);
        };

    }


})();



