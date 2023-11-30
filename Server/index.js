import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer";

import authRouter from "./routers/authRouter.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://192.168.166.108:5173",
  })
);
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/auth/uploadfile", upload.array("photos"), async (req, res) => {
  try {
    if (req.files) {
      const paths = await req.files.map((file) =>
        file.path.replace(/^uploads\\/, "")
      );
      res.json(paths);
    } else {
      res.status(400).json({ error: "No files uploaded" });
    }
  } catch (error) {
    console.error("Error in file upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`server running on ${process.env.PORT}`)
  );
});
