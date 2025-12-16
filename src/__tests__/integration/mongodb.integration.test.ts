/**
 * @jest-environment node
 */

import { startInMemoryMongo, stopInMemoryMongo } from '@/test/utils/mongoMemory'
import mongoose from 'mongoose'
import GalleryImage from '@/lib/models/GalleryImage'

jest.setTimeout(30000)

describe('In-memory MongoDB', () => {
  beforeAll(async () => {
    await startInMemoryMongo()
  })

  afterAll(async () => {
    await stopInMemoryMongo()
  })

  it('connects and can create a document via GalleryImage model', async () => {
    const created = await GalleryImage.create({ title: 'Test', image: 'http://example.com/image.jpg', category: 'equipment' })
    const found = await GalleryImage.findById(created._id)
    expect(found).not.toBeNull()
    expect(found!.title).toBe('Test')
  })

  it('dbConnect uses provided MONGODB_URI (simulated by env)', async () => {
    // reset mongoose to simulate fresh connect
    await mongoose.disconnect()
    delete require.cache[require.resolve('@/lib/mongodb')]
    const dbConnect = await import('@/lib/mongodb')
    await dbConnect.default()
    expect(mongoose.connection.readyState).toBeGreaterThan(0)
  })
})