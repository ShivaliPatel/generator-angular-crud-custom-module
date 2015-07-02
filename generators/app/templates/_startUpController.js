/**
 * Created by Shivali on 7/1/15.
 */

angular.module('<%= appName %>')
    .controller('StartUpCtrl',["$scope","$rootScope", function ($scope,$rootScope) {

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                $rootScope.currentState=toState;
            })


    }])