const customHeader = (req, res, next) => {
  try {
    // console.log(req.headers);
    const apiKey = req.headers.api_key;
    if (apiKey === "alex-01") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Invalid api key" });
    }
  } catch (err) {
    res.status(403);
    res.send({ error: "Something went wrong..." });
  }
};

module.exports = customHeader;
