"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var UserFunction = /** @class */ (function () {
    function UserFunction(user) {
        this.user = user;
        this.GenerateSalt();
    }
    ;
    UserFunction.prototype.GenerateSalt = function () {
        var bytesalt;
        var hexsalt;
        bytesalt = crypto.randomBytes(32); //generate a 32 random Bytes
        hexsalt = bytesalt.toString(16); //transform the 32 random bytes in HEX format
        this.user.salt = hexsalt;
        this.GenerateHash();
    };
    UserFunction.prototype.GenerateHash = function () {
        var hmac = crypto.createHmac('sha256', this.user.salt).update(this.user.password).digest("hex");
        this.user.hash = hmac;
        delete this.user.password;
    };
    return UserFunction;
}());
//interface LoginUser
