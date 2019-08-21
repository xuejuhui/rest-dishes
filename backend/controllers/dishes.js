"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("boom"));
var node_cache_1 = __importDefault(require("node-cache"));
var uuid_1 = __importDefault(require("uuid"));
var myCache = new node_cache_1.default();
var index_1 = __importDefault(require("../models/index"));
var awsS3_1 = __importDefault(require("../utils/awsS3"));
var image_1 = __importDefault(require("../utils/image"));
var index_2 = __importDefault(require("../utils/joiSchemas/index"));
var utils_js_1 = require("../utils/utils.js");
/* createDish Route "/userdishes"
  params :
  dishName:String
  description:String
  user_id:ObjectId From MongoDB
  image:buffer
*/
var createDish = function (req, res, next) {
    // Validate req
    index_2.default.dishSchema.validate({
        image: req.file,
        dishName: req.body.dishName,
        description: req.body.description,
        user_id: req.user._id
    }, function (err, value) { return __awaiter(_this, void 0, void 0, function () {
        var file, imageName, resizedImage, awsResponse, url, user, newDish, dishResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        return [2 /*return*/, next(boom_1.default.notFound(err.details[0].message))];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    file = req.file;
                    imageName = uuid_1.default() + "+" + file.originalname;
                    return [4 /*yield*/, image_1.default.formatImage(file.buffer, 400, 400)];
                case 2:
                    resizedImage = _a.sent();
                    return [4 /*yield*/, awsS3_1.default.uploadToS3(__assign({}, file, { imageName: imageName, buffer: resizedImage }), "dishes-photos-bucket")];
                case 3:
                    awsResponse = _a.sent();
                    return [4 /*yield*/, awsS3_1.default.getUrlFromS3(imageName, "dishes-photos-bucket")];
                case 4:
                    url = _a.sent();
                    return [4 /*yield*/, index_1.default.User.findOne({ _id: req.user._id })];
                case 5:
                    user = _a.sent();
                    newDish = new index_1.default.Dish({
                        dishName: req.body.dishName,
                        description: req.body.description,
                        user_id: req.user._id
                    });
                    newDish.image.push(imageName);
                    return [4 /*yield*/, newDish.save()];
                case 6:
                    dishResponse = _a.sent();
                    user.dishes.push(dishResponse._id);
                    return [4 /*yield*/, user.save()];
                case 7:
                    _a.sent();
                    res.json(__assign({}, dishResponse._doc, { url: [url] }));
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
};
var getUserDishes = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var userDishes, dishesPromise, dishesWithImage, error_2;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, index_1.default.User.findOne({ _id: req.user._id }, { password: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
                        .populate({ path: "dishes", match: { isDeleted: false } })
                        .exec()];
            case 1:
                userDishes = _a.sent();
                dishesPromise = userDishes.dishes.map(function (dish) { return __awaiter(_this, void 0, void 0, function () {
                    var newDish, url;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newDish = __assign({}, dish._doc, { url: [] });
                                return [4 /*yield*/, awsS3_1.default.getUrlFromS3(dish.image[0], "dishes-photos-bucket")];
                            case 1:
                                url = _a.sent();
                                newDish.url.push(url);
                                return [2 /*return*/, newDish];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(dishesPromise)];
            case 2:
                dishesWithImage = _a.sent();
                res.json(dishesWithImage);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteUserDish = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var dish, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, index_1.default.Dish.findOne({ _id: req.body.id })];
            case 1:
                dish = _a.sent();
                if (!utils_js_1.compareObjectId(dish.user_id._id, req.user._id)) return [3 /*break*/, 3];
                return [4 /*yield*/, index_1.default.Dish.updateOne({ _id: req.body.id }, {
                        $set: {
                            isDeleted: true
                        }
                    })];
            case 2:
                _a.sent();
                res.json({
                    id: dish._id,
                    message: dish.dishName + " has been deleted!"
                });
                return [3 /*break*/, 4];
            case 3: throw new Error();
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                return [2 /*return*/, next(boom_1.default.badRequest("Who are you"))];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getAllUserDishes = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var limit, offset, dishes, dishesPromise, dishesWithImage, error_4;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = Number(req.query.limit);
                offset = Number(req.query.offset);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, index_1.default.Dish.find({ isDeleted: false }, { isDeleted: 0 })
                        .populate({
                        path: "user_id",
                        select: "email"
                    })
                        .populate({
                        path: "ingredient",
                        select: ["name", "location"]
                    })
                        .skip(offset)
                        .limit(limit)
                        .sort({ date: -1 })];
            case 2:
                dishes = _a.sent();
                dishesPromise = dishes.map(function (dish) { return __awaiter(_this, void 0, void 0, function () {
                    var newDish, url, rating, averageRating;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newDish = __assign({}, dish._doc, { url: [], rating: [] });
                                return [4 /*yield*/, awsS3_1.default.getUrlFromS3(dish.image[0], "dishes-photos-bucket")];
                            case 1:
                                url = _a.sent();
                                return [4 /*yield*/, index_1.default.Rating.find({ dishId: dish._id })];
                            case 2:
                                rating = _a.sent();
                                averageRating = rating.reduce(function (acc, curr) { return curr.rating + acc; }, 0) / rating.length;
                                // newDish.rating = averageRating ? averageRating : 0;
                                newDish.rating = rating;
                                newDish.url.push(url);
                                return [2 /*return*/, newDish];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(dishesPromise)];
            case 3:
                dishesWithImage = _a.sent();
                res.json(dishesWithImage);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getDish = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var dish, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.default.Dish.findOne({ _id: req.params.id })
                        .populate({
                        path: "user_id",
                        select: "email"
                    })
                        .populate({
                        path: "ingredient",
                        select: ["name", "location"]
                    })];
            case 1:
                dish = _a.sent();
                res.json(dish);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createIngredient = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var dish, newIngredient, ingredientResponse, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, index_1.default.Dish.findOne({ _id: req.body.dishId })];
            case 1:
                dish = _a.sent();
                if (!utils_js_1.compareObjectId(dish.user_id._id, req.user._id)) return [3 /*break*/, 5];
                newIngredient = new index_1.default.Ingredient({
                    name: req.body.ingredientName,
                    location: req.body.ingredientLocation
                });
                return [4 /*yield*/, newIngredient.save()];
            case 2:
                ingredientResponse = _a.sent();
                dish.ingredient.push(ingredientResponse._id);
                return [4 /*yield*/, dish.save()];
            case 3:
                _a.sent();
                ingredientResponse.dishes.push(dish._id);
                return [4 /*yield*/, ingredientResponse.save()];
            case 4:
                ingredientResponse = _a.sent();
                res.json(__assign({}, ingredientResponse._doc, { dishId: dish._id }));
                return [3 /*break*/, 6];
            case 5: throw new Error();
            case 6: return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                return [2 /*return*/, next(boom_1.default.badRequest("Who are you"))];
            case 8: return [2 /*return*/];
        }
    });
}); };
var submitRating = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, dish, rating, newRating, ratingResponse, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, dish = _a.dish, rating = _a.rating;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newRating = new index_1.default.Rating({
                    dishId: dish._id,
                    user_id: req.user._id,
                    rating: rating
                });
                return [4 /*yield*/, newRating.save()];
            case 2:
                ratingResponse = _b.sent();
                res.json(ratingResponse);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                next(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var testing = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var checking, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.default.Dish.find({
                        ingredient: { $exists: true, $size: 0 }
                    }).lean()];
            case 1:
                checking = _a.sent();
                res.json(checking);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    createDish: createDish,
    getUserDishes: getUserDishes,
    deleteUserDish: deleteUserDish,
    getAllUserDishes: getAllUserDishes,
    getDish: getDish,
    createIngredient: createIngredient,
    submitRating: submitRating,
    testing: testing
};
