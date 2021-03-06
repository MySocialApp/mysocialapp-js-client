"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../models/account");
const rest_1 = require("./rest");
class RestRegister extends rest_1.Rest {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.conf.post(new account_1.Account(), "/register", user);
        });
    }
}
exports.RestRegister = RestRegister;
