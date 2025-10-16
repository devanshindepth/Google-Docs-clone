const { Server } = require('socket.io')
const http = require('http')

// In-memory storage for documents
const documents = new Map()
const defaultValue = ""

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

io.on("connection", socket => {
  console.log("User connected:", socket.id)

  socket.on("get-document", documentId => {
    const document = findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", data => {
      saveDocument(documentId, data)
    })
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

function findOrCreateDocument(id) {
  if (id == null) return { data: defaultValue }

  if (documents.has(id)) {
    return documents.get(id)
  }
  
  const newDocument = { _id: id, data: defaultValue }
  documents.set(id, newDocument)
  return newDocument
}

function saveDocument(id, data) {
  if (documents.has(id)) {
    documents.get(id).data = data
  } else {
    documents.set(id, { _id: id, data })
  }
}

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})