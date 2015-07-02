/**
 * Created by Shivali on 6/30/15.
 */

angular.module('<%= moduleName %>')
    .factory('<%= moduleName %>Services',["$http","$q",function ($http,$q) {
        return {
            retrieve<%= moduleName %>s:function(){

                var defer=$q.defer();
                $http.get("<%= module %>")
                    .success(function(result){defer.resolve(result)})
                    .error(function(error){defer.reject(error)});
                return defer.promise;
            },
            save<%= moduleName %>:function(<%= moduleName %>Obj){

                var defer=$q.defer();
                $http.post("<%= module %>",<%= moduleName %>Obj)
                    .success(function(result){defer.resolve(result)})
                    .error(function(error){defer.reject(error)});
                return defer.promise;
            },
            update<%= moduleName %>:function(<%= moduleName %>Obj){

                var defer=$q.defer();
                $http.put("<%= module %>/"+<%= moduleName %>Obj.id,<%= moduleName %>Obj)
                    .success(function(result){defer.resolve(result)})
                    .error(function(error){defer.reject(error)});

                return defer.promise;
            },
            delete<%= moduleName %>:function(id){

                var defer=$q.defer();
                $http.delete("<%= module %>/"+id)
                    .success(function(result){defer.resolve(result)})
                    .error(function(error){defer.reject(error)});

                return defer.promise;
            },
            retrieve<%= moduleName %>ById:function(id){

                var defer=$q.defer();
                $http.get("<%= module %>/"+id)
                    .success(function(result){defer.resolve(result)})
                    .error(function(error){defer.reject(error)});
                return defer.promise;
            }
        }
    }]);