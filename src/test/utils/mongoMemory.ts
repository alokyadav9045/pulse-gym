import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod: MongoMemoryServer | null = null

export async function startInMemoryMongo() {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  process.env.MONGODB_URI = uri
  await mongoose.connect(uri)
  return uri
}

export async function stopInMemoryMongo() {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect()
  }
  if (mongod) {
    await mongod.stop()
    mongod = null
  }
}