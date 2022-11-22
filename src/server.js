"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5001;
app.use(express_1.default.static(path_1.default.join(__dirname, "../Client/build")));
app.get("*", function (_, res) {
    res.sendFile(path_1.default.join(__dirname, "../Client/build/index.html"), function (err) {
        res.status(500).send(err);
    });
});
app.get('/api', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=server.js.map