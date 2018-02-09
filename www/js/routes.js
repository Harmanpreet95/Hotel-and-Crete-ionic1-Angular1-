angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
     cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
  
  
      .state('menu.login', {
    url: '/login',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })
    .state('menu.forgot', {
    url: '/forgot',
    views: {
      'side-menu21': {
        templateUrl: 'templates/forgot.html',
        controller: 'forgotCtrl'
      }
    }
  })


  .state('menu.groupHotel', {
    url: '/hotel-group',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/groupHotel.html',
        controller: 'groupHotelCtrl'
      }
    }
  })

  .state('menu.messages', {
    url: '/messages',
    cache : false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/messages.html',
        controller: 'messagesCtrl'
      }
    }
  })


  .state('menu.beachbyarea1', {
    url: '/beachbyarea1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/beachbyarea1.html',
        controller: 'beachbyarea1Ctrl'
      }
    }
  })
  .state('menu.mappage', {
    url: '/mappage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mappage.html',
        controller: 'mappageCtrl'
      }
    }
  })
 .state('menu.map', {
    url: '/map',
   cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })
       .state('menu.beachbyarea', {
    url: '/beachbyarea',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/beachbyarea.html',
    controller: 'beachbyareaCtrl'
	  }
	  }
  })
  .state('menu.weather', {
    url: '/weather',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/weather.html',
    controller: 'weatherCtrl'
	  }
	  }
  })
   .state('menu.coast', {
    url: '/coast/:reg/:regid/:image/:title',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/coast.html',
    controller: 'coastCtrl'
	  }
	  }
  })
  
  .state('menu.greekword', {
    url: '/greekword',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/greekword.html',
    controller: 'greekwordCtrl'
	  }
	  }
  })
   .state('menu.sightmap', {
    url: '/sightmap',
     cache: false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/sightmap.html',
    controller: 'sightmapCtrl'
	  }
	  }
  })
  
  .state('menu.info', {
    url: '/info',
    cache: false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/info.html',
    controller: 'infoCtrl'
	  }
	  }
  })
    .state('menu.beachmap', {
    url: '/beachmap/:lat/:long',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/beachmap.html',
    controller: 'beachmapCtrl'
	  }
	  }
  })
    
  .state('menu.weatherdetail', {
    url: '/weatherdetail/:id',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/weatherdetail.html',
    controller: 'weatherdetailCtrl'
	  }
	  }
  })
  
   .state('menu.usefulnumber', {
    url: '/usefulnumber',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/usefulnumber.html',
    controller: 'usefulnumberCtrl'
	  }
	  }
  })
  
  .state('menu.groupname', {
    url: '/groupname/:gname',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/groupname.html',
    controller: 'groupnameCtrl'
	  }
	  }
  })
 
     .state('menu.hotelname', {
    url: '/hotelname',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/hotelname.html',
    controller: 'hotelnameCtrl'
	  }
	  }
  })
   .state('menu.beachareanoeth', {
    url: '/beachareanoeth/:region/:region_lang',
    cache : false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/beachareanoeth.html',
    controller: 'beachareanoethCtrl'
	  }
	  }
  })
  
   .state('menu.abouthotel', {
    url: '/abouthotelname',
    cache : false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/abouthotel.html',
    controller: 'abouthotelCtrl'
	  }
	  }
  })
  
  .state('menu.accomodation', {
    url: '/accomodationname',
    cache: false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/accomodation.html',
    controller: 'accomodationCtrl'
	  }
	  }
  })
  
   .state('menu.room-a', {
    url: '/room-aname/:id',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/room-a.html',
    controller: 'room-aCtrl'
	  }
	  }
  })
  
    .state('menu.facilities', {
    url: '/facilitiesname',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/facilities.html',
    controller: 'facilitiesCtrl'
	  }
	  }
  })
  
  .state('menu.shop1', {
    url: 'shop1',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/shop1.html',
    controller: 'shop1Ctrl'
	  }
	  }
  })
  .state('menu.shopping', {
    url: 'shopping',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/shopping.html',
    controller: 'shoppingCtrl'
	  }
	  }
  })
  
  
  
   .state('menu.restaurant', {
    url: '/restaurantname',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/restaurant.html',
    controller: 'restaurantCtrl'
	  }
	  }
  })
  
   .state('menu.restaurant1', {
    url: '/restaurant1name',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/restaurant1.html',
    controller: 'restaurant1Ctrl'
	  }
	  }
  })
  
   .state('menu.service', {
    url: '/servicename',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/service.html',
    controller: 'serviceCtrl'
	  }
	  }
  })

   .state('menu.hotel-a', {
    url: '/hotel-aname/:id',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/hotel-a.html',
    controller: 'hotel-aCtrl'
	  }
	  }
  })

 .state('menu.Questionnaire', {
    url: '/Questionnairename',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/questionnaire.html',
    controller: 'QuestionnaireCtrl'
	  }
	  }
  })
  
   .state('menu.aboutcrete', {
    url: '/aboutcretename',
    cache: false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/aboutcrete.html',
    controller: 'aboutcreteCtrl'
	  }
	  }
  })
  
 
   .state('menu.crete', {
    url: '/cretename/:title',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/crete.html',
    controller: 'creteCtrl'
	  }
	  }
  })
    .state('menu.geography', {
    url: '/geographyname/:id',
    cache :false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/geography.html',
    controller: 'geographyCtrl'
	  }
	  }
  })
  
  .state('menu.mythology', {
    url: '/mythologyname',
    cache :false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/mythology.html',
    controller: 'mythologyCtrl'
	  }
	  }
  })
  
   .state('menu.birthofzeus', {
    url: '/birthofzeusname',
     cache :false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/birthofzeus.html',
    controller: 'birthofzeusCtrl'
	  }
	  }
  })
