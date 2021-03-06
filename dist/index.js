"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandlers_1 = require("./middleware/errorHandlers");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const typeorm_1 = require("typeorm");
require("reflect-metadata");
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = require("./swaggerOptions");
// Initialize configuration
dotenv.config();
// Routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = express_1.default();
typeorm_1.createConnection();
const PORT = parseInt(process.env.PORT, 10);
// Middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default());
const specs = swagger_jsdoc_1.default(swaggerOptions_1.options);
// Api routes
app.use(index_routes_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
// Catch 404
app.use(notFoundHandler_1.notFoundHandler);
// Errors
app.use(errorHandlers_1.errorHandler);
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map