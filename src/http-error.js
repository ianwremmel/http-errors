'use strict';

var extendError = require('extend-error');
var pick = require('lodash.pick');
var values = require('lodash.values');

var HttpError = extendError({
  parseFn: function parseFn(res) {
    var body = res.body;
    var message;
    switch (typeof body) {
      case 'string':
        try {
          body = JSON.parse(body);
          message = parseObject(body) || this.defaultMessage;
        }
        catch (error) {
          message = body;
        }
        break;
      case 'object':
        message = parseObject(body);
        break;
      default:
        message = this.defaultMessage;
    }

    this.res = res;

    return message;
  },
  properties: {
    defaultMessage: 'An error was received while trying to fulfill the request'
  },
  subTypeName: 'HttpError'
});

function parseObject(body) {
  // Search body for common names of error strings
  var messages = values(pick(body, 'message', 'error', 'errorString', 'response', 'errorResponse', 'msg'));

  // If no error candidate was found, stringify the entire body
  if (messages.length === 0) {
    return JSON.stringify(body);
  }

  // Assume the first key found was the error explanation
  var message = messages[0];

  // If the explanation is an object, recurse and try again
  if (typeof message === 'object') {
    return parseObject(message);
  }

  // Return the first key
  return message;
}

module.exports = HttpError;
