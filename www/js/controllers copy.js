angular.module('app.controllers', ['ngCordova'])
  
.controller('homeCtrl',function ($scope,$stateParams,$state,$http,$ionicLoading,$window,Base_Url) {

    $scope.data={};
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
            nationality : $scope.data.nationality,
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

})
        .controller('loginCtrl',
    function($scope,$state,$stateParams,$http,Base_Url,$window,$ionicLoading)
   {
        $scope.data={};
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
                    console.log($scope.role);
                    console.log($scope.username);
                    console.log($scope.id);
                    console.log($scope.retrieved);
                    $window.localStorage.setItem('currentUser', JSON.stringify(resp));
                    $window.localStorage.setItem('code', $scope.retrieved);
                    $window.localStorage.setItem('User_Id', $scope.id);
                    $window.localStorage.setItem('username', $scope.username);
                    $window.localStorage.setItem('Roles', JSON.stringify($scope.role));
                    
                    
                    $scope.retrieved =  JSON.parse($window.localStorage.getItem('currentUser'));
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
                     //     console.log($scope.retrieved.code);
                          //alert('');
                          $scope.hotelinfo = {
                          AddHotel:{
                    code:$scope.data,
                }
                          }
                          $http.post(link,$scope.hotelinfo
                ).success(function(resp)  
                          {
                              
                              console.log(resp);
                              if(resp.status==true)
                              {
                                $scope.res=resp.result.AddHotel;
                                $scope.groupName=resp.groupname;
                                console.log($scope.res);
                                $window.localStorage.setItem('hotelname',JSON.stringify($scope.res));
                                $window.localStorage.setItem('groupname',JSON.stringify($scope.groupName));
                                //console.log(groupname);

                                   //alert('chatcount');
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
   // alert('post');
    console.log(resp);
    $rootScope.unrdmsg=resp.count;
    console.log($rootScope.unrdmsg);
    $window.localStorage.setItem('unreadmsg',JSON.stringify($rootScope.unrdmsg));
  })

                              } 
                              //alert(JSON.stringify(resp));
//                              $scope.hotel_id=resp.id;
//                              console.log($scope.hotel_id);
//                              $window.localStorage.setItem('Hotel_Id', $scope.hotel_id);
                              
                              //console.log($scope.res.id);
                              //$rootScope.hotel_id=$scope.res.id;
                             // console.log($rootScope.hotel_id);
                              
                             
                              //$scope.data=resp.result
                             // console.log($scope.data);
                              
                          }) 


}])
   
