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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const dist_1 = require("../dist");
const request = require("supertest");
const Koa = require("koa");
require("reflect-metadata");
let TestPutController = class TestPutController {
    basic() {
        return __awaiter(this, void 0, void 0, function* () {
            return new dist_1.Response()
                .status(200)
                .build();
        });
    }
};
__decorate([
    dist_1.PUT,
    dist_1.Path('/basic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestPutController.prototype, "basic", null);
TestPutController = __decorate([
    dist_1.Path('/put'),
    __metadata("design:paramtypes", [])
], TestPutController);
const app = new Koa();
const router = new dist_1.Router();
router.use(TestPutController);
app.use(router.routes());
let server;
describe('PUT test', () => {
    before(() => {
        server = app.listen(3000);
    });
    after(() => {
        server.close();
    });
    it('should succeed', function (done) {
        request(server)
            .put('/put/basic')
            .expect(200, done);
    });
});
//# sourceMappingURL=put.js.map