import io from "socket.io-client";
import { BASE_URL } from "./constants";

// Below fn is used to send event,emit event,joint event,send message
export const createSocketConnection = () => {
  // Because we need to connect to backend at this url
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
