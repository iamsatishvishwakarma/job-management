import axios from "axios";
import { Queue, Worker } from "bullmq";
import Redis from "ioredis";

const connection = new Redis({ maxRetriesPerRequest: null });

const myQueue = new Queue("NetworkQueue", { connection });

async function init() {
  // upsertJobScheduler ka istemal
  await myQueue.upsertJobScheduler(
    "hourly-api-check", // Scheduler ki Unique ID
    {
      every: 60 * 60 * 1, // 1 hour
    },
    {
      name: "fetchAndSaveData", // Job ka naam
      data: { url: "https://api.example.com/data" }, // Job ka data
      opts: {
        // 'immediately: true' yahan directly scheduler mein kaam karta hai
        // Taki pehli call turant ho jaye
      },
    },
  );
  console.log("Scheduler configured!");
}

new Worker(
  "NetworkQueue",
  async (job) => {
    const res = await axios.get(job.data.url);
    await connection.set("latest_data", JSON.stringify(res.data));
    console.log("Data saved to Redis at:", new Date().toLocaleTimeString());
  },
  { connection },
);

init();
