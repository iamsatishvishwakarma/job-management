import { redis } from "@/configs/redis.config";

export async function acquireLock(key: string, ttl: number) {
  return redis.set(key, "LOCKED", "EX", ttl, "NX");
}

export async function releaseLock(key: string) {
  await redis.del(key);
}
