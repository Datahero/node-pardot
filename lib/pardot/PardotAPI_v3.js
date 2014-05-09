var http = require('http'),
    request = require('request'),
    helpers = require('./helpers');

/**
 * Pardot API wrapper for the API version 1.3. This object should not be 
 * instantiated directly but by using the version wrapper {@link PardotAPI}.
 * 
 * @param apiKey The API key to access the Pardot API with
 * @param options Configuration options
 * @return Instance of {@link PardotAPI_v1_3}
 */
function PardotAPI_v3 (apiKey, accessToken, options) {

  if (!options) {
    options = {};
  }

  this.version      = '3';
  this.apiKey       = apiKey;
  this.accessToken  = accessToken || '';
  this.packageInfo  = options.packageInfo;
  this.httpUri      = 'https://pi.pardot.com/api';
  this.responseJSON = (options.json) ? 'response=JSON' : '';
  this.userAgent    = options.userAgent+' ' || '';
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

  var finalParams = {};
  var currentParam;

  for (var i = 0; i < availableParams.length; i++) {
    currentParam = availableParams[i];
    if (typeof givenParams[currentParam] !== 'undefined')
      finalParams[currentParam] = givenParams[currentParam];
  }

  request({
    uri : this.httpUri + '/' + resource + '/' + 'version/' + this.version + '/do/' + method + "?api_key=" + this.apiKey,
    method: 'POST',
    //headers : { 'User-Agent' : this.userAgent+'node-Pardot/'+this.packageInfo.version },
    headers : { 'Authorization' : 'bearer ' + this.accessToken,
                'Content-Type' : 'application/json' },
    body : JSON.stringify(finalParams)
  }, function (error, response, body) {
    var parsedResponse;
    if (error) {
      callback(new Error('Unable to connect to the Pardot API endpoint.'));
    } else {

      try {
        parsedResponse = JSON.parse(body);
      } catch (error) {
        callback(new Error('Error parsing JSON answer from Pardot API.'));
        return;
      }

      if (parsedResponse.errmsg) {
        callback(helpers.createPardotError(parsedResponse.errmsg, parsedResponse.status));
        return;
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
PardotAPI_v3.prototype.getVisitors = function (params, callback) {
  if (typeof params === 'function') callback = params, params = {};
  this.execute('visitor', null, [
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
