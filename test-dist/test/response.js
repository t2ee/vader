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
const tsRouter = require('../src');
const request = require('supertest');
const Koa = require('koa');
let cookie = new tsRouter.Cookie();
let date = new Date();
let newDate = new Date(date.getTime() + 30 * 1000);
let TestController = class TestController extends tsRouter.Controller {
    index(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            cookie.expires = date;
            cookie.maxAge = 30;
            return tsRouter.Response
                .status(200)
                .header('x-hello', 'world')
                .type(tsRouter.MediaType.TEXT)
                .allow(tsRouter.HttpMethod.GET, tsRouter.HttpMethod.POST, tsRouter.HttpMethod.PUT, tsRouter.HttpMethod.DELETE)
                .charset('utf-8')
                .expires(date)
                .body(ctx.method)
                .lastModified(date)
                .cookie(cookie)
                .build();
        });
    }
};
__decorate([
    tsRouter.AppContext, 
    __metadata('design:type', Object)
], TestController.prototype, "context", void 0);
__decorate([
    tsRouter.HttpContext, 
    __metadata('design:type', Object)
], TestController.prototype, "ctx", void 0);
__decorate([
    tsRouter.Path(''),
    tsRouter.GET,
    __param(0, tsRouter.HttpContext), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], TestController.prototype, "index", null);
TestController = __decorate([
    tsRouter.Path('/test'), 
    __metadata('design:paramtypes', [])
], TestController);
const app = new Koa();
const router = new tsRouter.Router();
router.use(TestController);
app.use(router.routes());
let server;
describe('GET plain text', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('response with all response features ', function (done) {
        request(server)
            .get('/test')
            .expect('x-hello', 'world')
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect('Allow', 'GET,POST,PUT,DELETE')
            .expect('Cache-Control', date.toUTCString())
            .expect('Last-Modified', date.toUTCString())
            .expect('Set-Cookie', `; Path=/; Expires=${newDate.toUTCString()}; Secure; HttpOnly`)
            .expect('GET')
            .expect(200, done);
    });
});
//# sourceMappingURL=response.js.map