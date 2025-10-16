import { Server } from 'socket.io'

// In-memory storage for documents (Note: This will reset on each deployment)
const documents = new Map()
const defaultValue = ""

let io

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...')
    
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: ["https://for-is-viva.vercel.app", "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
      }
    })

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      socket.on('get-document', (documentId) => {
        const document = findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)

        socket.on('send-changes', (delta) => {
          socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('save-document', (data) => {
          saveDocument(documentId, data)
        })
      })

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
      })
    })

    res.socket.server.io = io
  }
  
  res.end()
}

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