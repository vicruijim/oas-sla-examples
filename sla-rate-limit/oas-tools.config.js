import { bearerJwt } from "@oas-tools/auth/handlers"
import { logger } from "@oas-tools/commons";

if (!process.env.JWT_ISSUER || !process.env.JWT_SECRET) {
    logger.error("JWT_ISSUER and JWT_SECRET environment variables must be set");
    process.exit(1);
}

export default {
    packageJSON: "package.json",
    oasFile: "api/oas-doc.yaml",
    useAnnotations: false,
    logger: {
        customLogger: null,
        level: "info",
        logFile: false,
        logFilePath: "./logs/oas-tools.log"
    },
    middleware: { 
        router: { disable: false, controllers: "./controllers" },
        validator: { requestValidation: true, responseValidation: true, strict: false },
        swagger: { disable: false, path: "/docs", ui: { customCss: null, customJs: null } },
        error: { disable: false, printStackTrace: false, customHandler: _customHandler },
        security: { disable: false, auth: {
            BearerAuth: bearerJwt({ issuer: process.env.JWT_ISSUER, secret: process.env.JWT_SECRET })
        } },
    }
}

function _customHandler(err, send) {
    if (err.name === "JsonWebTokenError") {
        send(403);
    }
}