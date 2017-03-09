node-pardot
===========

A node.js library for the Pardot API

Availability to create a client by using email / password and a user key.

Alternatively, you can also create using just an apiKey.


Basic Usage Follows this Pattern:

```javascript

var nodePardot = require('node-pardot');

// Create client using email, password and user_key
nodePardot.PardotAPI({
  userKey: user_key,
  email: email,
  password: password,
  DEBUG: true
}, function(err, client) {
   // Authentication completed
   
});

// Alternative using Only API Key
nodePardot.PardotAPI({
  apiKey: api_key
}, function(err, client) {
  // Authentication complete
});


client.queryProspects(function (error, data){
  if(error) {
    console.log('Error while querying prospects');
  } else {
    console.log(JSON.stringify(data));
  }
});

```

###Current Available Functions for v3 API

_View code for available params. Pardot may or may not keep their params up to date._

[client.queryVisitors(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L138-L156) _currently have an email out to api@pardot.com because our visitor results are coming back empty_


[client.queryCampaigns(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L164-L182)

[client.createNewCampaign(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L191-L198)

[client.queryOpportunities(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L206-L229)

[client.queryProspects(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L236-L271)

[client.createNewProspects(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L273-L277)

[client.updateProspect(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L282-L289)

[client.createOrUpdateProspect(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L291-L347)


# Contributors

- [Jeff Zabel](http://github.com/jzabel)
- [Blair Anderson](http://github.com/blairanderson)
- [Wyatt Benno](http://github.com/wyattbenno777)

# [MIT License](https://github.com/Datahero/node-pardot/blob/master/LICENSE)
