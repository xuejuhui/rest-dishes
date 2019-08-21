var mongoose = require("mongoose");

function toMongoID(id) {
  return mongoose.Types.ObjectId(id);
}

function compareObjectId(id1, id2) {
  return id1.toString() === id2.toString();
}
// input array of obj
//convert array of obj to obj of objs with mongo id as key
function arrayOfObjToObjOfObj(arrayOfObj) {
  arrayOfObj.reduce((acc, cur) => {
    acc[cur._id] = cur;
    return acc;
  }, {});
}

module.exports = { compareObjectId, arrayOfObjToObjOfObj, toMongoID };
