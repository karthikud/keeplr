angular.module('keeplr', ['bookmarkService','categoryService','userService','ngMaterial', 'ngMdIcons','ngRoute'])

.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog','$mdMedia','BookMarks','Categories','User','$mdToast',function($scope, $mdBottomSheet, $mdSidenav, $mdDialog,$mdMedia,BookMarks,Categories,User,$mdToast){
  $scope.ifcategory =false;
    $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
    };

    
      BookMarks.get().success(function(data) {
       $scope.bookmarks = data; 
      });
      Categories.get().success(function(data) {
       $scope.categories = data; 
      });
      Categories.getsharedboards().success(function(data) {
       $scope.sharedboards = data; 
      });

    
  $scope.bookmark ={url:'https://www.google.com/',category:'Shopping'};
  //$scope.category ={name:'shopping'};
  
 	$scope.menu = [
    {
      link : '/boards',
      title: 'Boards',
      icon: 'dashboard'
    }
  ];
  $scope.admin = [
    
    {
      link : '/logout',
      title: 'logout',
      icon: 'settings'
    }
  ];
 
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.alert = '';
  // add collaboarators
  $scope.addcollab = function(id)
  {

    
      
       Categories.edit(category._id,$scope.collaborators)


          .success(function(data) {

          
          
          $scope.categories = data; 
          });
      
      
      
    

  }
    //show all bookmarks
    
    $scope.showAllBookMarks = function(id) {
       $scope.loadbookmark =true;
       $scope.ifcategory =false;

      BookMarks.get()

      .success(function(data) {
      $scope.loadbookmark =false;
       $scope.bookmarkcount = data.length;
      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.bookmarks = data; 
      });
      };

// DELETE ==================================================================
		
      $scope.deleteboard = function(id) {
     

      Categories.delete(id)

      .success(function(data) {
      $mdToast.show($mdToast.simple().position('bottom','right').textContent('Deleted Board Successfully!'));
      Categories.get()
      
      .success(function(data) {
      

      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.categories = data; 
      });

      });
      };

      $scope.deletebookmark = function(id) {


      BookMarks.delete(id)

      .success(function(data) {
      $mdToast.show($mdToast.simple().position('bottom','right').textContent('Deleted BookMark Successfully!'));
      BookMarks.get()
      // if successful deletion, call our get function to get all the new bookmarks
      .success(function(data) {
      

      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.bookmarks = data; 
      });

      });
      };

      $scope.showboard = function(id) {
       $scope.loadbookmark =true;
       $scope.ifcategory =true;
       //
       $scope.allContacts = {};
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    User.getall().success(function(data) {
    $scope.users = data; 
    var contacts = [];
    for (x in data) {


    var contact = {
    id :data[x]._id,
    name: data[x].google.name,
    email: data[x].google.email,
    image: data[x].google.image
    };
    contact._lowername = contact.name.toLowerCase();

    contacts.push(contact);
    }
    //console.log(contacts);


    $scope.allContacts = contacts;
    $scope.collaborators = [];
    $scope.$watch('collaborators', function(newVal, oldVal){
    console.log('changed');
    console.log($scope.collaborators);
    //update collab
    Categories.addcollab(id,$scope.collaborators)


    .success(function(data) {



    //$scope.categories = data; 
    });

    }, true);
    $scope.asyncContacts = [];
    $scope.filterSelected = true;
    $scope.querySearch = querySearch;
    $scope.delayedQuerySearch = delayedQuerySearch;
    /**
    * Search for contacts; use a random delay to simulate a remote call
    */
    function querySearch (criteria) {
    cachedQuery = cachedQuery || criteria;
    return cachedQuery ? $scope.allContacts.filter(createFilterFor(cachedQuery)) : [];
    }
    /**
    * Async search for contacts
    * Also debounce the queries; since the md-contact-chips does not support this
    */
    function delayedQuerySearch(criteria) {
    cachedQuery = criteria;
    if ( !pendingSearch || !debounceSearch() )  {
    cancelSearch();
    return pendingSearch = $q(function(resolve, reject) {
    // Simulate async search... (after debouncing)
    cancelSearch = reject;
    $timeout(function() {
    resolve( $scope.querySearch() );
    refreshDebounce();
    }, Math.random() * 500, true)
    });
    }
    return pendingSearch;
    }
    function refreshDebounce() {
    lastSearch = 0;
    pendingSearch = null;
    cancelSearch = angular.noop;
    }
    /**
    * Debounce if querying faster than 300ms
    */
    function debounceSearch() {
    var now = new Date().getMilliseconds();
    lastSearch = lastSearch || now;
    return ((now - lastSearch) < 300);
    }
    /**
    * Create filter function for a query string
    */
    function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(contact) {
    return (contact._lowername.indexOf(lowercaseQuery) != -1);;
    };
    }

    });
       Categories.getone(id)
      
      .success(function(data) {
      

      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.categoryname = data.name; 
      
      });
       

      BookMarks.getwithcategory(id)

      .success(function(data) {
      $scope.loadbookmark =false;
       $scope.bookmarkcount = data.length;
      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.bookmarks = data; 
      });
      };

      $scope.showsharedboard = function(id) {
       
       
      };
      //edit
      $scope.editboard = function(id) {

      Categories.getone(id)
      
      .success(function(data) {
      

      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.category = data; 
      $mdDialog.show({
      locals: {

      category: $scope.category
      },
      controller: EditCategoryDialogController,
      templateUrl: 'Dialog.tmpl.html',
      //template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',

      })
      .then(function(data) {
      $mdToast.show($mdToast.simple().position('bottom','right').textContent('Updated Board Successfully!'));
      $scope.categories = Categories.get()

      .success(function(data) {
      

      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.categories = data; 
      });
      }, function() {
      $scope.alert = 'You cancelled the dialog.';
      });
      });

      };
    
      $scope.showListBottomSheet = function($event) {
      $scope.alert = '';
      $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
      }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
      });
      };
  
      $scope.showAdd = function(ev) {
      $mdDialog.show({
      locals: {
      bookmark: $scope.bookmark,
      category: $scope.category
      },
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      //template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
      })
      .then(function(data) {
        BookMarks.get()
      
      .success(function(data) {
      
      $scope.loading = false;
      
      $scope.bookmarks = data; 
      });
      $mdToast.show($mdToast.simple().position('top','right').textContent('Added BookMark Successfully!'));
      }, function() {
      $scope.alert = 'You cancelled the dialog.';
      });
      };
  
      //add dialog
      $scope.showAddcategory = function(ev) {
      $mdDialog.show({
      locals: {
      category: $scope.category
      },
      controller: CategoryDialogController,
      templateUrl: 'Dialog.tmpl.html',
      //template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
      })
      .then(function(data) {
      $mdToast.show($mdToast.simple().position('bottom','right').textContent('Added Board Successfully!'));
      $scope.categories = Categories.get()

      .success(function(data) {
      

      //$scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.categories = data; 
      });
      }, function() {
      $scope.alert = 'You cancelled the dialog.';
      });
      };
}])
    .controller('LoginCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
    };
    })
    .controller('ProfileCtrl',['user', function($scope,user) {
    console.log('hi');
    User.get($scope.user)
    .success(function(data) {
    $scope.user = data; 
    });// call the create function from our service (returns a promise object)

    }])
    .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
    };
    })
    .controller('BoardCtrl',['$scope', '$mdBottomSheet','BookMarks',function($scope, $mdBottomSheet,BookMarks) {


    $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
    };
    }])

    .filter("favicon", function() {
    var provider = "https://www.google.com/s2/favicons?domain=%s";

    return function(url) {
    return provider.replace(/%s/g, url);
    }
    })
    .directive("favicon", ["faviconFilter", function(faviconFilter) {
    return {
    restrict: "EA",
    replace: true,
    template: '<img ng-src="{{faviconUrl}}" alt="{{description}}">',
    scope: {
    url: "=",
    description: "="
    },
    link: function($scope, element, attrs) {
    $scope.$watch("url", function(value) {
    $scope.faviconUrl = faviconFilter(value);
    });
    }
    }
    }])
    .directive('userAvatar', function() {
    return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
    };
    })
    .config(function($mdThemingProvider) {
    var customBlueMap = 		$mdThemingProvider.extendPalette('teal', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
    'default': '500'
    })
    .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')
    })
    .config(function($mdIconProvider) {
    $mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    });

    //functions
