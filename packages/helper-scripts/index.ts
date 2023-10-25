console.log("Helper Script Started");
import { config } from "dotenv";
import { moveImagesToCloudflare } from "./src/moveImages";
config();

moveImagesToCloudflare();
