"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _jwksRsa = _interopRequireDefault(require("jwks-rsa"));

var _authUserState = _interopRequireDefault(require("./middlewares/authUserState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json()); //settings

const port = 4304;
app.set("port", port); //middlewares

app.use((0, _morgan.default)('dev'));
app.use(_express.default.urlencoded({
  extended: false
})); //this middleware is very important, because it is the checker of the jwt

const jwtCheck = (0, _expressJwt.default)({
  secret: _jwksRsa.default.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    //In this url are the valid tokesm that audeince have created
    jwksUri: 'https://dev-w8mlenzq.us.auth0.com/.well-known/jwks.json'
  }),
  //audience is the API endpoint that gives Auth0 and return tokens
  audience: 'https://authtokenthunder/',
  //This is the url where is used the service of Google, etc
  issuer: 'https://dev-w8mlenzq.us.auth0.com/',
  algorithms: ['RS256']
}); //this is used for rquest info from a server to each other

app.use((0, _cors.default)()); //this is very important because here check the validation of the token

app.use(jwtCheck); //this middleware must be before the routes, because the routes send info  

app.use(_authUserState.default); //routes

app.use('/api/v1/products', require('./routes/products/products').default);
app.use('/api/v1/users', require('./routes/users/users').default);
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map