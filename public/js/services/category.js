angular.module('categoryService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Categories', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/categories');
			},
			getsharedboards : function() {
				return $http.get('/api/sharedboards');
			},
			create : function(categoryData) {
				return $http.post('/api/categories', categoryData);
			},
			delete : function(id) {
				return $http.delete('/api/categories/' + id);
			},
            getone : function(id) {
				return $http.get('/api/categories/' + id);
			},
            edit : function(id,categoryData) {
				return $http.post('/api/categories_update/' + id,categoryData);
			},
			addcollab : function(id,collabdata) {
				return $http.post('/api/addcollab/' + id,collabdata);
			}
		}
	}]);
