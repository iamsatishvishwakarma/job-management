import IORedis from 'ioredis';

export const redisConnection = new IORedis({
  host: "redis-16819.crce182.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 16819,
  password: "NcOMTlBMpRV53HEpHyo7D2ewfHxIfS6C",
  maxRetriesPerRequest: null
});