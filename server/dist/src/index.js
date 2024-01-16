"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const subs_1 = __importDefault(require("./routes/subs"));
const articles_1 = __importDefault(require("./routes/articles"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 8080;
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to DB!");
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: ["https://subscription-app-eight.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true,
    }));
    // Define your routes
    app.use("/auth", auth_1.default);
    app.use("/subs", subs_1.default);
    app.use("/articles", articles_1.default);
    // Default route
    app.get("/", (req, res) => {
        res.json("Hello");
    });
    app.listen(port, () => {
        console.log(`Now listening to port ${port}`);
    });
})
    .catch((error) => {
    console.log({ error });
    throw new Error(error);
});
exports.default = app;
//# sourceMappingURL=index.js.map