.state('menu.history', {
    url: '/historyname',
     cache :false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/history.html',
    controller: 'historyCtrl'
	  }
	  }
  })
  
  .state('menu.stoneage', {
    url: '/stoneagename',
     cache :false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/stoneage.html',
    controller: 'stoneageCtrl'
	  }
	  }
  })
  
  .state('menu.culture', {
       cache :false,
    url: '/culturename',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/culture.html',
    controller: 'cultureCtrl'
	  }
	  }
  })
  .state('menu.language', {
    url: '/languagename',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/language.html',
    controller: 'languageCtrl'
	  }
	  }
  })
  
  .state('menu.gastronomy', {
    url: '/gastronomyname',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/gastronomy.html',
    controller: 'gastronomyCtrl'
	  }
	  }
  })
  
  .state('menu.nutrition', {
    url: '/nutritionname',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/nutrition.html',
    controller: 'nutritionCtrl'
	  }
	  }
  })
  
  .state('menu.product', {
    url: '/productname',
     cache :false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/product.html',
    controller: 'productCtrl'
	  }
	  }
  })
  
  .state('menu.oliveoil', {
    url: '/oliveoil',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/oliveoil.html',
    controller: 'oliveoilCtrl'
	  }
	  }
  })
  
  .state('menu.specialtaste', {
    url: '/specialtaste',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/specialtaste.html',
    controller: 'specialtasteCtrl'
	  }
	  }
  })
   .state('menu.ntakos', {
    url: '/ntakos',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/ntakos.html',
    controller: 'ntakosCtrl'
	  }
	  }
  })
  .state('menu.guidetocrete', {
    url: '/guidetocrete',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/guidetocrete.html',
    controller: 'guidetocreteCtrl'
	  }
	  }
  })
  
  .state('menu.cities', {
    url: '/cities/:image',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/cities.html',
    controller: 'citiesCtrl'
	  }
	  }
  })
  
  .state('menu.heraklion', {
    url: '/heraklion',
    cache : false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/heraklion.html',
    controller: 'heraklionCtrl'
	  }
	  }
  })
  
  .state('menu.historyofhiraklion', {
    url: '/historyofhiraklion',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/historyofhiraklion.html',
    controller: 'historyofhiraklionCtrl'
	  }
	  }
  })
  
   .state('menu.chania', {
    url: '/chania',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/chania.html',
    controller: 'chaniaCtrl'
	  }
	  }
  })
  
   .state('menu.historyofchania', {
    url: '/historyofchania',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/historyofchania.html',
    controller: 'historyofchaniaCtrl'
	  }
	  }
  })
  
  .state('menu.rethymno', {
    url: '/rethymno',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/rethymno.html',
    controller: 'rethymnoCtrl'
	  }
	  }
  })
   .state('menu.historyofrethymno', {
    url: '/historyofrethymno',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/historyofrethymno.html',
    controller: 'historyofrethymnoCtrl'
	  }
	  }
  })
  .state('menu.sitia', {
    url: '/sitia',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/sitia.html',
    controller: 'sitiaCtrl'
	  }
	  }
  })
  
  .state('menu.historyofsitia', {
    url: '/historyofsitia',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/historyofsitia.html',
    controller: 'historyofsitiaCtrl'
	  }
	  }
  })
  
   .state('menu.agios', {
     url: '/agios/:lat_vill/:long_vill',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/agios.html',
    controller: 'agiosCtrl'
	  }
	  }
  })
  
 .state('menu.historyofagios', {
    url: '/historyofagios',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/historyofagios.html',
    controller: 'historyofagiosCtrl'
	  }
	  }
  })
  
  .state('menu.ieraperta', {
    url: '/ieraperta',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/ieraperta.html',
    controller: 'ierapertaCtrl'
	  }
	  }
  })
  
