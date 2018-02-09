angular.module('app.controllers', ['ngCordova'])
  
.controller('homeCtrl',function ($scope,$stateParams,$state,$http,$ionicLoading,$window,Base_Url) {

    $scope.data={};
    if($window.localStorage.getItem('userinfo'))
      
    {
         $state.go('menu.groupHotel');
    }
    else{
    $scope.registerUser=function()
    {
       $ionicLoading.show();    
       console.log($scope.data);
         
    if($scope.data.password!=$scope.data.cpassword)
    {
        alert('password mismatch');
        $ionicLoading.hide();
        $scope.data.password='';
        $scope.data.cpassword='';
    }
    else
        if($scope.data.email!='')
    {
       var link=Base_Url+"users/registration";
       //alert('ok');
       var postData ={
            reservationname : $scope.data.username,
            code : $scope.data.code,
            email : $scope.data.email,
            username : $scope.data.email,
            roomnumber : $scope.data.roomnumber, 
          //  nationality : $scope.data.nationality,
            password:$scope.data.password,
            cpassword:$scope.data.cpassword,
               }
       
       $http.post(link, postData).then(function(resp){
                $ionicLoading.hide();
               console.log(resp.data);
             //alert(JSON.stringify(resp));             
                if(resp.data.status==true)
                {
                    $window.localStorage.setItem('userinfo',JSON.stringify(resp.data));
                    $scope.retreived=JSON.parse($window.localStorage.getItem('userinfo'));
                    //$window.localStorage.setItem('code', $scope.retrieved.code);
                    console.log($scope.retreived);
                    
                    $state.go('menu.groupHotel');
                    alert(resp.data.msg);
                      // $ionicLoading.hide();                                   
               }
                else
                   {
                       alert(resp.data.msg);
                       //alert($scope.response.data.msg);
                   }
                
            })
        }
            
       
    }
    }
})
.controller('loginCtrl',
    function($scope,$state,$stateParams,$http,Base_Url,$window,$ionicLoading,$rootScope)
   {
        $scope.data={};
        if($window.localStorage.getItem('userinfo')){
            alert("if")
           $state.go('menu.groupHotel');
        }
        else{
        alert("signin")
        $scope.signin = function()
        {
         $ionicLoading.show();
         console.log($scope.data);
         var link = Base_Url+'users/login';
             //alert('arvinder');

          //  $scope.userinfo = $window.localStorage.getItem('userid').id;
          //  console.log($scope.userinfo); //return false;
         
              
                //console.log($scope.data.password);
                $http.post(link,{
                    email:$scope.data.email,
                    password:$scope.data.password,
                }).success(function(resp)
                {
                    //console.log($scope.data.password);
                    //console.log($scope.data.email);
                    $ionicLoading.hide();
                    console.log(resp);
                    $scope.retrieved = resp.code;
                    $scope.id=resp.id;
                    $scope.username=resp.reservationname;
                    $scope.role=resp.role;
                    $scope.chat = resp.chat_status;
                    console.log($scope.chat)
                    console.log($scope.role);
                    console.log($scope.username);
                    console.log($scope.id);
                    console.log($scope.retrieved);
                    $window.localStorage.setItem('userinfo', JSON.stringify(resp));
                    $window.localStorage.setItem('code', $scope.retrieved);
                    $window.localStorage.setItem('User_Id', $scope.id);
                    $window.localStorage.setItem('username', $scope.username);
                    $window.localStorage.setItem('Roles', JSON.stringify($scope.role));
                    $window.localStorage.setItem('chat_status',$scope.chat);
                    
                    
                    $scope.retrieved =  JSON.parse($window.localStorage.getItem('userinfo'));
                    console.log( $scope.retrieved)
//                    $window.localStorage.setItem('user_id', $scope.retrieved.id);
//                    $window.localStorage.setItem('code', $scope.retrieved);
//                    console.log($scope.retrieved);
                    
//                    $scope.get=JSON.parse($window.localStrorage.getItem('user_id'));
//                    console.log($scope.get);
                     if(resp.status === true) {
                        // console.log($scope.retrieved.code);
                         alert(resp.msg);
                          
                     $state.go('menu.groupHotel');
                     
                     
                     }
                    else
                    {
                       alert(resp.msg);
                    }
                    
                    
                    
                })
            
            
            
        }
     
        }
    })
   
