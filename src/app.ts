import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { IUser } from "./interfaces/user.interface";
import { User } from "./models/user.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find().select("-password");

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;

    try {
      const user = await User.findOne({ _id: userId });
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { returnDocument: "after" }
      );

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<void>> => {
    const { userId } = req.params;

    try {
      await User.deleteOne({ _id: userId });
      return res.sendStatus(204);
    } catch (e) {
      console.log(e);
    }
  }
);

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL);
  console.log(`Server is listened on PORT ${configs.PORT}`);
});