function DialogController($scope, $mdDialog,bookmark,Categories,BookMarks) {
      $scope.bookmark = {};
      $scope.createbookmark = function() {

      // validate the bookmark to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.bookmark.url != undefined) {
      $scope.loading = true;

      // call the create function from our service (returns a promise object)
      BookMarks.create($scope.bookmark)

      // get all the new bookamrks
      .success(function(data) {
      $mdDialog.hide();
      $scope.bookmark = {}; // clear the form so our user is ready to enter another
      $scope.bookmarks = data; 
      });				
      }
      };
      $scope.bookmark = bookmark;
      Categories.get()
      
      .success(function(data) {
      
      $scope.loading = false;
      
      $scope.categories = data; 
      });
  
  
      $scope.hide = function() {
      $mdDialog.hide();
      };
      $scope.cancel = function() {
      $mdDialog.cancel();
      };
      $scope.add = function(data) {

      $mdDialog.hide(data);
      };
}

function CategoryDialogController($scope, $mdDialog,category,Categories,User) {
    $scope.category = {};
    

    
    
    $scope.createcategory = function() {


    if ($scope.category.name != undefined) {



    Categories.create($scope.category)


    .success(function(data) {

    $mdDialog.hide();
    $scope.category = {}; 
    $scope.categories = data;
    });
    }
    };
   $scope.category = category;
    $scope.hide = function() {
    $mdDialog.hide();
    };
    $scope.cancel = function() {
    $mdDialog.cancel();
    };
    $scope.add = function(data) {

    $mdDialog.hide(data);
    };
}


    

function EditCategoryDialogController($scope, $mdDialog,category,Categories) {
  
		      $scope.createcategory = function() {


          if ($scope.category.name != undefined) {

          $scope.category.id =category._id; 



          Categories.edit(category._id,$scope.category)


          .success(function(data) {

          $mdDialog.hide();
          $scope.category = {}; 
          $scope.categories = data; 
          });
          }
          };
   $scope.category = category;
      $scope.hide = function() {
      $mdDialog.hide();
      };
      $scope.cancel = function() {
      $mdDialog.cancel();
      };
      $scope.add = function(data) {

      $mdDialog.hide(data);
      };
}



