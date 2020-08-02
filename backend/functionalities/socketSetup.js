const container = {};

module.exports = (socket) => {
  console.log("connected");
  socket.on("joinRoom", (room) => {
    if (container[room]) {
    } else container[room] = [];
    socket.join(room);
  });

  socket.on("judge", (streamId) => {
    socket.to(streamId.room).emit("judgeStream", container[streamId.room]);
  });

  socket.on("concernedparty", (streamId) => {
    container[stream.room].push(stream.url);
    socket
      .to(streamId.room)
      .emit("concernedPartyStream", container[streamId.room]);
  });

  socket.on("lawyers", (streamId) => {
    // if (!container[streamId.room].l1)
    //   container[streamId.room].l1 = streamId.url;
    // else container[streamId.room].l2 = streamId.url;
    container[stream.room].push(stream.url);
    socket.to(streamId.room).emit("lawyersStream", container[streamId.room]);
  });

  socket.on("fetchData", (stream) => {
    socket.emit("dataStream", container[stream]);
  });
};
