// Teste para verificar se a aplicação Next.js consegue acessar o banco
const { PrismaClient } = require("./src/src/generated/prisma");

async function debugAppConnection() {
  console.log("🔍 DEBUGANDO CONEXÃO DA APLICAÇÃO");
  console.log("==================================\n");

  // Verificar variáveis de ambiente
  console.log("📋 Variáveis de ambiente:");
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Definida' : '❌ Não definida'}`);
  console.log(`DIRECT_URL: ${process.env.DIRECT_URL ? '✅ Definida' : '❌ Não definida'}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
  
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      console.log(`Host: ${url.hostname}`);
      console.log(`Porta: ${url.port}`);
      console.log(`Database: ${url.pathname.slice(1)}`);
      console.log(`Usuário: ${url.username}`);
    } catch (e) {
      console.log("❌ URL inválida:", e.message);
    }
  }

  console.log("\n🔄 Testando conexão Prisma:");
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    // Teste básico de conexão
    await prisma.$connect();
    console.log("✅ Conexão estabelecida");

    // Teste de consulta simples
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Query básica funcionou:", result);

    // Teste de contagem de veículos
    const vehicleCount = await prisma.vehicle.count();
    console.log(`✅ Total de veículos: ${vehicleCount}`);

    // Teste de busca de veículos (similar ao que a app faz)
    const vehicles = await prisma.vehicle.findMany({
      take: 2,
      select: {
        id: true,
        vehicleBrand: true,
        model: true,
        year: true,
        price: true,
        status: true,
        featured: true,
      },
    });

    console.log("✅ Busca de veículos funcionou:");
    vehicles.forEach(v => {
      console.log(`   - ${v.vehicleBrand} ${v.model} (${v.year}) - R$ ${v.price}`);
    });

    // Teste específico da função getAllVehicles (simulação)
    console.log("\n🧪 Simulando getAllVehicles:");
    const allVehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log(`✅ getAllVehicles simulado: ${allVehicles.length} veículos`);

    // Teste específico da função getFeaturedVehicles (simulação)
    console.log("\n🧪 Simulando getFeaturedVehicles:");
    const featuredVehicles = await prisma.vehicle.findMany({
      where: {
        featured: true,
        status: "Disponível",
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(`✅ getFeaturedVehicles simulado: ${featuredVehicles.length} veículos em destaque`);

  } catch (error) {
    console.error("❌ Erro na conexão/consulta:", error.message);
    console.error("Código do erro:", error.code);
    console.error("Stack:", error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

debugAppConnection();