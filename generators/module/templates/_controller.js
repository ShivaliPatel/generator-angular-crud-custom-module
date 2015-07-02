/**
 * Created by Shivali on 6/30/15.
 */

angular.module('<%= moduleName %>')
    .controller('<%= moduleName %>Ctrl', ["$scope", "$rootScope", "<%= moduleName %>Services", function ($scope, $rootScope,<%= moduleName %>Services) {

        $scope.current<%= moduleName %>= {};
        $scope.<%= module%>Fields=<%= fields%>;

        // retrieve <%= moduleName %> to server
        $scope.retrieve<%= moduleName%>s = (function(){
            <%= moduleName %>Services.retrieve<%= moduleName %>s()
                .then(function(result){
                    $rootScope.<%= moduleVariable %> = result;
                    },function(error){
                        alert(error);
                    })
            })();


        $scope.openAdd<%=moduleName %>=function(){
            $scope.current<%= moduleName %>= {};
            $('#add<%= moduleName%>.modal').modal('show');
        }

        // save <%= moduleName %> to server
        $scope.save<%= moduleName %> = function(){
            <%= moduleName %>Services.save<%= moduleName %>($scope.current<%= moduleName %>)
            .then(function(result){
                    $rootScope.<%= moduleVariable%>.push(result);
                },function(error){
                    alert(error);
                })
        }

        $scope.openUpdate<%=moduleName %>=function(data){
            $scope.current<%=moduleName %>=angular.copy(data);
            $('#update<%= moduleName%>.modal').modal('show');
        }

        //update data to server
        $scope.update<%= moduleName %> = function(){
            <%= moduleName %>Services.update<%= moduleName %>($scope.current<%= moduleName %>)
            .then(function(result){
                for(var key in $rootScope.<%= moduleVariable%>){
                    if(result.id==$rootScope.<%= moduleVariable%>[key].id)
                        $rootScope.<%= moduleVariable%>[key] = result;
                }
                },function(error){
                    alert(error);
                })
        }

        $scope.openDelete<%=moduleName %>=function(data){
            $scope.current<%=moduleName %>=angular.copy(data);
            $('#delete<%= moduleName%>.modal').modal('show');
        }

        //delete data to server
        $scope.delete<%= moduleName %> = function(){
                <%= moduleName %>Services.delete<%= moduleName %>($scope.current<%= moduleName %>.id)
                .then(function(result){
                    for(var key in $rootScope.<%= moduleVariable%>){
                        if($scope.current<%= moduleName %>.id==$rootScope.<%= moduleVariable%>[key].id){
                            $rootScope.<%= moduleVariable%>.splice(key,1);
                            break;
                        }
                }
                },function(error){
                    alert(error);
                })
        }

        $scope.empty<%=moduleName %> = function(){
            $scope.current<%=moduleName %>={};
        }
    }]);