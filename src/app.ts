import express, { Application } from "express";
import morgan from "morgan";

// Swigger
import swaggerUi from "swagger-ui-express";
const swaggerFile = require("../swagger_output.json");

// Routes
import IndexRouter from "./routes/index.routes";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  routes() {
    this.app.use("/", IndexRouter);
  }

  middlewares() {
    const cors = require("cors");

    this.app.use(morgan("dev")); // PARA DECIRLE AL SERVIDOR QUE ESTARÁS ESCUCHANDO
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("SERVER ON PORT", this.app.get("port"));
  }
}
