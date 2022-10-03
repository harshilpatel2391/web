import { User } from "./models/User";

const user = new User({ name: "harshil", age: 22});
user.save();