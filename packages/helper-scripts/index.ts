console.log("Helper Script Started");
import { config } from "dotenv";
import { createColor } from "./src/colorConfig";
config();

createColor();
