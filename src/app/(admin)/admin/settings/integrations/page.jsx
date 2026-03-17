"use client";

import React, { useEffect, useState } from "react";
import { getDealershipInfo, updateIntegrationSettings } from "@/actions/dealership";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ExternalLink, Zap } from "lucide-react";

export default function IntegrationsSettingsPage() {
  const [settings, setSettings] = useState({
    leadIntegration: "NONE",
    leadWebhookUrl: "",
    leadApiKey: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const result = await getDealershipInfo();
      if (result.success && result.data) {
        setSettings({
          leadIntegration: result.data.leadIntegration || "NONE",
          leadWebhookUrl: result.data.leadWebhookUrl || "",
          leadApiKey: result.data.leadApiKey || "",
        });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const result = await updateIntegrationSettings(settings);
    if (result.success) {
      toast.success("Configurações de integração salvas!");
    } else {
      toast.error(result.error || "Ocorreu um erro ao salvar.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4" />
        <p className="text-gray-500 font-medium">Carregando integrações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="border-blue-100 bg-blue-50/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Integração de Leads</CardTitle>
              <CardDescription>
                Configure como os leads capturados no site devem ser enviados para ferramentas externas.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-bold text-gray-700">Provedor de Leads</label>
            <Select 
              value={settings.leadIntegration} 
              onValueChange={(val) => setSettings({ ...settings, leadIntegration: val })}
            >
              <SelectTrigger className="w-full md:w-80">
                <SelectValue placeholder="Escolha um provedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NONE">Desabilitar Integração Externa</SelectItem>
                <SelectItem value="RDSTATION">RD Station (via API Key)</SelectItem>
                <SelectItem value="WEBHOOK">Webhook Personalizado (Zapier, etc)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.leadIntegration === "RDSTATION" && (
            <div className="space-y-4 pt-4 border-t animate-in fade-in slide-in-from-top-2">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-700">Token da API do RD Station</label>
                  <a 
                    href="https://app.rdstation.com.br/configuracoes/integracoes" 
                    target="_blank" 
                    className="text-blue-600 flex items-center gap-1 hover:underline"
                  >
                    Onde encontro meu token? <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Input 
                  type="password"
                  placeholder="Seu Token Privado" 
                  value={settings.leadApiKey}
                  onChange={(e) => setSettings({ ...settings, leadApiKey: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  Os dados serão enviados automaticamente como conversões CDP para sua conta RD Station.
                </p>
              </div>
            </div>
          )}

          {settings.leadIntegration === "WEBHOOK" && (
            <div className="space-y-4 pt-4 border-t animate-in fade-in slide-in-from-top-2">
              <div className="grid gap-2">
                <label className="text-sm font-bold text-gray-700">URL do Webhook</label>
                <Input 
                  placeholder="https://hooks.zapier.com/..." 
                  value={settings.leadWebhookUrl}
                  onChange={(e) => setSettings({ ...settings, leadWebhookUrl: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  Enviaremos uma requisição POST em formato JSON contendo todos os dados do lead para esta URL.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t flex justify-end">
            <Button disabled={saving} onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {saving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Integrações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-orange-50 rounded-lg border border-orange-100 p-4">
        <h4 className="text-sm font-bold text-orange-800 mb-1 flex items-center gap-2">
           Dica de Segurança
        </h4>
        <p className="text-xs text-orange-700 leading-relaxed font-medium">
          Ao desabilitar uma integração ou trocar de provedor, os leads continuarão sendo salvos no banco de dados local da plataforma, garantindo que nenhum contato seja perdido durante a transição.
        </p>
      </div>
    </div>
  );
}
