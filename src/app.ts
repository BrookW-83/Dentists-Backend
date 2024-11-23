import express from "express";

import blogRouter from "./route/blogsRoute";
import scheduleRouter from "./route/scheduleRoute"
import authRouter from "./route/authRoute";
import serviceRouter from "./route/servicesRoute";
import ImageBlogRoute from "./route/imageBlogsController";
import subServiceRouter from "./route/scheduleStasticsRoute";
import scheduleStatsticeRouter from "./route/scheduleStasticsRoute";
import userRouter from "./route/userRoute"

import "dotenv/config";
import { Pool } from "pg";
import bodyParser, { urlencoded } from "body-parser";

const app = express();
const PORT = 5500;
const connectionPoint = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString: connectionPoint,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(bodyParser.json());
app.use(urlencoded({extended: true}));
app.use(express.json())
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter)
app.use("/api/blogs", blogRouter);
app.use("/api/schedule", scheduleRouter)
app.use("/api/services", serviceRouter);
app.use("/api/images", ImageBlogRoute);
app.use("/api/sub-services",subServiceRouter)
app.use("/api/schedule-statstice", scheduleStatsticeRouter )

app.listen(PORT, async () => {
  await pool.connect();
  console.log(`Server is runing on port http://localhost:${PORT}`);
});

export default app;