.controller('messagesCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams,Base_Url,$http,$state,$window,$rootScope) {
$scope.data={}
$scope.gt=[]
$scope.input={}
      $scope.Sender=JSON.parse($window.localStorage.getItem('Roles'));
      $scope.Usr_Id=$window.localStorage.getItem('User_Id');
      $scope.name=$window.localStorage.getItem('username');

      $scope.message=function()
      {
       console.log($scope.Sender);
        // return false;
        // console.log($scope.message);
      //alert('arvinder');

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
 // alert('second');


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

      


      // $scope.readchat=resp.dat;
      // console.log($scope.readchat);
      //  $window.localStorage.setItem('chat',JSON.stringify($scope.readchat)).chat[0];


  //alert('chat read');
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









   
.controller('mapCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
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
    //$rootScope.list=resp.list;
    console.log($rootScope.weather);
  for($r=0; $r<=2; $r++)
  {
      $rootScope.weather_list.push(resp.list[$r]);
      
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

  $scope.Hotelname=JSON.parse($window.localStorage.getItem('hotelname')).hotelname;
                       console.log($scope.Hotelname);
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        var link = Base_Url+'Staticpages/aboutus';
       // alert('info');
        $scope.info={
            Staticpage:{
                hotelname:$scope.Hotelname,
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

.controller('usefulnumberCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
   .controller('groupnameCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$http,Base_Url,$rootScope,$state) {


 // $scope.groupname = function(name){
            $scope.Groupname=($window.localStorage.getItem('groupname'));
            var link=Base_Url+'Addhotels/groupname';
          //  alert('arvinder singh');
            $scope.hotelgroup={
                
                AddHotel:{
                    groupname:$scope.Groupname,
            }
            }
            $http.post(link,$scope.hotelgroup).success(function(resp)
           
            {
                console.log(resp);
                $rootScope.Group = resp.result;
                console.log($rootScope.Group);
                $state.go('menu.groupname');
               // alert('arvinder');
                
            })
            
    
    
      


   $scope.data=$window.localStorage.getItem('code');
                       console.log($scope.data);
                      var link=Base_Url+'Addhotels/hotelinfo';
                     //     console.log($scope.retrieved.code);
                         //alert('singh');
                          $scope.hotelinfo = {
                          AddHotel:{
                    code:$scope.data,
                }
                          }
                          $http.post(link,$scope.hotelinfo
                ).success(function(resp)  
                          {
                              console.log(resp);
                             // alert('arvinderssss')
                              $scope.res=resp.result.AddHotel;
                              console.log($scope.res);
                              //$scope.res=resp.result.AddHotel;
                            //  console.log($scope.res);
                              //$scope.data=resp.result
                             // console.log($scope.data);
                              
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
      //alert('arvinder');
      //$scope.about=JSON.parse($window.localStorage.getItem('User_Id'));
                       //console.log($scope.about);
                    var link=Base_Url+'Addhotels/abouthotel';
    
                      
                     //     console.log($scope.retrieved.code);
                         // alert('ok');
                          $scope.about_hotel = {
                          AddHotel:{
                    id:$scope.hotel_id,
                    
                }
                          }
                          $http.post(link,$scope.about_hotel
                ).success(function(resp)  
                          {
                              //alert(resp);
                              console.log(resp);

                               //$scope.res=resp.result.AddHotel;
                               $rootScope.abouthotel = resp.result[0].About;

                               console.log($rootScope.abouthotel);
                               $window.localStorage.setItem('value',JSON.stringify(resp.result[0].About));
                               $scope.get=JSON.parse($window.localStorage.getItem('value')).image;
                               console.log($scope.get);
                               // abouthotel.About.image

                            $state.go('menu.abouthotel');
                            })
                            
                            
                              
                            
                             
                              //console.log($scope.res);
                              //$scope.data=resp.result
                             // console.log($scope.data);
                              
                          })              
               
     
    
//    alert('arvinder');
//    $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
//    console.log($scope.hotel_id);
//      //$scope.about=JSON.parse($window.localStorage.getItem('User_Id'));
//                       //console.log($scope.about);
//                    var link=Base_Url+'Addhotels/abouthotel';
//    
//                      
//                     //     console.log($scope.retrieved.code);
//                          alert('ok');
//                          $scope.about_hotel = {
//                          AddHotel:{
//                    id:$scope.hotel_id,
//                    
//                }
//                          }
//                          $http.post(link,$scope.about_hotel
//                ).success(function(resp)  
//                          {
//                              //alert(resp);
//                              console.log(resp);
//                               //$scope.res=resp.result.AddHotel;
//                               $rootScope.abouthotel = resp.result;
//                             //  console.log($rootScope.hotel);
//                             // $state.go('menu.abouthotel');
//                              
//                              
//                             
//                              //console.log($scope.res);
//                              //$scope.data=resp.result
//                             // console.log($scope.data);
//                              
//                          })                
////     
////    // $scope.abouthotel=function()
////    {
////    
////        //$location.path( path );
////       // alert('arvinder');
////       alert('arvinder');
////      //$scope.about=JSON.parse($window.localStorage.getItem('User_Id'));
////                       //console.log($scope.about);
////                    var link=Base_Url+'Addhotels/abouthotel';
////    
////                      
////                     //     console.log($scope.retrieved.code);
////                          alert('ok');
////                          $scope.about_hotel = {
////                          AddHotel:{
////                    id:$scope.hotel_id,
////                    
////                }
////                          }
////                          $http.post(link,$scope.about_hotel
////                ).success(function(resp)  
////                          {
////                              //alert(resp);
////                              console.log(resp);
////                               //$scope.res=resp.result.AddHotel;
////                               $rootScope.abouthotel = resp.result;
////                             //  console.log($rootScope.hotel);
////                              //$state.go('menu.abouthotel');
////                              
////                              
////                             
////                              //console.log($scope.res);
////                              //$scope.data=resp.result
////                             // console.log($scope.data);
////                              
////                          })                
////               
////     
////    }
//// 
//   


.controller('accomodationCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$state,$rootScope,Base_Url,$http) {
    
    
     $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
    
    ////////////get accomodation details/////////////////
    
    
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
        console.log($scope.hotel_id);
    $scope.accomodationss=function(){
         //alert("working")
        //console.log(name);
        console.log($scope.hotel_id);
       
        var link = Base_Url+'Addhotels/accommodation';
       // alert('arvinder');
        $scope.accomodations={
            Accommodation:{
                id:$scope.hotel_id,
                
            }
        }
        $http.post(link,$scope.accomodations).success(function(resp)
        {
            console.log(resp);
            $rootScope.accomodation1 = resp.result;
            console.log($rootScope.accomodation1);
            
            //alert('arvinder');
          $state.go('menu.room-a');
            
        })
    }
        
    


})
   .controller('room-aCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
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
           // $rootScope.service = resp.result;
            //alert('arvinder');
            $state.go('menu.service');
            
        });
    
}])
  
  
.controller('hotel-aCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Base_Url,$http,$state) {
    $scope.data=$window.localStorage.getItem('code');
    // var link=Base_Url+'Addhotels/abouthotel';
    
                      
    //                  //     console.log($scope.retrieved.code);
    //                      // alert('ok');
    //                       $scope.about_hotel = {
    //                       AddHotel:{
    //                 id:$scope.hotel_id,
                    
    //             }
    //                       }
    //                       $http.post(link,$scope.about_hotel
    //             ).success(function(resp)  
    //                       {
    //                           //alert(resp);
    //                           console.log(resp);
    //                           $rootscope.Images=resp.result;
    //                           console.log($rootscope.Images);



    // // $http.post(link)
    
    
    
    // }


}) 
.controller('QuestionnaireCtrl', ['$scope', '$stateParams','$http','$state','$window','Base_Url','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope) {

    
     $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
                // console.log($scope.data.select);
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
            
//            console.log(answeer);
            //$scope.Question_id=questionari.result.value;
            //$scope.question_id =  JSON.parse($window.localStorage.getItem('$scope.Question_id')).id;
           // console.log($scope.question_id);
            $rootScope.Questionnaires = resp.result;
            console.log($rootScope.Questionnaires);
            

      
           // alert('arvinder');
            $state.go('menu.Questionnaire');
            
        });

     //   angular.forEach($rootScope.Questionnaires, function (key,value) {
     // console.log(key.category);
     // console.log(key.value);
     //  $scope.value = key.value;
     //  angular.forEach($scope.value, function (x,y){
     //    console.log(x);
     //  }
        
     //    )
     //        },$scope.review
            
     //        );


//        angular.forEach($scope.review, function (x,y) {
//     //  console.log(value);
//       console.log(x+': ' + y);
//             },$scope.xy
            
//             );
// console.log($scope.review);
// console.log($scope.xy);

    //$scope.datar={};
$scope.data={}
$scope.val={}

 $scope.sel={};
 $scope.gt=[];
 // $scope.as={};
 // $scope.cm={};
 $scope.star={};
 // $scope.ssss={}
 $scope.ratings={}
 
 // $scope.starta=[];
 // $scope.as={}
 // $scope.ft=[];
  // $scope.data.choice="radio";
  // $scope.select={};
    $scope.submit=function()
    { 
     // console.log($scope.cm);
     console.log($scope.val);
      console.log($scope.sel);
      // console.log($scope.as);
      console.log($scope.data);
      // console.log($scope.ssss);
      // alert("hii")
      // return false;
      // console.log($scope.as);
      $scope.user_ids=$window.localStorage.getItem('User_Id');
      console.log($scope.user_ids);
      //alert('arvinder');
      //$scope.sel=[];
      angular.forEach($scope.sel,function(value,key){
      console.log(key);
      $scope.gt.push({'id':key,'value':value});
      // $scope.ft.push({'value':value});
})
      console.log($scope.gt);



      // angular.forEach($scope.as,function(value,key)
      // {
      //   $scope.cm.push({'comments':value});
      // })
      // console.log($scope.cm);


      //  angular.forEach($scope.star,function(value,key)
      // {
      //   $scope.starta.push({'rating':value});
      // })
      // console.log( $scope.starta);
      //console.log($scope.ft);

      var link = Base_Url+'Addhotels/questionnaires_answers';

      //alert('arvinderdd');
          $scope.questionsubmit={
       QuestionnairesAnswer:
           {
        userid:$scope.user_ids,
        result:$scope.gt,
        rating: $scope.val.rating,
        comments: $scope.data.comments,

        // answer:$scope.ft,
  }
        

}

      $http.post(link,$scope.questionsubmit).success(function(resp){
        console.log(resp);

      })
      
        
      
      //alert("submit success");
      // $state.go('menu.hotelname');
        
    }

}]) 
          // console.log(value);
          // $scope.sel.push(key);
          // console.log($scope.sel);
          // $scope.cel.push(value);
          // console.log($scope.cel);



    // var postData ={
    //     ids: {
    //       id: $scope.vals
    //     }}
    //     alert(postData);
    //     console.log(postData);
    //     answers: {
    //       answer: {}
    //     }
    //   }
    // }
        

    
    // $scope.data={};
    // $scope.sel=[];
    
    // $scope.value=function(vals)
    // {
    //     $scope.vals = vals;
    //     console.log($scope.vals);
    //    // alert($scope.data.val);
    //      $scope.usr_id=JSON.parse($window.localStorage.getItem('User_Id'));
    //      console.log($scope.usr_id);
    //   // var link = Base_Url+'Addhotels/questionnaires_answers';
    //     console.log($scope.data);
    //     angular.forEach($scope.sel,function(key,value){
             
    //       console.log(key);
    //       console.log(value);
    //       $scope.sel.push(key);
    //       console.log($scope.sel);
    //       $scope.cel.push(value);
    //       console.log($scope.cel);


    //       // console.log($scope.sel.push);
    //       // $scope.cel.push(value);
    //       // console.log($scope.cel.push);


    //     });
    //     console.log(vals);
        
    //     $window.localStorage.setItem('questionari',JSON.stringify($scope.sel));
    //    $scope.answer_ids = JSON.parse($window.localStorage.getItem('questionari'));
    //    console.log($scope.answer_ids);








        // angular.forEach($scope.answer_ids, function(value,key){
        //   this.push(key+': ' + value);
        // })
        // cnsole.log(key);

       // $scope.val={}
    //    $scope.review = []; 
    //    angular.forEach($scope.answer_ids, function (key,value) {
    // //  console.log(value);
    //   console.log(value+': ' + key);
    //         },$scope.review
            
    //         );
    //    $scope.split = $scope.review.split(" ");
    //         console.log($scope.split[0]+"//"+$scope.split[1]);
    //    $scope.next = [];
    //    angular.forEach($scope.review,function (x, y){
    //           console.log(x+':'+y);
              
    //         },$scope.next);

    //     console.log($scope.next);

    //     console.log($scope.review);
    //     console.log($scope.review[0]);
       // alert('done');
        //alert("Submit");
