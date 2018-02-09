angular.module('app.controllers', ['ngCordova'])
  
.controller('homeCtrl',function ($scope,$stateParams,$translate,$state,$http,$ionicLoading,$window,Base_Url,$ionicPopup,$rootScope) {

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
         
    if($scope.data.password != $scope.data.cpassword)
    {
        var alertPopup = $ionicPopup.alert({
       //title: 'Don\'t eat that!',
       template: 'password mismatch'
                           });
        alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
                              });
  
        //alert('password mismatch');
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
                password:$scope.data.password,
                cpassword:$scope.data.cpassword,
               }

       $http.post(link, postData).then(function(resp){
                $ionicLoading.hide();
                console.log(resp)
               console.log(resp.data);
               $scope.retrieved = resp.data.code;
               console.log( $scope.retrieved)
                $window.localStorage.setItem('code', $scope.retrieved);
             //alert(JSON.stringify(resp));             
                if(resp.data.status==true)
                {
                    $window.localStorage.setItem('userinfo',JSON.stringify(resp.data));
                    $scope.retreived=JSON.parse($window.localStorage.getItem('userinfo'));
                    $scope.username = $scope.retreived.username;
                    $scope.role = $scope.retreived.role;
                    $scope.chat = $scope.retreived.chat_status;
                    $rootScope.cod =  $scope.retreived.code;
                    $window.localStorage.setItem('username', $scope.username);
                    $window.localStorage.setItem('Roles', JSON.stringify($scope.role));
                    $window.localStorage.setItem('chat_status',$scope.chat);
                    $window.localStorage.setItem('code', $rootScope.cod);
                    $window.localStorage.setItem('User_Id', $scope.retreived.id);
                    
                     console.log($scope.retreived);
                 
                    $state.go('menu.groupHotel');
                      var alertPopup = $ionicPopup.alert({
                      template: resp.data.msg
                           });
                      alertPopup.then(function(res) {
                     
                              });
                                   
               }
                else
                   {
                       //alert(resp.data.msg);
                        var alertPopup = $ionicPopup.alert({
                      template: resp.data.msg
                           });
                      alertPopup.then(function(res) {
                     
                              });
                       //alert($scope.response.data.msg);
                   }
                
            })
        }
            
       
    }
}
  $scope.setLang = function(langKey) {
    // You can change the language during runtime
    $translate.use(langKey);
    $rootScope.currentLanguage = $translate.use();
    console.log($translate.use())
  };
//   $scope.languageChanged = function(){
//     if($scope.data.language === true){
//       $scope.setLang('en');
//     }else{
//       $scope.setLang('el');
//     }
//   }
})
.controller('loginCtrl',
    function($scope,$state,$stateParams,$http,Base_Url,$window,$ionicLoading,$rootScope,$ionicPopup,$httpParamSerializer)
   {
        $scope.data={};
        $scope.data.email = '';
        $scope.data.password = '';
        console.log($scope.data.email);
        console.log($scope.data.password);
        if($window.localStorage.getItem('userinfo')){
       
           $state.go('menu.groupHotel');
        }
        // else{
           
        //     $state.go('menu.login');
        // }

       
        
        $scope.signin = function()
        {
         $ionicLoading.show();
         console.log($scope.data);
         var link = Base_Url+'users/logins';
           $http.post(link,{
                    email:$scope.data.email,
                    password:$scope.data.password,
                }).success(function(resp)
                {
            
                    $ionicLoading.hide();
                    console.log(resp);
                     if(resp.status == true) {
                
                    $scope.retrieved = resp.code;
                    $scope.id=resp.id;
                    $scope.username=resp.reservationname;
                    $scope.role=resp.role;
                    $scope.chat = resp.chat_status;
                    $rootScope.cod = resp.code;
                    // console.log($scope.chat)
                    // console.log($scope.role);
                    // console.log($scope.username);
                    // console.log($scope.id);
                    // console.log($scope.retrieved);
                    $window.localStorage.setItem('userinfo', JSON.stringify(resp));
                    $window.localStorage.setItem('code', $scope.retrieved);
                    $window.localStorage.setItem('User_Id', $scope.id);
                    $window.localStorage.setItem('username', $scope.username);
                    $window.localStorage.setItem('Roles', JSON.stringify($scope.role));
                    $window.localStorage.setItem('chat_status',$scope.chat);
                    $window.localStorage.setItem('code', $rootScope.cod);
                    console.log($rootScope.cod);
                    $scope.retrieved =  JSON.parse($window.localStorage.getItem('userinfo'));
                    console.log( $scope.retrieved)
                         var alertPopup = $ionicPopup.alert({
                      template: resp.msg
                           });
                      alertPopup.then(function(res) {
                   
                              }); 
                     $state.go('menu.groupHotel');
                     
                     
                     }
                    else
                    {
                     //  alert(resp.msg);
                        var alertPopup = $ionicPopup.alert({
                      template: resp.msg
                           });
                      alertPopup.then(function(res) {
                   
                              }); 
                    }
                    
                    
                    
                })
            
            
            
        }
     
        
        
       ////////////////////////////forget password//////////////////// 
           //////////////////////////////////forgot password///////////////////////////////////////

        
        
        
    })
    
    
    
    
    
.controller('forgotCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$rootScope,$http,$ionicPopup,Base_Url,$state,$httpParamSerializer,$window) {
        $scope.data={};
      $scope.forgot_password=function(){
            // alert("forgot_password");
                 $rootScope.Userid = $window.localStorage.getItem("user_id");
           // console.log($scope.data.email);
           var User= $httpParamSerializer({
                username:$scope.data.email
                })
                console.log($scope.data.email)
            $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';  
            $http.post(Base_Url+"users/forgetpwd", User).then(function (res){
            $scope.response = res.data;
            console.log($scope.response);
            if(res.data.isSucess == "true"){
            $ionicLoading.hide();
            var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                           template: "Check your Email to reset your password",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
           // alert(res.data.msg); 
            $state.go("menu.login");
          }else{
              
            $ionicLoading.hide();  
            var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                           template: res.data.msg,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]  
                        })
        
                    }
                })
            }
        

})
   
.controller('groupHotelCtrl', ['$scope', '$stateParams','$window', 'Base_Url','$http','$state','$rootScope','$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope, $stateParams,$window,Base_Url,$http,$state,$rootScope,$ionicLoading) {
    $scope.Sender=JSON.parse($window.localStorage.getItem('Roles'));
    $scope.Usr_Id=$window.localStorage.getItem('User_Id');
    $scope.data=JSON.parse($window.localStorage.getItem('code'));
    console.log($scope.data);
    
     $ionicLoading.show();   
        var link=Base_Url+'Addhotels/hotelinfo';
        var bg_link = Base_Url+'Addhotels/hotelbackground';
        $scope.hotelinfo = {
            AddHotel:{
             code:$scope.data,
                    }
                          }
        console.log($scope.hotelinfo) ;                 
        $http.post(link,$scope.hotelinfo).success(function(resp)  
            {
                console.log(resp);
                 $ionicLoading.hide();   
        console.log(resp);
        if(resp.status==true)
            {
                
                $scope.res=resp.result.AddHotel;
                $scope.groupNamee=resp.groupname;
                console.log($scope.res);
                $rootScope.groupName = resp.result.AddHotel.groupname;
                console.log($rootScope.groupName);
                $rootScope.groupname_greek = resp.result.AddHotel.groupname_greek;
                console.log($rootScope.groupname_greek);
                console.log(resp.result.AddHotel.id);
                $scope.hotelbg = {
            AddHotel:{
             id:resp.result.AddHotel.id,
                    }
                          }
    $http.post(bg_link,$scope.hotelbg).success(function(resphotel) {   
     console.log(resphotel);
    //  alert(resphotel.result.length);
     if(resphotel.result.length == 0){
        //  alert("if");
         $scope.imagebg = 'https://images.sunshine.co.uk/ss/htl/0/6/8/68-33-l.jpg';
              $ionicLoading.show();   
  
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
  $ionicLoading.hide();
    console.log(resp);
    $rootScope.unrdmsg=resp.count;
    console.log($rootScope.unrdmsg);
    $window.localStorage.setItem('unreadmsg',JSON.stringify($rootScope.unrdmsg));
  })
  
     }else{
     $scope.imagebg = resphotel.result.Background.image;
          $ionicLoading.show();   
  
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
  $ionicLoading.hide();
    console.log(resp);
    $rootScope.unrdmsg=resp.count;
    console.log($rootScope.unrdmsg);
    $window.localStorage.setItem('unreadmsg',JSON.stringify($rootScope.unrdmsg));
  })
     }

    })
        } 
           
   }) 

}])
   
// .controller('messagesCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName

// function ($scope, $stateParams,Base_Url,$http,$state,$window,$rootScope,$ionicPopup,$ionicLoading) {
// $scope.data={}
// $scope.gt=[]
// $scope.input={}
//       $scope.Sender=JSON.parse($window.localStorage.getItem('Roles'));
//       $scope.Usr_Id=$window.localStorage.getItem('User_Id');
//       $scope.name=$window.localStorage.getItem('username');
//       $scope.chat=$window.localStorage.getItem('chat_status')
//       console.log($scope.chat)
// if($window.localStorage.getItem('chat_status') == 1 ){
    
//      var alertPopup = $ionicPopup.alert({
//       // title: 'Don\'t eat that!',
//        template: 'you cannot send any message'
//      });
//      alertPopup.then(function(res) {
//        console.log('Thank you for not eating my delicious ice cream cone');
//      });
  
//   //  alert("you cananot send any msg")
//    // alert("if");
// }else{
//    // alert("else")
//       $scope.message=function()
//       {
//        console.log($scope.Sender);
//       console.log($scope.input);
//       console.log($scope.Usr_Id);
//       console.log($scope.name);
// $ionicLoading.show();
//         var link=Base_Url+'Chats/chat';
//         //alert('done');
//     $scope.Message={ 
//              chat:
//              {
//                 uid:$scope.Usr_Id, 
//                 aid:"1", 
//                 name:$scope.name,
//                 msg:$scope.input.msg,
//                 image:null,
//                 sender:$scope.Sender,
//             }
//           }
//          console.log($scope.Message);
// $ionicLoading.hide();
//         $http.post(link,$scope.Message).success(function(resp)
//         {
//          // alert('hit');
//           if(resp.isSuccess == "true")
//           {
//            console.log(resp);
//            $scope.input.msg=null;
//     var link=Base_Url+'Chats/chatview';

// //alert('chatview');
//     $scope.chatview={ 
//        chat:
//        {
//         uid:$scope.Usr_Id, 
//         aid:"1", 
//       }
//     }
//  console.log($scope.chatview);

//   $http.post(link,$scope.chatview).success(function(resp)
//   {
//     console.log(resp);
//     $rootScope.Sends=resp.data;
//     console.log($rootScope.Sends);
//   })
// }

  
//    })
//       }
// }

// //chat view////

// $ionicLoading.show();
// var link=Base_Url+'Chats/chatview';
// //alert('chatview');
//  $scope.chatview={ 
//     chat:
//     {
//   uid:$scope.Usr_Id, 
//   aid:"1", 
//    }
//  }
//  console.log($scope.chatview);
// $ionicLoading.hide();
//   $http.post(link,$scope.chatview).success(function(resp)
//   {
//     if(resp.isSuccess=="true")
//     {

//     console.log(resp);
//     $rootScope.Sends=resp.data;
//     console.log($rootScope.Sends);
 

//       angular.forEach(resp.data,function(value,key){
//       console.log(key);
   
//       $scope.gt.push(value.Chat.id);
//       // $scope.ft.push({'value':value});
//       this.push(value.Chat.id);
//                 },$scope.gt);
//       console.log($scope.gt); 

//     $ionicLoading.show();
//     var link=Base_Url+'Chats/readchat';
//     delete $rootScope.unrdmsg;
//     //alert('chatread');
//     $scope.chatread={ 
//     chat:
//     {
//   chat_id:$scope.gt, 
//   type:$scope.Sender, 
//    }
//  }
//  console.log($scope.chatread);
// $ionicLoading.hide();
//   $http.post(link,$scope.chatread).success(function(resp)
//   {
//     console.log(resp);
//   })

//   /////chat read/////

//  };
//   })
  

//      })


