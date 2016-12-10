(function () {

  'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.inputList = "";
    $scope.splittedList;
    $scope.messageToDisplay = "";

  $scope.splittedList = function  (){
        if (!$scope.inputList || !$scope.inputList.length) $scope.messageToDisplay = "Please enter data first";
        splitString($scope.inputList,',');
        countSplittedList();
  }

    function splitString(inputList,separator){
        //console.log(inputList);
        var splittedList = inputList.split(separator);
        //console.log(splittedList);
        $scope.splittedList = splittedList;
    }

    function countSplittedList(){
        var count = $scope.splittedList.length;
        console.log(count);
        if ($scope.splittedList[0].length == 0) return;
        if (count < 4 && count > 0) $scope.messageToDisplay = "Enjoy!";
        if (count >= 4) $scope.messageToDisplay = "Too much!";
    }

  }

})();
