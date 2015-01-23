'use strict';
angular.module('np', 
	((np.mock ? 'npMocks, ':'')+'ngRoute, npSearch, npVisualize, npPolicy, npUtil').split(/,\s*/)
)
.run(function($templateCache, $rootScope, $window){
	// NOTE invalid templates end up loading the original document (index.html) which has the loading message.
	$rootScope.windowWidth = $window.innerWidth;
	angular.element($window).on('resize',function(e){
		$rootScope.windowWidth = $window.innerWidth;
//		$rootScope.$apply('windowWidth');
	});
	// resize usage: $rootScope.$watch('windowWidth',function(newVal, oldVal){ ... });
	var path, template = {
		// shared template
		"app.html": '<header>header <nav>nav</nav></header>'
			+'<section ng-repeat="template in content track by $index" class="content content-view-{{params.view}}"><span ng-include src="template"></span></section>'
		,"home.html": "home again"
		,"search.html": "lets search"
		,"policy.html": "edit policies, apply them in <a href='./search'>search</a>"
		,"pulse.html": "pulse...pulsing"
		// pieces and parts
		,"404.html": "<p>Sorry, couldn't find <a href='{{url}}'><code>{{url}}</code></a></p>"	
		//util
		,"params.html":"<h1>params</h1><div ng-repeat='(key, val) in params'>{{key}}:{{val}}</div>"
	};
	for(path in template) $templateCache.put(path, template[path]);
})
.config(function($locationProvider, $routeProvider){
	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/', {templateUrl: 'app.html',
	/*
	 * home: basic high-level overview of the product/features
	 */
	controller: function($scope, $location){
		$scope.content = ['home.html'];
	}})
	.when('/search/:query*', {templateUrl: 'app.html',
	/*
	 * setup for search-based workflow:
	 * find stuff, visualize it, apply policies, setup alerts by passing query to pulse
	 */
	controller: function($scope, $rootScope, $routeParams, $location){
		var query = $routeParams.query.split('/')
		$scope.content = ['search.html'];
	}})
	.when('/pulse/:pressure*', {templateUrl: 'app.html',
	/*
	 * manage pulse alerts
	 * saved queries from search (more or less a bookmarks feature?)
	 */
	controller: function($scope, $rootScope, $routeParams, $location){
		var pressure = $routeParams.something.split('/')
		$scope.content = ['pulse.html'];
	}})
	.when('/api/:section*', {templateUrl: 'app.html',
	/*
	 * docs for implementing any desired feature with our api
	 * examples etc
	 */
	controller: function($scope, $rootScope, $routeParams, $location){
	// TODO how is this organized?
		var section = $routeParams.view.split('/')
		$scope.search = '';
		$scope.params = $routeParams;
		// set any desired default in the fall-through
		$scope.params.view = section[0] || '';
		section = $scope.params.subview = section[1] || '';
		$scope.navitems = [
//			{path:'summary',text:'summary'}
			{path:'overview',text:'Overview'}
		];
		$scope.content = [$scope.params.view+'.html'];
	}})
	.otherwise({templateUrl:'app.html', controller: function($scope){
			$scope.url = location.pathname + location.search + location.hash;
			$scope.content = ['404.html'];
		}
	})
})
.directive('panel', function(){
	return {
		restrict: 'E'
		,scope:{title:'@', expandable:'=?'}
		,transclude:true
		,replace:true
		,template:"<div class='panel' ng-class=''><header class='notSelectable panelHeader'><h3>{{title}}</h3> <i ng-if='expandable' ng-class='{true:\"ff-contract\",false:\"ff-expand\"}[expanded]' class='ff panelIcon' ng-click='toggleExpanded()'> </i></header><div class='panel-content' ng-transclude></div></div>"
		,controller: function($scope){

			if('boolean' != typeof($scope.expandable)) $scope.expandable = true;

			$scope.expanded = $scope.expanded || false;
			if(!$scope.expandable) return;

			$scope.toggleExpanded = function(){
			};
		}
		,link: function(scope, elem, attrs, ctrl){
			elem = elem[0];
			elem.removeAttribute('title');
			elem.classList.add('_panel-'+scope.title.replace(/[^a-z0-9_]/gi, '-').toLowerCase() );
		}
	}
})
.directive('onReady',function(){
	return {
		restrict: 'A'
		,link: function(scope, element, attrs){
			if(scope.$last) scope.$emit('ready');
		}
	}
})
;