.controller('messagesCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

        function ($scope, $stateParams, $ionicScrollDelegate, Base_Url, $http, $state, $window, $rootScope, $ionicPopup, $ionicLoading) {
            $ionicLoading.show();
            $scope.data = {}
            $scope.gt = []
            $rootScope.Sends = '';
            $scope.input = {}
            $scope.code = $window.localStorage.getItem('code');
            $scope.Sender = JSON.parse($window.localStorage.getItem('Roles'));
            $scope.Usr_Id = $window.localStorage.getItem('User_Id');
            $scope.name = $window.localStorage.getItem('username');
            $scope.chat = $window.localStorage.getItem('chat_status')
            console.log($scope.chat)
            var admin_link = Base_Url + 'users/restadmindata';
            $scope.code_admin = {
                user: {
                    code: $scope.code
                }
            }
            $http.post(admin_link, $scope.code_admin).success(function (resp) {
                $ionicLoading.hide();
                if (resp.isSucess == "0") {
                    console.log(resp);
                    $scope.rest_admin_id = resp.data.User.id;
                    $ionicLoading.show();
                    var link = Base_Url + 'Chats/chatview';
                    //alert('chatview');
                    $scope.chatview = {
                        chat:
                        {
                            uid: $scope.Usr_Id,
                            aid: $scope.rest_admin_id,
                        }
                    }
                    console.log($scope.chatview);
                    $ionicLoading.hide();
                    $http.post(link, $scope.chatview).success(function (resp) {
                        if (resp.isSuccess == "true") {

                            console.log(resp);
                            $rootScope.Sends = resp.data;
                            console.log($rootScope.Sends);
                            $ionicScrollDelegate.scrollBottom();

                            angular.forEach(resp.data, function (value, key) {
                                console.log(key);

                                $scope.gt.push(value.Chat.id);
                                // $scope.ft.push({'value':value});
                                this.push(value.Chat.id);
                            }, $scope.gt);
                            console.log($scope.gt);


                            var link = Base_Url + 'Chats/readchat';
                            delete $rootScope.unrdmsg;
                            //alert('chatread');
                            $scope.chatread = {
                                chat:
                                {
                                    chat_id: $scope.gt,
                                    type: $scope.Sender,
                                }
                            }
                            console.log($scope.chatread);
                            $ionicLoading.hide();
                            $http.post(link, $scope.chatread).success(function (resp) {
                                console.log(resp);
                            })

                            /////chat read/////

                        } else {
                            alert("NO MESSAGES YET!");
                        }
                    })
                } else {
                    alert("Try Again");
                }
            })

            ///////////////////--------FUNCTION-------------//////////////////

            $scope.message = function () {

                //   if($scope.chat == 1){


                // }
                // else{

                console.log($scope.Sender);
                console.log($scope.input);
                console.log($scope.Usr_Id);
                console.log($scope.name);
                $ionicLoading.show();
                var link_status = Base_Url + 'users/usersdata';

                $scope.status_chk = {
                    user: {
                        id: $scope.Usr_Id
                    }
                }
                $http.post(link_status, $scope.status_chk).success(function (resp) {
                    if (resp.data.User.chat_status == 1) {
                        var link = Base_Url + 'Chats/chat';
                        //alert('done');
                        $scope.Message = {
                            chat:
                            {
                                uid: $scope.Usr_Id,
                                aid: $scope.rest_admin_id,
                                name: $scope.name,
                                msg: $scope.input.msg,
                                image: null,
                                sender: $scope.Sender,
                            }
                        }
                        console.log($scope.Message);
                        $ionicLoading.hide();
                        $http.post(link, $scope.Message).success(function (resp) {
                            // alert('hit');
                            if (resp.isSuccess == "true") {
                                console.log(resp);
                                $scope.input.msg = null;
                                var link = Base_Url + 'Chats/chatview';


                                $scope.chatview = {
                                    chat:
                                    {
                                        uid: $scope.Usr_Id,
                                        aid: $scope.rest_admin_id,
                                    }
                                }
                                console.log($scope.chatview);

                                $http.post(link, $scope.chatview).success(function (resp) {
                                    console.log(resp);
                                    $rootScope.Sends = resp.data;
                                    console.log($rootScope.Sends);
                                    $ionicScrollDelegate.scrollBottom();
                                })
                            }


                        })
                    } else {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({

                            template: 'Sorry! You Cannot Send Any Message'
                        });
                        alertPopup.then(function (res) {

                        });
                    }
                })
            }

    //   }


})






   
.controller('mappageCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$cordovaGeolocation,$rootScope,$state) {
//$scope.shop_map = function(){
//   alert("map") 
//     var posOptions = {timeout: 10000, enableHighAccuracy: true};
//            $cordovaGeolocation
//            .getCurrentPosition(posOptions)
//           
//            .then(function (position) {
//                alert("location1");
//            $rootScope.lat_set = position.coords.latitude;
//            $rootScope.long_set = position.coords.longitude; 
//            console.log($rootScope.lat_set)
//            console.log( $rootScope.long_set)
//            console.log( $rootScope.lat )
//            console.log( $rootScope.long) 
//              $rootScope.closeModal(); 
//          $state.go('menu.mappage');
//            
//        })
//      
//      
//      
//}

      
// ///////////// shop directions////////
// 
//  $scope.launchNavigator = function() {
//      alert("path")
//     
//         var posOptions = {timeout: 10000, enableHighAccuracy: true};
//            $cordovaGeolocation
//            .getCurrentPosition(posOptions)
//           
//            .then(function (position) {
//               // alert("location1");
//            $rootScope.lat_set = position.coords.latitude;
//            $rootScope.long_set = position.coords.longitude; 
//            console.log($rootScope.lat_set)
//            console.log( $rootScope.long_set)
//            console.log( $rootScope.lat )
//            console.log( $rootScope.long) 
//              // $rootScope.closeModal(); 
//               
//                var destination = [$rootScope.lat, $rootScope.long];
//	var start = [$rootScope.lat_set, $rootScope.long_set];
//      //  alert($rootScope.lat+"lat")
//       // alert($rootScope.long+"long");
//      //  alert($rootScope.lat_set+"current lat");
//       // alert($rootScope.long_set+"current long");
//   launchnavigator.navigate(destination, start).then(function() {
//      console.log("Navigator launched");
//    }, function (err) {
//      console.error(err);
//    });   
//               
//               
//               
//               
//               
//               
//        }) 
//      
//      
//      
//      
//      
//      
//      
//
//  }
//

    


})
  .controller('mapCtrl',function ($scope, $stateParams,$http,Base_Url,$rootScope,$ionicLoading,$state) {


//http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/maplist
      $ionicLoading.show();
var link=Base_Url+'Aboutcretes/maplist';
  $http.get(link).success(function(resp)
  {
       $ionicLoading.hide();
    console.log(resp);
    $rootScope.map = resp.result;
  })
  $scope.particularcrete = function(creteid,cretetitle){
     $ionicLoading.show();
     $rootScope.crete_ID = creteid;
     $rootScope.crete_title = cretetitle;
     $rootScope.creid = creteid;
      $scope.crete = {
          Guide : {
              id : $rootScope.crete_ID,
              title : $rootScope.crete_title
          }
      }
      console.log($scope.crete);
//      http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/mapdata

      var link=Base_Url+'Aboutcretes/mapdata';
  $http.post(link,$scope.crete).success(function(resp)
  {
    $ionicLoading.hide();
    console.log(resp);
    $rootScope.map_details = resp.result;
    console.log($rootScope.map_details);

   
  })
  }
    /////////////////////////on click map marker///////////////////
  $scope.mapclick = function(event,idd,reg,beachid){
      //alert(beachid);
    //   alert(image);
	//  alert(reg)
   //   alert("iddddddddd")
   // alert(idd);
    // console.log(event);
  //  alert($rootScope.creid)
  
 if($rootScope.creid == "1"){
     $rootScope.city_immage = [];
	// alert("kk")
 $ionicLoading.show();
 var link=Base_Url+'Aboutcretes/guidetocrete';
 $http.get(link).success(function(resp){
 $ionicLoading.hide();
  //console.log(resp);
 for(var i=0; i < resp.result.length ; i++){
//console.log(resp.result[i].GuideList);
for(var j=0; j < resp.result[i].GuideList.length ; j++){
if(resp.result[i].GuideList[j].id==idd){
    console.log(resp.result[i].GuideList[j])

	// $rootScope.title = resp.result[i].GuideList[j].title;
$rootScope.hera = resp.result[i].GuideList[j];
    // $scope.image = resp.result[i].GuideList[j].image;
    // console.log($scope.city_immage);
$scope.image = resp.result[i].GuideList[j].image.split(',');
	
	
console.log($scope.image);
angular.forEach($scope.image,function(key,value){
$rootScope.city_immage.push(key);
        })
	}
}
           
$state.go("menu.heraklion")				
  } 
 

 })
   } 
 if($rootScope.creid == "2"){
    //    $rootScope.city_immage = [];
     console.log("eeeeeeeeeeeeeeeeaaaaaaaaaaaaassssssssssssssssttttttttttt")
    var link=Base_Url+'Aboutcretes/regionofcrete';
        $scope.east = {
            GuideVillage : {
                 region : reg
            }
                }
$http.post(link,$scope.east).success(function(response){
console.log(response);

if(reg == "East Crete"){
//	alert(reg)
//	alert("if")
// $rootScope.east = response.result;  
// console.log($rootScope.east)
 $state.go('menu.villages' , {id: idd});
 
}
if(reg == "West Crete"){
$rootScope.village_Mapp = [];
   // alert(idd)
var link=Base_Url+'Aboutcretes/regionofcrete';
$scope.east = {
GuideVillage : {
       region : reg
            }
                }
$http.post(link,$scope.east).success(function(response){
	console.log(response);
    for(i = 0; i<=response.result.length;i++){
        console.log(response.result[i].GuideVillage.id);
        if(idd == response.result[i].GuideVillage.id){
        $rootScope.westMap = response.result[i].GuideVillage;
        console.log($rootScope.westMap);
          $scope.image_Map = response.result[i].GuideVillage.image.split(',');
	
	
    console.log($scope.image_Map);
    angular.forEach($scope.image_Map,function(key,value){
            console.log(key);
            console.log(value);
    $rootScope.village_Mapp.push(key);
        })
             
    $state.go('menu.villageswestMap');
        return false;
   
        }
    }

// $state.go("menu.villageswestMap");
// }
// )}
//         })
})	  
    } 
})
 }
if($rootScope.creid == "3")	{
    $rootScope.beach_image = [];
   // alert('id ============= 3');
//alert(beachid)
  //  alert("wekjh")
//   $rootScope.city_immage = [];
 $scope.beaches_Map = {
        GuideBeache : {
            id : beachid
        }
    }
    
    // $rootScope.created_id = creteid;
        var link=Base_Url+'Aboutcretes/guidebeachesbyparams';
        $http.post(link,$scope.beaches_Map).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
      
        for(var x = 0 ; x <= resp.result.length ; x++){
            
            console.log(resp.result[x].GuideBeache.id);
            if(idd == resp.result[x].GuideBeache.id){
                $rootScope.beach = resp.result[x].GuideBeache;
                // $rootScope.beach_desc = resp.result[x].GuideBeache.description;
                $scope.Beach_Map = resp.result[x].GuideBeache.image.split(',');
                console.log($scope.Beach_Map);
                angular.forEach($scope.Beach_Map,function(key,value){
                console.log(key);
                console.log(value);
                $rootScope.beach_image.push(key);
                        })
                $state.go('menu.1stnearestbeach',{ lat_current : resp.result[x].GuideBeache.latitude , long_current : resp.result[x].GuideBeache.longitude });
                return false;
            }
            // $rootScope.beach = resp.result[x].GuideBeache.id;
            // console.log($rootScope.beach);
               
                // $state.go('menu.beaches',{id : creteid});
              }

          }) 
}
if($rootScope.creid == "4")	{

        $rootScope.beach_image = [];
    //    alert('id ============= 3');
      //  alert(beachid)
        //    alert("wekjh")
        //   $rootScope.city_immage = [];
        $scope.beaches_Map = {
                GuideBeache : {
                    id : beachid
                }
            }
    
    // $rootScope.created_id = creteid;
        var link=Base_Url+'Aboutcretes/guidebeachesbyparams';
        $http.post(link,$scope.beaches_Map).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
      
        for(var x = 0 ; x <= resp.result.length ; x++){
            
            console.log(resp.result[x].GuideBeache.id);
            if(idd == resp.result[x].GuideBeache.id){
                // $rootScope.beach_title = resp.result[x].GuideBeache.title;
                $rootScope.beach = resp.result[x].GuideBeache;
                $scope.Beach_Map = resp.result[x].GuideBeache.image.split(',');
                console.log($scope.Beach_Map);
                    angular.forEach($scope.Beach_Map,function(key,value){
                            console.log(key);
                            console.log(value);
                            $rootScope.beach_image.push(key);
                        })
                $state.go('menu.1stnearestbeach',{ lat_current : resp.result[x].GuideBeache.latitude , long_current : resp.result[x].GuideBeache.longitude });
                return false;
            }
            // $rootScope.beach = resp.result[x].GuideBeache.id;
            // console.log($rootScope.beach);
               
                // $state.go('menu.beaches',{id : creteid});
              }

          }) 

}
 if($rootScope.creid == "5")	{
     $rootScope.beach_image = [];
   //  alert('arch')
       $scope.crete_arch = {
          Guide : {
              id : $rootScope.crete_ID,
              title : $rootScope.crete_title
          }
      }
      console.log($scope.crete_arch);
//      http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/mapdata
 $ionicLoading.show();
      var link=Base_Url+'Aboutcretes/mapdata';
  $http.post(link,$scope.crete_arch).success(function(resp)
  {
       $ionicLoading.hide();
       console.log(resp);
        for(var z = 0 ; z <= resp.result.length ; z++){
            
            console.log(resp.result[z].id);
            if(idd == resp.result[z].id){
                // $rootScope.beach_title = resp.result[z].title;
                $rootScope.beach = resp.result[z];
                $scope.arch_Map = resp.result[z].image.split(',');
                console.log($scope.arch_Map);
                    angular.forEach($scope.arch_Map,function(key,value){
                            console.log(key);
                            console.log(value);
                            $rootScope.beach_image.push(key);
                        })
                $state.go('menu.1stnearestbeach',{ lat_current : resp.result[z].lat , long_current : resp.result[z].long });
                return false;
            }
            // $rootScope.beach = resp.result[x].GuideBeache.id;
            // console.log($rootScope.beach);
               
                // $state.go('menu.beaches',{id : creteid});
              }

   
  })
}

 if($rootScope.creid == "6")	{
     $rootScope.beach_image = [];
     //alert('arch')
       $scope.crete_arch = {
          Guide : {
              id : $rootScope.crete_ID,
              title : $rootScope.crete_title
          }
      }
      console.log($scope.crete_arch);
//      http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/mapdata
 $ionicLoading.show();
      var link=Base_Url+'Aboutcretes/mapdata';
  $http.post(link,$scope.crete_arch).success(function(resp)
  {
       $ionicLoading.hide();
       console.log(resp);
        for(var z = 0 ; z <= resp.result.length ; z++){
            
            console.log(resp.result[z].id);
            if(idd == resp.result[z].id){
                // $rootScope.beach_title = resp.result[z].title;
                $rootScope.beach = resp.result[z];
                $scope.arch_Map = resp.result[z].image.split(',');
                console.log($scope.arch_Map);
                    angular.forEach($scope.arch_Map,function(key,value){
                            console.log(key);
                            console.log(value);
                            $rootScope.beach_image.push(key);
                        })
                $state.go('menu.1stnearestbeach',{ lat_current : resp.result[z].lat , long_current : resp.result[z].long });
                return false;
            }
            // $rootScope.beach = resp.result[x].GuideBeache.id;
            // console.log($rootScope.beach);
               
                // $state.go('menu.beaches',{id : creteid});
              }

   
  })
}
 if($rootScope.creid == "7")	{
     $rootScope.beach_image = [];
   //  alert('arch')
       $scope.crete_arch = {
          Guide : {
              id : $rootScope.crete_ID,
              title : $rootScope.crete_title
          }
      }
      console.log($scope.crete_arch);
//      http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/mapdata
 $ionicLoading.show();
      var link=Base_Url+'Aboutcretes/mapdata';
  $http.post(link,$scope.crete_arch).success(function(resp)
  {
       $ionicLoading.hide();
       console.log(resp);
        for(var z = 0 ; z <= resp.result.length ; z++){
            
            console.log(resp.result[z].id);
            if(idd == resp.result[z].id){
                // $rootScope.beach_title = resp.result[z].title;
                $rootScope.beach = resp.result[z];
                $scope.arch_Map = resp.result[z].image.split(',');
                console.log($scope.arch_Map);
                    angular.forEach($scope.arch_Map,function(key,value){
                            console.log(key);
                            console.log(value);
                            $rootScope.beach_image.push(key);
                        })
                $state.go('menu.1stnearestbeach',{ lat_current : resp.result[z].lat , long_current : resp.result[z].long });
                return false;
            }
            // $rootScope.beach = resp.result[x].GuideBeache.id;
            // console.log($rootScope.beach);
               
                // $state.go('menu.beaches',{id : creteid});
              }

   
  })
}
 if($rootScope.creid == "8")	{
     $rootScope.beach_image = [];
  //   alert('arch')
       $scope.crete_arch = {
          Guide : {
              id : $rootScope.crete_ID,
              title : $rootScope.crete_title
          }
      }
      console.log($scope.crete_arch);
//      http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/mapdata
 $ionicLoading.show();
      var link=Base_Url+'Aboutcretes/mapdata';
  $http.post(link,$scope.crete_arch).success(function(resp)
  {
       $ionicLoading.hide();
       console.log(resp);
        for(var z = 0 ; z <= resp.result.length ; z++){
            
            console.log(resp.result[z].id);
            if(idd == resp.result[z].id){
                // $rootScope.beach_title = resp.result[z].title;
                $rootScope.beach = resp.result[z];
                $scope.arch_Map = resp.result[z].image.split(',');
                console.log($scope.arch_Map);
                    angular.forEach($scope.arch_Map,function(key,value){
                            console.log(key);
                            console.log(value);
                            $rootScope.beach_image.push(key);
                        })
                $state.go('menu.1stnearestbeach',{ lat_current : resp.result[z].lat , long_current : resp.result[z].long });
                return false;
            }
            // $rootScope.beach = resp.result[x].GuideBeache.id;
            // console.log($rootScope.beach);
               
                // $state.go('menu.beaches',{id : creteid});
              }

   
  })
}
  }
})
 


 .controller('villageswestMapCtrl',  
function ($scope, $stateParams,$http,Base_Url,$rootScope,$state,  $cordovaGeolocation,$cordovaLaunchNavigator) {





})

