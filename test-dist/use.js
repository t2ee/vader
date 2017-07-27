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
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
const chai = require("chai");
const request = require("supertest");
const Koa = require("koa");
require("reflect-metadata");
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
        context.http.set('X-Custom', 'hello');
    });
}
let TestController = class TestController {
    basic(context) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.isOk(context['counter'] === 4);
            context['counter']++;
            return new dist_1.Response()
                .status(200)
                .build();
        });
    }
};
__decorate([
    dist_1.GET,
    dist_1.Path(''),
    dist_1.Use(middleware3),
    dist_1.Use(middleware4),
    __param(0, dist_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dist_1.VaderContext]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "basic", null);
TestController = __decorate([
    dist_1.Use(middleware1),
    dist_1.Use(middleware2),
    dist_1.Path('/inject')
], TestController);
const app = new Koa();
const router = new dist_1.Router();
router.use(TestController);
app.use(router.routes());
let server;
describe('@Use test', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should succeed', function (done) {
        request(server)
            .get('/inject')
            .expect(200)
            .end((err, res) => {
            if (err)
                throw err;
            chai.assert.isOk(res.header['x-custom'] === 'hello');
            chai.assert.isOk(counter === 8);
            done();
        });
    });
});
//# sourceMappingURL=use.js.map