.controller('groupHotelCtrl', ['$scope', '$stateParams','$window', 'Base_Url','$http','$state','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,Base_Url,$http,$state,$rootScope) {
    $scope.Sender=JSON.parse($window.localStorage.getItem('Roles'));
    $scope.Usr_Id=$window.localStorage.getItem('User_Id');
    $scope.data=JSON.parse($window.localStorage.getItem('code'));
    console.log($scope.data);
        var link=Base_Url+'Addhotels/hotelinfo';
        $scope.hotelinfo = {
            AddHotel:{
             code:$scope.data,
                    }
                          }
        $http.post(link,$scope.hotelinfo).success(function(resp)  
            {
        console.log(resp);
        if(resp.status==true)
            {
    $scope.res=resp.result.AddHotel;
    $scope.groupNamee=resp.groupname;
    console.log($scope.res);
    $rootScope.groupName = resp.result.AddHotel.groupname;
    console.log($rootScope.groupName);
    
    
   
                               
    var link=Base_Url+'Chats/buyerreadmsg';

    $scope.msgcount={ 
           chat:
             {
                uid:$scope.Usr_Id, 
                sender:$scope.Sender, 
            }
        }
   console.log($scope.msgcount);

  $http.post(link,$scope.msgcount).success(function(resp)
  {
  
    console.log(resp);
    $rootScope.unrdmsg=resp.count;
    console.log($rootScope.unrdmsg);
    $window.localStorage.setItem('unreadmsg',JSON.stringify($rootScope.unrdmsg));
  })
        } 
   }) 

}])
   
.controller('messagesCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams,Base_Url,$http,$state,$window,$rootScope,$ionicPopup) {
$scope.data={}
$scope.gt=[]
$scope.input={}
      $scope.Sender=JSON.parse($window.localStorage.getItem('Roles'));
      $scope.Usr_Id=$window.localStorage.getItem('User_Id');
      $scope.name=$window.localStorage.getItem('username');
      $scope.chat=$window.localStorage.getItem('chat_status')
      console.log($scope.chat)
if($window.localStorage.getItem('chat_status') == 1 ){
    
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
  
    alert("you cananot send any msg")
    alert("if");
}else{
    alert("else")
      $scope.message=function()
      {
       console.log($scope.Sender);
      console.log($scope.input);
      console.log($scope.Usr_Id);
      console.log($scope.name);

        var link=Base_Url+'Chats/chat';
        //alert('done');
    $scope.Message={ 
             chat:
             {
                uid:$scope.Usr_Id, 
                aid:"1", 
                name:$scope.name,
                msg:$scope.input.msg,
                image:null,
                sender:$scope.Sender,
            }
          }
         console.log($scope.Message);
//alert('console');
        $http.post(link,$scope.Message).success(function(resp)
        {
         // alert('hit');
          if(resp.isSuccess == "true")
          {
           console.log(resp);
           $scope.input.msg=null;
           
           
           
           var link=Base_Url+'Chats/chatview';

//alert('chatview');
    $scope.chatview={ 
       chat:
       {
        uid:$scope.Usr_Id, 
        aid:"1", 
      }
    }
 console.log($scope.chatview);

  $http.post(link,$scope.chatview).success(function(resp)
  {
    console.log(resp);
    $rootScope.Sends=resp.data;
    console.log($rootScope.Sends);
  })
}

  
   })
      }
}

//chat view////

//alert('load');
var link=Base_Url+'Chats/chatview';
//alert('chatview');
 $scope.chatview={ 
    chat:
    {
  uid:$scope.Usr_Id, 
  aid:"1", 
   }
 }
 console.log($scope.chatview);

  $http.post(link,$scope.chatview).success(function(resp)
  {
    if(resp.isSuccess=="true")
    {

    console.log(resp);
    $rootScope.Sends=resp.data;
    console.log($rootScope.Sends);
 

      angular.forEach(resp.data,function(value,key){
      console.log(key);
   
      $scope.gt.push(value.Chat.id);
      // $scope.ft.push({'value':value});
      this.push(value.Chat.id);
                },$scope.gt);
      console.log($scope.gt); 

    
    var link=Base_Url+'Chats/readchat';
    delete $rootScope.unrdmsg;
    //alert('chatread');
    $scope.chatread={ 
    chat:
    {
  chat_id:$scope.gt, 
  type:$scope.Sender, 
   }
 }
 console.log($scope.chatread);

  $http.post(link,$scope.chatread).success(function(resp)
  {
    console.log(resp);
  })

  /////chat read/////

 };
  })
  

     })









   
.controller('mapCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$cordovaGeolocation,$rootScope,$state) {
$scope.shop_map = function(){
   alert("map") 
     var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_set = position.coords.latitude;
            $rootScope.long_set = position.coords.longitude; 
            console.log($rootScope.lat_set)
            console.log( $rootScope.long_set)
            console.log( $rootScope.lat )
            console.log( $rootScope.long) 
               $rootScope.closeModal(); 
          $state.go('menu.map');
            
        })
      
      
      
}
      
 ///////////// shop directions////////
 
  $scope.launchNavigator = function() {
      alert("path")
      
         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_set = position.coords.latitude;
            $rootScope.long_set = position.coords.longitude; 
            console.log($rootScope.lat_set)
            console.log( $rootScope.long_set)
            console.log( $rootScope.lat )
            console.log( $rootScope.long) 
              // $rootScope.closeModal(); 
               
                var destination = [$rootScope.lat, $rootScope.long];
	var start = [$rootScope.lat_set, $rootScope.long_set];
        alert($rootScope.lat+"lat")
        alert($rootScope.long+"long");
        alert($rootScope.lat_set+"current lat");
        alert($rootScope.long_set+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
               
               
               
               
        }) 
      
      
      
      
      
      
      

  }


    


})
   