.controller('weatherCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$http,$rootScope,$window,Base_Url,$ionicLoading,$filter) {

  var d = new Date();
    var n = d.getDay();
var oneday = [];


 // alert('weather');
//    $ionicLoading.show();

// $rootScope.week = date_days[0];
console.log($rootScope.weather_list);

  var link='http://api.openweathermap.org/data/2.5/forecast/daily?q=crete,greece&appid=7756a5add72128537d61c8fccb203817&units=metric';
  //alert('hit');
  $http.get(link).success(function(resp)
  {
    //alert('get');
    console.log(resp)
    console.log(resp.list.shift());
    console.log(resp);
     $ionicLoading.hide();
       var link='http://api.openweathermap.org/data/2.5/forecast/daily?q=crete,greece&appid=7756a5add72128537d61c8fccb203817&units=metric';
  //alert('hit');
  $http.get(link).success(function(response)
  {
     $rootScope.weather_dataa = response.list[0];
     console.log(response);
    $rootScope.weather_list=[];


var firstDay = [];
var weekdayy = new Array(7);
    weekdayy[0] =  "Sunday";
    weekdayy[1] = "Monday";
    weekdayy[2] = "Tuesday";
    weekdayy[3] = "Wednesday";
    weekdayy[4] = "Thursday";
    weekdayy[5] = "Friday";
    weekdayy[6] = "Saturday";
       var todayy = new Date();
    console.log(todayy.getDay())
$rootScope.today_dayy   =weekdayy[todayy.getDay()];
// console.log($scope.today_day);
//   resp.firstDay = $scope.today_day ;
//       console.log(resp);


//    console.log($rootScope.weather_list)
//    $rootScope.weather_list=resp.list;
   //console.log($rootScope.weather_list[0]);
var myDate = new Date();
// $filter('date')(myDate, 'dd');
item= $filter('date')(myDate, "dd");
console.log(item);

$rootScope.curr_date = $filter('date')(myDate, "dd/MM/yyyy");

//////////2nd day////////////////////
var nextDay = new Date(myDate);

nextDay.setDate(myDate.getDate()+1);
/////////////////////////////////////

/////////3rd day//////////////////////

var nextTonext = new Date(myDate);

nextTonext.setDate(myDate.getDate()+2);


var nexttothird = new Date(myDate);
nexttothird.setDate(myDate.getDate()+3);
/////////////////////////////////////
console.log(myDate);
var first = $filter('date')(myDate, "dd");
console.log(first);

////////////////////////
console.log(nextDay);
var second = $filter('date')(nextDay, "dd");
console.log(second);
///////////////////////
console.log(nextTonext);
var third = $filter('date')(nextTonext, "dd");
console.log(third);

console.log(nexttothird);
var fourth = $filter('date')(nexttothird, "dd");
console.log(fourth);
///////////////////////
$rootScope.weather_list = [];
var date_days = [{

0 : second,
1 : third,
2 : fourth


}]


 
   
     
    var date = new Date();

   
var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $rootScope.today_date = $filter('date')(today,'dd/MM/yyyy');
    var today = new Date();
    // alert(today.getDay());

    if(today.getDay() == 6){
     //   alert("if")
        $rootScope.today_day   =weekday[today.getDay()];
        $rootScope.today_date = $filter('date')(today,'dd/MM/yyyy');
    //  console.log( $rootScope.today_day )
   
        var tomorrow = new Date();
        $rootScope.tomo_day   =weekday[0];
        $rootScope.tomo_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+1),'dd/MM/yyyy');

        var tomorrow = new Date();
        $rootScope.next_day   = weekday[1];
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+2),'dd/MM/yyyy');


                var tomorrow = new Date();
        $rootScope.next_nextday   = weekday[2];
        console.log($rootScope.next_nextday);
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+3),'dd/MM/yyyy');
        
    }else if(today.getDay() == 5){
        $rootScope.today_day   =weekday[today.getDay()];
        $rootScope.today_date = $filter('date')(today,'dd/MM/yyyy');
     
        var tomorrow = new Date();
        $rootScope.tomo_day   =weekday[6];
        $rootScope.tomo_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+1),'dd/MM/yyyy');

        var tomorrow = new Date();
        $rootScope.next_day   = weekday[0];
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+2),'dd/MM/yyyy');
         console.log( $rootScope.next_day )


                         var tomorrow = new Date();
        $rootScope.next_nextday   = weekday[1];
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+3),'dd/MM/yyyy');
    }else if(today.getDay() == 4){
    //    alert('4');
        $rootScope.today_day   =weekday[today.getDay()];
        $rootScope.today_date = $filter('date')(today,'dd/MM/yyyy');
        // alert($rootScope.today_date);
     
        var tomorrow = new Date();
        $rootScope.tomo_day   =weekday[5];
        $rootScope.tomo_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+1),'dd/MM/yyyy');

        var tomorrow = new Date();
        $rootScope.next_day   = weekday[6];
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+2),'dd/MM/yyyy');
         console.log( $rootScope.next_day )


                         var tomorrow = new Date();
        $rootScope.next_nextday   = weekday[0];
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+3),'dd/MM/yyyy');

        }else{
        // alert("else");
        $rootScope.today_day   =weekday[today.getDay()];
        $rootScope.today_date = $filter('date')(today,'dd/MM/yyyy');

        var tomorrow = new Date();
        $rootScope.tomo_day   =weekday[today.getDay()+1];
        $rootScope.tomo_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+1),'dd/MM/yyyy');

        var tomorrow = new Date();
        $rootScope.next_day   = weekday[today.getDay()+2];
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+2),'dd/MM/yyyy');
        

        var tomorrow = new Date();
        $rootScope.next_nextday   = weekday[today.getDay()+3];
        // alert("DAY->"+$rootScope.next_nextday)
        $rootScope.next_date = $filter('date')( tomorrow.setDate(tomorrow.getDate()+3),'dd/MM/yyyy');
    }
     

        console.log($rootScope.weather_list);
      
var daysOfWeek = [{
 0 : $rootScope.tomo_day,
 1 :   $rootScope.next_day,
 2 : $rootScope.next_nextday


}]
   
console.log(daysOfWeek);



console.log(date_days[0]);
for($r=0; $r<3; $r++)
  {
      //console.log(date_days[0][$r]);
      $rootScope.weather_list.push(resp.list[$r]);
     
        $rootScope.weather_list[$r].finaldate = date_days[0][$r];
         $rootScope.weather_list[$r].finalday = daysOfWeek[0][$r];
         console.log($rootScope.weather_list[$r].finalday);
         console.log($r)
  } 
   console.log($rootScope.weather_list);



  })

  })

})

.controller('greekwordCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {

 $ionicLoading.show();
    var link = Base_Url+'Staticpages/greekwords';
// $scope.greekword={
//            Staticpage:{
//                 hotelcode:$rootScope.cod,
//                 title:"GreekWords",
//                
//            }
//        }

      
    $http.post(link,$scope.greekword).success(function(resp)
        {
            
    $ionicLoading.hide();       
    console.log(resp);
    $scope.greek = resp.result;
    console.log($scope.greek);
            
           
            
        })
   
})


.controller('infoCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {

 $rootScope.cod =  $window.localStorage.getItem('code');
 console.log($rootScope.code);
          $ionicLoading.show();
 var link = Base_Url+'Staticpages/usefulinfo';
        //('info');
      
        //alert($scope.info);
  $http.post(link,$scope.info).success(function(resp)
        {
    $ionicLoading.hide();       
  console.log(resp);
  $rootScope.infos = resp.result;
  console.log($rootScope.infos);
            
            //alert('arvinder');
           // $state.go('menu.contactus');
            
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


})


.controller('usefulnumberCtrl', function ($scope, $stateParams,$window,Base_Url,$http,$rootScope,$ionicLoading) {
$scope.arrnumber = [];
$scope.data=$window.localStorage.getItem('code');
   console.log($scope.data);
      $ionicLoading.show();
var link=Base_Url+'Staticpages/usefulnumbers';
  
$http.post(link,$scope.hotelinfo).success(function(resp)  
            {
    $ionicLoading.hide();
    console.log(resp);
//    console.log(resp.result.length);
//    for(var i = 0 ; i < resp.result.length ; i++){
//        console.log(resp.result[i].UsefulData.length);
//        $scope.data_ = resp.result[i].UsefulData.length;
//        console.log($scope.data_);
//        $scope.arrnumber.push($scope.data_);
//        console.log($scope.arrnumber);
//        $rootScope.tableData = $scope.arrnumber.length;
//        
//        
//    }
   
 $scope.number = resp.result;  
 console.log($scope.number);
 $scope.table = resp.result;
 console.log($scope.table);
    //console.log(resp.result.AddHotel.id);
//      $ionicLoading.show();
//    var link=Base_Url+'addhotels/usefulnumbers';
//    $scope.hotel_no = {
//                   UsefulNumber:{
//                   id : resp.result.AddHotel.id,
//                }
//             }
//    $http.post(link,$scope.hotel_no).success(function(resp)  
//            {
//                  $ionicLoading.hide();
//    console.log(resp);
//     $rootScope.HotelImage = resp.result[0].UsefulNumber.image;
//   //  alert($rootScope.HotelImage);
//    $rootScope.hotel = resp.result;
//            })
     })   
     
//     
//$scope.callNumber = function(number,bypassAppChooser){
//window.plugins.CallNumber.callNumber(onSuccess, onError, number,bypassAppChooser);
//function onSuccess(result){
//  console.log("Success:"+result);
//}
//function onError(result) {
//  console.log("Error:"+result);
//}
//};

})
   
.controller('groupnameCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$http,Base_Url,$rootScope,$state,$ionicLoading) {
$scope.gname = $stateParams.gname;
console.log($scope.gname);
  $ionicLoading.show();
 var link=Base_Url+'Addhotels/groupname';
 $scope.hotelgroup={
           AddHotel:{
           groupname:$stateParams.gname,
            }
            }
            console.log($scope.hotelgroup);
 $http.post(link,$scope.hotelgroup).success(function(resp)
           
            {
                $ionicLoading.hide();
console.log(resp);
$rootScope.Group = resp.result;
console.log($rootScope.Group);
//$state.go('menu.groupname');
             
                
            })
            

   $scope.data=$window.localStorage.getItem('code');
   console.log($scope.data);
   $ionicLoading.show();
    var link=Base_Url+'Addhotels/hotelinfo';
    $scope.hotelinfo = {
                   AddHotel:{
                   code:$scope.data,
                }
                          }
    $http.post(link,$scope.hotelinfo).success(function(resp)  
            {
                $ionicLoading.hide();
            console.log(resp);
            console.log(resp.result.AddHotel.id);
            $rootScope.name_hotel=resp.result.AddHotel.hotelname;
            console.log($rootScope.name_hotel);
            var linkgroup = Base_Url+'Addhotels/hotelbackground';
            $scope.hotel_back = {
                        AddHotel:{
                        id : resp.result.AddHotel.id,
                            }
                        }
    $http.post(linkgroup , $scope.hotel_back).success(function(respgroup)  
            {
                  console.log(respgroup.result.Background.image);
                  $scope.image_group = respgroup.result.Background.image;

            })   
            })             
})

