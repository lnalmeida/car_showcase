import { getAllVehicles } from "@/actions/vehicleCatalog";
import { getFeaturedVehicles } from "@/actions/home";

export default async function DebugPage() {
  let allVehiclesResult = null;
  let featuredVehiclesResult = null;
  let errors = [];

  // Teste getAllVehicles
  try {
    allVehiclesResult = await getAllVehicles();
  } catch (error) {
    errors.push(`getAllVehicles: ${error.message}`);
  }

  // Teste getFeaturedVehicles
  try {
    featuredVehiclesResult = await getFeaturedVehicles(8);
  } catch (error) {
    errors.push(`getFeaturedVehicles: ${error.message}`);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Debug da Aplicação</h1>
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-red-800 font-semibold mb-2">❌ Erros Encontrados:</h2>
          <ul className="text-red-600 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* getAllVehicles */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">📋 getAllVehicles</h2>
          {allVehiclesResult ? (
            allVehiclesResult.success ? (
              <div className="text-green-600">
                <p className="font-medium">✅ Sucesso!</p>
                <p>Total: {allVehiclesResult.data.length} veículos</p>
                {allVehiclesResult.data.length > 0 && (
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Primeiro veículo:</p>
                    <p>{allVehiclesResult.data[0].vehicleBrand} {allVehiclesResult.data[0].model}</p>
                    <p>R$ {allVehiclesResult.data[0].price}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-600">
                <p className="font-medium">❌ Erro:</p>
                <p>{allVehiclesResult.error}</p>
              </div>
            )
          ) : (
            <p className="text-gray-500">Não executado devido a erro</p>
          )}
        </div>

        {/* getFeaturedVehicles */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">⭐ getFeaturedVehicles</h2>
          {featuredVehiclesResult ? (
            featuredVehiclesResult.success ? (
              <div className="text-green-600">
                <p className="font-medium">✅ Sucesso!</p>
                <p>Total: {featuredVehiclesResult.data.length} veículos em destaque</p>
                {featuredVehiclesResult.data.length > 0 && (
                  <div className="mt-2 text-sm space-y-1">
                    <p className="font-medium">Veículos em destaque:</p>
                    {featuredVehiclesResult.data.slice(0, 3).map((vehicle, index) => (
                      <p key={index}>
                        {vehicle.vehicleBrand} {vehicle.model} ({vehicle.year})
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-600">
                <p className="font-medium">❌ Erro:</p>
                <p>{featuredVehiclesResult.message}</p>
              </div>
            )
          ) : (
            <p className="text-gray-500">Não executado devido a erro</p>
          )}
        </div>
      </div>

      {/* Informações do ambiente */}
      <div className="mt-6 bg-gray-50 border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">🔧 Informações do Ambiente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'undefined'}</p>
            <p><strong>DATABASE_URL:</strong> {process.env.DATABASE_URL ? '✅ Definida' : '❌ Não definida'}</p>
            <p><strong>DIRECT_URL:</strong> {process.env.DIRECT_URL ? '✅ Definida' : '❌ Não definida'}</p>
          </div>
          <div>
            {process.env.DATABASE_URL && (
              <>
                <p><strong>Host:</strong> {new URL(process.env.DATABASE_URL).hostname}</p>
                <p><strong>Porta:</strong> {new URL(process.env.DATABASE_URL).port}</p>
                <p><strong>Database:</strong> {new URL(process.env.DATABASE_URL).pathname.slice(1)}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a 
          href="/" 
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ← Voltar para Home
        </a>
      </div>
    </div>
  );
}