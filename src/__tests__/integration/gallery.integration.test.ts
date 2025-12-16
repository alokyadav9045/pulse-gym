/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals'

// Mock next/server to avoid runtime Request/Response issues
jest.mock('next/server', () => ({
  NextRequest: class {},
  NextResponse: {
    json: (payload: any, opts?: any) => ({ status: opts?.status || 200, body: payload })
  }
}))

// Mock DB connect
jest.mock('@/lib/mongodb', () => ({ __esModule: true, default: async () => {} }))

describe('Gallery API integration', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('returns gallery images for GET', async () => {
    const mockGallery = [
      { _id: 'g1', title: 'Image 1', image: 'https://images.unsplash.com/photo-1?w=400', category: 'equipment', isActive: true, createdAt: new Date() }
    ]

    // Mock the model: function + static find
    const mockModel: any = jest.fn().mockImplementation(function (data: any) {
      return { ...data, save: jest.fn().mockResolvedValue(undefined) }
    })
    mockModel.find = jest.fn().mockReturnValue({ sort: jest.fn().mockResolvedValue(mockGallery) })

    jest.doMock('@/lib/models/GalleryImage', () => ({ __esModule: true, default: mockModel }))

    const galleryRoute = await import('@/app/api/gallery/route')

    const req = { url: 'http://localhost/api/gallery' }

    const res: any = await galleryRoute.GET(req as any)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.galleryImages)).toBe(true)
    expect(res.body.galleryImages[0]._id).toBe('g1')
  })

  it('accepts legacy imageUrl in POST and saves as image', async () => {
    const mockSave = jest.fn().mockResolvedValue(undefined)
    const mockModel: any = jest.fn().mockImplementation(function (data: any) {
      return { ...data, save: mockSave }
    })

    // ensure find doesn't interfere
    mockModel.find = jest.fn()

    jest.doMock('@/lib/models/GalleryImage', () => ({ __esModule: true, default: mockModel }))

    const galleryRoute = await import('@/app/api/gallery/route')

    const body = { title: 'New', description: 'desc', imageUrl: 'https://images.unsplash.com/photo-new', category: 'equipment' }
    const req = { json: async () => body, url: 'http://localhost/api/gallery' }

    const res: any = await galleryRoute.POST(req as any)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    // ensure constructor called with image field equal to imageUrl
    expect(mockModel).toHaveBeenCalledWith(expect.objectContaining({ image: body.imageUrl }))
  })
})
