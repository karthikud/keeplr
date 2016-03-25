angular.module('bookmarkService', [])

	// super simple service
	// each function returns a promise object 
	.factory('BookMarks', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/bookmarks');
			},
			create : function(bookmarkData) {
				return $http.post('/api/bookmarks', bookmarkData);
			},
			delete : function(id) {
				return $http.delete('/api/bookmarks/' + id);
			}
		}
	}]);