.controller('weatherCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$http,$rootScope,$window,Base_Url,$ionicLoading,$filter) {



  alert('weather');
  // $ionicLoading.show();
  var link='http://api.openweathermap.org/data/2.5/forecast/daily?q=crete,greece&appid=7756a5add72128537d61c8fccb203817&units=metric';
  //alert('hit');
  $http.get(link).success(function(resp)
  {
    //alert('get');
    // $ionicLoading.hide();
   $rootScope.weather_list=[];
   $rootScope.weather=resp.city;
   console.log($rootScope.weather);

      for($r=0; $r<=2; $r++)
  {
      $rootScope.weather_list.push(resp.list[$r]);
         console.log($r)
  } 


 
   
     
    var date = new Date();

   
var weekday = new Array(7);
    weekday[0] =  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    
      var today = new Date();
      $scope.today_day   =weekday[today.getDay()];
       $scope.today_date = $filter('date')(today,'MM/dd/yyyy');

      tomorrow = new Date();
       $scope.tomo_day   =weekday[today.getDay()+1];
       $scope.tomo_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+1),'MM/dd/yyyy');

      tomorrow = new Date();
      $scope.next_day   =weekday[today.getDay()+2];
      $scope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+2),'MM/dd/yyyy');

         console.log($rootScope.weather_list);

  })






})

.controller('greekwordCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$scope,$http,$state,$window,Base_Url,$rootScope) {

  // $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
$scope.Hotelname=JSON.parse($window.localStorage.getItem('hotelname')).hotelname;
                       console.log($scope.Hotelname);
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        var link = Base_Url+'Staticpages/aboutus';
        //alert('greekword');
        $scope.greekword={
            Staticpage:{
                hotelname:$scope.Hotelname,
                title:"GreekWords",
                
            }
        }
        //alert($scope.greekword);
        $http.post(link,$scope.greekword).success(function(resp)
        {
            
                    //alert('$scope.contacthotel');
            console.log(resp);
          $rootScope.greek = resp.result[0].Staticpage;
           console.log($rootScope.greek);
            
            //alert('arvinder');
           // $state.go('menu.contactus');
            
        })
    
    
 




})


.controller('infoCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$scope,$http,$state,$window,Base_Url,$rootScope) {

// $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).hotelname;
 console.log($rootScope.code);
        var link = Base_Url+'Staticpages/aboutus';
        alert('info');
        $scope.info={
            Staticpage:{
                hotelcode:$rootScope.hotel_cod,
                title:"info",
                
            }
        }
        //alert($scope.info);
        $http.post(link,$scope.info).success(function(resp)
        {
            
                    //alert('$scope.contacthotel');
            console.log(resp);
          $rootScope.infos = resp.result[0].Staticpage;
           console.log($rootScope.infos);
            
            //alert('arvinder');
           // $state.go('menu.contactus');
            
        })
    


})


.controller('usefulnumberCtrl', function ($scope, $stateParams,$window,Base_Url,$http,$rootScope) {

$scope.data=$window.localStorage.getItem('code');
   console.log($scope.data);
    var link=Base_Url+'Addhotels/hotelinfo';
    $scope.hotelinfo = {
                   AddHotel:{
                   code:$scope.data,
                }
                          }
    $http.post(link,$scope.hotelinfo).success(function(resp)  
            {
    console.log(resp);
    console.log(resp.result.AddHotel.id);
    var link=Base_Url+'addhotels/usefulnumbers';
    $scope.hotel_no = {
                   UsefulNumber:{
                   id : resp.result.AddHotel.id,
                }
             }
    $http.post(link,$scope.hotel_no).success(function(resp)  
            {
    console.log(resp);
     $rootScope.HotelImage = resp.result[0].UsefulNumber.image;
     alert($rootScope.HotelImage);
    $rootScope.hotel = resp.result;
            })
     })   
     
     
$scope.callNumber = function(number,bypassAppChooser){
window.plugins.CallNumber.callNumber(onSuccess, onError, number,bypassAppChooser);
function onSuccess(result){
  console.log("Success:"+result);
}
function onError(result) {
  console.log("Error:"+result);
}
};

})
   
