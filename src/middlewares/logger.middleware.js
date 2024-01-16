import fs from "fs";

const fsPromise = fs.promises;
// Earlier we had used callbacks
// to asynchronously write in the
// file, here we will be using Promises

async function log(logData) {
  try {
    await fsPromise.appendFile("log.txt", logData);
  } catch (err) {
    console.log(err);
  }
}

const loggerMiddleware = (req, res, next) => {
  if (!req.url.includes("signIn")) {
    let logData = `\n${new Date().toString()} \nreq.body = ${JSON.stringify(
      req.body
    )}\nreq.url = ${req.url}`;
    log(logData);
  }

  next();
};

export default loggerMiddleware;