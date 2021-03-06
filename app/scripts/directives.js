"use strict";

/**
 * Directives module which defines directives for application.
 * @module myApp/directives
 */
angular.module("myApp.directives", ["ngRoute",'ksSwiper'])

    /**
     * btnRadio directive
     * angular-ui/bootstrap/src/buttons
     * @copyright Angular-UI team 2014
     */
    .constant("buttonConfig", {
        activeClass: "active",
        toggleEvent: "click"
    })
    .directive("btnRadio", ["buttonConfig", function (buttonConfig) {
        var activeClass = buttonConfig.activeClass || "active";
        var toggleEvent = buttonConfig.toggleEvent || "click";

        return {
            require: "ngModel",
            link: function (scope, element, attrs, ngModelCtrl) {


                //model -> UI
                ngModelCtrl.$render = function () {
                    element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, attrs.btnRadio));
                  //  console.log(element,ngModelCtrl.$modelValue,scope.$eval(attrs.btnRadio),attrs.btnRadio);

                };

                // ui->model
                element.bind(toggleEvent, function () {
                    if (!element.hasClass(activeClass)) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(attrs.btnRadio);
                            ngModelCtrl.$render();
                        });
                    }
                    //console.log(element);

                });


            }
        };
    }])

    /**
     * rating directive
     * Fundoo-Solutions/angularjs-tutorials
     * @copyright Fundoo Solutions 2014
     */
    .directive("starRating", function () {
        return {
            restrict: "A",
            template: "<ul class='rating'>" +
                "<li ng-repeat='star in stars' ng-click='toggle($index)'>" +
                "<span class='glyphicon' ng-class='{\"glyphicon-star\": star.filled, \"glyphicon-star-empty\": !star.filled}'></span>" +
                "</li>" +
                "</ul>",
            scope: {
                ratingValue: "=",
                max: "=",
                readonly: "@",
                onRatingSelected: "&"
            },
            link: function (scope, elem, attrs) {

                var updateStars = function() {
                    scope.stars = [];
                    for (var  i = 0; i < scope.max; i++) {
                        scope.stars.push({filled: i < scope.ratingValue});
                    }
                };

                scope.toggle = function(index) {
                    if (scope.readonly && scope.readonly === "true") {
                        return;
                    }
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({rating: index + 1});
                };

                scope.$watch("ratingValue", function(oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        };
    })
    .directive("ksSwiperContainer",function(){
      return {
        restrict:'AE',
        replace:true,
        link: function ($scope, elem, attrs) {
          // scope.swipe.startAutoplay();
          //console.log(scope);
          var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          var slideH = h - 190;
          elem.children('.swiper-container').css({'height':slideH+'px'});
          // $scope.$watch('formData.quiz1', function(newValue, oldValue) {
          //   //scope.counter = scope.counter + 1;''
          //   console.log(newValue,oldValue);
          // });
        }
      }
    });
