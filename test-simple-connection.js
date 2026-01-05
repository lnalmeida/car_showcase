const { PrismaClient } = require("./src/src/generated/prisma");

async function simpleTest() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    console.log("🔄 Testando conexão simples...");
    
    // Apenas tenta conectar
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Conexão funcionando!");
    
  } catch (error) {
    console.error("❌ Erro:", error.code, error.message);
    
    if (error.code === 'P1001') {
      console.log("\n🔍 Diagnóstico:");
      console.log("- Verifique se o servidor Supabase está ativo");
      console.log("- Confirme se as credenciais estão corretas");
      console.log("- Teste a conexão diretamente no Supabase Dashboard");
    }
  } finally {
    await prisma.$disconnect();
  }
}

simpleTest();