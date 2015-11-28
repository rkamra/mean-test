/**
 * Created by rishikamra on 11/15/15.
*/

angular.module('myApp',[])
    .controller('AppCtrl', ['$scope','$http', function($scope,$http){

        console.log("Hello World from the controller");

        var controller = this;
        $scope.contact = {};

        this.refresh = function() {
            $http.get('/contactlist').success(function (data) {
                $scope.contactlist = data;
            });
        };

        $scope.addContact = function(){
            console.log($scope.contact);

            $http.post('/contactlist',$scope.contact).success(function(response){
               controller.refresh();
            });

            $scope.contact = {}; //Clear off the contact object
        };

        $scope.removeContact = function(contactId){
            $http.delete('/contactlist/' + contactId).success(function(response){
                controller.refresh();
            });
        };

        $scope.editContact = function(contactId){
            $http.get('/contactlist/' + contactId).success(function(response){
               console.log(response);
                $scope.contact = response;
            });
        };

        $scope.updateContact = function(){
            console.log("Updating contact with id " + $scope.contact._id);
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(){
                controller.refresh();
                $scope.contact = {};
            });
        };


        //inline code not under any function
        this.refresh();

    }]);
