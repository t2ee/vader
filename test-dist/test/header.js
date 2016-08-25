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
let TestController = class TestController extends tsRouter.Controller {
    index(headers, v1, v2) {
        return __awaiter(this, void 0, void 0, function* () {
            return tsRouter.Response.status(200).body({
                v1: headers['v1'] + v1,
                v2: headers['v2'] + v2
            }).build();
        });
    }
    index2() {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = this.headers;
            let v1 = this.v1;
            let v2 = this.v2;
            return tsRouter.Response.status(200).body({
                v1: headers['v1'] + v1,
                v2: headers['v2'] + v2
            }).build();
        });
    }
};
__decorate([
    tsRouter.Path(''),
    tsRouter.GET,
    tsRouter.Produce(tsRouter.MediaType.JSON),
    __param(0, tsRouter.Headers),
    __param(1, tsRouter.HeaderParam('v1')),
    __param(2, tsRouter.HeaderParam('v2')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, String, String]), 
    __metadata('design:returntype', Promise)
], TestController.prototype, "index", null);
__decorate([
    tsRouter.Headers, 
    __metadata('design:type', Object)
], TestController.prototype, "headers", void 0);
__decorate([
    tsRouter.HeaderParam('v1'), 
    __metadata('design:type', String)
], TestController.prototype, "v1", void 0);
__decorate([
    tsRouter.HeaderParam('v2'), 
    __metadata('design:type', String)
], TestController.prototype, "v2", void 0);
__decorate([
    tsRouter.Path('/2'),
    tsRouter.GET,
    tsRouter.Produce(tsRouter.MediaType.JSON), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], TestController.prototype, "index2", null);
TestController = __decorate([
    tsRouter.Path('/test'), 
    __metadata('design:paramtypes', [])
], TestController);
const app = new Koa();
const router = new tsRouter.Router();
router.use(TestController);
app.use(router.routes());
let server;
describe('GET with headers', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should respond headers back in json', function (done) {
        request(server)
            .get('/test')
            .set('v1', 'hello')
            .set('v2', 'world')
            .expect('Content-Type', 'application/json')
            .expect({
            v1: 'hellohello',
            v2: 'worldworld'
        })
            .expect(200, done);
    });
    it('should route to correct subroute and respondheaders back in json', function (done) {
        request(server)
            .get('/test/2')
            .set('v1', 'hello')
            .set('v2', 'world')
            .expect('Content-Type', 'application/json')
            .expect({
            v1: 'hellohello',
            v2: 'worldworld'
        })
            .expect(200, done);
    });
});
//# sourceMappingURL=header.js.map