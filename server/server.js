const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000", "https://for-is-viva.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// In-memory storage for documents
const documents = new Map();
const defaultValue = "";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("get-document", (documentId) => {
    const document = findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", (data) => {
      saveDocument(documentId, data);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

function findOrCreateDocument(id) {
  if (id == null) return { data: defaultValue };

  if (documents.has(id)) {
    return documents.get(id);
  }

  const newDocument = { _id: id, data: defaultValue };
  documents.set(id, newDocument);
  return newDocument;
}

function saveDocument(id, data) {
  if (documents.has(id)) {
    documents.get(id).data = data;
  } else {
    documents.set(id, { _id: id, data });
  }
}

console.log("Server running on port 3001");