.state('menu.historyofieraperta', {
    url: '/historyofieraperta',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/historyofieraperta.html',
    controller: 'historyofierapertaCtrl'
	  }
	  }
  })
  
  .state('menu.heraklionsightseeing', {
    url: '/heraklionsightseeing/:ids',
    cache : false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/heraklionsightseeing.html',
    controller: 'heraklionsightseeingCtrl'
	  }
	  }
  })
  
   .state('menu.heramap', {
    url: '/heramap',
    cache:false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/heramap.html',
    controller: 'heramapCtrl'
	  }
	  }
  })


    .state('menu.sightseemap', {
    url: '/sightseemap/:lat/:long',
    cache:false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/sightseemap.html',
    controller: 'sightseemapCtrl'
	  }
	  }
  })


    .state('menu.sightseedirection', {
    url: '/sightseedirection/:lat_dir/:long_dir',
    cache:false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/sightseedirection.html',
    controller: 'sightseedirectionCtrl'
	  }
	  }
  })
    .state('menu.heramapVillage', {
    url: '/heramapVillage/:lat/:long',
    cache:false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/heramapVillage.html',
    controller: 'heramapVillageCtrl'
	  }
	  }
  })
  .state('menu.mapVillage', {
    url: '/mapVillage/:latCity/:longCity',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/mapVillage.html',
    controller: 'mapVillageCtrl'
	  }
	
        }
  })
  
  
    .state('menu.directionsVillage', {
    url: '/directionsVillage/:latCity/:longCity',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/directionsVillage.html',
    controller: 'directionsVillageCtrl'
	  }
	  }
  })
  
  .state('menu.heradirection', {
    url: '/heradirection',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/heradirection.html',
    controller: 'heradirectionCtrl'
	  }
	  }
  })
  
   .state('menu.museumheraklion', {
    url: 'museumheraklion',
    cache:false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/museumheraklion.html',
    controller: 'museumheraklionCtrl'
	  }
	  }
  })
  
  .state('menu.town', {
    url: 'town',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/town.html',
    controller: 'townCtrl'
	  }
	  }
  })
  
  
  
    .state('menu.westmap', {
    url: 'westmap',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/westmap.html',
    controller: 'westmapCtrl'
	  }
	  }
  })
   .state('menu.villages', {
    url: 'villages/:id',
     cache:false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/villages.html',
    controller: 'villagesCtrl'
	  }
	  }
  })
  
  .state('menu.beaches', {
    url: 'beaches/:id',
 
    
	  views: {
      'side-menu21': {
    templateUrl: 'templates/beaches.html',
    controller: 'beachesCtrl'
	  }
	  }
  })
    
  .state('menu.beaches1', {
    url: 'beaches1',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/beaches1.html',
    controller: 'beaches1Ctrl'
	  }
	  }
  })
  
  .state('menu.beachesbydistance', {
    url: 'beachesbydistance',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/beachesbydistance.html',
    controller: 'beachesbydistanceCtrl'
	  }
	  }
  })
 
    .state('menu.villageswest', {
    url: '/villageswest/:id',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/villageswest.html',
    controller: 'villageswestCtrl'
	  }
	  }
  })
      .state('menu.villageswestMap', {
    url: '/villageswestMap',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/villageswestMap.html',
    controller: 'villageswestMapCtrl'
	  }
	  }
  })
   .state('menu.1stnearestbeach', {
    url: '1stnearestbeach/:lat_current/:long_current',
    cache : false,
	  views: {
      'side-menu21': {
    templateUrl: 'templates/1stnearestbeach.html',
    controller: '1stnearestbeachCtrl'
	  }
	  }
  })
     .state('menu.BeachHistory', {
    url: '1stnearestbeach/:lat_crete/:long_crete',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/BeachHistory.html',
    controller: 'BeachHistoryCtrl'
	  }
	  }
  })
  
  .state('menu.landscape', {
    url: 'landscape',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/landscape.html',
    controller: 'landscapeCtrl'
	  }
	  }
  })
  
   .state('menu.tips', {
    url: 'tips',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/tips.html',
    controller: 'tipsCtrl'
	  }
	  }
  })

 .state('menu.social', {
    url: 'social',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/social.html',
    controller: 'socialCtrl'
	  }
	  }
  })
  
  .state('menu.contactus', {
    url: 'contactus',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/contactus.html',
    controller: 'contactusCtrl'
	  }
	  }
  })
  
  .state('menu.townvillage', {
    url: 'townvillage',
	  views: {
      'side-menu21': {
    templateUrl: 'templates/townvillage.html',
    controller: 'townvillageCtrl'
	  }
	  }
  })
  
  .state('menu.est', {
    url: 'est/:id/:title',
     cache:false,
       views: {
      'side-menu21': {
    templateUrl: 'templates/est.html',
    controller: 'estCtrl'
	  }
	  }
  })
   .state('menu.west', {
    url: 'west/:id',
     cache:false,
       views: {
      'side-menu21': {
    templateUrl: 'templates/west.html',
    controller: 'westCtrl'
	  }
	  }
  })


  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
  

$urlRouterProvider.otherwise('/side-menu21/home')

  

});