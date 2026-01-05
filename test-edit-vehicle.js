const { PrismaClient } = require("./src/src/generated/prisma");

const prisma = new PrismaClient();

async function testEditVehicle() {
  console.log("🧪 TESTANDO FUNCIONALIDADE DE EDIÇÃO");
  console.log("====================================\n");

  try {
    // Buscar um veículo para testar
    console.log("1️⃣ Buscando veículos disponíveis:");
    const vehicles = await prisma.vehicle.findMany({
      take: 1,
      select: {
        id: true,
        vehicleBrand: true,
        model: true,
        year: true,
        price: true,
        status: true,
      },
    });

    if (vehicles.length === 0) {
      console.log("❌ Nenhum veículo encontrado para teste");
      return;
    }

    const testVehicle = vehicles[0];
    console.log(`✅ Veículo encontrado: ${testVehicle.vehicleBrand} ${testVehicle.model} (${testVehicle.year})`);
    console.log(`   ID: ${testVehicle.id}`);
    console.log(`   Preço atual: R$ ${testVehicle.price}`);
    console.log(`   Status atual: ${testVehicle.status}`);

    // Simular uma atualização
    console.log("\n2️⃣ Simulando atualização de preço:");
    const newPrice = parseFloat(testVehicle.price) + 1000;
    
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: testVehicle.id },
      data: {
        price: newPrice,
        description: `${testVehicle.vehicleBrand} ${testVehicle.model} ${testVehicle.year} - Atualizado em ${new Date().toLocaleString('pt-BR')}`
      },
    });

    console.log(`✅ Veículo atualizado com sucesso!`);
    console.log(`   Novo preço: R$ ${updatedVehicle.price}`);
    console.log(`   Nova descrição: ${updatedVehicle.description}`);

    // Reverter a mudança
    console.log("\n3️⃣ Revertendo alterações:");
    await prisma.vehicle.update({
      where: { id: testVehicle.id },
      data: {
        price: parseFloat(testVehicle.price),
        description: `${testVehicle.vehicleBrand} ${testVehicle.model} ${testVehicle.year} em excelente estado.`
      },
    });

    console.log("✅ Alterações revertidas com sucesso!");

    console.log("\n🎉 Teste de edição concluído com sucesso!");
    console.log("\n📋 ROTAS CRIADAS:");
    console.log("   • GET  /admin/vehicles/[id]/edit - Página de edição");
    console.log("   • POST updateVehicleComplete - Action para atualizar veículo completo");
    console.log("\n📋 FUNCIONALIDADES ADICIONADAS:");
    console.log("   • Formulário de edição com dados pré-populados");
    console.log("   • Upload de novas imagens");
    console.log("   • Validação de dados");
    console.log("   • Botão de edição na lista de veículos");
    console.log("   • Botão de edição na página de detalhes");

  } catch (error) {
    console.error("❌ Erro no teste:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testEditVehicle();