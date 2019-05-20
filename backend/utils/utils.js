function compareObjectId(id1, id2) {
  console.log(id1.toString(), id2.toString());
  return id1.toString() === id2.toString();
}

module.exports = { compareObjectId };
