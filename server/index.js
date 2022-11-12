require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT;
const apiTarget = process.env.API_TARGET;

// development purpose only
if (process.env.NODE_ENV === 'development') app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true,
  })
);

app.listen(port, () => console.log(`Server running on port ${port}`));
