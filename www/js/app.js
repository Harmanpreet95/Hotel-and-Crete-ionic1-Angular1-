// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ngCordova','ngMap','pascalprecht.translate','ionic-ratings'])

//$filter('uppercase')()

.constant('Base_Url',"http://rajdeep.crystalbiltech.com/thehotel/api/")
.config(function($ionicConfigProvider, $sceDelegateProvider,$translateProvider){
    
  $translateProvider.translations('English', {
            // hello_message: "hello message",
            // goodbye_message: "goodbye message",
            Skip_intro : "Skip intro",
            Select_Language : "Select Language",
            Already_have_an_Account : "Already have an Account",
            Please_Use_Latin_Characters : "Please Use Latin Characters" ,
            Hotel : "Hotel",
            Login : "Login",
            Register : "Register",
            Email : "Email",
            Password : "Password",
            Confirm_Password : "Confirm Password",
            Room_Number : "Room Number",
            Code : "Code",
            Reservation_Name : "Reservation Name",
            This_field_is_required : "This field is required",
            Use_only_alphabets : "Use only alphabets",
            Invalid_Email : "Invalid Email",
            New_here : "New here",
            Submit : "Submit",
            Sign_Up : "Sign Up",
            Forgot_Password : "Forgot Password",
            Enter_your_Email : "Enter your E-mail",
            Menu : "Menu",
            Home_page : "Home page",
            Message : "Message",
            Map : "Map",
            Weather : "Weather",
            Greek_Words : "Greek Words",
            Info : "Info",
            Useful_Tel : "Useful Tel",
            Logout : "Logout",
            CRETE : "CRETE",
            Guide_to_Crete : "Guide to Crete",
            About_Crete : "About Crete",
            Direction : "Direction",
            Products : "Products",
            Sightseeing : "Sightseeing",
            History : "History",
            East_Crete : "East Crete",
            West_Crete : "West Crete",
            Weather : "Weather",
            Message : "Message",
            Service : "Service",
            Description : "Description",
            Services : "Services",
            Facilities : "Facilities",
            Accommodation : "Accommodation",
            Social_Media : "Social Media",
            Questionnaire :"Questionnaire",
            Contact_Us : "Contact Us",
            Submit : "Submit",
            Overall_Rating : "Overall Rating",
            Comments : "Comments",
            Yes : "Yes",
            No : "No",
            May_be : "May be",
            Change_Language : "Change Language",
            English : "English",
            Greek : "Greek"

        });
        $translateProvider.translations('Έλληνες', {
            // hello_message: "Hola",
            // goodbye_message: "Adios",
            Skip_intro : "Παράλειψη εισαγωγής",
            Select_Language : "Επιλέξτε γλώσσα",
            Already_have_an_Account : "Εχετε ήδη λογαριασμό",
            Please_Use_Latin_Characters : "Παρακαλούμε χρησιμοποιήστε λατινικούς χαρακτήρες",
            Hotel : "Ξενοδοχειο",
            Login : "Σύνδεση",
            Register : "Κανω ΕΓΓΡΑΦΗ",
            Email : "ΗΛΕΚΤΡΟΝΙΚΗ ΔΙΕΥΘΥΝΣΗ",
            Password : "Κωδικός πρόσβασης",
            Confirm_Password : "Επιβεβαίωση Κωδικού",
            Room_Number : "Αριθμός δωματίου",
            Code : "Κώδικας",
            Reservation_Name : "Όνομα κράτησης",
            This_field_is_required : "Αυτό το πεδίο απαιτείται",
            Use_only_alphabets : "Χρησιμοποιήστε μόνο αλφάβητα",
            Invalid_Email : "Ακυρη διεύθυνση ηλεκτρονικού ταχυδρομείου",
            New_here : "ΝΕΟΣ εδω",
            Submit : "υποβάλλουν",
            Sign_Up : "Εγγραφείτε",
            Forgot_Password : "Ξεχάσατε τον κωδικό",
            Enter_your_Email : "Συμπληρώστε το email σας",
            Menu : "Μενού",
            Home_page : "Αρχική σελίδα",
            Message : "Μήνυμα",
            Map : "Χάρτης",
            Weather : "Καιρός",
            Greek_Words : "Ελληνικές λέξεις",
            Info : "Πληροφορίες",
            Useful_Tel : "Χρήσιμοι αριθμοί τηλεφώνου",
            Logout : "Αποσυνδέση",
            CRETE : "ΚΡΗΤΗ",
            Guide_to_Crete : "Οδηγός για την Κρήτη",
            About_Crete : "Σχετικά με την Κρήτη",
            Direction : "Κατεύθυνση",
            Products : "Προϊόντα",
            History : "Ιστορία",
            Sightseeing : "Περιοδεία εις αξιοθέατα μέρη",
            East_Crete : "Ανατολική Κρήτη",
            West_Crete : "Δυτική Κρήτη",
               Weather :  "Καιρός",
               Message : "Μήνυμα",
               
          Service : "Υπηρεσία",
          Description : "Περιγραφή",
          Services : "Υπηρεσίες",
          Facilities : "Εγκαταστάσεις",
          Accommodation : "Διαμονή",
          Social_Media : "Μεσα ΚΟΙΝΩΝΙΚΗΣ ΔΙΚΤΥΩΣΗΣ",
          Questionnaire :"Ερωτηματολόγιο",
          Contact_Us : "Επικοινωνήστε μαζί μας",
          Submit : "υποβάλλουν",
          Overall_Rating : "Συνολική βαθμολογία",
          Comments : "Σχόλια",
          Yes : "Ναί",
          No : "Οχι",
          May_be : "Μπορεί",
          Change_Language : "Αλλαξε γλώσσα",
          Greek : "Ελληνικά",
          English : "Αγγλικά"

            
        });
        $translateProvider.preferredLanguage('English');
        $translateProvider.fallbackLanguage("English");

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

if(typeof navigator.globalization !== "undefined") {
    navigator.globalization.getPreferredLanguage(function(language) {
        $translate.use((language.value).split("-")[0]).then(function(data) {
            console.log("SUCCESS -> " + data);
        }, function(error) {
            console.log("ERROR -> " + error);
        });
    }, null);
}
  // if($window.localStorage.getItem('currentUser', JSON.stringify(resp)))
  // {
  //   $state.go('menu.grouphotel');
  //   else
  //   {
  //     $state.go('menu.login');
  //   }
  // }


})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
//.directive('hrefInappbrowser', function() {
//  return {
//    restrict: 'A',
//    replace: false,
//    transclude: false,
//    link: function(scope, element, attrs) {
//      var href = attrs['hrefInappbrowser'];
//
//      attrs.$observe('hrefInappbrowser', function(val){
//        href = val;
//      });
//      
//      element.bind('click', function (event) {
//
//        window.open(href, '_system', 'location=yes');
//
//        event.preventDefault();
//        event.stopPropagation();
//
//      });
//    }
//  };
//});


//
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var place = attrs['hrefInappbrowser'] || '_system';
      element.bind('click', function (event) {

        var href = event.currentTarget.href;

        window.open(href, place, 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
})
 .config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

     
