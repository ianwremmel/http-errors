'use strict';

var extendError = require('extend-error');
var HttpError = require('./http-error');

var BadRequest = extendError(HttpError, {
  subTypeName: 'BadRequest',
  code: 400
});

var Unauthorized = extendError(BadRequest, {
  subTypeName: 'Unauthorized',
  code: 401
});

var PaymentRequired = extendError(BadRequest, {
  subTypeName: 'PaymentRequired',
  code: 402
});

var Forbidden = extendError(BadRequest, {
  subTypeName: 'Forbidden',
  code: 403
});

var NotFound = extendError(BadRequest, {
  subTypeName: 'NotFound',
  code: 404
});

var MethodNotAllowed = extendError(BadRequest, {
  subTypeName: 'MethodNotAllowed',
  code: 405
});

var NotAcceptable = extendError(BadRequest, {
  subTypeName: 'NotAcceptable',
  code: 406
});

var ProxyAuthenticationRequired = extendError(BadRequest, {
  subTypeName: 'ProxyAuthenticationRequired',
  code: 407
});

var RequestTimeout = extendError(BadRequest, {
  subTypeName: 'RequestTimeout',
  code: 408
});

var Conflict = extendError(BadRequest, {
  subTypeName: 'Conflict',
  code: 409
});

var Gone = extendError(BadRequest, {
  subTypeName: 'Gone',
  code: 410
});

var LengthRequired = extendError(BadRequest, {
  subTypeName: 'LengthRequired',
  code: 411
});

var PreconditionFailed = extendError(BadRequest, {
  subTypeName: 'PreconditionFailed',
  code: 412
});

var RequestEntityTooLarge = extendError(BadRequest, {
  subTypeName: 'RequestEntityTooLarge',
  code: 413
});

var RequestUriTooLong = extendError(BadRequest, {
  subTypeName: 'RequestUriTooLong',
  code: 414
});

var UnsupportedMediaType = extendError(BadRequest, {
  subTypeName: 'UnsupportedMediaType',
  code: 415
});

var RequestRangeNotSatisfiable = extendError(BadRequest, {
  subTypeName: 'RequestRangeNotSatisfiable',
  code: 416
});

var ExpectationFailed = extendError(BadRequest, {
  subTypeName: 'ExpectationFailed',
  code: 417
});

var InternalServerError = extendError(HttpError, {
  subTypeName: 'InternalServerError',
  code: 500
});

var NotImplemented = extendError(InternalServerError, {
  subTypeName: 'NotImplemented',
  code: 501
});

var BadGateway = extendError(InternalServerError, {
  subTypeName: 'BadGateway',
  code: 502
});

var ServiceUnavailable = extendError(InternalServerError, {
  subTypeName: 'ServiceUnavailable',
  code: 503
});

var GatewayTimeout = extendError(InternalServerError, {
  subTypeName: 'GatewayTimeout',
  code: 504
});

var HttpVersionNotSupported = extendError(InternalServerError, {
  subTypeName: 'HttpVersionNotSupported',
  code: 505
});


module.exports = {
  400: BadRequest,
  401: Unauthorized,
  402: PaymentRequired,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  407: ProxyAuthenticationRequired,
  408: RequestTimeout,
  409: Conflict,
  410: Gone,
  411: LengthRequired,
  412: PreconditionFailed,
  413: RequestEntityTooLarge,
  414: RequestUriTooLong,
  415: UnsupportedMediaType,
  416: RequestRangeNotSatisfiable,
  417: ExpectationFailed,
  500: InternalServerError,
  501: NotImplemented,
  502: BadGateway,
  503: ServiceUnavailable,
  504: GatewayTimeout,
  505: HttpVersionNotSupported
};
