function clientSideHandler(err, req, res, next) {
  if (err.isBoom) {
    res.status(err.output.payload.statusCode).json(err);
  } else {
    next(err);
  }
}

function serverSideHandler(err, req, res, next) {
  console.log(err);
}

module.exports = {
  clientSideHandler,
  serverSideHandler
};
