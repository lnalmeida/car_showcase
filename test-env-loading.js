// Teste para verificar como as variáveis de ambiente são carregadas
require('dotenv').config();

console.log("🔍 TESTE DE CARREGAMENTO DE VARIÁVEIS DE AMBIENTE");
console.log("=================================================\n");

console.log("📋 Variáveis carregadas pelo Node.js:");
console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Definida' : '❌ Não definida'}`);
console.log(`DIRECT_URL: ${process.env.DIRECT_URL ? '✅ Definida' : '❌ Não definida'}`);

if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    console.log(`Host: ${url.hostname}`);
    console.log(`Porta: ${url.port}`);
    console.log(`Database: ${url.pathname.slice(1)}`);
    console.log(`Usuário: ${url.username}`);
    console.log(`Senha: ${url.password ? '***' + url.password.slice(-4) : 'Não definida'}`);
  } catch (e) {
    console.log("❌ URL inválida:", e.message);
  }
}

// Testar conexão direta com a URL
const { PrismaClient } = require("./src/src/generated/prisma");

async function testDirectConnection() {
  console.log("\n🔄 Testando conexão direta com Prisma:");
  
  const prisma = new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    console.log("Tentando conectar...");
    await prisma.$connect();
    console.log("✅ Conexão estabelecida!");
    
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Query funcionou:", result);
    
    const count = await prisma.vehicle.count();
    console.log(`✅ Total de veículos: ${count}`);
    
  } catch (error) {
    console.error("❌ Erro:", error.message);
    console.error("Código:", error.code);
  } finally {
    await prisma.$disconnect();
  }
}

testDirectConnection();