.controller('hotelnameCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$window,Base_Url,$rootScope,$state,$ionicModal, $ionicLoading) {
    $scope.data = {};
     

    $scope.data=$window.localStorage.getItem('code');
                       console.log($scope.data);
                    $ionicLoading.show();
                    var link=Base_Url+'Addhotels/hotelinfo';
                    $scope.hotelinfo = {
                          AddHotel:{
                         code:$scope.data,
                       }
                    }
                          $http.post(link,$scope.hotelinfo
                ).success(function(resp)  
                          {
                              
                              $window.localStorage.setItem('hotel',JSON.stringify(resp.result.AddHotel));
                              $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
                              console.log($scope.hotel_id);
                              $scope.res=resp.result.AddHotel;
                              $rootScope.hot = resp.result.AddHotel.hotelname;
                              var link2 = Base_Url+'Addhotels/abouthotel';
                              $scope.about_id = {
                                  AddHotel : {
                                  id : $scope.hotel_id
                                  }
                              }
                              $http.post(link2,$scope.about_id).success(function(response)  
                             {
                                    $ionicLoading.hide(); 
                                    console.log(response);
                                    response.result[0].About.image = response.result[0].About.image.split(',')[0];
                                    $rootScope.image_hotel = response.result[0].About.image;
                             })
                              
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
function ($scope, $stateParams,$http,Base_Url,$window,$state,$rootScope,$ionicLoading){
 $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
 // alert('abouthotel');
   $ionicLoading.show();
//    $ionicSlideBoxDelegate.update();
var link=Base_Url+'Addhotels/abouthotel';
$scope.about_hotel = {
           AddHotel:{
                    id:$scope.hotel_id,
                    
                }
                     }
$http.post(link,$scope.about_hotel).success(function(resp)  
   {
        $ionicLoading.hide();
console.log(resp);

$rootScope.abouthotel= resp.result;
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
function ($scope, $stateParams,$window,$state,$rootScope,Base_Url,$http,$ionicLoading) {
    
$scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
 $ionicLoading.show();
   var link = Base_Url+'Addhotels/accommodation';
    $scope.accomodationhotel={
            Accommodation:{
                id:$scope.hotel_id,
            }
        }
        
        $http.post(link,$scope.accomodationhotel).success(function(resp)
        {
           // alert(JSON.stringify(resp));
            $ionicLoading.hide();
            $rootScope.accomodations = resp.result;
            console.log($rootScope.accomodations);
            if(resp.result == ''){
                    alert("No accomodations Yet!");
            }else{
                   $state.go('menu.accomodation');
            }
            //alert('arvinder');
            $state.go('menu.accomodation');
            
        });
    
    
    
    
    ////////////////////////////////
    
      //  $scope.hotel_id = JSON.parse($window.localStorage.getItem('hotel')).id;
        console.log($scope.hotel_id);
    $scope.accomodationss=function(){
      //   alert("working")
//        //console.log(name);
        console.log($scope.hotel_id);
        $ionicLoading.show();
        var link = Base_Url+'Addhotels/accommodation';
//       // alert('arvinder');
        $scope.accomodations={
            Accommodation:{
               id:$scope.hotel_id,
               
           }
       }
       $http.post(link,$scope.accomodations).success(function(resp)
       {
            $ionicLoading.hide();
           console.log(resp);
            $rootScope.accomodation1 = resp.result;
           console.log($rootScope.accomodation1);
            
        //   alert('arvinder');
         $state.go('menu.room-a');
            
       })
    }
        
    


})
   .controller('room-aCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$window,$http,Base_Url,$ionicLoading) {
    $scope.id =  $stateParams.id;
  console.log($scope.id);

$scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;

   
 $ionicLoading.show();
  var link=Base_Url+'Addhotels/accommodation';
 //alert('hit');
 

   $scope.accomodations={
            Accommodation:{
                id:$scope.hotel_id,
                
            }
        }
        $http.post(link,$scope.accomodations).success(function(resp){
$ionicLoading.hide();
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
   .controller('facilitiesCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,Base_Url,$state,$rootScope,$window,$ionicLoading) {
    
     
    $scope.hotel_id = JSON.parse($window.localStorage.getItem('hotel')).id;
         //alert("working")
 
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
       // console.log($scope.data);
       $ionicLoading.show();
        var link = Base_Url+'Addhotels/facilitielist';
        //alert('arvinder');
        $scope.facilitiehotel={
            Facilitie:{
                id:$scope.hotel_id, 
            }
        }
        $http.post(link,$scope.facilitiehotel).success(function(resp)
        {
            $ionicLoading.hide();
            console.log(resp);
            $rootScope.facility = resp.result;
            console.log($rootScope.facility);
            if(resp.result == ''){
                    alert("No facilities Yet!");

                    
                    $state.go('menu.facilities');
            }else{
                   $state.go('menu.facilities');
            }
          //  alert('arvinder');
           
            
        })
   
    
    
    
    $scope.facilities1 =function(name){
         //alert("working")
        console.log(name);
        console.log($scope.hotel_id);
       $ionicLoading.show();
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
            $ionicLoading.hide();
            console.log(resp);
            $rootScope.facility1 = resp.result;
            console.log($rootScope.facility1);
            
            //alert('arvinder');
          $state.go('menu.restaurant');
            
        })
    }


})
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

.controller('serviceCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,  $ionicLoading) {

 $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        //console.log($scope.data);
         $ionicLoading.show()
        var link = Base_Url+'Addhotels/service';
        //alert('arvinder');
        $scope.servicehotel={
            Service:{
                id:$scope.hotel_id,
            }
        }
        $http.post(link,$scope.servicehotel).success(function(resp)
        {
             $ionicLoading.hide()
            console.log(resp);
            $rootScope.services = resp.result;
            console.log($rootScope.services);
            if(resp.result == ''){
                    alert("No Services Yet!");
            }else{
                    $state.go('menu.service');
            }
           
            
            
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
    
})
  
  
.controller('hotel-aCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Base_Url,$http,$state,$window,$rootScope,$ionicLoading) {
console.log($scope.Groupname);
$scope.id =  $stateParams.id;
 $ionicLoading.show();
   var link=Base_Url+'Addhotels/groupname';
    $scope.hotelgroup={
                AddHotel:{
                    groupname:$rootScope.groupName,
            }
            }
    $http.post(link,$scope.hotelgroup).success(function(resp){
        $ionicLoading.hide();
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

var link=Base_Url+'Addhotels/abouthotel';
    $scope.hotel_img={
                AddHotel:{
                    id : $scope.id,
            }
            }
    $http.post(link,$scope.hotel_img).success(function(resp){
        $ionicLoading.hide();
    console.log(resp);
   
    $rootScope.group_hotel = resp.result;
    // console.log($rootScope.abouthotel);
    // $rootScope.hotel_name = resp.result[0].addhotels.hotelname;
    // $rootScope.hotel_des = resp.result[0].addhotels.description;
    // console.log($rootScope.hotel_name );
    // $state.go('menu.abouthotel');
    });
    })
}) 

.controller('QuestionnaireCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicPopup, $ionicLoading) {

    
     $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
      $ionicLoading.show();
      var link = Base_Url+'Addhotels/questionnaire';
      //  alert('questionnaire');
        
        $scope.questionnairehotel={
            Questionnaire:{
                id:$scope.hotel_id,
            }
        }
        
        $http.post(link,$scope.questionnairehotel).success(function(resp)
        {
               $ionicLoading.hide();
            console.log(resp);
            $window.localStorage.setItem('questionari',JSON.stringify(resp));
            $rootScope.Questionnaires = resp.result;
            console.log($rootScope.Questionnaires);
            if(resp.result == ''){
                 
                         var alertPopup = $ionicPopup.alert({
                      template: "No Questions Yet!"
                           });
            }else{
                    $state.go('menu.Questionnaire');
            }

      
           // alert('arvinder');
            
            
        });
        
        
        
        
        $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor:  'rgb(200, 100, 100)',    //Optional
      rating:  0, //Optional
    //  minRating:1,    //Optional
      //  readOnly: true, //Optional
        callback: function(rating, index) {    //Mandatory
          $scope.ratingsCallback(rating, index);
        }
      };
  
      $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and the index is : ', index);
        console.log(rating);
     $rootScope.rating = rating;
     console.log($rootScope.rating)
      };

     
    $scope.data={}
    $scope.val={}

    $scope.sel={};
    $scope.gt=[];
 
    $scope.star={};
    
    $scope.ratings={}
 
    $scope.submit=function()
    { 
       
            console.log($scope.val);
            console.log($scope.sel);
            console.log($scope.data);
            $scope.user_ids=$window.localStorage.getItem('User_Id');
            console.log($scope.user_ids);
            angular.forEach($scope.sel,function(value,key){
            console.log(key);
            $scope.gt.push({'id':key,'value':value});
            })
        console.log($scope.gt);
         if($scope.gt == ''){
            alert("Please give the answers for above questions!");
        }else{
        $ionicLoading.show();
        var link = Base_Url+'Addhotels/questionnaires_answers';

        //alert('arvinderdd');
        $scope.questionsubmit={
                QuestionnairesAnswer:
                                {
                                userid:$scope.user_ids,
                                result:$scope.gt,
                                rating: $rootScope.rating,
                                comments: $scope.data.comments,
                                }
                            }
        console.log( $scope.questionsubmit);
        $http.post(link,$scope.questionsubmit).success(function(resp){
             $ionicLoading.hide();
             if(resp.status == true){
                console.log(resp);
               
                 var alertPopup = $ionicPopup.alert({
                      template: "Your Answers Submitted Successfully"
                           });
                $state.go('menu.hotelname');
             }else{
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                      template: "Try Again!"
                           });
         
             }
      

      })
        }
    }

}) 



.controller('creteCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {

   $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/creteextras';
        $http.get(link).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
        $rootScope.crete_list = resp.result;
        console.log($rootScope.crete_list);
 
        })


    $scope.bhumika=function(id,title){
    // alert(title)
     $rootScope.title_shp = title;
   //  alert(id);
    $rootScope.creteid = id;
    console.log($rootScope.creteid)
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/creteextrasdetail';
            $scope.shoping = {
                GuideShopping:{
                            id:id,
                        }
                            }
        console.log($scope.shoping);
        $http.post(link,$scope.shoping).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
        if(resp.status == true){
        for(var i=0;i<resp.result.length;i++){
          console.log(resp.result[i].GuideShopping.id);
          resp.result[i].GuideShopping.image = resp.result[i].GuideShopping.image.split(',')[0];
          $rootScope.shop_all = resp.result;
          console.log($rootScope.shop_all);
          $state.go("menu.shopping");
         }
    }
  
     else{
      //  alert("no data ") 
     }
  
  
        })
            
        
        }




}) 
.controller('shop1Ctrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope,Base_Url,$http,$state, $cordovaGeolocation) {
$scope.shop_map = function(){
//   alert("map"); 
     var posOptions = {timeout: 10000, enableHighAccuracy: true};
           $cordovaGeolocation.getCurrentPosition(posOptions)
          .then(function (position) {
            //    alert("location1");
        console.log(position);
            $rootScope.lat_set = position.coords.latitude;
            $rootScope.long_set = position.coords.longitude; 
            console.log($rootScope.lat_set)
            console.log( $rootScope.long_set)
            console.log( $rootScope.lat_shop);
            console.log( $rootScope.long_shop);
              $rootScope.closeModal(); 
          $state.go('menu.mappage');
            
        })
      
      
      
}


///////////// shop directions////////
 
  $scope.launchNavigator = function() {
   //   alert("path")
     
         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
              //  alert("location1");
            $rootScope.lat_set = position.coords.latitude;
            $rootScope.long_set = position.coords.longitude; 
            console.log($rootScope.lat_set)
            console.log( $rootScope.long_set)
            console.log( $rootScope.lat_shop);
            console.log( $rootScope.long_shop);
              // $rootScope.closeModal(); 
               
                var destination = [$rootScope.lat_shop, $rootScope.long_shop];
	var start = [$rootScope.lat_set, $rootScope.long_set];
    //    alert($rootScope.lat_shop)
     //   alert($rootScope.long_shop);
      //  alert($rootScope.lat_set+"current lat");
      //  alert($rootScope.long_set+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
               
               
               
               
        }) 
      
      
      
      
      
      
      

  }




})

