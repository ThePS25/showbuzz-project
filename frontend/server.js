/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");
// const httpProxy = require("http-proxy");
// require("dotenv").config();

const app = express();
// const apiProxy = httpProxy.createProxyServer();
const port = 3000;

app.use(
  "/",
  expressStaticGzip("build", {
      enableBrotli: true,
      customCompressions: [
          {
              encodingName: "deflate",
              fileExtension: "zz",
          },
      ],
      orderPreference: ["br"],
  })
);
//  app.use("/", express.static("build"));

// app.all(
//   `${process.env.REACT_APP_AUTH_SERVICE_COMMON_ENDPOINT}*`,
//   (req, res) => {
//     apiProxy.web(req, res, {
//       target: process.env.REACT_APP_AUTH_SERVICE_BASE_URL,
//       secure: false,
//       pathRewrite: { [process.env.REACT_APP_AUTH_SERVICE_COMMON_ENDPOINT]: "/api" },
//     });
//   }
// );

// app.all(`${process.env.REACT_APP_JOB_SERVICE_COMMON_ENDPOINT}*`, (req, res) => {
//   apiProxy.web(req, res, {
//     target: process.env.REACT_APP_JOB_SERVICE_BASE_URL,
//     secure: false,
//     pathRewrite: { [process.env.REACT_APP_JOB_SERVICE_COMMON_ENDPOINT]: "/api" },
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running on port: ${port}`);
});
