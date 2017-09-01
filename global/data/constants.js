SERVER = {
  // Url for the REST services
  url: 'https://api.artimo.com.co/Historical/',
  // Url for the REST services
  internal: 'http://10.0.33.110:8001/',
  // Url for the REST services
  external: 'https://api.artimo.com.co/',
  // Test Url for REST services
  test: 'http://192.168.12.145:58443/',
  // URL for the mocked REST services
  mockUrl: 'http://localhost:4000/',
  // Determines if is mock server (to replace parameters accordingly and store
  // original called url)
  isMock : false,
  // Determine if services go to public url or internal url
  isInternal : true,
  // Gets the base url based on isInternal
  getUrl: function() {
    return this.isInternal ? this.internal : this.url;
  }
};

OPERATION = {
  // Minimum snapshot difference in milliseconds
  minSnapshotDifference : 1000,
  // Maximum records from CDA services
  // (after this limit, it generates an external file)
  cdaMaximumRecords : 500,
  // Map maximum objects per section
  mapMaximumObjects : 800,
  // Minimum zoom when centering map
  mapMinimumCenteredZoom : 10,
  // Maximum vehicles to get in autocomplete
  maxAutocompleteVehicles : 100,
  // Maximum driver to get in autocomplete
  maxAutocompleteDrivers : 100,
  // Determine if using google maps for work
  googleMapsForWork : true,
  // Google maps key
  googleMapsKey : 'AIzaSyBLGEEPdhRIcFcQSL4qZC_2m024ka1mNg0',
  // Google maps client
  googleMapsClient : 'gme-logisticadeadministracion',
  // Google maps cryptographic key
  googleMapsCryptoKey : '9pVl4u6PIVM55RPYFvL3ba7AiTU=',
  // Historic data timeout
  historicTimeout : 3000000,
  // Maximum records to retrieve in initial loads
  maximumRecordsInMethods : 1000,
  // Maximum time (in ticks) to ignore date in charts
  maximumTimeForTimeOnly : 86400000,
  // Maximum length of audit log item id
  maximumAuditItemIdLength : 150,
  // Maximum points in snap to map service
  maxPointsToSnap : 100,
  // Maximum URL length
  maximumUrlLength : 2000,
  // Interpolate snap to roads?
  interpolateRoads : 'true',
  // Minimum distance (m) between points to render in map
  minimumDistanceBetweenPoints : 20,
  // Restricted geofence types for limited roles
  restrictedGeofencesTypes : [1, 2, 3, 4, 5, 6, 7, 8],
}

DISTRIBUTION = {
  defaultCircleRadius : 50,
  defaultZoomForCircles : 15,
  defaultMapCenterLat : 4.7,
  defaultMapCenterLng : -74.11,
  defaultMapZoom : 8,
  maxAutocompleteItems : 10,
  defaultExpectedAttentionTime : 1,
  defaultExpectedAttentionTime : 1,
}

DEBUG = {
  traceLevel : 0,
  errorRepository : 0
}

SESSION = {
  maximumServerHeartbeatDelta : 600000
}

DOCUMENTS = {
  maximumDriverImageSize : 1000000,
  maximumDocumentsSize : 2000000
}

REPORTS = {
  // Main URL for pentaho reports
  baseUrl : 'https://bi.artimo.com.co/bi/api/repos/',
  // pentaho username
  userName : 'report',
  // pentaho password
  password : 'R3p0rt@',
  // accepted-page
  acceptedPage : '0',
  // renderMode
  renderMode : 'REPORT',
  // htmlProportionalWidth
  htmlProportionalWidth : 'false',
  // showParameters
  showParameters : 'false'
}

URLS = {
  otrs : 'http://support.artimo.com.co/',
  otrsAuto : 'http://support.artimo.com.co/otrs/index.pl?Action=Login&User=##OTRSUSER##&Password=##OTRSPASSWORD##'
}

DEFAULTS = {
  ONHANDCONFIGURATION : {
    login_MaxAttempts : 3,
    login_LockTime : 30,
    login_MaxIdleTime : 30,
    schedule_UserPositionInterval : 60,
    extended_StatusInterval : 40,
    extended_UpdateInterval : 300,
    extended_ValidPositionTime : 300,
    extended_TimeBetweenPositions : 20,
    extended_ValidationNotificationsInterval : 30
  }
}

if (Meteor.isServer) {
  CDACONFIG = {
    // Base URL and path for CDA services
    //url : 'http://bi.equitel.com.co/pentaho/plugin/cda/api/doQuery',
    //url : 'http://10.0.33.110:8001',
    url : 'https://api.artimo.com.co/Historical/historicalreports',
    //path : '/public/artimocda.cda',
    path : 'home/artimo/Main CDA/ArtimoCDA.cda',
    // Determines if is mock server (to replace parameters accordingly and store
    // original called url)
    user : 'artimo',
    password : '4rt1m0'
  };
  DASHBOARDCONFIG = {
    baseUrl : 'https://bi.artimo.com.co/bi/',
    extraUrl : 'api/repos/%3Ahome%3Aadmin%3AReports%3A',
    user : 'admin',
    password : '39u173L81'
  };
  AWSCREDENTIALS = {
    file : '/aws/awscredentials'
  }
}

LOGLEVEL = {
  restCalls : false,
  auditLogs : false,
  historicData : true,
  cda : false,
  mockHistoric : false,
}
