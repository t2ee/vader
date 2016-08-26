"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
require('source-map-support/register');
require('app-module-path/register');
const Path_1 = require('./decorators/Path');
const GET_1 = require('./decorators/GET');
const Router_1 = require('./core/Router');
const Koa = require('koa');
const Response_1 = require('./core/Response');
const Context_1 = require('./decorators/Context');
const Inject_1 = require('./decorators/Inject');
function middleware1(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('1', context['counter']);
        context['counter'] = 1;
        yield next();
        console.log('1', context['counter']);
    });
}
function middleware2(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('2', context['counter']);
        context['counter']++;
        yield next();
        console.log('2', context['counter']);
        context['counter']++;
    });
}
let Test = class Test {
    basic(context) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('in', context['counter']);
            context['counter']++;
            return new Response_1.default()
                .status(200)
                .build();
        });
    }
};
__decorate([
    GET_1.default,
    Path_1.default(''),
    __param(0, Context_1.default()), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], Test.prototype, "basic", null);
Test = __decorate([
    Inject_1.default(middleware1),
    Inject_1.default(middleware2),
    Path_1.default('/inject'), 
    __metadata('design:paramtypes', [])
], Test);
const router = new Router_1.default();
router.use(Test);
const app = new Koa();
app.use(router.routes());
app.listen(8998);
console.log('on');
//# sourceMappingURL=example.js.map