var app = angular.module('movie_search' , []);

app.controller('myCntrl' , function ($scope , $http) {
    var type = /\btt[0-9]+/;
    $scope.suggestion = function () {
        if($scope.movieTitle.length > 3){
            console.log($scope.movieTitle + "\n");
            if(type.test($scope.movieTitle)){
                $scope.typeSearch = 'i';
            }
            else {
                $http({
                    method: "GET",
                    url: 'http://www.omdbapi.com/?apikey=ef1b9692&s=' + $scope.movieTitle
                }).then(function (response) {
                    $scope.data = response.data.Search;
                });
            }
        }
    };
    console.log($scope.typeSearch+ "-" + type.test($scope.movieTitle) );
    $scope.search = function($name_of_movie) {
        $scope.data = "";
        if(type.test($name_of_movie)){
            $scope.typeSearch = 'i';
        }
        else {
            $scope.typeSearch = 't';
        }
        $http({
            method: "GET",
            url:'http://www.omdbapi.com/?apikey=ef1b9692&' + $scope.typeSearch + '='+ $name_of_movie
        }).then(function (response) {
            $scope.selected_movie = response.data;
            //console.log(response)
            });
        document.getElementById("movie").setAttribute("style", "color:red;display:none");
    }




});