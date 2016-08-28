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
const vader = require('../src');
const chai = require('chai');
const request = require('supertest');
const Koa = require('koa');
const { GET, Path, Use, Context, } = vader.decorators;
const { VaderContext, Response, Router, } = vader.core;
let counter = 0;
function middleware1(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        chai.assert.isOk(context['counter'] === undefined);
        context['counter'] = 1;
        yield next();
        chai.assert.isOk(context['counter'] === 8);
        counter = context['counter'];
    });
}
function middleware2(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        chai.assert.isOk(context['counter'] === 1);
        context['counter']++;
        yield next();
        chai.assert.isOk(context['counter'] === 7);
        context['counter']++;
    });
}
function middleware3(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        chai.assert.isOk(context['counter'] === 2);
        context['counter']++;
        yield next();
        chai.assert.isOk(context['counter'] === 6);
        context['counter']++;
    });
}
function middleware4(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        chai.assert.isOk(context['counter'] === 3);
        context['counter']++;
        yield next();
        chai.assert.isOk(context['counter'] === 5);
        context['counter']++;
    });
}
let TestController = class TestController {
    basic(context) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.isOk(context['counter'] === 4);
            context['counter']++;
            return new Response()
                .status(200)
                .build();
        });
    }
};
__decorate([
    GET,
    Path(''),
    Use(middleware3),
    Use(middleware4),
    __param(0, Context()), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], TestController.prototype, "basic", null);
TestController = __decorate([
    Use(middleware1),
    Use(middleware2),
    Path('/inject'), 
    __metadata('design:paramtypes', [])
], TestController);
const app = new Koa();
const router = new Router();
router.use(TestController);
app.use(router.routes());
let server;
describe('@Inject test', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should succeed', function (done) {
        request(server)
            .get('/inject')
            .expect(200, () => {
            chai.assert.isOk(counter === 8);
            done();
        });
    });
});
//# sourceMappingURL=use.js.map