.controller('shoppingCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal,$http,Base_Url,$rootScope,  $ionicLoading,$state) {

$scope.single_crete=function($index,id,desc,title){
    $rootScope.shop_crete = [];
//    alert(title);
    console.log($index);
    $scope.index_goods = $index;
    console.log($scope.index_goods);
    $rootScope.descr = desc;
    $rootScope.title_shop1=title;
 
    console.log($rootScope.creteid)
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/creteextrasdetail';
        $scope.shoping = {
            GuideShopping:{
                          id:$rootScope.creteid,
                    }
                          }
        console.log($scope.shoping);
        $http.post(link,$scope.shoping).success(function(resp){
        $ionicLoading.hide();
        console.log(resp)
        if(resp.status == true){
        $rootScope.shop = resp.result;
        console.log($rootScope.shop[$scope.index_goods]);
        $scope.res_shop = $rootScope.shop[$scope.index_goods];
        $scope.image_shop = $scope.res_shop.GuideShopping.image.split(',');
        $rootScope.shopp = $scope.res_shop.GuideShopping;
           
        angular.forEach($scope.image_shop , function (key,value){
                console.log(key);
                $rootScope.shop_crete.push(key);
                console.log($rootScope.shop_crete);
        })


        for(var i=0;i<resp.result.length;i++){
            console.log(resp.result[i].GuideShopping.id);
            if(resp.result[i].GuideShopping.id == id){
            $rootScope.singledetail=resp.result[i].GuideShopping;
            $rootScope.lat_shop = resp.result[i].GuideShopping.latitude;
            $rootScope.long_shop= resp.result[i].GuideShopping.longitude;
  // alert("lat of shop" + $rootScope.lat_shop)
   //alert("long of shop" +$rootScope.long_shop)
   console.log($rootScope.lat);
   console.log($rootScope.singledetail);
 
}
 
         }
     }
     else{
      //   alert("no data")
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
$ionicLoading.show();
    var link=Base_Url+'Aboutcretes/aboutcrete';

        $http.get(link).success(function(resp){
                $ionicLoading.hide();
                console.log(resp);
                for(var e = 0 ; e < resp.result.length ; e++)
                {
                    resp.result[e].AboutCrete.image = resp.result[e].AboutCrete.image.split(',')[0];
                    $rootScope.aboutcrete=resp.result;
                    console.log($rootScope.aboutcrete);
                }
        })
 
 
    $scope.xyz = function(descID,title_main,$index){
        console.log($index);
        $ionicLoading.show();
         $window.localStorage.setItem('main_id',JSON.stringify(descID));
         var link=Base_Url+'Aboutcretes/aboutcrete';
        $http.get(link).success(function(resp){
         console.log(resp.result[$index]);
         if(resp.result[$index].CreteDetail.length > 0)
         {
      $ionicLoading.hide();
    //   $scope.value = resp.result[$index].CreteDetail;
    //   console.log($scope.value);
    //   console.log($scope.value.CreteDetail);
      $rootScope.details =  resp.result[$index].CreteDetail;
      $rootScope.title = title_main;
      console.log($rootScope.details);
      $state.go('menu.mythology');


         }else{
       $ionicLoading.hide();
       $rootScope.value = resp.result[$index].AboutCrete;
       $state.go('menu.geography');
         }
    
      $scope.id = resp.result[0].AboutCrete.id;
      console.log($scope.id)
 
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
function ($scope, $stateParams,Base_Url,$http,$rootScope,$state,$window,$ionicLoading) {












//$scope.id =  $stateParams.id;
//alert($scope.id);

       $scope.h_id =  JSON.parse($window.localStorage.getItem('main_id'));
        $ionicLoading.show();
  var link=Base_Url+'Aboutcretes/aboutcrete';
// alert('hit');
 $http.get(link).success(function(resp){
       $ionicLoading.hide();
  console.log(resp);

for(var i=0;i<resp.result.length;i++){
    console.log(resp.result[i].AboutCrete.id);
    if(resp.result[i].AboutCrete.id == $scope.h_id){
      $scope.value = resp.result[i];
      console.log($scope.value);
      console.log($scope.value.CreteDetail);
     
       for(var j=0 ; j< resp.result[i].CreteDetail.length ; j++){
           console.log(resp.result[i].CreteDetail[j].Gastronomy);
           console.log(resp.result[i].CreteDetail[j].id);
           
//           $rootScope.gastro = resp.result[i].CreteDetail[j].Gastronomy;
           for(var k = 0 ; k < resp.result[i].CreteDetail[j].Gastronomy.length;k++){
//               alert('harman')
//               alert($rootScope.gastro.length);
//                $rootScope.crete_id =resp.result[i].CreteDetail[j].Gastronomy[k].cretedetailid;
//                console.log($rootScope.crete_id);
               $rootScope.cal_length = resp.result[i].CreteDetail[j].Gastronomy.length;
           }
       }

      
    }
    }
})
$scope.detailpage = function(title,desc,id,index_value){
    $ionicLoading.show();
    console.log(index_value);
    var link=Base_Url+'Aboutcretes/aboutcrete';

 $http.get(link).success(function(resp){
       $ionicLoading.hide();
  console.log(resp);

for(var i=0;i<resp.result.length;i++){
    console.log(resp.result[i].AboutCrete.id);
    if(resp.result[i].AboutCrete.id == $scope.h_id){
      $scope.value = resp.result[i];
      console.log($scope.value);
      console.log($scope.value.CreteDetail);
      console.log($scope.value.CreteDetail[index_value]);
      if($scope.value.CreteDetail[index_value].Gastronomy.length > 0){
          $ionicLoading.hide();
              $rootScope.crete_gastronomy = $scope.value.CreteDetail[index_value].Gastronomy;
               $state.go('menu.product');


      }
        else{
        $rootScope.title_name = $scope.value.CreteDetail[index_value].title;
        $rootScope.description = $scope.value.CreteDetail[index_value].description;
     
        $state.go('menu.birthofzeus'); 
        
            
            }

    }
   }
 })        
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
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$cordovaInAppBrowser,$ionicLoading)
{
    
       $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        //console.log($scope.data);
          $ionicLoading.show();
        var link = Base_Url+'Addhotels/socialmedia';
       // alert('social');
        $scope.socialhotel={
            Social:{
                id:$scope.hotel_id,
                
            }
        }
        $http.post(link,$scope.socialhotel).success(function(resp)
        {
             $ionicLoading.hide();
            console.log(resp);
           $rootScope.socials = resp.result;
            console.log($rootScope.socials);
        if(resp.result == ''){
            alert("No Data available!");
        }else{
            $state.go('menu.social');
        }
            //alert('arvinder');
          
            
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

        .controller('contactusCtrl',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {
    
    $scope.hotel_id =  JSON.parse($window.localStorage.getItem('hotel')).id;
        //$scope.data=JSON.parse($window.localStorage.getItem('User_Id'));
        console.log($scope.data);
         $ionicLoading.show();
        var link = Base_Url+'Addhotels/contact';
        //alert('contact');
        $scope.contacthotel={
            Contact:{
                id:$scope.hotel_id
                
            }
        }
     //   alert($scope.contacthotel);
        $http.post(link,$scope.contacthotel).success(function(resp)
        {
            
                    $ionicLoading.hide();
            console.log(resp);
          $rootScope.contactus = resp.result;
    console.log($rootScope.contactus);
      $state.go('menu.contactus');
            
        })
    
    


})

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
function ($scope, $stateParams,$http,$state,$window,Base_Url,$rootScope,$ionicLoading) {
$ionicLoading.show();
  var link=Base_Url+'Aboutcretes/guidetocrete';
 //('hit');
 $http.get(link).success(function(resp){
     $ionicLoading.hide();
  console.log(resp);

 $rootScope.guidecretes=resp.result;
 console.log($rootScope.guidecretes);
 
 

 })
$scope.guidevillage = function(creteid,title,image,$index){
    $ionicLoading.show();

  $rootScope.title_Beach = title;
   $rootScope.beaches_image = image;
   console.log($rootScope.beaches_image)

if(creteid == 1){
     $rootScope.city_title = title;
     var link=Base_Url+'Aboutcretes/guidetocrete';
     $http.get(link).success(function(resp){
         $ionicLoading.hide();
      console.log(resp);
      for(var i=0; i < resp.result.length ; i++){
          console.log(resp.result[i].GuideList);
      for(var j=0 ; j < resp.result[i].GuideList.length ; j++){
      console.log(resp.result[i].GuideList[j].id);
      console.log(creteid)
    if(resp.result[i].GuideList[j].guidecreteid == creteid){
    console.log(resp.result[i].GuideList[j].latitude);
    console.log(resp.result[i].GuideList[j].longitude);
	console.log(resp.result[i].GuideList[j].image);
    // resp.result[i].GuideList[j].image;
    resp.result[i].GuideList[j].image = resp.result[i].GuideList[j].image.split(',')[0];
    console.log($rootScope.city_image);
    $rootScope.villages = resp.result[i];
    console.log($rootScope.villages);
       }
          }
    }
   $state.go('menu.cities',{image : $scope.img});
     })
     return false;
 }
                
   else if(creteid== 3 || creteid == 4){ 
        $ionicLoading.show();
         $scope.beaches_thirdFour = {
        GuideCrete : {
            id : creteid
        }
    }
console.log($scope.beaches_thirdFour);
    $rootScope.created_id = creteid;
        var link=Base_Url+'Aboutcretes/guidetocretebeaches';
        $http.post(link,$scope.beaches_thirdFour).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
      
    $rootScope.title =  resp.result[0].GuideCrete.title;
    console.log($rootScope.title);
     
        for(var x = 0 ; x <= resp.result.length ; x++){
            
            console.log(resp.result.length);
        $rootScope.beach_distance = resp.result[0].GuideData;
        console.log($rootScope.beach_distance);
        console.log("CreteId->"+$rootScope.created_id);
               localStorage.setItem('creteidbeach',$rootScope.created_id);
                $state.go('menu.beaches',{id : creteid});
              }
          }) 
         
        
    }else{
        console.log($index);
         $scope.beaches = {
        GuideCrete : {
            id : creteid
        }
    }
   // alert(creteid)
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidetocretebeaches';
    $http.post(link,$scope.beaches).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
      
      $rootScope.title =  resp.result[0].GuideCrete.title;
      console.log($rootScope.title);
       $rootScope.title1 =  resp.result[0].GuideCrete.title_greek;
      console.log($rootScope.title1);
     
        for(var x = 0 ; x <= resp.result.length ; x++){
            
            console.log(resp.result.length);
            for(var k=0;k<=resp.result[0].GuideData.length;k++){
                console.log(k);
                resp.result[0].GuideData[k].image = resp.result[0].GuideData[k].image.split(',')[0];
                console.log("split->"+resp.result[0].GuideData[k].image);
                $rootScope.beach1 = resp.result[0].GuideData;
                console.log($rootScope.beach1);
                console.log(creteid);
                localStorage.setItem('creteidbeach',creteid);
                $state.go('menu.beaches1',{id : creteid});
               
               
            }

               
                
              }
          })
  return false;
    }
}

$scope.guidecity = function(id,title,image){
    $rootScope.town_head = title;
  //  alert("cities=====towns/villages")
    
// http://rajdeep.crystalbiltech.com/thehotel/api/Aboutcretes/guidetocities
 $scope.towns = {
        GuideList : {
            id : 1
        }
    }
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidetocities';
    $http.post(link,$scope.towns).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
        $rootScope.vill = resp.result;
        console.log($rootScope.vill);
//        $state.go('menu.town');
        $state.go('menu.townvillage');
})
}
})





.controller('citiesCtrl', function ($scope,$ionicLoading, $stateParams,$rootScope,$state,$window,Base_Url,$http) {
    $scope.image = $stateParams.image;
    console.log($scope.image);
    $scope.detailCity = function(image,description,title,lat,long,id){
        $ionicLoading.show();
        // alert(id);
     //   alert(title);
      //  alert(description);
      console.log(image);
        this.arrayText = [{
            id : id,
  title: title,
  description: description,
  title_greek : title,
  description_greek : description
}];
console.log(this.arrayText);
$rootScope.hera = this.arrayText[0];
console.log($rootScope.hera);
// return false;
    //     $rootScope.hera = [];
    //   $rootScope.hera.push(title,title);
    //    console.log($rootScope.hera);return false;
        $rootScope.city_immage = [];
        // $rootScope.hera.title = title;
        // $scope.image = image.split(',');
	///////////////For image//////////////


     var link=Base_Url+'Aboutcretes/guidetocrete';
     $http.get(link).success(function(resp){

         $ionicLoading.hide();
      console.log(resp);
    //   for(var i=0; i < resp.result.length ; i++){
    //       console.log(resp.result[i].GuideList);
      for(var j=0 ; j < resp.result[0].GuideList.length ; j++){
      console.log(resp.result[0].GuideList[j].id);
    //   console.log(creteid)
            console.log("bif");
    console.log("guidecrete ->" + resp.result[0].GuideList[j].id);
    console.log("id ->" + id); 
 
    if(resp.result[0].GuideList[j].id == id){
        console.log("if");
    console.log("guidecrete ->" + resp.result[0].GuideList[j].id);
    console.log("id ->" + id);
    console.log(resp.result[0].GuideList[j].latitude);
    console.log(resp.result[0].GuideList[j].longitude);
	console.log(resp.result[0].GuideList[j].image);
    // resp.result[i].GuideList[j].image;
    $scope.img_city = resp.result[0].GuideList[j].image.split(',');
    console.log( $scope.img_city);
    // $rootScope.city_immage.push($scope.img_city);
    // $rootScope.villages = resp.result[i];
    // console.log($rootScope.villages);
      //   console.log($scope.image);

      ////////////
	   angular.forEach($scope.img_city,function(key,value){
            console.log(key);
            console.log(value);
             $rootScope.city_immage.push(key);

        })
              console.log("Images ->" + $rootScope.city_immage);
                    $state.go('menu.heraklion');
              return false;
       };
          }
    // }

     })

    /////////////////////////////////////
	
    //   console.log($scope.image);
	//    angular.forEach($scope.image,function(key,value){
    //         console.log(key);
    //         console.log(value);
    //          $rootScope.city_immage.push(key);
    //     })
		
    //   console.log($rootScope.city_immage);
    //  // alert($rootScope.city_immage[0]);

    //     $rootScope.hera.description = description;
        $window.localStorage.setItem('sight_creteID',JSON.stringify(id));
        $window.localStorage.setItem('lat_city', JSON.stringify(lat));
        $window.localStorage.setItem('long_city', JSON.stringify(long));
    //     $state.go('menu.heraklion');

    }

})

.controller('landscapeCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


})
.controller('beaches1Ctrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


})
.controller('historyofhiraklionCtrl', function ($scope, $stateParams,$rootScope,$state,$ionicLoading) {

})
   .controller('heraklionsightseeingCtrl', function ($scope, $stateParams,$rootScope,$state,$ionicModal,$window) {
       $ionicModal.fromTemplateUrl('templates/museumheraklion.html', {
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
    $scope.sightdetail = function(image,title,description,lat,long){
        
        $rootScope.sight_title = title;
        $rootScope.sight_image = image;
    //    alert(lat);
     //   alert(long);
        $window.localStorage.setItem('sight_lat',JSON.stringify(lat));
        $window.localStorage.setItem('sight_long',JSON.stringify(long));
        $state.go('menu.museumheraklion');
        
    }
    
   })

.controller('heraklionCtrl', function ($scope,$ionicLoading, $stateParams,$rootScope,$state,Base_Url,$http,$cordovaGeolocation,$cordovaLaunchNavigator) {
 
        $scope.history = function(description,title){
            
         //   alert(description);
          //  alert(title);
            $rootScope.title = title;
            $rootScope.desc = description
            $state.go('menu.historyofhiraklion');
            
            
        }
    $scope.sightseeing = function(title,id){
       
        $scope.sightseeing_id = id;
        $rootScope.hera_titleCity = title;
        $ionicLoading.show();
        $scope.sightseeings = {
            GuideCrete : {
                id :  $scope.sightseeing_id
            }
        }
     var link=Base_Url+'Aboutcretes/citysightseeings';
     $http.post(link,$scope.sightseeings).success(function(resp){
         $ionicLoading.hide();
        console.log(resp);
        for(var i = 0 ; i < resp.result.length ; i++){
            console.log(resp.result[i].GuideSightseeings.image);
            resp.result[i].GuideSightseeings.image =  resp.result[i].GuideSightseeings.image.split(',')[0];
        
            $rootScope.sight = resp.result;
            console.log($rootScope.sight);
            $state.go('menu.heraklionsightseeing',{ids : id});
        }
     })


//         alert($scope.sightseeing_id);
//         //(title);
//       alert(title);
//    $rootScope.hera_titleCity = title;
// //     = title;
// $ionicLoading.show();
//      var link=Base_Url+'Aboutcretes/guidetocrete';
//      $http.get(link).success(function(resp){
//          $ionicLoading.hide();
//       console.log(resp);
//     //   for(var i=0; i < resp.result.length ; i++){
//     //       console.log(resp.result[i].GuideList);
//           for(var j=0 ; j < resp.result[j].GuideList.length ; i++){
//               console.log(resp.result[0].GuideList[j].guidecreteid);
// //              $scope.guidecrete_id = resp.result[i].GuideList[j].guidecreteid;
// //              console.log($scope.guidecrete_id);
//               console.log(resp.result[0].GuideList[j].GuideSightseeing);
//               for(var k=0 ; k < resp.result[0].GuideList[j].GuideSightseeing.length ; k++){
//                   console.log(resp.result[0].GuideList[j].GuideSightseeing.length);
//                   console.log(resp.result[0].GuideList[j].id);
//                   $scope.guidesight = resp.result[0].GuideList[j].id;
//                   console.log($scope.guidesight);
//                 //   $scope.id = JSON.parse(localStorage.getItem('sight_creteID'));

//                   console.log($scope.sightseeing_id);
//                   console.log($scope.guidesight);

//                   if(resp.result[i].GuideList[j].GuideSightseeing.length > 0 && $scope.guidesight == $scope.sightseeing_id){
//                       alert("iff");
//                       $rootScope.sight = resp.result[i].GuideList[j];
//                       $state.go('menu.heraklionsightseeing');
//                   }else{
//                      alert("NO SIGHTSEEINGS YET!");
//                   }
//               }
              
//              if(resp.result[i].GuideList[j].guidecreteid == creteid){
//                  
//                  $rootScope.villages = resp.result[i];
//                  console.log($rootScope.villages);
//                  $state.go('menu.cities');
//              }
        // }
    // }
    //  })
}
 

})

.controller('heradirectionCtrl',
function ($scope, $stateParams,$rootScope,$cordovaGeolocation,$window,$http,$cordovaLaunchNavigator) {
    $scope.launchNavigator = function(destination, start, options){
                       // alert("abc");
                      function deg2rad(deg) {
                        rad = deg * Math.PI / 180; // radians = degrees * pi/180
                        return rad;
                    }


                    // round to the nearest 1/1000
                    function round(x) {
                        return Math.round(x * 1000) / 1000;
                    }
   
   
                    $rootScope.findDistance = function (lat, long, lat1, long1) {
                        //alert(lat);
                        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, Rm, Rk, frm;

                        var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
                        var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
                        // get values for lat1, lon1, lat2, and lon2
                        t1 = lat;// 30.7206541;
                        n1 = long;//76.843255;
                        t2 = lat1;//30.729551;
                        n2 = long1;//76.7656294;

                        // convert coordinates to radians
                        lat1 = deg2rad(t1);
                        lon1 = deg2rad(n1);
                        lat2 = deg2rad(t2);
                        lon2 = deg2rad(n2);

                        // find the differences between the coordinates
                        dlat = lat2 - lat1;
                        dlon = lon2 - lon1;

                        // here's the heavy lifting
                        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
                        dm = c * Rm; // great circle distance in miles
                        dk = c * Rk; // great circle distance in km

                        // round the results down to the nearest 1/1000
                        mi = round(dm);
                        km = round(dk);
                        return km * 1000;


                    };

   /////////////////////////////////////////////////////////
 var restdetails = [];
 var favrest =[];
                  //$scope.openModal = function () {
                       // alert("hello");
                        var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       // alert("dkjnvks");
                        $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $rootScope.lat = position.coords.latitude;
                                    $rootScope.long = position.coords.longitude;
                                    console.log("harman")
                                    console.log($rootScope.lat);
                                    console.log($rootScope.long);
                                    $window.localStorage.setItem('latc1', JSON.stringify($rootScope.lat));
                                    $window.localStorage.setItem('longc1', JSON.stringify($rootScope.long));
//                                    $scope.id = JSON.parse(localStorage.getItem('user_id'));
//                                    console.log($scope.id);
//                                    $scope.coords = position.coords;
                                
   
                                  
                                    var lat_my = $rootScope.lat;
                                    var long_my = $rootScope.long;
//                                    console.log("ha");
                                    console.log(lat_my);
                                    console.log(long_my);
                                    
                                    $rootScope.lat1_city = JSON.parse(localStorage.getItem('lat_city'));
                                    $rootScope.lat2_city = JSON.parse(localStorage.getItem('long_city'));
                                    console.log($rootScope.lat1_city);
                                    console.log($rootScope.lat2_city);
                                    var start  =  [lat_my , long_my];
                                    var destination = [$rootScope.lat1_city , $rootScope.lat2_city];
//                             var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat_my + ',' + long_my + '&key=AIzaSyByGW_huEhp1k9tlk6M1m0HkCjZoGRfCuo';
//                              console.log(link);
//                            $http.post(link).success(function(response) {
//                                console.log("ha");
//                            console.log(response);
//                            if (response.isSuccess = true){
//                                
//                                $scope.add1 = response.results[0].formatted_address;
//                                console.log($scope.add1);
//                                $scope.lat1_city = JSON.parse(localStorage.getItem('lat_city'));
//                                $scope.lat2_city = JSON.parse(localStorage.getItem('long_city'));
//                                var latCity =  $scope.lat1_city;
//                                var longCity = $scope.lat2_city;
//                                console.log(latCity);
//                                console.log(longCity);
//                                  var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latCity + ',' + longCity + '&key=AIzaSyByGW_huEhp1k9tlk6M1m0HkCjZoGRfCuo';
//                              console.log(link);
//                            $http.post(link).success(function(response) {
//                                console.log("ha");
//                            console.log(response);
//                            if (response.isSuccess = true){
//                                
//                                $rootScope.add2 = response.results[0].formatted_address;
//                                console.log($rootScope.add2);
//                            }
//                        })
//                                var destination = $rootScope.add2;
//                                var start = $scope.add1;
                                $cordovaLaunchNavigator.navigate(destination, start).then(function() {
                                  console.log("Navigator launched");
                                }, function (err) {
                                  console.error(err);
                                });
                  })
                                
//       else{
//           
//       }
//       }); 
//       })
   }
                  
})



.controller('directionsVillageCtrl',
function ($scope, $stateParams,$rootScope,$cordovaGeolocation,$window,$http,$cordovaLaunchNavigator) {
    $rootScope.direction_lat = $stateParams.latCity;
            $rootScope.direction_long = $stateParams.longCity;
                       // alert("abc");
                      function deg2rad(deg) {
                        rad = deg * Math.PI / 180; // radians = degrees * pi/180
                        return rad;
                    }


                    // round to the nearest 1/1000
                    function round(x) {
                        return Math.round(x * 1000) / 1000;
                    }
   
   
                    $rootScope.findDistance = function (lat, long, lat1, long1) {
                        //alert(lat);
                        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, Rm, Rk, frm;

                        var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
                        var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
                        // get values for lat1, lon1, lat2, and lon2
                        t1 = lat;// 30.7206541;
                        n1 = long;//76.843255;
                        t2 = lat1;//30.729551;
                        n2 = long1;//76.7656294;

                        // convert coordinates to radians
                        lat1 = deg2rad(t1);
                        lon1 = deg2rad(n1);
                        lat2 = deg2rad(t2);
                        lon2 = deg2rad(n2);

                        // find the differences between the coordinates
                        dlat = lat2 - lat1;
                        dlon = lon2 - lon1;

                        // here's the heavy lifting
                        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
                        dm = c * Rm; // great circle distance in miles
                        dk = c * Rk; // great circle distance in km

                        // round the results down to the nearest 1/1000
                        mi = round(dm);
                        km = round(dk);
                        return km * 1000;


                    };

   /////////////////////////////////////////////////////////
 var restdetails = [];
 var favrest =[];
                  //$scope.openModal = function () {
                       // alert("hello");
                        var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       // alert("dkjnvks");
                        $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $rootScope.latitude_my = position.coords.latitude;
                                    $rootScope.longitude_my = position.coords.longitude;
                                    console.log("harman")
                                    console.log($rootScope.latitude_my);
                                    console.log($rootScope.longitude_my);

                  })

    
})



.controller('heraklionsightseeingCtrl', function ($scope,Base_Url, $ionicLoading,$http, $stateParams,$rootScope,$state,$ionicModal,$window) {


    $rootScope.ids = $stateParams.ids;
    console.log($rootScope.ids);
       $ionicModal.fromTemplateUrl('templates/museumheraklion.html', {
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
 
    $scope.sightdetail = function(id,$index,image,title,description,lat,long){
        $ionicLoading.show();
         $rootScope.sights_city = [];
        console.log($index);
        $scope.indexbyid = $index;
        console.log( $scope.indexbyid );
        console.log(id);
         $scope.sightseeings_detail = {
            GuideCrete : {
                id :  $rootScope.ids
            }
        }
     var link=Base_Url+'Aboutcretes/citysightseeings';
     $http.post(link,$scope.sightseeings_detail).success(function(resp){
       $state.go('menu.museumheraklion');
        console.log(resp);
        console.log(resp.result[$scope.indexbyid]);
        $scope.res_sight = resp.result[$scope.indexbyid];
        // for(var i = 0 ; i < resp.result.length ; i++){
        //     console.log(resp.result[i].GuideSightseeings.image);
        //     resp.result[i].GuideSightseeings.image =  resp.result[i].GuideSightseeings.image.split(',')[0];
            $scope.image = $scope.res_sight.GuideSightseeings.image.split(',');
            // $rootScope.sight = $scope.res_sight;
            // console.log($rootScope.sight);
           
            angular.forEach($scope.image , function (key,value){
                console.log(key);

                $rootScope.sights_city.push(key);
                  console.log($rootScope.sights_city);
            })
          
        //alert(description)
        $rootScope.sight_title = title;
        $rootScope.sight_image = image;
        $rootScope.sight_des = description;
       // alert(lat);
       // alert(long);
        $window.localStorage.setItem('sight_lat',JSON.stringify(lat));
        $window.localStorage.setItem('sight_long',JSON.stringify(long));
         $ionicLoading.hide();
        
        //  }
    })
    }
   })
   
   
   
   
   .controller('museumheraklionCtrl', function ($scope, $stateParams,$rootScope,$state,$cordovaGeolocation) {
    $rootScope.lat_sight = JSON.parse(localStorage.getItem('sight_lat'));
    $rootScope.long_sight = JSON.parse(localStorage.getItem('sight_long'));
    console.log($rootScope.lat_sight);
    console.log($rootScope.long_sight);
    function deg2rad(deg) {
                        rad = deg * Math.PI / 180; // radians = degrees * pi/180
                        return rad;
                    }


                    // round to the nearest 1/1000
                    function round(x) {
                        return Math.round(x * 1000) / 1000;
                    }
   
   
                    $rootScope.findDistance = function (lat, long, lat1, long1) {
                        //alert(lat);
                        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, Rm, Rk, frm;

                        var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
                        var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
                        // get values for lat1, lon1, lat2, and lon2
                        t1 = lat;// 30.7206541;
                        n1 = long;//76.843255;
                        t2 = lat1;//30.729551;
                        n2 = long1;//76.7656294;

                        // convert coordinates to radians
                        lat1 = deg2rad(t1);
                        lon1 = deg2rad(n1);
                        lat2 = deg2rad(t2);
                        lon2 = deg2rad(n2);

                        // find the differences between the coordinates
                        dlat = lat2 - lat1;
                        dlon = lon2 - lon1;

                        // here's the heavy lifting
                        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
                        dm = c * Rm; // great circle distance in miles
                        dk = c * Rk; // great circle distance in km

                        // round the results down to the nearest 1/1000
                        mi = round(dm);
                        km = round(dk);
                        return km * 1000;


                    };

   /////////////////////////////////////////////////////////
 var restdetails = [];
 var favrest =[];
                  //$scope.openModal = function () {
                       // alert("hello");
                        var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       // alert("dkjnvks");
                        $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $rootScope.lat_start = position.coords.latitude;
                                    $rootScope.long_start = position.coords.longitude;
                                    console.log($rootScope.lat_start);
                                    console.log($rootScope.long_start);
                                
                                })
    })
  

   .controller('heramapCtrl', function ($scope, $stateParams,$rootScope,$state) {
                                    $scope.lat1_city = JSON.parse(localStorage.getItem('lat_city'));
                                    $scope.lat2_city = JSON.parse(localStorage.getItem('long_city'));
                                    console.log($scope.lat1_city);
                                    console.log($scope.lat2_city);
    })
      .controller('sightseemapCtrl', function ($scope, $stateParams,$rootScope,$state) {
        //   alert("redirtect")
                                    // $scope.lat1_city = JSON.parse(localStorage.getItem('lat_city'));
                                    // $scope.lat2_city = JSON.parse(localStorage.getItem('long_city'));
                                    // console.log($scope.lat1_city);
                                    // console.log($scope.lat2_city);

                                    $scope.lat = $stateParams.lat;
                                    $scope.long = $stateParams.long;

                                    console.log($scope.lat);
                                    console.log($scope.long);
    })

      .controller('sightseedirectionCtrl', function ($scope, $stateParams,$rootScope,$state,$cordovaGeolocation) {

                          var posOptions = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $scope.lat_start = position.coords.latitude;
                                    $scope.long_start = position.coords.longitude;
                                    console.log($scope.lat_start);
                                    console.log($scope.long_start);
                                
                                })
                                    // $scope.lat1_city = JSON.parse(localStorage.getItem('lat_city'));
                                    // $scope.lat2_city = JSON.parse(localStorage.getItem('long_city'));
                                    // console.log($scope.lat1_city);
                                    // console.log($scope.lat2_city);

                                    $scope.lat = $stateParams.lat_dir;
                                    $scope.long = $stateParams.long_dir;

                                    console.log($scope.lat);
                                    console.log($scope.long);
    })    
   .controller('heramapVillageCtrl', function ($scope, $stateParams,$rootScope,$state) {
                               

                               $scope.lat1_city = $stateParams.lat;
                               console.log($scope.lat1_city);
                               $scope.lat2_city = $stateParams.long;
                               console.log($scope.lat2_city);

    })
    .controller('sightmapCtrl', function ($scope, $stateParams,$rootScope,$state,  $cordovaGeolocation) {
           
        $scope.launchNavigator = function() {
          //  alert("direction")
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_lake = position.coords.latitude;
            $rootScope.long_long = position.coords.longitude; 
            console.log($rootScope.lat_lake)
            console.log( $rootScope.long_lake)
            console.log( $rootScope.lat )
            console.log( $rootScope.long) 
              // $rootScope.closeModal(); 
               
        var destination = [$rootScope.lat, $rootScope.long];
	var start = [$rootScope.lat_set, $rootScope.long_set];
       // alert($rootScope.lat+"lat")
      //alert($rootScope.long+"long");
      //  alert($rootScope.lat_lake+"current lat");
     //   alert($rootScope.long_lake+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
               
               
               
               
        }) 
      
      
      
      
      
      
      

  }
          
          
          
                                  
    })
    
    
    
