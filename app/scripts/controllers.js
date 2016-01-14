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
   function($scope, FBURL, $firebaseArray,$location) {

    //  var ref = new Firebase(FBURL);

     // create a synchronized array
    //  $scope.surveys = $firebaseArray(ref);
     // timestamp
    //  $scope.timestamp = new Date().getTime();

     // hide success information/alert
    //  $scope.successInfo = false;

      $("#tnc").on("shown.bs.modal",function(){

        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var modalBodyHeight = h - $('.modal-header').outerHeight()-130;
         $('.modal-body').height(modalBodyHeight);
        //console.log(modalBodyHeight);
      });

     // open survey modal dialog
     $scope.takeSurvey = function() {
       $("#tnc").modal("show");
     };

     $scope.go = function ( path ) {
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


    $btn.hide();
    // create a synchronized array
    $scope.surveys = $firebaseArray(ref);
    // timestamp
    $scope.timestamp = new Date().getTime();

    // hide success information/alert
    $scope.successInfo = false;


    //$("#travel").modal("show");

    //debug
    $("#contactInfo").modal("show");

    $scope.openTravelPrefer = function(){
      $("#travel").unbind('hidden');
      $("#travel").modal("show");
    }
    $scope.openDailyPrefer = function(){
      $("#daily").modal("show");
    }
    $scope.swiper = {};
    $scope.preferReward = function(option){

      if ( $scope.formData.preferReward == 'both') {
        return true;
      } else {
        return option == $scope.formData.preferReward;
      }
    }


    $scope.onReadySurvey = function (swiper,to) {

      swiper.on('onReachEnd',function(){
        //console.log('last question');
        $scrollDownHint.hide();
        $btn.show();
      })
      swiper.on('onSlideChangeStart', function (swiper) {
        //console.log('slideChangeStart',swiper.index);
        //$scrollDownHint.show();

        questionIndex = swiper.activeIndex+1;


        if (questionIndex==3 && question3initOpen==true) {
          question3initOpen = false;
          if ($scope.formData.preferReward=="travel"){
            $("#travel").unbind('hidden');
            $("#travel").modal("show");
            $("#travel").on('hidden.bs.modal',function(e){
              swiper.slideTo(3);
            });
          }
          if ($scope.formData.preferReward=="daily"){
            $("#daily").unbind('hidden');
            $("#daily").modal("show");
            $("#daily").on('hidden.bs.modal',function(e){
              swiper.slideTo(3);
            });
          }
          if ($scope.formData.preferReward=="both"){
            $("#travel").modal("show");
            $("#travel").on('hidden.bs.modal',function(e){
              $("#daily").modal("show");
            });
            $("#daily").on('hidden.bs.modal',function(e){
              swiper.slideTo(3);
            });
          }
        }
        if(questionIndex<swiper.slides.length){
          $scrollDownHint.show();
            $btn.hide();
            $scrollIndex.text(questionIndex);
          }else if(questionIndex == swiper.slides.length) {
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
      "preferReward": 'travel',
      "preferTreatment":"both",
      "comment": "eg.vip免费送.....",
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

    $scope.lastQuestion = function(){
      //console.log(questionIndex == questionLength);
      return questionIndex == questionLength;
    }
    /**
     * Add survey to Firebase database.
     */
    $scope.addSurvey = function() {
      if ($scope.formData.name && $scope.formData.memberId != "" && $scope.formData.phoneNumber != "" ) {

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


        }).catch(function(error){
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
