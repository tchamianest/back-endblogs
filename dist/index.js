"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./models/router"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./jwt/authe");
///BODY PARSER
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/user", passport_1.default.authenticate("jwt", { session: false }), router_1.default);
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});
////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose_1.default
    .connect("mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    app.use(express_1.default.json());
    passport_1.default.initialize();
    app.use("/api", router_1.default);
    app.listen(PORT, () => {
        console.log("welcome");
    });
})
    .catch((error) => {
    console.error(error.message);
});
mongoose_1.default.Promise = global.Promise;
