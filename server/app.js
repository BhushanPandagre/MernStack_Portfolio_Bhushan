// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import cors from "cors";
// import { dbConnection } from "./database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import userRouter from "./routes/userRouter.js";
// import timelineRouter from "./routes/timelineRouter.js";
// import messageRouter from "./routes/messageRouter.js";
// import skillRouter from "./routes/skillRouter.js";
// import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
// import projectRouter from "./routes/projectRouter.js";

// const app = express();
//  dotenv.config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/timeline", timelineRouter);
// app.use("/api/v1/message", messageRouter);
// app.use("/api/v1/skill", skillRouter);
// app.use("/api/v1/softwareapplication", softwareApplicationRouter);
// app.use("/api/v1/project", projectRouter);

// dbConnection();
// app.use(errorMiddleware);

// export default app;



import express from "express";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";

import cookieParser from "cookie-parser";



const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(cookieParser());

// ✅ Allow dev + prod frontends
const allowedOrigins = [
  process.env.PORTFOLIO_URL,
  process.env.DASHBOARD_URL,
  "http://localhost:5174", // dev frontend
  "http://localhost:5173", // Vite frontend (if applicable)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
