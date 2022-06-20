import { config } from "dotenv";
import { HttpClient } from "./client";
import { Solution } from "./solution";
config();

const baseUrl = "https://rooftop-career-switch.herokuapp.com";
const email = process.env.EMAIL || "";

if (!email) {
  throw new Error(
    "The email was not provided. Add it on the .env file, like that => EMAIL='example@mail.com'"
  );
}

const httpClient = new HttpClient(baseUrl, email);
const solution = new Solution(httpClient);

solution.main();
