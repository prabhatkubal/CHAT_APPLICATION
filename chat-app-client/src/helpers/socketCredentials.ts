const socketCredentials = {
  reconnection: false,
  withCredentials: true,
  extraHeaders: {
    "socket-custom-header": "abcd",
  },
};

export default socketCredentials;