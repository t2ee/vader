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
const { GET, Path, QueryParam, PathParam, HeaderParam, } = vader.decorators;
const { Response, Router, } = vader.core;
let TestGetController = class TestGetController {
    basic() {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(Object.keys(this.queryParam).length, 0);
            chai.assert.equal(Object.keys(this.pathParam).length, 0);
            return new Response()
                .status(200)
                .entity('hello world')
                .build();
        });
    }
    query(query, echo) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(query.echo, 'hello world');
            chai.assert.equal(echo, 'hello world');
            chai.assert.equal(this.queryParam.echo, 'hello world');
            chai.assert.equal(this.queryEcho, 'hello world');
            return new Response()
                .status(200)
                .entity(echo)
                .build();
        });
    }
    path(path, echo) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(path.echo, 'hello%20world');
            chai.assert.equal(echo, 'hello%20world');
            chai.assert.equal(this.pathParam.echo, 'hello%20world');
            chai.assert.equal(this.pathEcho, 'hello%20world');
            return new Response()
                .status(200)
                .entity(echo)
                .build();
        });
    }
    header(header, echo) {
        return __awaiter(this, void 0, void 0, function* () {
            chai.assert.equal(header.echo, 'hello world');
            chai.assert.equal(echo, 'hello world');
            chai.assert.equal(this.headerParam.echo, 'hello world');
            chai.assert.equal(this.headerEcho, 'hello world');
            return new Response()
                .status(200)
                .entity(echo)
                .build();
        });
    }
    json() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Response()
                .status(200)
                .set('Content-Type', 'application/json')
                .entity(JSON.stringify({
                message: 'hello world',
            }))
                .build();
        });
    }
};
__decorate([
    QueryParam(), 
    __metadata('design:type', Object)
], TestGetController.prototype, "queryParam", void 0);
__decorate([
    QueryParam('echo'), 
    __metadata('design:type', String)
], TestGetController.prototype, "queryEcho", void 0);
__decorate([
    PathParam(), 
    __metadata('design:type', Object)
], TestGetController.prototype, "pathParam", void 0);
__decorate([
    PathParam('echo'), 
    __metadata('design:type', String)
], TestGetController.prototype, "pathEcho", void 0);
__decorate([
    HeaderParam(), 
    __metadata('design:type', Object)
], TestGetController.prototype, "headerParam", void 0);
__decorate([
    HeaderParam('echo'), 
    __metadata('design:type', String)
], TestGetController.prototype, "headerEcho", void 0);
__decorate([
    GET,
    Path('/basic'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], TestGetController.prototype, "basic", null);
__decorate([
    GET,
    Path('/query'),
    __param(0, QueryParam()),
    __param(1, QueryParam('echo')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, Object]), 
    __metadata('design:returntype', Promise)
], TestGetController.prototype, "query", null);
__decorate([
    GET,
    Path('/path/:echo'),
    __param(0, PathParam()),
    __param(1, PathParam('echo')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, Object]), 
    __metadata('design:returntype', Promise)
], TestGetController.prototype, "path", null);
__decorate([
    GET,
    Path('/header'),
    __param(0, HeaderParam()),
    __param(1, HeaderParam('echo')), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, Object]), 
    __metadata('design:returntype', Promise)
], TestGetController.prototype, "header", null);
__decorate([
    GET,
    Path('/json'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], TestGetController.prototype, "json", null);
TestGetController = __decorate([
    Path('/get'), 
    __metadata('design:paramtypes', [])
], TestGetController);
const app = new Koa();
const router = new Router();
router.use(TestGetController);
app.use(router.routes());
let server;
describe('GET test', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should echo string', function (done) {
        request(server)
            .get('/get/basic')
            .expect('hello world')
            .expect(200, done);
    });
    it('should echo back string in query', function (done) {
        request(server)
            .get('/get/query?echo=hello world')
            .expect('hello world')
            .expect(200, done);
    });
    it('should echo back string in path', function (done) {
        request(server)
            .get('/get/path/hello world')
            .expect('hello%20world')
            .expect(200, done);
    });
    it('should echo back string in header', function (done) {
        request(server)
            .get('/get/header')
            .set('echo', 'hello world')
            .expect('hello world')
            .expect(200, done);
    });
    it('should receive json', function (done) {
        request(server)
            .get('/get/json')
            .expect({
            message: 'hello world',
        })
            .expect(200, done);
    });
});
//# sourceMappingURL=get.js.map