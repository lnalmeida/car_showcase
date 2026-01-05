// Teste específico para verificar se as Server Actions funcionam no contexto Next.js
import { getAllVehicles } from './src/actions/vehicleCatalog.js';
import { getFeaturedVehicles } from './src/actions/home.js';

async function testNextJSActions() {
  console.log("🧪 TESTANDO SERVER ACTIONS NO CONTEXTO NEXT.JS");
  console.log("===============================================\n");

  try {
    // Teste 1: getAllVehicles
    console.log("1️⃣ Testando getAllVehicles (vehicleCatalog):");
    const allVehiclesResult = await getAllVehicles();
    
    if (allVehiclesResult.success) {
      console.log(`✅ getAllVehicles: ${allVehiclesResult.data.length} veículos`);
      if (allVehiclesResult.data.length > 0) {
        const first = allVehiclesResult.data[0];
        console.log(`   Primeiro: ${first.vehicleBrand} ${first.model} - R$ ${first.price}`);
      }
    } else {
      console.log(`❌ getAllVehicles falhou: ${allVehiclesResult.error}`);
    }

    // Teste 2: getFeaturedVehicles
    console.log("\n2️⃣ Testando getFeaturedVehicles (home):");
    const featuredResult = await getFeaturedVehicles(8);
    
    if (featuredResult.success) {
      console.log(`✅ getFeaturedVehicles: ${featuredResult.data.length} veículos em destaque`);
      featuredResult.data.forEach(v => {
        console.log(`   - ${v.vehicleBrand} ${v.model} (${v.year}) - R$ ${v.price}`);
      });
    } else {
      console.log(`❌ getFeaturedVehicles falhou: ${featuredResult.message}`);
    }

    console.log("\n🎉 Testes das Server Actions concluídos!");

  } catch (error) {
    console.error("❌ Erro crítico:", error.message);
    console.error("Stack:", error.stack);
    
    // Verificar se é erro de importação
    if (error.message.includes('Cannot find module')) {
      console.log("\n💡 POSSÍVEL CAUSA: Problema de importação de módulos ES6/CommonJS");
      console.log("   - As Server Actions usam imports ES6");
      console.log("   - Este teste usa CommonJS");
      console.log("   - Pode haver conflito de módulos");
    }
  }
}

testNextJSActions();