var http = require('http'),
    request = require('request'),
    querystring = require('querystring'),
    helpers = require('./helpers');

/**
 * Pardot API wrapper for the API version 1.3
 * This object should not beinstantiated directly but by using the version wrapper {@link PardotAPI}.
 *
 * @param apiKey The API key to access the Pardot API with
 * @param options Configuration options
 * @return Instance of {@link PardotAPI_v1_3}
 */
function PardotAPI_v3 (options, callback) {
  callback = callback || function() { };

  if (!options) {
    options = {};
  }

  this.version      = '3';
  this.apiKey       = options.apiKey;
  this.userKey      = options.userKey;
  this.packageInfo  = options.packageInfo;
  this.httpUri      = 'https://pi.pardot.com/api';
  this.format       = 'json';
  this.responseJSON = (options.json) ? 'response=JSON' : '';
  this.userAgent    = options.userAgent+' ' || '';
  this.DEBUG        = options.DEBUG || false;

  this.prospect_fields = [
    'campaign_id',
    'salutation',
    'first_name',
    'last_name',
    'email',
    'password',
    'company',
    'prospect_account_id',
    'website',
    'job_title',
    'department',
    'country',
    'address_one',
    'address_two',
    'city',
    'state',
    'territory',
    'zip',
    'phone',
    'fax',
    'source',
    'annual_revenue',
    'employees',
    'industry',
    'years_in_business',
    'comments',
    'notes',
    'score',
    'is_do_not_email',
    'is_do_not_call',
    'is_reviewed',
    'is_starred'
  ];

  var availableParams = ['email', 'password', 'user_key'];
  var givenParams = {
    email: options.email,
    password: options.password,
    user_key: this.userKey
  };

  if(!this.apiKey && options.email && options.password) {
    this.execute('login', '', availableParams, givenParams, function(error, data) {
      if (error && this.DEBUG) {console.log("error: ", JSON.stringify(error));}

      if(data && data.api_key)
      {
        this.apiKey = data.api_key;
        callback(null, this);
      }
      else
      {
        callback(new Error("Could not generate a Pardot API Key using the supplied email and password"));
      }
    }.bind(this));
  }
  else
  {
    callback(null, this);
  }
}

module.exports = PardotAPI_v3;

/**
 * Sends a given request as a JSON object to the Pardot API and finally
 * calls the given callback function with the resulting JSON object. This
 * method should not be called directly but will be used internally by all API
 * methods defined.
 *
 * @param resource Pardot API resource to call
 * @param method Pardot API method to call
 * @param availableParams Parameters available for the specified API method
 * @param givenParams Parameters to call the Pardot API with
 * @param callback Callback function to call on success
 */
PardotAPI_v3.prototype.execute = function (resource, method, availableParams, givenParams, callback) {
  if (this.DEBUG) {console.log('Initializing node-pardot in DEBUG mode');}

  var finalParams = {};
  var currentParam;
  var self = this;

  for (var i = 0; i < availableParams.length; i++) {
    currentParam = availableParams[i];
    if (typeof givenParams[currentParam] !== 'undefined')
      finalParams[currentParam] = givenParams[currentParam];
  }

  finalParams.api_key = this.apiKey;
  finalParams.user_key = this.userKey;
  finalParams.format = this.format;

  if (this.DEBUG) {console.log('params', JSON.stringify(finalParams));}

  var uri = [
  this.httpUri, '/', resource,
  '/version/', this.version,
  ( resource == "login" ? '' : '/do/'), method, '?'
  ].join('');

  uri = uri + querystring.stringify(finalParams);

  if (this.DEBUG) {console.log('uri', uri);}

  request.post(uri, function (error, response, body) {
    if (error) {
      if (self.DEBUG) {console.log("error: ", JSON.stringify(error));}
      callback(new Error('Unable to connect to the Pardot API endpoint.'));
    } else {

      var parsedResponse;

      try {
        parsedResponse = JSON.parse(body);
        if (self.DEBUG) {console.log('parsedResponse', JSON.stringify(parsedResponse));}

      } catch (e) {
        return callback(new Error('Error parsing JSON answer from Pardot API.'), null);
      }

      if (parsedResponse && parsedResponse.err) {
        return callback(helpers.createPardotError(parsedResponse), null);
      }
      callback(null, parsedResponse);
    }
  });

};



