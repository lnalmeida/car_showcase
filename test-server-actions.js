// Simular as Server Actions da aplicação
const { PrismaClient } = require("./src/src/generated/prisma");

// Simular a função serializeVehicleData
const serializeVehicleData = async (vehicle, wishListed = false) => {
  return {
    ...vehicle,
    price: vehicle.price ? vehicle.price.toNumber().toFixed(2) : 0,
    createdAt: vehicle.createdAt?.toISOString(),
    updatedAt: vehicle.updatedAt?.toISOString(),
    wishListed: wishListed,
  };
};

const prisma = new PrismaClient();

async function testServerActions() {
  console.log("🧪 TESTANDO SERVER ACTIONS DA APLICAÇÃO");
  console.log("========================================\n");

  try {
    // Teste 1: getAllVehicles (como na aplicação)
    console.log("1️⃣ Testando getAllVehicles:");
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: "desc" },
    });

    const result = await Promise.all(
      vehicles.map((v) => serializeVehicleData(v))
    );

    console.log(`✅ getAllVehicles: ${result.length} veículos encontrados`);
    if (result.length > 0) {
      console.log(`   Primeiro: ${result[0].vehicleBrand} ${result[0].model} - R$ ${result[0].price}`);
    }

    // Teste 2: getFeaturedVehicles (como na aplicação)
    console.log("\n2️⃣ Testando getFeaturedVehicles:");
    const featuredVehicles = await prisma.vehicle.findMany({
      where: {
        featured: true,
        status: "Disponível",
      },
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!featuredVehicles.length) {
      console.log("❌ Não há veículos em destaque");
    } else {
      const serializedFeaturedVehicles = await Promise.all(
        featuredVehicles.map((fv) => serializeVehicleData(fv))
      );
      
      console.log(`✅ getFeaturedVehicles: ${serializedFeaturedVehicles.length} veículos em destaque`);
      serializedFeaturedVehicles.forEach(v => {
        console.log(`   - ${v.vehicleBrand} ${v.model} (${v.year}) - R$ ${v.price}`);
      });
    }

    // Teste 3: getSearchedVehicles (como na aplicação)
    console.log("\n3️⃣ Testando getSearchedVehicles:");
    const params = {
      search: "",
      page: 0,
      limit: 10,
      filter: null,
      sortBy: null,
      order: null
    };

    let where = {};
    const orderByClause = params.sortBy ? { [params.sortBy]: params.order } : { createdAt: "desc" };

    const [searchVehicles, totalCount] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        orderBy: orderByClause,
        skip: params.page * params.limit,
        take: params.limit,
      }),
      prisma.vehicle.count({
        where,
      }),
    ]);

    const searchResult = await Promise.all(
      searchVehicles.map((v) => serializeVehicleData(v))
    );

    console.log(`✅ getSearchedVehicles: ${searchResult.length} veículos (total: ${totalCount})`);

    console.log("\n🎉 Todos os testes de Server Actions passaram!");
    console.log("\n📋 DIAGNÓSTICO:");
    console.log("✅ Banco de dados: Conectado e funcionando");
    console.log("✅ Prisma Client: Funcionando corretamente");
    console.log("✅ Server Actions: Simulação bem-sucedida");
    console.log("✅ Serialização: Funcionando");
    
    console.log("\n💡 PRÓXIMOS PASSOS:");
    console.log("1. Acesse http://localhost:3001 para testar a aplicação");
    console.log("2. Verifique se os veículos aparecem na página inicial");
    console.log("3. Teste a navegação para /vehicles");
    console.log("4. Teste o painel admin em /admin/vehicles");

  } catch (error) {
    console.error("❌ Erro nos testes:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testServerActions();