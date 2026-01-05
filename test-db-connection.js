const { PrismaClient } = require("./src/src/generated/prisma");

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log("🔄 Testando conexão com o banco de dados...");
    
    // Testa a conexão
    await prisma.$connect();
    console.log("✅ Conexão com o banco estabelecida com sucesso!");
    
    // Testa uma consulta simples
    const vehicleCount = await prisma.vehicle.count();
    console.log(`📊 Total de veículos no banco: ${vehicleCount}`);
    
    // Testa buscar alguns veículos
    const vehicles = await prisma.vehicle.findMany({
      take: 3,
      select: {
        id: true,
        model: true,
        vehicleBrand: true,
        price: true,
        status: true
      }
    });
    
    console.log("🚗 Primeiros veículos encontrados:");
    vehicles.forEach(v => {
      console.log(`  - ${v.vehicleBrand} ${v.model} - R$ ${v.price} (${v.status})`);
    });
    
  } catch (error) {
    console.error("❌ Erro na conexão com o banco:", error.message);
    console.error("Detalhes do erro:", error);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

testConnection();