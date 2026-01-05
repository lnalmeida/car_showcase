async function testSupabaseAPI() {
  console.log("🌐 TESTANDO API REST DO SUPABASE");
  console.log("================================\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log(`URL: ${supabaseUrl}`);
  console.log(`Key: ${supabaseKey ? '***' + supabaseKey.slice(-10) : 'Não definida'}\n`);

  if (!supabaseUrl || !supabaseKey) {
    console.log("❌ Credenciais da API não encontradas no .env");
    return;
  }

  try {
    // Teste simples da API REST
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    console.log(`Status da resposta: ${response.status}`);
    
    if (response.ok) {
      console.log("✅ API REST do Supabase está acessível!");
      console.log("   O problema pode ser específico da conexão PostgreSQL");
    } else {
      console.log("❌ API REST não acessível");
      const text = await response.text();
      console.log(`   Resposta: ${text.slice(0, 200)}`);
    }

  } catch (error) {
    console.log(`❌ Erro ao acessar API: ${error.message}`);
  }
}

testSupabaseAPI();