.controller('groupnameCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$http,Base_Url,$rootScope,$state) {
$scope.gname = $stateParams.gname;
console.log($scope.gname);

 var link=Base_Url+'Addhotels/groupname';
 $scope.hotelgroup={
           AddHotel:{
           groupname:$stateParams.gname,
            }
            }
            console.log($scope.hotelgroup);
 $http.post(link,$scope.hotelgroup).success(function(resp)
           
            {
console.log(resp);
$rootScope.Group = resp.result;
console.log($rootScope.Group);
//$state.go('menu.groupname');
             
                
            })
            

   $scope.data=$window.localStorage.getItem('code');
   console.log($scope.data);
    var link=Base_Url+'Addhotels/hotelinfo';
    $scope.hotelinfo = {
                   AddHotel:{
                   code:$scope.data,
                }
                          }
    $http.post(link,$scope.hotelinfo).success(function(resp)  
            {
    console.log(resp);
    $rootScope.name_hotel=resp.result.AddHotel.hotelname;
    console.log($rootScope.name_hotel);
     })                
})

.controller('hotelnameCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$window,Base_Url,$rootScope,$state,$ionicModal) {
    $scope.data = {};
    
    $scope.data=$window.localStorage.getItem('code');
                       console.log($scope.data);
                      var link=Base_Url+'Addhotels/hotelinfo';
                     //     console.log($scope.retrieved.code);
                          //alert('ok code');
                          $scope.hotelinfo = {
                          AddHotel:{
                    code:$scope.data,
                }
                          }
                          $http.post(link,$scope.hotelinfo
                ).success(function(resp)  
                          {
                              
                              console.log(resp);
                             // console.log(resp.result.AddHotel);
                              $window.localStorage.setItem('hotel',JSON.stringify(resp.result.AddHotel));
                              $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
                              console.log($scope.hotel_id);
                              $scope.res=resp.result.AddHotel;
                              console.log($scope.res);
                              $rootScope.hot = resp.result.AddHotel.hotelname;
                              console.log($rootScope.hot)
                              //$scope.data=resp.result
                             // console.log($scope.data);
                              
                          }) 
                          
 ///////////////////////////// start about module////////////////////////////////

       
                          
    /////////////////////////////////END//////////////////////////////////////

    ///////////////////////////start service module///////////////////////////
   
    
    ///////////////////////END/////////////////////////////////////
    
    ////////////////start facilitie module////////////////////////
    
    
   
    
  
    
    
   
    
   
    
    $ionicModal.fromTemplateUrl('templates/abouthotel.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

    
})


.controller('abouthotelCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,Base_Url,$window,$state,$rootScope) {
 $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
  alert('abouthotel');
var link=Base_Url+'Addhotels/abouthotel';
$scope.about_hotel = {
           AddHotel:{
                    id:$scope.hotel_id,
                    
                }
                     }
$http.post(link,$scope.about_hotel).success(function(resp)  
   {
console.log(resp);

$rootScope.abouthotel = resp.result;
console.log($rootScope.abouthotel);
$rootScope.hotel_name = resp.result[0].addhotels.hotelname;
$rootScope.hotel_des = resp.result[0].addhotels.description;
console.log($rootScope.hotel_name );
$state.go('menu.abouthotel');
        })
   })              
               

