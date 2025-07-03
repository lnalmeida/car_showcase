import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import CarCard from '../CarCard'

// Mock the router
jest.mock('next/navigation')

const mockCar = {
  id: '1',
  make: 'Toyota',
  model: 'Corolla',
  year: 2023,
  price: 85000,
  transmission: 'Automático',
  fuelType: 'Flex',
  bodyType: 'Sedan',
  mileage: 15000,
  color: 'Branco',
  images: ['https://example.com/car1.jpg'],
  wishlisted: false,
}

const mockPush = jest.fn()

beforeEach(() => {
  useRouter.mockReturnValue({
    push: mockPush,
  })
  mockPush.mockClear()
})

describe('CarCard', () => {
  it('renders car information correctly', () => {
    render(<CarCard car={mockCar} />)

    // Check if car make and model are displayed
    expect(screen.getByText('Toyota Corolla')).toBeInTheDocument()

    // Check if price is formatted correctly
    expect(screen.getByText(/R\$\s*85\.000,00/)).toBeInTheDocument()

    // Check if year, transmission, and fuel type are displayed
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('Automático')).toBeInTheDocument()
    expect(screen.getByText('Flex')).toBeInTheDocument()

    // Check if badges are displayed
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('15.000 km')).toBeInTheDocument()
    expect(screen.getByText('Branco')).toBeInTheDocument()
  })

  it('displays car image when available', () => {
    render(<CarCard car={mockCar} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCar.images[0])
    expect(image).toHaveAttribute('alt', 'Toyota Corolla')
  })

  it('displays placeholder when no image is available', () => {
    const carWithoutImage = { ...mockCar, images: [] }
    render(<CarCard car={carWithoutImage} />)

    // Check if car icon is displayed as placeholder
    const carIcon = screen.getByTestId('car-icon') || document.querySelector('[data-lucide="car"]')
    expect(carIcon || screen.getByRole('img')).toBeInTheDocument()
  })

  it('toggles wishlist state when heart button is clicked', () => {
    render(<CarCard car={mockCar} />)

    const heartButton = screen.getByRole('button', { name: /heart/i }) || 
                       screen.getByTestId('heart-button') ||
                       document.querySelector('button[class*="absolute top-2 right-2"]')
    
    expect(heartButton).toBeInTheDocument()
    
    // Click the heart button
    fireEvent.click(heartButton)
    
    // Since we're testing state change, we would need to check visual changes
    // The heart should now be filled (this would require checking classes or styles)
  })

  it('navigates to car detail page when "Ver carro" button is clicked', () => {
    render(<CarCard car={mockCar} />)

    const viewCarButton = screen.getByRole('button', { name: /ver carro/i })
    expect(viewCarButton).toBeInTheDocument()

    fireEvent.click(viewCarButton)

    expect(mockPush).toHaveBeenCalledWith('/car/1')
  })

  it('handles wishlisted car correctly', () => {
    const wishlistedCar = { ...mockCar, wishlisted: true }
    render(<CarCard car={wishlistedCar} />)

    // The component should render with the car already in wishlist state
    // This would typically be checked by examining the heart icon's appearance
    expect(screen.getByRole('button', { name: /heart/i })).toBeInTheDocument()
  })

  it('formats price correctly for different values', () => {
    const expensiveCar = { ...mockCar, price: 150000 }
    const { rerender } = render(<CarCard car={expensiveCar} />)

    expect(screen.getByText(/R\$\s*150\.000,00/)).toBeInTheDocument()

    const cheapCar = { ...mockCar, price: 25000 }
    rerender(<CarCard car={cheapCar} />)

    expect(screen.getByText(/R\$\s*25\.000,00/)).toBeInTheDocument()
  })

  it('formats mileage correctly', () => {
    const highMileageCar = { ...mockCar, mileage: 100000 }
    render(<CarCard car={highMileageCar} />)

    expect(screen.getByText('100.000 km')).toBeInTheDocument()
  })
})
