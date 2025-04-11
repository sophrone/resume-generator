import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

const connectToRedis = async () => {
  await redisClient.connect();
};

connectToRedis().catch(console.error);

export default redisClient;
