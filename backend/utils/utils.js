"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
function toMongoID(id) {
    return mongoose_1.default.Types.ObjectId(id);
}
exports.toMongoID = toMongoID;
function compareObjectId(id1, id2) {
    return id1.toString() === id2.toString();
}
exports.compareObjectId = compareObjectId;
// input array of obj
// convert array of obj to obj of objs with mongo id as key
function arrayOfObjToObjOfObj(arrayOfObj) {
    return arrayOfObj.reduce(function (acc, cur) {
        acc[cur._id] = cur;
        return acc;
    }, {});
}
exports.arrayOfObjToObjOfObj = arrayOfObjToObjOfObj;
