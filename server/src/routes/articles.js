"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const article_1 = __importDefault(require("../models/article"));
const checkAuth_1 = require("../middleware/checkAuth");
const stripe_1 = require("../utils/stripe");
const router = express_1.default.Router();
router.get("/", checkAuth_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.user });
    const subscriptions = yield stripe_1.stripe.subscriptions.list({
        customer: user === null || user === void 0 ? void 0 : user.stripeCustomerId,
        status: "all",
        expand: ["data.default_payment_method"],
    }, {
        apiKey: process.env.STRIPE_SECRET_KEY,
    });
    if (!subscriptions.data.length)
        return res.json([]);
    //@ts-ignore
    const plan = subscriptions.data[0].plan.nickname;
    if (plan === "Basic") {
        const articles = yield article_1.default.find({ access: "Basic" });
        return res.json(articles);
    }
    else if (plan === "Standard") {
        const articles = yield article_1.default.find({
            access: { $in: ["Basic", "Standard"] },
        });
        return res.json(articles);
    }
    else if (plan === "Premium") {
        const articles = yield article_1.default.find({});
        return res.json(articles);
    }
    res.json(plan);
}));
exports.default = router;
