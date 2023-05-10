import http from "http";
import express from "express";
import config from "./oas-tools.config.js"
import { initialize, use } from "@oas-tools/core";
import { SLARateLimit } from "@oas-tools/sla-rate-limit";

const serverPort = 8080;
const app = express();
app.use(express.json({limit: '50mb'}));

use(SLARateLimit, {
    slaFile: "api/plans.yaml",
    scheme: "BearerAuth"
}, 2);

use((_, res, next)=> {
    res.setHeader("Content-Type","application/json");
    next();
}, {}, 0);

initialize(app, config).then(() => {
    http.createServer(app).listen(serverPort, () => {
    console.log("\nApp running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (!config.middleware.swagger.disable) {
        console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
        console.log("________________________________________________________________");
    }
    });
});
