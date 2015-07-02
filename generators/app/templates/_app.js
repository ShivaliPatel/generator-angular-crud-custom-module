/**
 * Created by Shivali on 6/29/15.
 */
<% if(modules)  {%>
    <% modules.forEach(function(module){ %>
        angular.module("<%= module.moduleName %>",[]);
    <% }) %>
<% }%>

angular.module("<%= appName %>", ["ui.router","formly","formlyBootstrap"<% if(modules)  {%>
    <% modules.forEach(function(module){ %>
        ,"<%= module.moduleName %>"
    <% }) %>
<% }%>
])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        <% if(modules)  {%>
            $stateProvider
            <% modules.forEach(function(module){ %>
                .state("<%= module.moduleName %>",{
                    url: "/<%= module.moduleVariable %>",
                    templateUrl: "<%= module.relativePath  %>/<%= module.module %>/views/<%= module.moduleVariable %>.html",
                    controller: "<%= module.moduleName %>Ctrl"
                    })
            <% }) %>
         <% }%>
        <% if(modules.length)  {%>
            $urlRouterProvider.otherwise("/<%= modules[0].moduleVariable %>");
        <% }else{ %>
            $urlRouterProvider.otherwise("/");
        <% } %>
    }]);

