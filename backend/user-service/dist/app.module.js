"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dec, _class;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var _require = require('@nestjs/common'),
  Module = _require.Module;
var _require2 = require('@nestjs/mongoose'),
  MongooseModule = _require2.MongooseModule;
var _require3 = require('@nestjs/jwt'),
  JwtModule = _require3.JwtModule;
var _require4 = require('./user/user.module'),
  UserModule = _require4.UserModule;
var AppModule = (_dec = Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), JwtModule.register({
    secret: process.env.JWT_SECRET || 'secret_key_change_in_production',
    signOptions: {
      expiresIn: '24h'
    }
  }), UserModule]
}), _dec(_class = /*#__PURE__*/_createClass(function AppModule() {
  _classCallCheck(this, AppModule);
})) || _class);
module.exports = {
  AppModule: AppModule
};