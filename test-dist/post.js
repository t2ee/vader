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
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const dist_1 = require("../dist");
const chai = require("chai");
const request = require("supertest");
const Koa = require("koa");
let TestPostController = class TestPostController {
    json(body, message) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(this.body.message, 'hello world');
            chai.assert.equal(body.message, 'hello world');
            chai.assert.equal(message, 'hello world');
            return new dist_1.Response()
                .status(200)
                .build();
        });
    }
    form(body) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(this.body.message, 'hello world');
            chai.assert.equal(body.message, 'hello world');
            return new dist_1.Response()
                .status(200)
                .build();
        });
    }
    text(body) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(this.body, 'hello world');
            chai.assert.equal(body, 'hello world');
            return new dist_1.Response()
                .status(200)
                .build();
        });
    }
    multi(body) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(this.body.message, 'hello');
            chai.assert.equal(body.message, 'hello');
            chai.assert.equal(this.body.message2, 'world');
            chai.assert.equal(body.message2, 'world');
            return new dist_1.Response()
                .status(200)
                .build();
        });
    }
};
__decorate([
    dist_1.BodyParam(),
    __metadata("design:type", Object)
], TestPostController.prototype, "body", void 0);
__decorate([
    dist_1.POST,
    dist_1.Consume(dist_1.MediaType.JSON),
    dist_1.Path('/json'),
    __param(0, dist_1.BodyParam()),
    __param(1, dist_1.BodyParam('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestPostController.prototype, "json", null);
__decorate([
    dist_1.POST,
    dist_1.Consume(dist_1.MediaType.FORM),
    dist_1.Path('/form'),
    __param(0, dist_1.BodyParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestPostController.prototype, "form", null);
__decorate([
    dist_1.POST,
    dist_1.Consume(dist_1.MediaType.TEXT),
    dist_1.Path('/text'),
    __param(0, dist_1.BodyParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestPostController.prototype, "text", null);
__decorate([
    dist_1.POST,
    dist_1.Consume(dist_1.MediaType.MULTIPART),
    dist_1.Path('/multi'),
    __param(0, dist_1.BodyParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestPostController.prototype, "multi", null);
TestPostController = __decorate([
    dist_1.Path('/post'),
    __metadata("design:paramtypes", [])
], TestPostController);
const app = new Koa();
const router = new dist_1.Router();
router.use(TestPostController);
app.use(router.routes());
let server;
describe('POST test', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should receive json', function (done) {
        request(server)
            .post('/post/json')
            .type('json')
            .send({
            message: 'hello world',
        })
            .expect(200, done);
    });
    it('should receive form', function (done) {
        request(server)
            .post('/post/form')
            .type('form')
            .send({
            message: 'hello world',
        })
            .expect(200, done);
    });
    it('should receive text', function (done) {
        request(server)
            .post('/post/text')
            .type('text')
            .send('hello world')
            .expect(200, done);
    });
    it('should receive multi form', function (done) {
        request(server)
            .post('/post/multi')
            .field('message', 'hello')
            .field('message2', 'world')
            .expect(200, done);
    });
});
//# sourceMappingURL=post.js.map