//        $scope.answeer = document.getElementById('a').value;
//        console.log($scope.answeer);
            //$state.go('menu.hotelname');
           // $state.go('menu.hotelname');
    




    


    
    




.controller('creteCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {







}) 


.controller('aboutcreteCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {


 //$ionicLoading.show();
 var link=Base_Url+'Aboutcretes/aboutcrete';
 alert('hit');
 $http.get(link).success(function(resp){
  console.log(resp);
//$ionicLoading.hide();
$rootScope.aboutcrete=resp.result;
console.log($rootScope.aboutcrete);
  

 })



})

.controller('geographyCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {

$scope.id =  $stateParams.id;

  var link=Base_Url+'Aboutcretes/aboutcrete';
 alert('hit');
 $http.get(link).success(function(resp){
  console.log(resp);

for($i=0;$i<resp.result.length;$i++){
    console.log(resp.result[$i].AboutCrete.id);
    if(resp.result[$i].AboutCrete.id == $scope.id){
      $scope.value = resp.result[$i];
      console.log($scope.value);
      

    }
}
$scope.Aboutcrete=resp.result;
console.log($scope.Aboutcrete);


})


}) 

.controller('mythologyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}]) 

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
                   toolbar: 'no'
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

.controller('productCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

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
//$ionicLoading.hide();
// $rootScope.guidecrete=resp.result;
// console.log($rootScope.guidecrete);
  

 })




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

 