node-pardot
===========

A node.js library for the Pardot API


Basic Usage Follows this Pattern:

```javascript

var nodePardot = require('node-pardot');

var client = new nodePardot.PardotAPI({
  userKey: user_key,
  email: email,
  password: password,
  DEBUG: true
}, function() {
   // Authentication completed
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

[client.queryVisitors(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L108-L120) _currently have an email out to api@pardot.com because our visitor results are coming back empty_


[client.queryCampaigns(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L128-L140)

[client.queryOpportunities(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L147-L166)

[client.queryProspects(params, cb)](https://github.com/Datahero/node-pardot/blob/master/lib/pardot/PardotAPI_v3.js#L173-L204)


# Contributors

- [Jeff Zabel](http://github.com/jzabel)
- [Blair Anderson](http://github.com/blairanderson)

# [MIT License](https://github.com/Datahero/node-pardot/blob/master/LICENSE)
