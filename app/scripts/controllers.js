"use strict";

/**
 * Controllers module which defines controllers.
 * @module myApp/controllers
 */
// var app = angular.module("myApp.controllers", ["ngRoute", "ngMaterial"]);
var app = angular.module("myApp.controllers", ["ngRoute"]);

// Survey controller
app.controller("welcomeCtrl", ["$scope", "FBURL", "$firebaseArray", "$location",
  //function($scope, FBURL, $firebaseArray, $ngMaterial) {
  function($scope, FBURL, $firebaseArray, $location) {

    //  var ref = new Firebase(FBURL);

    // create a synchronized array
    //  $scope.surveys = $firebaseArray(ref);
    // timestamp
    //  $scope.timestamp = new Date().getTime();

    // hide success information/alert
    //  $scope.successInfo = false;

    $("#tnc").on("show.bs.modal", function() {

      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      var modalBodyHeight = h - 90 - 136;
      $('.modal-body').height(modalBodyHeight);
      //console.log(modalBodyHeight);
    });

    // open survey modal dialog
    $scope.takeSurvey = function() {
      $("#tnc").modal("show");
    };

    $scope.go = function(path) {
      $location.path("/survey");
    };
  }
]);
// Survey controller
app.controller("surveyCtrl", ["$scope", "FBURL", "$firebaseArray",
  //function($scope, FBURL, $firebaseArray, $ngMaterial) {
  function($scope, FBURL, $firebaseArray) {

    var ref = new Firebase(FBURL);
    var $btn = $("#addButton,.sendbtn");
    var $scrollDownHint = $(".scroll-down");
    var $scrollIndex = $(".scrollIndex");
    var questionIndex = 0;
    var questionLength = 5;
    var question3initOpen = true;
    var swiperSlider;
    var errorMsg = $(".alert-danger");
    errorMsg.hide();
    $btn.hide();
    // create a synchronized array
    $scope.surveys = $firebaseArray(ref);
    // timestamp
    $scope.timestamp = new Date().getTime();

    // hide success information/alert
    $scope.successInfo = false;

    $scope.openTravelPrefer = function() {
      $("#travel").unbind('hidden');
      $("#travel").modal("show");
    }
    $scope.openDailyPrefer = function() {
      $("#daily").modal("show");
    }
    $scope.swiper = {};
    $scope.preferReward = function(option) {

      if ($scope.formData.preferReward == 'both') {
        return true;
      } else {
        return option == $scope.formData.preferReward;
      }
    }

    var atLeastChecked = function(object) {
      for (var e in object) {
        var checkBox = object[e];
        //console.log('loop',checkBox);
        if (checkBox==true){
          return true;
        }
      }
      return false;
    };
    var subCheckboxValidation = function(categoryValue,listOptions){
        if (categoryValue==true){
          return atLeastChecked(listOptions)!= true;
        } else {
          return false;
        }
    };

    $scope.travelValidation = function() {
      var parentCheckStatus = [
        $scope['travelForm']['categoryTravel-1']['$viewValue'],
        $scope['travelForm']['categoryTravel-2']['$viewValue'],
        $scope['travelForm']['categoryTravel-3']['$viewValue'],
        $scope['travelForm']['categoryTravel-4']['$viewValue'],
        $scope['travelForm']['categoryTravel-5']['$viewValue'],
        $scope['travelForm']['categoryTravel-6']['$viewValue'],
        $scope['travelForm']['categoryTravel-7']['$viewValue']
      ];
      var subCheckBox1 = [
        $scope['travelForm']['travelInsuranceType1']['$viewValue'],
        $scope['travelForm']['travelInsuranceType2']['$viewValue'],
        $scope['travelForm']['travelInsuranceType3']['$viewValue']
      ];
      var subCheckBox2 = [
        $scope['travelForm']['travelAccessoryType1']['$viewValue'],
        $scope['travelForm']['travelAccessoryType2']['$viewValue'],
        $scope['travelForm']['travelAccessoryType3']['$viewValue']
      ];

      var parentCheckboxReturn = !atLeastChecked(parentCheckStatus);
      var subCheckBox1Return = subCheckboxValidation($scope['travelForm']['categoryTravel-4']['$viewValue'],subCheckBox1);
      var subCheckBox2Return = subCheckboxValidation($scope['travelForm']['categoryTravel-5']['$viewValue'],subCheckBox2);
      var dependencyReturn = $scope.travelForm.$invalid;
      var finalReturn = dependencyReturn || parentCheckboxReturn || subCheckBox1Return || subCheckBox2Return;
      return finalReturn;

    };

    $scope.dailyValidation = function() {
      var parentCheckStatus = [
        $scope['dailyForm']['categoryDaily-1']['$viewValue'],
        $scope['dailyForm']['categoryDaily-2']['$viewValue'],
        $scope['dailyForm']['categoryDaily-3']['$viewValue'],
        $scope['dailyForm']['categoryDaily-4']['$viewValue'],
        $scope['dailyForm']['categoryDaily-5']['$viewValue'],
        $scope['dailyForm']['categoryDaily-6']['$viewValue'],
        $scope['dailyForm']['categoryDaily-7']['$viewValue']
      ];
      var subCheckBox1 = [
        $scope['dailyForm']['dailyConsumption1']['$viewValue'],
        $scope['dailyForm']['dailyConsumption2']['$viewValue'],
        $scope['dailyForm']['dailyConsumption3']['$viewValue']
      ];
      var subCheckBox2 = [
        $scope['dailyForm']['dailyFoodHealth1']['$viewValue'],
        $scope['dailyForm']['dailyFoodHealth2']['$viewValue'],
        $scope['dailyForm']['dailyFoodHealth3']['$viewValue']
      ];
      var subCheckBox3 = [
        $scope['dailyForm']['dailyEntertainment1']['$viewValue'],
        $scope['dailyForm']['dailyEntertainment2']['$viewValue'],
        $scope['dailyForm']['dailyEntertainment3']['$viewValue'],
        $scope['dailyForm']['dailyEntertainment4']['$viewValue'],
        $scope['dailyForm']['dailyEntertainment5']['$viewValue']
      ];
      var subCheckBox4 = [
        $scope['dailyForm']['dailySelfimprovement1']['$viewValue'],
        $scope['dailyForm']['dailySelfimprovement2']['$viewValue'],
        $scope['dailyForm']['dailySelfimprovement3']['$viewValue'],
        $scope['dailyForm']['dailySelfimprovement4']['$viewValue']
      ];

      var parentCheckboxReturn = !atLeastChecked(parentCheckStatus);
      var subCheckBox1Return = subCheckboxValidation($scope['dailyForm']['categoryDaily-2']['$viewValue'],subCheckBox1);
      var subCheckBox2Return = subCheckboxValidation($scope['dailyForm']['categoryDaily-3']['$viewValue'],subCheckBox2);
      var subCheckBox3Return = subCheckboxValidation($scope['dailyForm']['categoryDaily-4']['$viewValue'],subCheckBox3);
      var subCheckBox4Return = subCheckboxValidation($scope['dailyForm']['categoryDaily-5']['$viewValue'],subCheckBox4);
      var dependencyReturn = $scope.dailyForm.$invalid;
      var finalReturn = dependencyReturn || parentCheckboxReturn || subCheckBox1Return || subCheckBox2Return || subCheckBox3Return || subCheckBox4Return;

      return finalReturn;
    };

    $scope.onReadySurvey = function(swiper, to) {
      swiper.on('onReachEnd', function() {
        $scrollDownHint.hide();
        $btn.show();
      });

      swiper.on('onSlideChangeEnd', function(swiper) {

        if ($scope.formData.memberType == "") {
          swiper.slideTo(0);
          $('.swiper-slide-active').addClass('error-quiz');
        } else if ($scope.formData.preferReward == "" && swiper.activeIndex > 1) {
          swiper.slideTo(1);
          $('.swiper-slide-active').addClass('error-quiz');
        } else if ($scope.formData.preferTreatment == "" && swiper.activeIndex > 3) {
          swiper.slideTo(3);
          $('.swiper-slide-active').addClass('error-quiz');
        }
      })
      swiper.on('onSlideChangeStart', function(swiper) {

        questionIndex = swiper.activeIndex + 1;
        errorMsg.hide();

        if (questionIndex == 3 && question3initOpen == true) {

          if ($scope.formData.preferReward == "travel") {
            $("#travel").unbind('hidden');
            $("#travel").modal("show");
            $("#travel").on('hidden.bs.modal', function(e) {
              swiper.slideTo(3);
            });
            question3initOpen = false;
          }
          if ($scope.formData.preferReward == "daily") {
            $("#daily").unbind('hidden');
            $("#daily").modal("show");
            $("#daily").on('hidden.bs.modal', function(e) {
              swiper.slideTo(3);
            });
            question3initOpen = false;
          }
          if ($scope.formData.preferReward == "both") {
            $("#travel").modal("show");
            $("#travel").on('hidden.bs.modal', function(e) {
              $("#daily").modal("show");
            });
            $("#daily").on('hidden.bs.modal', function(e) {
              swiper.slideTo(3);
            });
            question3initOpen = false;
          }
        }

        if (questionIndex < swiper.slides.length) {
               $scrollDownHint.show();
               $btn.hide();
               $scrollIndex.text(questionIndex);
             } else if (questionIndex == swiper.slides.length) {
               $scrollIndex.text(questionIndex);
             }

      });
    };

    // store data in this object
    // and set default values
    $scope.formData = {
      "name": "",
      "memberId": "",
      "phoneNumber": "",
      "memberType": "",
      "preferReward": '',
      "preferTreatment": "",
      "timestamp": $scope.timestamp
    };


    /**
     * Update rating score to object.
     * @param {Number} rating - Star rating score.
     */
    $scope.updateRating = function(rating) {
      $scope.formData.rating = rating;
    };

    $scope.isTrue = function(checkOption) {
      //console.log(checkOption);
      return $scope.formData[checkOption]; // or a more complex check

    }

    $scope.lastQuestion = function() {
        //console.log(questionIndex == questionLength);
        return questionIndex == questionLength;
      }
      /**
       * Add survey to Firebase database.
       */
    $scope.addSurvey = function() {
      if ($scope.formData.name) {

        // change button to loading state
        $btn.button("loading");

        // push data to Firebase
        $scope.surveys.$add($scope.formData).then(function() {

          // reset button loading state
          // $btn.button("reset");
          $btn.button("reset").hide();
          // show success information/alert
          $scope.successInfo = true;

          //clean app views
          $(".swiper-container,hr,h4.modal-title").hide();
          // dismiss survey modal dialog
          $("#survey").modal("hide");
          $("#contactInfo").modal("hide");


        }).catch(function(error) {
          alert("请正确填写您的联系信息");
          $("#contactInfo").modal("show");
        });

      } else {
        //alert("请正确填写您的联系信息");
        $("#contactInfo").modal("show");
        $("#contactInfo").addClass('highlight');
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


// angular.module('swiperApp')
//   .controller('TestCtrl', function($scope){
//
//
//
//   });