.controller('accomodationCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$state,$rootScope,Base_Url,$http) {
    
$scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
   var link = Base_Url+'Addhotels/accommodation';
    $scope.accomodationhotel={
            Accommodation:{
                id:$scope.hotel_id,
            }
        }
        
        $http.post(link,$scope.accomodationhotel).success(function(resp)
        {
           // alert(JSON.stringify(resp));
            $rootScope.accomodations = resp.result;
            console.log($rootScope.accomodations);
            
            //alert('arvinder');
            $state.go('menu.accomodation');
            
        });
    
    
    
    
    ////////////////////////////////
    
      //  $scope.hotel_id = JSON.parse($window.localStorage.getItem('hotel')).id;
//        console.log($scope.hotel_id);
//    $scope.accomodationss=function(){
//         //alert("working")
//        //console.log(name);
//        console.log($scope.hotel_id);
//       
//        var link = Base_Url+'Addhotels/accommodation';
//       // alert('arvinder');
//        $scope.accomodations={
//            Accommodation:{
//                id:$scope.hotel_id,
//                
//            }
//        }
//        $http.post(link,$scope.accomodations).success(function(resp)
//        {
//            console.log(resp);
//            $rootScope.accomodation1 = resp.result;
//            console.log($rootScope.accomodation1);
//            
//            //alert('arvinder');
//          $state.go('menu.room-a');
//            
//        })
//    }
        
    


})
   .controller('room-aCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$http,Base_Url) {
    $scope.id =  $stateParams.id;
  console.log($scope.id);

$scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;

   

  var link=Base_Url+'Addhotels/accommodation';
 alert('hit');
 

   $scope.accomodations={
            Accommodation:{
                id:$scope.hotel_id,
                
            }
        }
        $http.post(link,$scope.accomodations).success(function(resp){

  console.log(resp);

for($i=0;$i<resp.result.length;$i++){
    console.log(resp.result[$i].Accommodation.id);
    if(resp.result[$i].Accommodation.id == $scope.id ){
      $scope.value = resp.result[$i];
      console.log($scope.value);
    }
  
 }

       
    })


})
   .controller('facilitiesCtrl', ['$scope', '$stateParams','$http','Base_Url','$state','$rootScope','$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,Base_Url,$state,$rootScope,$window) {
    
     
    $scope.hotel_id = JSON.parse($window.localStorage.getItem('hotel')).id;
         //alert("working")
 
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
       // console.log($scope.data);
        var link = Base_Url+'Addhotels/facilitielist';
        //alert('arvinder');
        $scope.facilitiehotel={
            Facilitie:{
                id:$scope.hotel_id, 
            }
        }
        $http.post(link,$scope.facilitiehotel).success(function(resp)
        {
            console.log(resp);
            $rootScope.facility = resp.result;
            console.log($rootScope.facility);
            
          //  alert('arvinder');
            $state.go('menu.facilities');
            
        })
   
    
    
    
    $scope.facilities1 =function(name){
         //alert("working")
        console.log(name);
        console.log($scope.hotel_id);
       
        var link = Base_Url+'Addhotels/facilitie';
       // alert('arvinder');
        $scope.facilitiehotel={
            Facilitie:{
                id:$scope.hotel_id,
                category:name,
            }
        }
        $http.post(link,$scope.facilitiehotel).success(function(resp)
        {
            console.log(resp);
            $rootScope.facility1 = resp.result;
            console.log($rootScope.facility1);
            
            //alert('arvinder');
          $state.go('menu.restaurant');
            
        })
    }


}])
.controller('restaurantCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('restaurant1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('serviceCtrl', ['$scope', '$stateParams','$http','$state','$window','Base_Url','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope) {

 $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        //console.log($scope.data);
        var link = Base_Url+'Addhotels/service';
        //alert('arvinder');
        $scope.servicehotel={
            Service:{
                id:$scope.hotel_id,
            }
        }
        $http.post(link,$scope.servicehotel).success(function(resp)
        {
            console.log(resp);
             $rootScope.services = resp.result;
            console.log($rootScope.services);
           
           
            $state.go('menu.service');
            
        });
    
    
    $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup =   group ;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    
}])
  
  
.controller('hotel-aCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Base_Url,$http,$state,$window,$rootScope) {
console.log($scope.Groupname);
$scope.id =  $stateParams.id;

   var link=Base_Url+'Addhotels/groupname';
    $scope.hotelgroup={
                AddHotel:{
                    groupname:$rootScope.groupName,
            }
            }
    $http.post(link,$scope.hotelgroup).success(function(resp){
    console.log(resp);

for($i=0;$i<resp.result.length;$i++){
    console.log(resp.result[$i].AddHotel.id);
    if(resp.result[$i].AddHotel.id == $scope.id){
      $scope.value = resp.result[$i];
      console.log($scope.value);
      

    }
}
$scope.About=resp.result;
console.log($scope.About);


    })
}) 

.controller('QuestionnaireCtrl', ['$scope', '$stateParams','$http','$state','$window','Base_Url','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope) {

    
     $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
      var link = Base_Url+'Addhotels/questionnaire';
      //  alert('questionnaire');
        
        $scope.questionnairehotel={
            Questionnaire:{
                id:$scope.hotel_id,
            }
        }
        
        $http.post(link,$scope.questionnairehotel).success(function(resp)
        {
            console.log(resp);
            $window.localStorage.setItem('questionari',JSON.stringify(resp));
            $rootScope.Questionnaires = resp.result;
            console.log($rootScope.Questionnaires);
            

      
           // alert('arvinder');
            $state.go('menu.Questionnaire');
            
        });

     
$scope.data={}
$scope.val={}

 $scope.sel={};
 $scope.gt=[];
 
 $scope.star={};
 
 $scope.ratings={}
 
    $scope.submit=function()
    { 
    alert("hello")
     console.log($scope.val);
      console.log($scope.sel);
      console.log($scope.data);
      $scope.user_ids=$window.localStorage.getItem('User_Id');
      console.log($scope.user_ids);
      angular.forEach($scope.sel,function(value,key){
      console.log(key);
      $scope.gt.push({'id':key,'value':value});
      // $scope.ft.push({'value':value});
})
      console.log($scope.gt);

      var link = Base_Url+'Addhotels/questionnaires_answers';

      //alert('arvinderdd');
      $scope.questionsubmit={
               QuestionnairesAnswer:
           {
        userid:$scope.user_ids,
        result:$scope.gt,
        rating: $scope.val.rating,
        comments: $scope.data.comments,

     }
        

}
      console.log( $scope.questionsubmit);
      $http.post(link,$scope.questionsubmit).success(function(resp){
      console.log(resp);

      })
      
        
    
    }

}]) 



