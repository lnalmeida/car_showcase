import { processVehicleImageWithAI } from '../vehicles'

// Mock dependencies
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn(),
    }),
  })),
}))

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({ userId: 'test-user-id' })),
}))

jest.mock('@/lib/prisma', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
    vehicle: {
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/supabase', () => ({
  createClient: jest.fn(() => ({
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
      })),
    },
  })),
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

describe('Vehicle Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.log = jest.fn() // Mock console.log
    console.error = jest.fn() // Mock console.error
    console.warn = jest.fn() // Mock console.warn
  })

  describe('processVehicleImageWithAI', () => {
    const mockFile = {
      type: 'image/jpeg',
      arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('fake-image-data')),
    }

    it('successfully processes vehicle image and returns data', async () => {
      const mockResponse = {
        category: 'Carro',
        brand: 'Toyota',
        type: 'Sedan',
        model: 'Corolla',
        year: '2023',
        color: 'Branco',
        seats: 5,
        doors: 4,
        fuelType: 'Flex',
        engineSize: '2.0',
        transmission: 'Automático',
        price: 85000,
        description: 'Toyota Corolla 2023 em excelente estado',
        confidence: 0.9,
      }

      // Mock the AI response
      const { GoogleGenerativeAI } = require('@google/generative-ai')
      const mockGenerateContent = jest.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify(mockResponse),
        },
      })

      GoogleGenerativeAI.mockImplementation(() => ({
        getGenerativeModel: () => ({
          generateContent: mockGenerateContent,
        }),
      }))

      const result = await processVehicleImageWithAI(mockFile)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
      expect(mockGenerateContent).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            inlineData: expect.objectContaining({
              data: expect.any(String),
              mimeType: 'image/jpeg',
            }),
          }),
          expect.stringContaining('Analise esta imagem de veículo'),
        ])
      )
    })

    it('handles missing GEMINI_API_KEY error', async () => {
      const originalEnv = process.env.GEMINI_API_KEY
      delete process.env.GEMINI_API_KEY

      const result = await processVehicleImageWithAI(mockFile)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Missing GEMINI_API_KEY')

      // Restore env
      process.env.GEMINI_API_KEY = originalEnv
    })

    it('handles AI response with missing fields', async () => {
      const incompleteResponse = {
        category: 'Carro',
        brand: 'Toyota',
        // Missing required fields
      }

      const { GoogleGenerativeAI } = require('@google/generative-ai')
      const mockGenerateContent = jest.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify(incompleteResponse),
        },
      })

      GoogleGenerativeAI.mockImplementation(() => ({
        getGenerativeModel: () => ({
          generateContent: mockGenerateContent,
        }),
      }))

      const result = await processVehicleImageWithAI(mockFile)

      expect(result.success).toBe(false)
      expect(result.error).toContain('AI response missing required fields')
    })

    it('handles invalid JSON response from AI', async () => {
      const { GoogleGenerativeAI } = require('@google/generative-ai')
      const mockGenerateContent = jest.fn().mockResolvedValue({
        response: {
          text: () => 'Invalid JSON response',
        },
      })

      GoogleGenerativeAI.mockImplementation(() => ({
        getGenerativeModel: () => ({
          generateContent: mockGenerateContent,
        }),
      }))

      const result = await processVehicleImageWithAI(mockFile)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Erro na análise da imagem')
    })

    it('cleans markdown from AI response correctly', async () => {
      const mockResponse = {
        category: 'Carro',
        brand: 'Toyota',
        type: 'Sedan',
        model: 'Corolla',
        year: '2023',
        color: 'Branco',
        seats: 5,
        doors: 4,
        fuelType: 'Flex',
        engineSize: '2.0',
        transmission: 'Automático',
        price: 85000,
        description: 'Toyota Corolla 2023 em excelente estado',
        confidence: 0.9,
      }

      const { GoogleGenerativeAI } = require('@google/generative-ai')
      const mockGenerateContent = jest.fn().mockResolvedValue({
        response: {
          text: () => `\`\`\`json\n${JSON.stringify(mockResponse)}\n\`\`\``,
        },
      })

      GoogleGenerativeAI.mockImplementation(() => ({
        getGenerativeModel: () => ({
          generateContent: mockGenerateContent,
        }),
      }))

      const result = await processVehicleImageWithAI(mockFile)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
    })

    it('handles file processing errors', async () => {
      const errorFile = {
        type: 'image/jpeg',
        arrayBuffer: jest.fn().mockRejectedValue(new Error('File processing error')),
      }

      const result = await processVehicleImageWithAI(errorFile)

      expect(result.success).toBe(false)
      expect(result.error).toContain('File processing error')
    })
  })
})
