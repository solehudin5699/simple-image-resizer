const logger = (req, res, next) => {
  const time = new Date().toUTCString();
  console.log(
    `---------------------------------------------------------------\n${time}`,
    JSON.stringify({
      method: req.method,
      path: req.path,
      ...req.headers,
    })
  );
  next();
};

module.exports = logger;