.controller('creteCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {


 $scope.bhumika=function(id){
     alert(id);
$rootScope.creteid = id;
console.log($rootScope.creteid)
 var link=Base_Url+'Aboutcretes/creteextrasdetail';
        $scope.shoping = {
            GuideShopping:{
                          id:id,
                    }
                          }
 console.log($scope.shoping);
 $http.post(link,$scope.shoping).success(function(resp){
  console.log(resp)
  if(resp.status == true){
      alert("data available")
  $rootScope.shop = resp.result;
  console.log($rootScope.shop)
  for(var i=0;i<resp.result.length;i++){
    console.log(resp.result[i].GuideShopping.id);

   $state.go("menu.shopping")    

         }
     }
     else{
        alert("no data ") 
     }
  
  
        })
            
        
        }




}) 
.controller('shop1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope,Base_Url,$http,$state) {


}])

.controller('shoppingCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal,$http,Base_Url,$rootScope) {

$scope.single_crete=function(id){
     alert(id);
//$rootScope.creteid = id;
console.log($rootScope.creteid)
 var link=Base_Url+'Aboutcretes/creteextrasdetail';
        $scope.shoping = {
            GuideShopping:{
                          id:$rootScope.creteid,
                    }
                          }
 console.log($scope.shoping);
 $http.post(link,$scope.shoping).success(function(resp){
  console.log(resp)
  if(resp.status == true){
  $rootScope.shop = resp.result;
  console.log($rootScope.shop)
  for(var i=0;i<resp.result.length;i++){
    console.log(resp.result[i].GuideShopping.id);
if(resp.result[i].GuideShopping.id == id){
   $rootScope.singledetail=resp.result[i].GuideShopping;
   $rootScope.lat = resp.result[i].GuideShopping.latitude;
   $rootScope.long = resp.result[i].GuideShopping.longitude;
   alert($rootScope.lat)
   console.log($rootScope.lat);
   console.log($rootScope.singledetail);
}
  // $state.go("menu.shopping")    

         }
     }
     else{
         alert("no data")
     }
  
  
        })
            
        
        }




$ionicModal.fromTemplateUrl('templates/shop1.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $rootScope.closeModal = function() {
    $scope.modal.hide();                                                                                  
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


})


.controller('aboutcreteCtrl',  function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {

 var link=Base_Url+'Aboutcretes/aboutcrete';
// alert('hit');
 $http.get(link).success(function(resp){
  console.log(resp);
              $rootScope.aboutcrete=resp.result;
           console.log($rootScope.aboutcrete);
 })
 
 
    $scope.xyz = function(descID){
         $window.localStorage.setItem('main_id',JSON.stringify(descID));
//        alert('hsdf');
        var link=Base_Url+'Aboutcretes/aboutcrete';
//    alert('hit');
    $http.get(link).success(function(resp){
    console.log(resp);

      for(var i=0;i<resp.result.length;i++){
    console.log(resp.result[i].CreteDetail.length);
    console.log(resp.result[i].AboutCrete.id);
    console.log(resp.result[i].AboutCrete.title);
   $rootScope.length_crete = resp.result[i].CreteDetail.length;
//   alert(descID);
   if($rootScope.length_crete == 0 && resp.result[i].AboutCrete.id == descID){
       $rootScope.value = resp.result[i].AboutCrete;
       $state.go('menu.geography');
   }else if(resp.result[i].AboutCrete.id == descID){
      $scope.value = resp.result[i];
      console.log($scope.value);
      console.log($scope.value.CreteDetail);
      $rootScope.details =  $scope.value.CreteDetail;
      $rootScope.title = resp.result[i].AboutCrete.title;
      console.log($rootScope.details);
      $state.go('menu.mythology');
       
   }
    }
      })
    }
    ///////////////// next page////////
    $scope.cretename=function(){
      alert("hhhh")
    
 var link =  Base_Url+'Aboutcretes/creteextras';
 alert("hitt");
 $http.get(link).success(function(res){
 console.log(res);
 
 if(res.status == true){
 $rootScope.crete_list = res.result;
 console.log( $rootScope.crete_list);
 
 for(var i=0;i<res.result.length;i++){
     //console.log(i)
 //console.log(res.result[i].CreteExtra.id);
 $scope.crete_id = res.result[i].CreteExtra.id;
 console.log($scope.crete_id)
 $state.go("menu.crete")
    }
 }else{
     
 
   } 
     
 })  
    }
   
//$ionicLoading.hide();
})

