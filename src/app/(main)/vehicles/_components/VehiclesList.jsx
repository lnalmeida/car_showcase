"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import VehicleCard from "@/components/VehicleCard";

const vehicles = [
  {
    id: 1,
    name: "Tracer 900 GT",
    price: 120000.0,
    year: 2018,
    transmission: "Manual",
    fuel: "Gasolina",
    category: "Adventure",
    mileage: "30.000 km",
    color: "Vermelha",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 2,
    name: "XTZ 150 Lander",
    price: 24000.0,
    year: 2023,
    transmission: "Manual",
    fuel: "Gasolina",
    category: "Dual Sport",
    mileage: "0 km",
    color: "Preto e Bege",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Honda CB 600F",
    price: 35000.0,
    year: 2020,
    transmission: "Manual",
    fuel: "Gasolina",
    category: "Street",
    mileage: "15.000 km",
    color: "Azul",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Sentra",
    price: 80000.0,
    year: 2023,
    transmission: "Manual",
    fuel: "Gasolina",
    category: "Sedan",
    mileage: "130.000 km",
    color: "Prata",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Range Rover",
    price: 150000.0,
    year: 2020,
    transmission: "Automático",
    fuel: "Gasolina",
    category: "SUV",
    mileage: "0 km",
    color: "Prata",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 6,
    name: "Cerato",
    price: 75000.0,
    year: 2010,
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    mileage: "40.000 km",
    color: "Prata",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 7,
    name: "Civic",
    price: 60000.0,
    year: 2015,
    transmission: "Automático",
    fuel: "Gasolina",
    category: "Sedan",
    mileage: "1.500 km",
    color: "Preto",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 8,
    name: "BMW X1",
    price: 95000.0,
    year: 2019,
    transmission: "Automático",
    fuel: "Gasolina",
    category: "SUV",
    mileage: "25.000 km",
    color: "Branco",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
]

const categories = ["Todos", "Sedan", "SUV", "Adventure", "Street", "Dual Sport"]
const fuelTypes = ["Todos", "Gasolina", "Flex", "Diesel", "Elétrico"]
const transmissions = ["Todos", "Manual", "Automático"]

export  const VehiclesList = () => {
  const [vehicleList, setVehicleList] = useState(vehicles)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedFuel, setSelectedFuel] = useState("Todos")
  const [selectedTransmission, setSelectedTransmission] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const toggleFavorite = (id) => {
    setVehicleList(
      vehicleList.map((vehicle) => (vehicle.id === id ? { ...vehicle, isFavorite: !vehicle.isFavorite } : vehicle)),
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const filteredVehicles = vehicleList.filter((vehicle) => {
    const matchesCategory = selectedCategory === "Todos" || vehicle.category === selectedCategory
    const matchesFuel = selectedFuel === "Todos" || vehicle.fuel === selectedFuel
    const matchesTransmission = selectedTransmission === "Todos" || vehicle.transmission === selectedTransmission
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesFuel && matchesTransmission && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-25 bg-white shadow-lg p-6 min-h-screen">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar veículo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Combustível</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Transmissão</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {transmissions.map((transmission) => (
                    <option key={transmission} value={transmission}>
                      {transmission}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() => {
                  setSelectedCategory("Todos")
                  setSelectedFuel("Todos")
                  setSelectedTransmission("Todos")
                  setSearchTerm("")
                }}
                variant="outline"
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Exposição de Veículos</h1>
              <div className="text-sm text-gray-600">{filteredVehicles.length} veículo(s) encontrado(s)</div>
            </div>
          </div>

          {/* Novidades Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Novidades</h2>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                Ver Todos →
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.slice(0, 4).map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>

          {/* All Vehicles Section */}
          {filteredVehicles.length > 4 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Todos os Veículos</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVehicles.slice(4).map((vehicle) => (
                  <Card key={vehicle.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-0 relative">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => toggleFavorite(vehicle.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${vehicle.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-semibold mb-2">{vehicle.name}</CardTitle>
                      <div className="text-2xl font-bold text-blue-600 mb-3">{formatPrice(vehicle.price)}</div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>{vehicle.year}</span>
                          <span>{vehicle.transmission}</span>
                          <span>{vehicle.fuel}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs">
                          {vehicle.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {vehicle.mileage}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {vehicle.color}
                        </Badge>
                      </div>

                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Carro
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
