import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
};

let client;
let clientPromise;

if (!uri) {
  console.warn("MONGODB_URI não encontrado nas variáveis de ambiente. Logs desativados.");
} else {
  if (process.env.NODE_ENV === "development") {
    // No modo desenvolvimento, usamos uma variável global para preservar a conexão entre recarregamentos do HMR
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // Em produção, criamos uma nova conexão singleton
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

/**
 * Função centralizada para registrar eventos no MongoDB Atlas.
 * Executa de forma assíncrona (fire-and-forget) para não impactar a performance.
 * 
 * @param {string} actionType - Identificador do tipo de ação (ex: "vehicle_update")
 * @param {Object} details - Detalhes específicos do evento
 * @param {Object} user - Informações do usuário (opcional)
 * @param {Object} error - Erro associado (opcional)
 */
export function logEvent(actionType, details = {}, user = null, error = null) {
  // Verifica se o log está ativado globalmente
  const isEnabled = process.env.ENABLE_LOGGING === "true";
  
  if (!isEnabled || !clientPromise) {
    return;
  }

  // Padrão Fire-and-Forget: não usamos 'await' aqui
  clientPromise
    .then(async (client) => {
      const db = client.db("car_showcase_logs");
      const collection = db.collection("events");

      const logEntry = {
        action_type: actionType,
        timestamp: new Date(),
        user: user ? {
          id: user.id || user.clerkUserId,
          name: user.name || user.fullName,
          email: user.email || user.primaryEmailAddress,
          role: user.role
        } : "System/Anonymous",
        details: details,
        error: error ? {
          message: error.message,
          stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        } : null,
        metadata: {
          environment: process.env.NODE_ENV,
        }
      };

      await collection.insertOne(logEntry);
    })
    .catch((err) => {
      console.error("Erro crítico ao gravar log no MongoDB:", err.message);
    });
}
