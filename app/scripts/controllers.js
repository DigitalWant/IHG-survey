"use strict";

/**
 * Controllers module which defines controllers.
 * @module myApp/controllers
 */
 // var app = angular.module("myApp.controllers", ["ngRoute", "ngMaterial"]);
 var app = angular.module("myApp.controllers", ["ngRoute"]);

// Survey controller
app.controller("surveyCtrl", ["$scope", "FBURL", "$firebaseArray",
//function($scope, FBURL, $firebaseArray, $ngMaterial) {
  function($scope, FBURL, $firebaseArray) {

    var ref = new Firebase(FBURL);
    // create a synchronized array
    $scope.surveys = $firebaseArray(ref);
    // timestamp
    $scope.timestamp = new Date().getTime();

    // hide success information/alert
    $scope.successInfo = false;

    // open survey modal dialog
    $scope.takeSurvey = function() {
      $("#tnc").modal("show");
      $("#tnc").on('hidden.bs.modal',function(){
        $("#survey").modal("show");
      })
    };
    $scope.surveyStart = function() {

        //$("#survey").modal("show");
    }
    // console.log($scope);
    //
    //
    //     $scope.onSwipeLeft = function(ev) {
    //       alert('You swiped left!!');
    //     };
    //     $scope.onSwipeRight = function(ev) {
    //       alert('You swiped right!!');
    //     };
    //     $scope.onSwipeUp = function(ev) {
    //       alert('You swiped up!!');
    //     };
    //     $scope.onSwipeDown = function(ev) {
    //       alert('You swiped down!!');
    //     };
      // store data in this object
      // and set default values
    $scope.formData = {
      "name": "Your Name",
      "age": "30-",
      "colors": {
        "red": false,
        "blue": true,
        "green": false
      },
      "lunch": true,
      "rating": 5,
      "comment": "Thank you.",
      "timestamp": $scope.timestamp
    };

    /**
     * Update rating score to object.
     * @param {Number} rating - Star rating score.
     */
    $scope.updateRating = function(rating) {
      $scope.formData.rating = rating;
    };

    /**
     * Add survey to Firebase database.
     */
    $scope.addSurvey = function() {
      if ($scope.formData.name) {

        // change button to loading state
        var $btn = $("#addButton").button("loading");

        // push data to Firebase
        $scope.surveys.$add($scope.formData).then(function() {
          // dismiss survey modal dialog
          $("#survey").modal("hide");
          // reset button loading state
          $btn.button("reset");
          // show success information/alert
          $scope.successInfo = true;
        });
      } else {
        alert("Please input the name.");
      }
    };

  }
]);

// Login controller
app.controller("loginCtrl", ["$scope", "$location", "Auth",
  function($scope, $location, Auth) {

    // temporary email and password placeholder
    $scope.email = "admin@mydomain.com";
    $scope.password = "password";

    /**
     * Login into app and redirect to result page
     */
    $scope.login = function() {

      $scope.authData = null;
      $scope.error = null;

      // change button to loading state
      var $btn = $("#loginButton").button("loading");

      // authentication using an email / password combination
      Auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(authData) {
        // the data contains all auth info
        $scope.authData = authData;
        // redirect to result page after successful login
        $location.path("/result");
        // reset button loading state
        $btn.button("reset");
      }).catch(function(error) {
        // catch and display error if login fails
        $scope.error = error;
        // reset button loading state
        $btn.button("reset");
      });

    };
  }
]);

// Result controller
app.controller("resultCtrl", ["$scope", "FBURL", "$firebaseArray",
  function($scope, FBURL, $firebaseArray) {

    var ref = new Firebase(FBURL);
    // download the data into local object
    $scope.results = $firebaseArray(ref);
  }
]);
// app.controller("demoSwipeCtrl", ["$scope",
//   function($scope) {
//     $scope.onSwipeLeft = function(ev) {
//       alert('You swiped left!!');
//     };
//     $scope.onSwipeRight = function(ev) {
//       alert('You swiped right!!');
//     };
//     $scope.onSwipeUp = function(ev) {
//       alert('You swiped up!!');
//     };
//     $scope.onSwipeDown = function(ev) {
//       alert('You swiped down!!');
//     };
//   }
// ]);