/*****************************************************************************/
/************************* Survey Related Methods **************************/
/*****************************************************************************/

/**
 * Retrieves a paged list of visitors
 *
 * @see http://developer.pardot.com/kb/api-version-3/querying-visitors
 */
PardotAPI_v3.prototype.queryVisitors = function (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('visitor', 'query', [
    'offset',
    'sort_by',
    'created_after',
    'created_before',
    'id_greater_than',
    'id_less_than',
    'updated_after',
    'updated_before',
    'only_identified',
    'prospect_ids'
  ], params, callback);
};

/**
 * Retrieves a paged list of campaigns
 *
 * this is undocumented
 */

PardotAPI_v3.prototype.queryCampaigns = function (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('campaign', 'query', [
    'offset',
    'sort_by',
    'created_after',
    'created_before',
    'id_greater_than',
    'id_less_than',
    'updated_after',
    'updated_before',
    'only_identified',
    'prospect_ids'
  ], params, callback);
};


/**
 * Creates a new campaign
 *
 * @see http://developer.pardot.com/kb/api-version-3/campaigns/
 */

PardotAPI_v3.prototype.createNewCampaign = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('campaign', 'create', ['name'], params, callback);
};


/**
 * Retrieves a paged list of opportunities
 *
 * @see http://developer.pardot.com/kb/api-version-3/querying-opportunities
 */
PardotAPI_v3.prototype.queryOpportunities = function (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('opportunity', 'query', [
    'output',
    'limit',
    'offset',
    'sort_by',
    'sort_order',
    'created_after',
    'created_before',
    'id_greater_than',
    'id_less_than',
    'probability_greater_than',
    'probability_less_than',
    'prospect_email',
    'prospect_id',
    'value_greater_than',
    'value_less_than'
  ], params, callback);
};

/**
 * Retrieves a paged list of prospects
 *
 * @see http://developer.pardot.com/kb/api-version-3/querying-prospects
 */
PardotAPI_v3.prototype.queryProspects = function (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('prospect', 'query', [
    'output',
    'fields',
    'limit',
    'offset',
    'sort_by',
    'sort_order',
    'assigned',
    'assigned_to_user',
    'created_after',
    'created_before',
    'deleted',
    'grade_equal_to',
    'grade_greater_than',
    'grade_less_than',
    'id_greater_than',
    'id_less_than',
    'is_starred',
    'last_activity_before',
    'last_activity_after',
    'last_activity_never',
    'list_id',
    'new',
    'score_equal_to',
    'score_greater_than',
    'score_less_than',
    'updated_after',
    'updated_before'
  ], params, callback);
};

PardotAPI_v3.prototype.createNewProspect = function (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('prospect', 'create/email/' + params.email, this.prospect_fields, params, callback);
};

PardotAPI_v3.prototype.updateProspect = function (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  this.execute('prospect', 'update/email/' + params.email, this.prospect_fields, params, callback);
};

PardotAPI_v3.prototype.createOrUpdateProspect = function (params, callback) {
  this.createNewProspect(params, function(err, data)
  {
    if(!err)
    {
      callback(null, data);
    }
    else
    {
      switch(err.code)
      {
        // user already exists
        case 9:
          this.updateProspect(params, callback);
          break;
        default:
          callback(err);
          break;
      }
    }
  }.bind(this));
};

PardotAPI_v3.prototype.getProspectFields = function(){
  return this.prospect_fields;
}

PardotAPI_v3.prototype.addCustomProspectFields = function(custom_fields){
  this.prospect_fields = this.prospect_fields.concat(custom_fields);
}