import mongoose from "mongoose";

function toMongoID(id: string): object {
  return mongoose.Types.ObjectId(id);
}

function compareObjectId(id1: any, id2: any): boolean {
  return id1.toString() === id2.toString();
}

// input array of obj
// convert array of obj to obj of objs with mongo id as key
function arrayOfObjToObjOfObj(arrayOfObj: any): any {
  return arrayOfObj.reduce((acc: any, cur: any): {} => {
    acc[cur._id] = cur;
    return acc;
  }, {});
}

export { compareObjectId, arrayOfObjToObjOfObj, toMongoID };