.controller('mapVillageCtrl', function ($scope, $stateParams,$rootScope,$state) {
          $rootScope.lat11 = $stateParams.latCity;
  $rootScope.long11 = $stateParams.longCity;
  
//                                    $scope.lat1_city = JSON.parse(localStorage.getItem('lat_city'));
//                                    $scope.lat2_city = JSON.parse(localStorage.getItem('long_city'));
//                                    console.log($scope.lat1_city);
//                                    console.log($scope.lat2_city);
    })

.controller('townCtrl', function ($scope, $stateParams,Base_Url,$http,$rootScope,$state,$ionicLoading) {


    // $scope.lat_est = $stateParams.lat;
    // console.log($scope.lat_est);
    // $scope.long_est = $stateParams.long;
    // console.log($scope.long_est);
    
$scope.guidevillage_city =  function(vill_id,event){
   // alert(vill_id)
  //  alert(event);
   // alert('dfasdf');
    $scope.village = {
        GuideVillage : {
            id : event
        }
    }
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidetovillages';
    $http.post(link,$scope.village).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
        $rootScope.vil = resp.result;
        console.log($rootScope.vil);
        $state.go('menu.villages');
})
}

})

.controller('villagesCtrl', function ($scope, $ionicSlideBoxDelegate,$stateParams,Base_Url,$http,$rootScope,$state, $ionicLoading, $cordovaGeolocation,$cordovaLaunchNavigator) {
  $scope.estid = $stateParams.id; 
  console.log($scope.estid);
  $scope.esttitle = $stateParams.title ;
    $ionicLoading.show();

//     $scope.nextSlide = function() {
//         alert("deh")
    $ionicSlideBoxDelegate.next();
//   }
$scope.guidevillage_city =  function(vill_id,event){
   $ionicLoading.show();
    $scope.village = {
        GuideVillage : {
            id : event
        }
    }

    var link=Base_Url+'Aboutcretes/guidetovillages';
    $http.post(link,$scope.village).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
//        $rootScope.vill = resp.result;
//        console.log($rootScope.vill);
        $state.go('menu.town');
})
}
$scope.villagedesc = function(title,image,lat,long,desc){
  //  alert("dskh")
    $rootScope.title_vill = title;
    $rootScope.image_vill = image;
    $rootScope.title_desc = desc;
  //  alert(lat);alert(long);
    $state.go('menu.agios',{lat_vill :lat,long_vill :long});
    
    
}
/***********************************/
$rootScope.village_image = [];
 var link=Base_Url+'Aboutcretes/regionofcrete';
        $scope.east = {
            GuideVillage : {
            region : "East Crete"
                }
           }
                        console.log($scope.east)
    $http.post(link,$scope.east).success(function(response){
       console.log(response);
        $ionicLoading.hide();
    $scope.east = response.result[$scope.estid];                      
       console.log(response.result);
       console.log($scope.east.GuideVillage.latitude);
        console.log($scope.east.GuideVillage.longitude);
console.log("image ->"+$scope.east.GuideVillage.image)
    //    for(var i = 0 ; i<=response.result.length;i++){
    //         console.log(response.result[$scope.estid].GuideVillage.image);
            $scope.image = $scope.east.GuideVillage.image.split(',');
            console.log("After splited ->"  +  $scope.image);
            //  console.log($scope.image);
	      angular.forEach($scope.image,function(key,value){
            console.log(key);
            console.log(value);
             $rootScope.village_image.push(key);
        })
        console.log("push ->" + $rootScope.village_image);
      
    // }
         


       console.log($scope.east);
    $rootScope.lat_est =  $scope.east.GuideVillage.latitude;
    console.log($rootScope.lat_est)
    $rootScope.long_est =  $scope.east.GuideVillage.longitude;
    console.log($rootScope.long_est)
  
                  })
                  
      $scope.launchNavigator = function() {
     // alert("est path")
     
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions).then(function (position) {
         //     alert("location1");
            $rootScope.lat_east = position.coords.latitude;
            $rootScope.long_east = position.coords.longitude; 
            console.log($rootScope.lat_east)
            console.log( $rootScope.long_east)
            console.log($rootScope.lat_est);
            console.log($rootScope.long_est);
              // $rootScope.closeModal(); 
               
        var destination = [$rootScope.lat_est, $rootScope.long_est,$cordovaLaunchNavigator];
	var start = [$rootScope.lat_east, $rootScope.long_east];
     //  alert($rootScope.lat_est+"lat")
       // alert( $rootScope.long_est+"long");
      // alert($rootScope.lat_east+"current lat");
      //alert($rootScope.long_east+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
         
               
        }) 
      
  
  }                
                  


})


