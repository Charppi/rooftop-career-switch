import { config } from "dotenv";
import { HttpClient } from "./client";
import { Solution } from "./solution";
config();

const baseUrl = "https://rooftop-career-switch.herokuapp.com";
const email = process.env.EMAIL || "";

if (!email) {
  console.log(
    `Cannot run the solution test due is missing the email in the .env file ❌`
  );
  process.exit();
}

const httpClient = new HttpClient(baseUrl, email);
const solution = new Solution(httpClient);

solution.main();
