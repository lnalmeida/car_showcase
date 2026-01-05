const { PrismaClient } = require("./src/src/generated/prisma");

async function diagnoseConnection() {
  console.log("🔍 DIAGNÓSTICO DA CONEXÃO COM O BANCO");
  console.log("=====================================\n");
  
  // Verificar variáveis de ambiente
  console.log("📋 Verificando variáveis de ambiente:");
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Definida' : '❌ Não definida'}`);
  console.log(`DIRECT_URL: ${process.env.DIRECT_URL ? '✅ Definida' : '❌ Não definida'}`);
  
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    console.log(`Host: ${url.hostname}`);
    console.log(`Porta: ${url.port}`);
    console.log(`Database: ${url.pathname.slice(1)}`);
    console.log(`Usuário: ${url.username}`);
    console.log(`Senha: ${url.password ? '***' + url.password.slice(-4) : 'Não definida'}`);
  }
  
  console.log("\n🔄 Testando conexões...\n");
  
  // Teste 1: Conexão com pooling
  console.log("1️⃣ Testando conexão com pooling (DATABASE_URL):");
  const prismaPooling = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  
  try {
    await prismaPooling.$queryRaw`SELECT 1 as test`;
    console.log("✅ Conexão com pooling funcionando!");
  } catch (error) {
    console.log(`❌ Erro com pooling: ${error.code} - ${error.message}`);
  } finally {
    await prismaPooling.$disconnect();
  }
  
  // Teste 2: Conexão direta
  console.log("\n2️⃣ Testando conexão direta (DIRECT_URL):");
  const prismaDirect = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DIRECT_URL
      }
    }
  });
  
  try {
    await prismaDirect.$queryRaw`SELECT 1 as test`;
    console.log("✅ Conexão direta funcionando!");
  } catch (error) {
    console.log(`❌ Erro com conexão direta: ${error.code} - ${error.message}`);
  } finally {
    await prismaDirect.$disconnect();
  }
  
  console.log("\n💡 SOLUÇÕES POSSÍVEIS:");
  console.log("1. Verifique se o projeto Supabase está ativo no dashboard");
  console.log("2. Confirme se a senha do banco está correta");
  console.log("3. Verifique se não há firewall bloqueando a conexão");
  console.log("4. Tente resetar a senha do banco no Supabase");
  console.log("5. Verifique se o plano do Supabase não expirou");
}

diagnoseConnection();