.controller('agiosCtrl',
function ($scope, $stateParams,$rootScope,$ionicLoading) {

$rootScope.latOFvill = $stateParams.lat_vill;
$rootScope.longOFvill = $stateParams.long_vill;
})
.controller('beachesCtrl', function ($scope, $stateParams,$rootScope,$state,$window,Base_Url,$http,$ionicLoading) {
    
 console.log(localStorage.getItem('creteidbeach'));
 $scope.cre_id = localStorage.getItem('creteidbeach');
    // $scope.cre_id = $stateParams.id;
    // console.log("creid" + $scope.cre_id);

  $scope.beach_info = function(beach_id,lat,long,description,title,image,$index){
    
    console.log("beach_id" + beach_id);
     $rootScope.title_bytype = title;
      console.log($rootScope.title_bytype);
     if(beach_id == 2){
        // alert("id =2")
           $scope.beaches_ByArea = {
        GuideCrete : {
            id : $scope.cre_id
        }
    }
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidetocretebeaches';
    $http.post(link,$scope.beaches_ByArea).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
      
        for(var x = 0 ; x <= resp.result.length ; x++){
            
    console.log(resp.result.length);
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/beachesregionbyarea';
    $http.get(link).success(function(response){
    $ionicLoading.hide();
    console.log(response);
    console.log(response.result);
    console.log(response.result);
    $rootScope.Beache = response.result;
    console.log($rootScope.Beache);
    $state.go('menu.beachbyarea');
                        })
                    }
        
                })

      }
      else{
        //   alert("else");
      $rootScope.title_bytype = title;
      console.log($rootScope.title_bytype);
        $rootScope.image_guide = image;
        console.log($rootScope.image_guide);
    $scope.beaches_bydistance= {
        GuideCrete : {
            id : $scope.cre_id
        }
    }
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidetocretebeaches';
    $http.post(link, $scope.beaches_bydistance).success(function(resp){
        $ionicLoading.hide();
        
        console.log(resp);
        // for(var x = 0 ; x <= resp.result.length ; x++){
            
    // console.log(resp.result.length);
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidebeachesbyparams';
        $scope.beachparam = {
            GuideBeache : {
            id : beach_id
                            }
                        }
    $http.post(link,$scope.beachparam).success(function(response){
    $ionicLoading.hide();
    console.log(response);
    console.log(response.result);
    console.log(response.result);
    // $scope.result_beach = response.result;
    if(response.result.length > 0){
        for(var c= 0 ; c<=response.result.length ; c++){
            console.log(response.result[c].GuideBeache.image); 
            response.result[c].GuideBeache.image = response.result[c].GuideBeache.image.split(',')[0];
            console.log(response.result[c].GuideBeache.image);

            $rootScope.guidebeach = response.result;
            console.log($rootScope.guidebeach);
            $state.go('menu.beachesbydistance');
            
        }
  
    }else{
$rootScope.beach_image = [];
        console.log("else ->" + $scope.cre_id);
    //   this.beach_arr = [{
    //     title : title,
    //     description : description,
    //     title_greek : title,
    //     description_greek :description 
    // }];
    
  $scope.beaches = {
        GuideCrete : {
            id : $scope.cre_id
        }
    }
   // alert(creteid)
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/guidetocretebeaches';
    $http.post(link,$scope.beaches).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
      
    //   $rootScope.title =  resp.result[0].GuideCrete.title;
    //   console.log($rootScope.title);
    //    $rootScope.title1 =  resp.result[0].GuideCrete.title_greek;
    //   console.log($rootScope.title1);
     
       
            
            // console.log(resp.result.length);
        

                    console.log(resp.result[0].GuideData[$index]);
                    $scope.image= resp.result[0].GuideData[$index].image.split(',');
                    // console.log("image->" + $scope.image);
              
                    $rootScope.beach = resp.result[0].GuideData[$index];

                     	      angular.forEach($scope.image,function(key,value){
                                console.log(key);
                                console.log(value);
                                $rootScope.beach_image.push(key);
                            })

                    console.log("push ->" + $rootScope.beach_image);
                    $scope.lat_1 = resp.result[0].GuideData[$index].latitude;
                    $scope.lat_2 = resp.result[0].GuideData[$index].longitude;
                    $state.go('menu.1stnearestbeach',{lat_current : $scope.lat_1, long_current : $scope.lat_2});
                 
       
          })




    /////////////////////////////old/////////////
  
    // $rootScope.beach.title = title;
    // $rootScope.beach.description = description;
	// $rootScope.beach_image = image.split(',');
	// console.log($rootScope.beach_image);
///////////////////////////////////////////////
   

                    }
                              })
  
//   }
    })
      }
 }
  $scope.data = {}
    $scope.searchbar = function(){
     //   alert("search")
        $rootScope.searchbyname = 0;
        console.log($scope.data.search);
        $scope.search = {
        GuideBeache : {
            title : $scope.data.search
        }
    }
    console.log( $scope.search);
    $ionicLoading.show();
    var link=Base_Url+'Aboutcretes/search';
    $http.post(link,$scope.search).success(function(resp){
        $ionicLoading.hide();
        console.log(resp);
        //alert(resp.msg);
        $rootScope.guidebeach = resp.data;
//        console.log($rootScope.guidebeach);
        $state.go('menu.beachesbydistance');
    })
    }
})

.controller('beachareanoethCtrl', function ($scope, $ionicPopup,$ionicLoading,$stateParams,$rootScope,$state,$window,Base_Url,$http,$cordovaGeolocation,$cordovaLaunchNavigator) {
    $scope.region = $stateParams.region_lang; 
    $ionicLoading.show(); 
    var link=Base_Url+'Aboutcretes/beachesbyarea';
        $scope.beachnorth = {
            GuideBeache : {
            region : $scope.region
                }
                        }
    console.log($scope.beachnorth)
    $http.post(link,$scope.beachnorth).success(function(response){
       console.log(response);
       if(response.result.length > 0){
           $ionicLoading.hide();
    //    for(var a= 0 ;a<=response.result.length;a++)
    //    {
           console.log(response.result[0].GuideBeache.image);
           response.result[0].GuideBeache.image = response.result[0].GuideBeache.image.split(',')[0];
           $scope.areanorth = response.result;
            console.log($scope.areanorth);
            $rootScope.beach_lat = response.result[0].GuideBeache.latitude;
            console.log($rootScope.beach_lat)
            $rootScope.beach_long = response.result[0].GuideBeache.longitude; 
            console.log($rootScope.beach_long)
    //    }
    }else{
        $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
                      template: "No data to show"
                           });
       }


   
                  })
                  
      
  $rootScope.launchNavigator = function() {
     // alert("beach path")
     
         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_be = position.coords.latitude;
            $rootScope.long_be = position.coords.longitude; 
            console.log($rootScope.lat_be)
            console.log( $rootScope.long_be)
            console.log($rootScope.beach_lat);
            console.log($rootScope.beach_long);
              // $rootScope.closeModal(); 
               
                var destination = [$rootScope.beach_lat, $rootScope.beach_long,$cordovaLaunchNavigator];
	var start = [$rootScope.lat_be, $rootScope.long_be];
      //  alert($rootScope.lat+"lat")
       // alert($rootScope.long+"long");
      //  alert($rootScope.lat_set+"current lat");
       // alert($rootScope.long_set+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
         
               
        }) 
      
  
  }                
                  
                  
                  
  
})






.controller('westmapCtrl', function ($scope, $stateParams,$rootScope,$state,$window,Base_Url,$http) {
    
    
})
.controller('beachbyareaCtrl', function ($scope, $stateParams,$rootScope,$state,$window,Base_Url,$http) {
    
    $scope.guidebeach_detail = function(event,id,desc,title,lat,long,image){
       this.beach_arr = [{
        title : title,
        description : description,
        title_greek : title,
        description_greek :description 
        }];
    console.log(this.beach_arr);
    $rootScope.beach = this.beach_arr[0];
    //    $rootScope.beach.title = title;
       $rootScope.beach_image = image;
    //    $rootScope.beach.description = desc;
       $state.go('menu.1stnearestbeach',{lat_current : lat,long_current :long});
    }
})

.controller('weatherdetailCtrl', function ($scope, $stateParams,$rootScope,$state,$window,Base_Url,$http,$ionicLoading,$filter) {
  $scope.id = $stateParams.id;  
     $ionicLoading.show();
  
  var link='http://api.openweathermap.org/data/2.5/forecast/daily?q=crete,greece&appid=7756a5add72128537d61c8fccb203817&units=metric';
  //alert('hit');
  $http.get(link).success(function(resp)
  {
    //alert('get');
     $ionicLoading.hide();
   $rootScope.weather_list1=[];
   $rootScope.weather=resp.city;
   console.log($rootScope.weather);

      for($r=0; $r<=2; $r++)
  {
      $rootScope.weather_list1.push(resp.list[$r]);
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
    console.log(today.getDay())
    console.log($scope.id)
    if(today.getDay() == 6 && parseInt($scope.id) > 0){
        $scope.today_day   =weekday[parseInt($scope.id)-1];
    }else{
        $scope.today_day =weekday[today.getDay()+parseInt($scope.id)];
    }
    
        console.log($scope.today_day)
//        $rootScope.today_date = $filter('date')(today,'MM/dd/yyyy');

//        var tomorrow = new Date();
//        $scope.tomo_day   = weekday[today.getDay()+$scope.id];
//        
//        $rootScope.tomo_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+$scope.id),'MM/dd/yyyy');
//        
//        
//
//        var tomorrow = new Date();
//        $scope.next_day   = weekday[today.getDay()+$scope.id];
//        $rootScope.next_date = $filter('date')(tomorrow.setDate(tomorrow.getDate()+$scope.id),'MM/dd/yyyy');
    
     
$scope.weatherdata = $rootScope.weather_list1[$scope.id]
      console.log($scope.weatherdata);
      console.log($scope.today_day)
      console.log($scope.tomo_day)
      console.log($scope.tomo_day)
        
   
  })

  
  
  
  
    
})
.controller('beachmapCtrl', function ($scope, $stateParams,$rootScope,$state,$window,Base_Url,$http) {
      
      $scope.beach_lat = $stateParams.lat;
      $scope.beach_long = $stateParams.long;
      console.log($scope.beach_lat);
      console.log($scope.beach_long);


              
})
.controller('coastCtrl', function ($scope,$ionicLoading, $ionicPopup,$stateParams,$rootScope,$state,$window,Base_Url,$http,$cordovaGeolocation,$cordovaLaunchNavigator) {
      
      $ionicLoading.show();
       $scope.reg = $stateParams.reg 
       $scope.regid = $stateParams.regid
       console.log($scope.reg);
       console.log($scope.regid);
       $rootScope.coast_image = [];
//        $scope.image = $stateParams.image
//        $scope.title = $stateParams.title
       console.log($scope.regid)
         var link=Base_Url+'Aboutcretes/beachesbyarea';
        $scope.beachnorth = {
            GuideBeache : {
            region : $scope.reg
                }
                        }
    console.log($scope.beachnorth)
    $http.post(link,$scope.beachnorth).success(function(response){
       console.log(response);
       if(response.status == true){
        $ionicLoading.hide();
    $scope.areanorth = response.result[$scope.regid];
    console.log($scope.areanorth);
    console.log($scope.areanorth.GuideBeache.image);
    $scope.area_image1  = $scope.areanorth.GuideBeache.image.split(',');
    console.log($scope.area_image1);
      angular.forEach($scope.area_image1,function(key,value){
            console.log(key);
            console.log(value);
             $rootScope.coast_image.push(key);
        })

console.log($rootScope.coast_image);
       }else{
            $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                      template: "No data to show"
                           });
          
       }
                  })


                
                   $scope.launchNavigator = function(lat,long) {
          //  alert("direction")
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_first = position.coords.latitude;
            $rootScope.long_first = position.coords.longitude; 
            console.log($rootScope.lat_first)
            console.log($rootScope.long_first)
            console.log(lat )
            console.log(long) 
              // $rootScope.closeModal(); 
               
        var start = [$rootScope.lat_first, $rootScope.long_first];
	   var destination = [lat, long];
       console.log(destination);
       console.log(start);
       // alert($rootScope.lat+"lat")
      //alert($rootScope.long+"long");
      //  alert($rootScope.lat_lake+"current lat");
     //   alert($rootScope.long_lake+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
            } )
                   } 
})
.controller('beachesbydistanceCtrl', function ($scope, $stateParams,$rootScope,$state,$window,Base_Url,$http,$ionicModal,$cordovaLaunchNavigator) {
//    $ionicModal.fromTemplateUrl('templates/1stnearestbeach.html', {
//    scope: $scope,
//    animation: 'slide-in-up'
//  }).then(function(modal) {
//    $scope.modal = modal;
//  });
//  $scope.openModal = function() {
//    $scope.modal.show();
//  };
//  $scope.closeModal = function() {
//    $scope.modal.hide();
//  };
//  // Cleanup the modal when we're done with it!
//  $scope.$on('$destroy', function() {
//    $scope.modal.remove();
//  });
//  // Execute action on hide modal
//  $scope.$on('modal.hidden', function() {
//    // Execute action
//  });
//  // Execute action on remove modal
//  $scope.$on('modal.removed', function() {
//    // Execute action
//  });

    $scope.beach_desc = function(bid,index){
  
        console.log(index);
$scope.byindex = index;
console.log($scope.byindex);
// alert(bid);
    // this.beach_arr = [{
    //     title : title,
    //     description : desc,
    //     title_greek : title,
    //     description_greek :desc 
    //     }];
    // console.log(this.beach_arr);
    // $rootScope.beach = this.beach_arr[0];
        $rootScope.beach_image= [];
        // console.log(image);
        //alert(bid);
        var link=Base_Url+'Aboutcretes/guidebeachesbyparams';
            $scope.beachparam_distance = {
                GuideBeache : {
                id : bid
                                }
                            }
     console.log($scope.beachparam_distance);
    $http.post(link,$scope.beachparam_distance).success(function(response){
    // $ionicLoading.hide();
    console.log(response);
    console.log(response.result[$scope.byindex]);
    $scope.detail_top = response.result[$scope.byindex];
    console.log($scope.detail_top.GuideBeache.image);
    $scope.beach_im = $scope.detail_top.GuideBeache.image.split(',');
    console.log($scope.beach_im);
    $rootScope.beach =  $scope.detail_top.GuideBeache;
   $window.localStorage.setItem('lat_city',JSON.stringify($scope.detail_top.GuideBeache.latitude));
    $window.localStorage.setItem('long_city', JSON.stringify($scope.detail_top.GuideBeache.longitude));
 console.log($scope.detail_top.GuideBeache.latitude);
    console.log( $scope.detail_top.GuideBeache.longitude);
    angular.forEach($scope.beach_im,function(key,value){
            console.log(key);
            console.log(value);
             $rootScope.beach_image.push(key);
        })

console.log($rootScope.beach_image);
    $state.go('menu.1stnearestbeach',{lat_current :$scope.detail_top.GuideBeache.latitude, long_current : $scope.detail_top.GuideBeache.longitude});
return false;
    // $scope.result_beach = response.result;
    
        // for(var i= 0 ; i<=response.result.length ; i++){
        //     console.log(id);
        //     console.log(response.result[i].GuideBeache.id);
        //        if(id == response.result[i].GuideBeache.id){
        //             $scope.img_beach = response.result[i].GuideBeache.image.split(',');
        //             console.log($scope.img_beach);
        //             angular.forEach($scope.img_beach,function(key,value){
        //                     console.log(key);
        //                     console.log(value);
        //                     $rootScope.beach_image.push(key);
                          
        //                 })
        //            return false;
        //        }

        // }
    
    })
        
        // $rootScope.beach_image = image.split(',');
		/* console.log($rootScope.beach_image)
	    $rootScope.beach_desc = desc; */
        // $state.go('menu.1stnearestbeach',{lat_current : lat , long_current : long});


    }
}) 


.controller('beachbyarea1Ctrl',
function ($scope, $stateParams,$rootScope,$cordovaGeolocation,$cordovaLaunchNavigator) {

     $rootScope.lat_beach =  $stateParams.lat_current;
     $rootScope.long_beach = $stateParams.long_current;
    console.log($rootScope.lat_beach);
    console.log($rootScope.long_beach);
    function deg2rad(deg) {
                        rad = deg * Math.PI / 180; // radians = degrees * pi/180
                        return rad;
                    }


                    // round to the nearest 1/1000
                    function round(x) {
                        return Math.round(x * 1000) / 1000;
                    }
   
   
                    $rootScope.findDistance = function (lat, long, lat1, long1) {
                        //alert(lat);
                        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, Rm, Rk, frm;

                        var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
                        var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
                        // get values for lat1, lon1, lat2, and lon2
                        t1 = lat;// 30.7206541;
                        n1 = long;//76.843255;
                        t2 = lat1;//30.729551;
                        n2 = long1;//76.7656294;

                        // convert coordinates to radians
                        lat1 = deg2rad(t1);
                        lon1 = deg2rad(n1);
                        lat2 = deg2rad(t2);
                        lon2 = deg2rad(n2);

                        // find the differences between the coordinates
                        dlat = lat2 - lat1;
                        dlon = lon2 - lon1;

                        // here's the heavy lifting
                        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
                        dm = c * Rm; // great circle distance in miles
                        dk = c * Rk; // great circle distance in km

                        // round the results down to the nearest 1/1000
                        mi = round(dm);
                        km = round(dk);
                        return km * 1000;


                    };

   /////////////////////////////////////////////////////////
 var restdetails = [];
 var favrest =[];
                  //$scope.openModal = function () {
                       // alert("hello");
                        var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       // alert("dkjnvks");
                        $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $rootScope.lat_startbeach = position.coords.latitude;
                                    $rootScope.long_startbeach = position.coords.longitude;
                                    console.log($rootScope.lat_startbeach);
                                    console.log($rootScope.long_startbeach);
                                
                                })
    //////////////////////////////////////////////////////////////////////////////////////
     
  $scope.launchNavigator = function() {
    //  alert("path")
      
     
         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_lake = position.coords.latitude;
            $rootScope.long_lake = position.coords.longitude; 
            console.log($rootScope.lat_lake)
            console.log( $rootScope.long_lake)
            console.log($rootScope.lat_beach);
            console.log($rootScope.long_beach);
              // $rootScope.closeModal(); 
               
                var destination = [$rootScope.lat_beach, $rootScope.long,$cordovaLaunchNavigator];
	var start = [$rootScope.lat_lake, $rootScope.long_lake];
      //  alert($rootScope.lat+"lat")
       // alert($rootScope.long+"long");
      //  alert($rootScope.lat_set+"current lat");
       // alert($rootScope.long_set+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
         
               
        }) 
      
  
  }

})

