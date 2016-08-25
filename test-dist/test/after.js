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
    index(params, v1, v2) {
        return __awaiter(this, void 0, void 0, function* () {
            return tsRouter.Response.status(200).body({ v1, v2, params }).build();
        });
    }
    after(params, v1, v2, context, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.body = JSON.stringify({ v1, v2, params, v3: v1 + v2 });
            res.send(context);
        });
    }
};
__decorate([
    tsRouter.Path('/:v1/:v2'),
    tsRouter.GET,
    tsRouter.Produce(tsRouter.MediaType.JSON),
    __param(0, tsRouter.Params),
    __param(1, tsRouter.PathParam('v1')),
    __param(2, tsRouter.PathParam('v2')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, String, String]), 
    __metadata('design:returntype', Promise)
], TestController.prototype, "index", null);
__decorate([
    tsRouter.After,
    __param(0, tsRouter.Params),
    __param(1, tsRouter.PathParam('v1')),
    __param(2, tsRouter.PathParam('v2')),
    __param(3, tsRouter.AppContext),
    __param(4, tsRouter.RouteResponse), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, String, String, Object, tsRouter.Response]), 
    __metadata('design:returntype', Promise)
], TestController.prototype, "after", null);
TestController = __decorate([
    tsRouter.Path('/test'), 
    __metadata('design:paramtypes', [])
], TestController);
const app = new Koa();
const router = new tsRouter.Router();
router.use(TestController);
app.use(router.routes());
let server;
describe('GET with path paramters with afterwares', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should respond paramters in back in json', function (done) {
        request(server)
            .get('/test/hello/world')
            .expect('Content-Type', 'application/json')
            .expect({
            params: {
                v1: 'hello',
                v2: 'world'
            },
            v1: 'hello',
            v2: 'world',
            v3: 'helloworld'
        })
            .expect(200, done);
    });
});
//# sourceMappingURL=after.js.map