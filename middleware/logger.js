// Logger Middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  if (url === "/favicon.ico") {
    return next();
  }
  const time = new Date().getFullYear();
  console.log(method, url, "time: " + time);
  next();
};

module.exports = logger;