.controller('1stnearestbeachCtrl',
function ($scope, $stateParams,$rootScope,$cordovaGeolocation,$cordovaLaunchNavigator) {

     $rootScope.lat_beach =  $stateParams.lat_current;
     $rootScope.long_beach = $stateParams.long_current;
    console.log($rootScope.lat_beach);
    console.log($rootScope.long_beach);
   localStorage.setItem('lat_city' , JSON.stringify($rootScope.lat_beach));
  localStorage.setItem('long_city' , JSON.stringify($rootScope.long_beach));
    function deg2rad(deg) {
                        rad = deg * Math.PI / 180; // radians = degrees * pi/180
                        return rad;
                    }


                    // round to the nearest 1/1000
                    function round(x) {
                        return Math.round(x * 1000) / 1000;
                    }
   
   
                    $rootScope.findDistance = function (lat, long, lat1, long1) {
                        //alert(lat);
                        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, Rm, Rk, frm;

                        var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
                        var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
                        // get values for lat1, lon1, lat2, and lon2
                        t1 = lat;// 30.7206541;
                        n1 = long;//76.843255;
                        t2 = lat1;//30.729551;
                        n2 = long1;//76.7656294;

                        // convert coordinates to radians
                        lat1 = deg2rad(t1);
                        lon1 = deg2rad(n1);
                        lat2 = deg2rad(t2);
                        lon2 = deg2rad(n2);

                        // find the differences between the coordinates
                        dlat = lat2 - lat1;
                        dlon = lon2 - lon1;

                        // here's the heavy lifting
                        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
                        dm = c * Rm; // great circle distance in miles
                        dk = c * Rk; // great circle distance in km

                        // round the results down to the nearest 1/1000
                        mi = round(dm);
                        km = round(dk);
                        return km * 1000;


                    };

   /////////////////////////////////////////////////////////
 var restdetails = [];
 var favrest =[];
                  //$scope.openModal = function () {
                       // alert("hello");
                        var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       // alert("dkjnvks");
                        $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $rootScope.lat_startbeach = position.coords.latitude;
                                    $rootScope.long_startbeach = position.coords.longitude;
                                    console.log($rootScope.lat_startbeach);
                                    console.log($rootScope.long_startbeach);
                                
                                })
    //////////////////////////////////////////////////////////////////////////////////////
     
  $scope.launchNavigator = function() {
      //("path")
     
         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_lake = position.coords.latitude;
            $rootScope.long_lake = position.coords.longitude; 
            console.log($rootScope.lat_lake)
            console.log( $rootScope.long_lake)
            console.log($rootScope.lat_beach);
            console.log($rootScope.long_beach);
              // $rootScope.closeModal(); 
               
                var destination = [$rootScope.lat_beach, $rootScope.long,$cordovaLaunchNavigator];
	var start = [$rootScope.lat_lake, $rootScope.long_lake];
      //  alert($rootScope.lat+"lat")
       // alert($rootScope.long+"long");
      //  alert($rootScope.lat_set+"current lat");
       // alert($rootScope.long_set+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
         
               
        }) 
      
  
  }

})


.controller('BeachHistoryCtrl',
function ($scope, $stateParams,$rootScope,$cordovaGeolocation) {

     $rootScope.lat_crete =  $stateParams.lat_crete;
     $rootScope.long_crete = $stateParams.long_crete;
    console.log($rootScope.lat_crete);
    console.log($rootScope.long_crete);
    function deg2rad(deg) {
                        rad = deg * Math.PI / 180; // radians = degrees * pi/180
                        return rad;
                    }


                    // round to the nearest 1/1000
                    function round(x) {
                        return Math.round(x * 1000) / 1000;
                    }
   
   
                    $rootScope.findDistance = function (lat, long, lat1, long1) {
                        //alert(lat);
                        var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km, Rm, Rk, frm;

                        var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
                        var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator
                        // get values for lat1, lon1, lat2, and lon2
                        t1 = lat;// 30.7206541;
                        n1 = long;//76.843255;
                        t2 = lat1;//30.729551;
                        n2 = long1;//76.7656294;

                        // convert coordinates to radians
                        lat1 = deg2rad(t1);
                        lon1 = deg2rad(n1);
                        lat2 = deg2rad(t2);
                        lon2 = deg2rad(n2);

                        // find the differences between the coordinates
                        dlat = lat2 - lat1;
                        dlon = lon2 - lon1;

                        // here's the heavy lifting
                        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // great circle distance in radians
                        dm = c * Rm; // great circle distance in miles
                        dk = c * Rk; // great circle distance in km

                        // round the results down to the nearest 1/1000
                        mi = round(dm);
                        km = round(dk);
                        return km * 1000;


                    };

   /////////////////////////////////////////////////////////
 var restdetails = [];
 var favrest =[];
                  //$scope.openModal = function () {
                       // alert("hello");
                        var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       // alert("dkjnvks");
                        $cordovaGeolocation.getCurrentPosition(posOptions)

                                .then(function (position) {

                                    console.log(position);
                                    //  alert("hgdh");
                                    // console.log('position');

                                    $rootScope.lat_startcrete = position.coords.latitude;
                                    $rootScope.long_startcrete = position.coords.longitude;
                                    console.log($rootScope.lat_startcrete);
                                    console.log($rootScope.long_startcrete);
                                
                                })
})
   
.controller('menuCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $translate ,$rootScope,$stateParams ,Base_Url,$http,$state,$ionicLoading,$window,$ionicPopup,$ionicPlatform,$location,$ionicHistory)
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
         $window.localStorage.removeItem('userinfo');
         $window.localStorage.removeItem('User_Id');
         $window.localStorage.removeItem('code');
         $window.localStorage.removeItem('username');
         $window.localStorage.removeItem('Roles');
         console.log($window.localStorage);
         console.log($window.localStorage.getItem('userinfo'));
         $state.go('menu.login',{},{reload:false});
      
       console.log('ok');
     } else {
       console.log('cancel');
     }
   });
 }   

          $scope.logout_lang = function()
         {
         $window.localStorage.clear();

   var confirmPopup = $ionicPopup.confirm({
     title: 'Αποσυνδέση',
     template: 'Είστε βέβαιοι ότι θέλετε να αποσυνδεθείτε?'
   });
//$ionicLoading.show();
   confirmPopup.then(function(res) {
     if(res) {
//  alert("true");
        // $ionicLoading.hide();
          $window.localStorage.clear();
         $window.localStorage.removeItem('userinfo');
         $window.localStorage.removeItem('User_Id');
         $window.localStorage.removeItem('code');
         $window.localStorage.removeItem('username');
         $window.localStorage.removeItem('Roles');
         console.log($window.localStorage);
         console.log($window.localStorage.getItem('userinfo'));
         $state.go('menu.login',{},{reload:true});
         $scope.data={};
       console.log('Εντάξει');
     } else {
       console.log('Ματαίωση');
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
  $scope.setLang = function(langKey) {
    // You can change the language during runtime
    $translate.use(langKey);
    $rootScope.currentLanguage = $translate.use();
    console.log($rootScope.currentLanguage)
    console.log($translate.use())
  };

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

.controller('townvillageCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Base_Url,$http,$ionicLoading,$rootScope,$state) {
//    $scope.townvillage = function(){
//        alert("srishti")
//    var link=Base_Url+'Aboutcretes/regionofcrete';
//        $scope.east = {
//            GuideVillage : {
//            region : "East Crete"
//                }
//                        }
//    $http.post(link,$scope.east).success(function(response){
//       console.log(response);
//    $rootScope.east = response.result;                      
//       console.log(response.result);
//    $rootScope.esttitle = response.result[0].GuideVillage.region;
//    console.log($rootScope.esttitle )
//    $rootScope.estimage = response.result[0].GuideVillage.image;
//    console.log( $rootScope.estimage)
//    var x = 0;
//    for(var x = 0 ; x <= response.result.length ; x++){
//    //console.log(response.result[x].GuideVillage.id);
//    $rootScope.estid = response.result[x].GuideVillage.id;
//    console.log( $rootScope.estid)
//      $state.go('menu.est',{id: $rootScope.estid});          
//             
//              }
//   
//                  })
//    }
//    
//
//
//    
//    
//    
//    $scope.westvillage = function(){
//        
//         alert("westvillage")
//        
//    var link=Base_Url+'Aboutcretes/regionofcrete';
//        $scope.west = {
//            GuideVillage : {
//                 region : "West Crete"
//            }
//                }
//    $http.post(link,$scope.west).success(function(resp){
//    console.log(resp);
//    $rootScope.west = resp.result;
//    console.log(resp.result);
//    $rootScope.wsttitle = resp.result[0].GuideVillage.region;
//    console.log($rootScope.wsttitle )                     
//        $state.go('menu.west');
//                        })
//        
//    }  
//

})

.controller('estCtrl',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$rootScope,$state,Base_Url) {   
    //("est village")
    var link=Base_Url+'Aboutcretes/regionofcrete';
        $scope.east = {
            GuideVillage : {
            region : "East Crete"
                }
                        }
                        console.log(  $scope.east)
    $http.post(link,$scope.east).success(function(response){
       console.log(response);
       for(var i = 0 ; i<=response.result.length;i++){
           console.log(response.result[i].GuideVillage.image);
          response.result[i].GuideVillage.image = response.result[i].GuideVillage.image.split(',')[0];
           console.log(response.result[i].GuideVillage.image);
               $scope.east = response.result;                      
       console.log(response.result);
       console.log($scope.east);
       }
      
      

   
                  }) 

})

.controller('westCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,Base_Url,$rootScope,$state) {

   
       //alert("westvillage")
        
    var link=Base_Url+'Aboutcretes/regionofcrete';
        $scope.west_vill = {
            GuideVillage : {
                 region : "West Crete"
            }
                }
    $http.post(link,$scope.west_vill).success(function(resp){
    console.log(resp);

        //     $rootScope.west = resp.result;
        //    console.log($rootScope.west); return false;
      for(var i = 0 ; i<=resp.result.length;i++){
           console.log(resp.result[i].GuideVillage.image);
          resp.result[i].GuideVillage.image = resp.result[i].GuideVillage.image.split(',')[0];
           console.log(resp.result[i].GuideVillage.image);
          
              $scope.west = resp.result;
                console.log($scope.west[0].GuideVillage.image);
              $rootScope.wsttitle = resp.result[0].GuideVillage.region;
    console.log($rootScope.wsttitle ) ;     
    $rootScope.wsttitle_greek = resp.result[0].GuideVillage.region_greek;
    console.log($rootScope.wsttitle_greek ) ;   

       }
    
               
        
                        })
                    
    
})



.controller('villageswestCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,Base_Url,$rootScope,$state,  $cordovaGeolocation,$cordovaLaunchNavigator) {
 $scope.estid = $stateParams.id; 
 $scope.vill_arr = [];
    var link=Base_Url+'Aboutcretes/regionofcrete';
        $scope.west = {
            GuideVillage : {
                 region : "West Crete"
            }
                }
    $http.post(link,$scope.west).success(function(resp){
    console.log(resp);
    $scope.west = resp.result[$scope.estid]; 
    // console.log(resp.result);
    console.log($scope.west);   
      $scope.image_west = $scope.west.GuideVillage.image.split(',');
	
	
      console.log($scope.image_west);
	   angular.forEach($scope.image_west,function(key,value){
            console.log(key);
            console.log(value);
             $scope.vill_arr.push(key);
        })       
                      
                      
    $rootScope.lat_west =  $scope.west.GuideVillage.latitude;
    console.log($rootScope.lat_west);
    $rootScope.long_west =  $scope.west.GuideVillage.longitude;
    console.log($rootScope.long_west);
                        })
                                 
                  
      $rootScope.launchNavigator = function() {
     // alert("west path")
     
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_wst = position.coords.latitude;
            $rootScope.long_wst = position.coords.longitude; 
            console.log($rootScope.lat_wst)
            console.log( $rootScope.long_wst)
            console.log($rootScope.lat_west);
            console.log($rootScope.long_west);
              // $rootScope.closeModal(); 
               
        var destination = [$rootScope.lat_west,$rootScope.long_west,$cordovaLaunchNavigator];
	var start = [$rootScope.lat_wst,   $rootScope.long_wst];
      // alert($rootScope.lat_wst+"lat")
      //  alert($rootScope.long_wst+"long");
      // alert($rootScope.lat_wst+"current lat");
     // alert( $rootScope.long_wst+"current long");
   launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });   
               
               
         
               
        }) 
      
  
  }   
                    
    
})
  
// .controller('Tabs2Ctrl', function ($scope,$window) {

//     $scope.tabs = [{
//             title: 'Map',
//             url: 'one.tpl.html'
//         }, {
//             title: 'Direction',
//             url: 'two.tpl.html'
//         },{
//          title: 'History',
//             url: 'three.tpl.html'
//     }];
//     $scope.tabs1 = [{
//             title: 'Χάρτης',
//             url: 'one.tpl.html'
//         }, {
//             title: 'Κατεύθυνση',
//             url: 'two.tpl.html'
//         },{
//          title: 'Ιστορία',
//             url: 'three.tpl.html'
//     }];
//     $scope.currentTab = 'one.tpl.html';

//     $scope.onClickTab = function (tab) {
//         $scope.currentTab = tab.url;
//     }
    
//     $scope.isActiveTab = function(tabUrl) {
//         return tabUrl == $scope.currentTab;
//     }
           
// })

.controller('TabsCtrl', function ($scope,$window) {

    $scope.tabs = [{
            title: 'Map',
            url: 'one.tpl.html'
        }, {
            title: 'Direction',
            url: 'two.tpl.html'
        },{
         title: 'History',
            url: 'three.tpl.html'
    }];
    $scope.tabs1 = [{
            title: 'Χάρτης',
            url: 'one.tpl.html'
        }, {
            title: 'Κατεύθυνση',
            url: 'two.tpl.html'
        },{
         title: 'Ιστορία',
            url: 'three.tpl.html'
    }];
    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
           
})


.controller('Tabs1Ctrl', function ($scope,$window) {

    $scope.tabs = [{
            title: 'Map',
            url: 'one.tpl.html'
        }, {
            title: 'Direction',
            url: 'two.tpl.html'
        },
   ];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
           
})





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

 