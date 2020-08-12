const container = {};

module.exports = (socket) => {
  console.log("connected");
  socket.on("joinRoom", (room) => {
    if (container[room]) {
      console.log("Dsafsa" + room);
    } else {
      container[room] = [];
      console.log(container[room]);
    }
    socket.join(room);
    socket.emit("insideRoom");
  });

  socket.on("judge", (streamId) => {
    console.log(streamId);
    container[streamId.room].push(streamId.url);
    socket.to(streamId.room).emit("judgeStream", container[streamId.room]);
  });

  socket.on("concernedparty", (streamId) => {
    container[streamId.room].push(streamId.url);
    socket
      .to(streamId.room)
      .emit("concernedPartyStream", container[streamId.room]);
  });

  socket.on("lawyers", (streamId) => {
    // if (!container[streamId.room].l1)
    //   container[streamId.room].l1 = streamId.url;
    // else container[streamId.room].l2 = streamId.url;
    container[streamId.room].push(streamId.url);
    socket.to(streamId.room).emit("lawyersStream", container[streamId.room]);
  });

  socket.on("fetchData", (stream) => {
    socket.emit("dataStream", container[stream]);
  });
};
