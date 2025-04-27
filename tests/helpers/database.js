const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

async function setupDatabase() {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)
}

async function stopDatabase() {
  await mongoose.connection.close()
  await mongoServer.stop()
}

async function dropDatabase() {
  await mongoose.connection.db.dropDatabase()
}

export { setupDatabase, dropDatabase, stopDatabase }
