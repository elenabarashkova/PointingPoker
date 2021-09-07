import { Socket } from "socket.io";
import { RedisGetAsyncType, RedisSetAsyncType } from "./callbacks";

export interface HandlerParams {
  socket: Socket;
  redisGetAsync: RedisGetAsyncType;
  redisSetAsync: RedisSetAsyncType;
}
