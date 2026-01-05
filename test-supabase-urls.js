const { PrismaClient } = require("./src/src/generated/prisma");

async function testDifferentUrls() {
  console.log("🔍 TESTANDO DIFERENTES URLs DO SUPABASE");
  console.log("=========================================\n");

  const urls = [
    {
      name: "URL com Pooling (porta 6543)",
      url: "postgresql://postgres.cqshaavtqfxsjjhzulbg:jl6fFTykAuVvhARY@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    },
    {
      name: "URL Direta (porta 5432)",
      url: "postgresql://postgres.cqshaavtqfxsjjhzulbg:jl6fFTykAuVvhARY@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
    },
    {
      name: "URL sem pgbouncer",
      url: "postgresql://postgres.cqshaavtqfxsjjhzulbg:PlwN8KZNbPKkabwV@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
    }
  ];

  for (const { name, url } of urls) {
    console.log(`🧪 Testando: ${name}`);
    
    const prisma = new PrismaClient({
      datasources: {
        db: { url }
      }
    });

    try {
      await prisma.$queryRaw`SELECT 1 as test`;
      console.log(`✅ SUCESSO com ${name}!`);
      console.log(`   URL: ${url}\n`);
      await prisma.$disconnect();
      return url; // Retorna a primeira URL que funcionar
    } catch (error) {
      console.log(`❌ Falhou: ${error.code || 'UNKNOWN'} - ${error.message.split('\n')[0]}`);
      await prisma.$disconnect();
    }
  }

  console.log("\n❌ Nenhuma URL funcionou. Possíveis causas:");
  console.log("1. Projeto Supabase pausado/inativo");
  console.log("2. Credenciais incorretas");
  console.log("3. Firewall bloqueando conexão");
  console.log("4. Problema temporário no Supabase");
  
  return null;
}

testDifferentUrls();