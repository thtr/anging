'use strict';
/**
 * catch-all for shared utilities that don't seem to logically belong to a specific module
 */
angular.module('npUtil', [])
.filter('capitalize', function(input){
	return input.replace(/\b[a-z]/g,function(L){
		return L.toUpperCase();
	});
})
;