.controller('geographyCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {

//$scope.id =  $stateParams.id;
//
//  var link=Base_Url+'Aboutcretes/aboutcrete';
// alert('hit');
// $http.get(link).success(function(resp){
//  console.log(resp);
//
//for($i=0;$i<resp.result.length;$i++){
//    console.log(resp.result[$i].AboutCrete.id);
//    if(resp.result[$i].AboutCrete.id == $scope.id){
//      $scope.value = resp.result[$i];
//      console.log($scope.value);
//      
//
//    }
//}
//$scope.Aboutcrete=resp.result;
//console.log($scope.Aboutcrete);
//
//
//})


}) 


.controller('mythologyCtrl', 
function ($scope, $stateParams,Base_Url,$http,$rootScope,$state,$window) {


//$scope.id =  $stateParams.id;
//alert($scope.id);

       $scope.h_id =  JSON.parse($window.localStorage.getItem('main_id'));
  var link=Base_Url+'Aboutcretes/aboutcrete';
// alert('hit');
 $http.get(link).success(function(resp){
  console.log(resp);

for(var i=0;i<resp.result.length;i++){
    console.log(resp.result[i].AboutCrete.id);
    if(resp.result[i].AboutCrete.id == $scope.h_id){
      $scope.value = resp.result[i];
      console.log($scope.value);
      console.log($scope.value.CreteDetail);
     
       for(var j=0 ; j<= $scope.value.CreteDetail.length ; j++){
           console.log($scope.value.CreteDetail[j].Gastronomy);
           console.log($scope.value.CreteDetail[j].id);
           $rootScope.crete_id = $scope.value.CreteDetail[j].id;
           $rootScope.gastro = $scope.value.CreteDetail[j].Gastronomy;
           for(var k = 0 ; k < $rootScope.gastro.length;k++){
//               alert('harman')
//               alert($rootScope.gastro.length);
               $rootScope.cal_length = $rootScope.gastro.length;
           }
       }
      for(var j=0; j<$scope.value.CreteDetail.length;j++){
          console.log($scope.value.CreteDetail[j]);
      }
      
    }
    }
})
$scope.detailpage = function(title,desc,id){
    console.log(id);
    console.log($rootScope.cal_length);
    console.log($rootScope.crete_id);
    if($rootScope.cal_length > 0 && id == $rootScope.crete_id){
               console.log($rootScope.gastro);
               $rootScope.crete_gastronomy = $rootScope.gastro;
               $state.go('menu.product');
               
              }else{
               $rootScope.title_name = title;
//    $rootScope.description = desc;
//    alert($rootScope.title_name);
//    alert($rootScope.description);
    $state.go('menu.birthofzeus');
    if($rootScope.description == undefined){
//        alert('if');
        alert('No Info yet!');
    }else{
//        alert('else');
        $rootScope.description = desc;
//        alert($rootScope.description);
    }
              }
              
    }

})
.controller('birthofzeusCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}]) 

.controller('historyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}]) 

.controller('stoneageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}]) 

.controller('cultureCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('languageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('gastronomyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('socialCtrl',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$cordovaInAppBrowser)
{
    
       $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        //console.log($scope.data);
        var link = Base_Url+'Addhotels/socialmedia';
        alert('social');
        $scope.socialhotel={
            Social:{
                id:$scope.hotel_id,
                
            }
        }
        $http.post(link,$scope.socialhotel).success(function(resp)
        {
            console.log(resp);
           $rootScope.socials = resp.result;
            console.log($rootScope.socials);
            
            //alert('arvinder');
            $state.go('menu.social');
            
        });
        
        
//    
      
      
           $scope.openBrowser = function(link) {
              // alert("arvinder");
               var options = {
                   location: 'no',
                   clearcache: 'yes',
                   toolbar: 'yes'
               };
              // alert(options);
              // alert("arvinders");
              // $scope.link='https://www.facebook.com/';

               $cordovaInAppBrowser.open(link, '_blank', options)

                       .then(function(event) {
                           //alert("hello");
                          // alert(event);
                       })

                       .catch(function(event) {
                          // alert("hii");
                          // alert(event);
                       });
               $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {
                   if (event.url.match('/confirmation')) {
                       $cordovaInAppBrowser.close();
                      // $state.go("menu.confirmation");

                   }
               });
    }



})


.controller('nutritionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('productCtrl', 
function ($scope, $stateParams,$rootScope,$state) {

$scope.detailGastro = function(title,description){
    $rootScope.title_product = title;
    $rootScope.description_product = description;
    $state.go('menu.oliveoil');
    
}
})

        .controller('contactusCtrl', ['$scope', '$stateParams','$http','$state','$window','Base_Url','$rootScope' ,// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope) {
    
    $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        console.log($scope.data);
        var link = Base_Url+'Addhotels/contact';
        //alert('contact');
        $scope.contacthotel={
            Contact:{
                id:$scope.hotel_id
                
            }
        }
        alert($scope.contacthotel);
        $http.post(link,$scope.contacthotel).success(function(resp)
        {
            
                    //alert('$scope.contacthotel');
            console.log(resp);
          $rootScope.contactus = resp.result;
           console.log($rootScope.contactus);
            
            //alert('arvinder');
            $state.go('menu.contactus');
            
        })
    
    


}])

.controller('oliveoilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
.controller('specialtasteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('ntakosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
.controller('guidetocreteCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope) {

  var link=Base_Url+'Aboutcretes/guidetocrete';
 alert('hit');
 $http.get(link).success(function(resp){
  console.log(resp);

 $rootScope.guidecretes=resp.result;
 console.log($rootScope.guidecretes);
  

 })
$scope.guidevillage = function(creteid,title){
    $rootScope.city_title = title;
     var link=Base_Url+'Aboutcretes/guidetocrete';
     $http.get(link).success(function(resp){
      console.log(resp);
      for(var i=0; i < resp.result.length ; i++){
          console.log(resp.result[i].GuideList);
          for(var j=0 ; j < resp.result[i].GuideList.length ; i++){
              console.log(resp.result[i].GuideList[j].id);
              console.log(creteid)
              if(resp.result[i].GuideList[j].guidecreteid == creteid){
                  
                  $rootScope.villages = resp.result[i];
                  console.log($rootScope.villages);
                  $state.go('menu.cities');
              }
      }
  }
     })
}



})

.controller('citiesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])




   
   
.controller('menuCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams ,Base_Url,$http,$state,$ionicLoading,$window,$ionicPopup,$ionicPlatform,$location,$ionicHistory)
{
    $ionicPlatform.registerBackButtonAction(function(event) {
        if (true) { // your check here
  //alert('abfdhc')
  //var path_value = $location.path()
  //alert(path_value)
   if ($location.path() === '/side-menu21/hotel-group' ) {
    $ionicPopup.confirm({
     title: ' Warning',
     template: 'Are you sure you want to exit?'
      }).then(function(res) {
     if (res) {
      navigator['app'].exitApp(); 
       //ionic.Platform.exitApp();
     }
      })
   }else {
    $ionicHistory.goBack();
   } 
        }
    }, 1000);
    //$scope.data={}
         $scope.logout=function()
         {
            
   var confirmPopup = $ionicPopup.confirm({
     title: 'Logout',
     template: 'Are you sure you want to logout?'
   });
//$ionicLoading.show();
   confirmPopup.then(function(res) {
     if(res) {
        // $ionicLoading.hide();
         $window.localStorage.clear();
         $state.go('menu.login');
       console.log('ok');
     } else {
       console.log('cancel');
     }
   });
 }   
// 
//  $scope.greekword=function()
//    {
//        $scope.hotel_id = JSON.parse($window.localStorage.getItem('hotel')).id;
//        console.log($scope.data);
//        var link = Base_Url+'Staticpages/greekwords';
//        alert('greekword');
//        $scope.greekwordhotel={
//            Social:{
//                id:$scope.hotel_id,
//            }
//        }
//        $http.post(link,$scope.greekwordhotel).success(function(resp)
//        {
//            console.log(resp);
//           $rootScope.socials = resp.result;
//            console.log($rootScope.socials);
//            
//            //alert('arvinder');
//            $state.go('menu.social');
//            
//        })
//    }


        })
        
        

.controller('mountainCtrl', ['$scope', '$stateParams', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal) {

$ionicModal.fromTemplateUrl('templates/idi-psi.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });



}])






.controller('idi-psiCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])



        // $ionicLoading.show();
            
           
         //  $ionicLoading.hide();
          
           
       //console.log($scope.data);
           //alert("ok");
          // var link = Base_Url+'users/logout';
           //if($scope.loading=true)
           //{
//           $http.post(link,{
//               User:{
//                    id:$scope.id,
//                }
//                }).success(function(resp)
//                {
//                 $ionicLoading.hide();   
//                 console.log(resp);
//                 if(resp.isSucess == "true")
//                 {
//                     $state.go('menu.login');
//                     //console.log(resp.msg);
//                     alert(resp.msg);
//                 }
//                 else
//                 {
//                     //console.log(resp.msg);
//                     alert(resp.msg);
//                     
//                 }
//                 })
            //}
                                   
        









.controller('MyCtrl', function($scope) {
  $scope.groups = [];
  for (var i=0; i<1; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
  
});

 