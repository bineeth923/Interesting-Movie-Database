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
        else {
            $scope.data = "";
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
            $scope.movieTitle = response.data.Title;
            console.log(response.data.Title)
            });
        // $(window).scroll(function () {
        //     $(".suggestion_card").each(function (i) {
        //         var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        //         var bottom_of_window = $(window).scrollTop() + $(window).height();
        //         console.log(bottom_of_object + ": " + bottom_of_window + "\n");
        //         if( bottom_of_window > bottom_of_object ){
        //             $(this).animate({'opacity':'1'},500);
        //         }
        //     })
        // });
        document.getElementById("movie").setAttribute("style","display:inherit")
    }
});

app.directive("ani" , function () {
    return {
        compile: function (tElement, tAttributes) {
            $(tElement).animate({'opacity': '1', 'top': '20px'}, 'slow');
        }
    }
});