"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Calendar,
  TrendingUp,
  Info,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SalesByCategoryChart } from "./SalesByCategoryChart";
import { PeriodSelector } from "./PeriodSelector";

export function Dashboard({ initialData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");

  const selectedPeriod = searchParams.get("period") || "monthly";

  const handlePeriodChange = (period) => {
    const params = new URLSearchParams(searchParams);
    params.set("period", period);
    router.push(`?${params.toString()}`);
  };

  if (!initialData || !initialData.success) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          {initialData?.error || "Falha ao carregar os dados do dashboard"}
        </AlertDescription>
      </Alert>
    );
  }

  const { cars, testDrives, salesByCategory } = initialData.data;

  const safePercentage = (value, total) => {
    if (!total) return "0.0";
    return ((value / total) * 100).toFixed(1);
  };

  const safePercentageInt = (value, total) => {
    if (!total) return "0";
    return ((value / total) * 100).toFixed(0);
  };

  return (
    <div className="space-y-6 px-8">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="test-drives">Test Drives</TabsTrigger>
          </TabsList>

          {activeTab === "overview" && (
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
            />
          )}
        </div>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Veículos
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cars.total}</div>
                <p className="text-xs text-muted-foreground">
                  {cars.available} disponíveis, {cars.sold} vendidos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Test Drives
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.total}</div>
                <p className="text-xs text-muted-foreground">
                  {testDrives.pending} pendentes, {testDrives.confirmed}{" "}
                  confirmados
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Conversão
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {testDrives.conversionRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  De test drives para vendas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Veículos Vendidos
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cars.sold}</div>
                <p className="text-xs text-muted-foreground">
                  {safePercentage(cars.sold, cars.total)}% do inventário
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SalesByCategoryChart data={salesByCategory} />
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg font-bold">Próximos Agendamentos</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testDrives.recentBookings && testDrives.recentBookings.length > 0 ? (
                      testDrives.recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold">{booking.clientName || booking.user?.name || "Cliente"}</p>
                              <p className="text-xs text-muted-foreground">
                                {booking.Vehicle?.brand?.name} {booking.Vehicle?.model} - {booking.startTime}
                              </p>
                            </div>
                          </div>
                          <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'outline'} className="text-[10px]">
                            {booking.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4 text-sm">Nenhum agendamento para hoje.</p>
                    )}
                  </div>
                  <Button variant="link" className="w-full mt-2 text-blue-600" onClick={() => setActiveTab("test-drives")}>
                    Ver todos os agendamentos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo da Concessionária</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-sm mb-2">
                          Inventário de Veículos
                        </h3>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{
                                width: `${safePercentageInt(
                                  cars.available,
                                  cars.total
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm">
                            {safePercentageInt(cars.available, cars.total)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Capacidade do inventário disponível
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-sm mb-2">
                          Sucesso dos Test Drives
                        </h3>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${safePercentageInt(
                                  testDrives.completed,
                                  testDrives.total
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm">
                            {safePercentageInt(
                              testDrives.completed,
                              testDrives.total
                            )}
                            %
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Test drives concluídos
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-blue-600">
                          {cars.sold}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Veículos Vendidos
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-amber-600">
                          {testDrives.pending + testDrives.confirmed}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Próximos Test Drives
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-green-600">
                          {safePercentageInt(cars.available, cars.total)}%
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Utilização do Inventário
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="test-drives" className="space-y-6 mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Agendamentos
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.pending}</div>
                <p className="text-xs text-muted-foreground">
                  {safePercentage(testDrives.pending, testDrives.total)}% de
                  agendamentos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Confirmados
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.confirmed}</div>
                <p className="text-xs text-muted-foreground">
                  {safePercentage(testDrives.confirmed, testDrives.total)}% de
                  agendamentos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.completed}</div>
                <p className="text-xs text-muted-foreground">
                  {safePercentage(testDrives.completed, testDrives.total)}% de
                  agendamentos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.cancelled}</div>
                <p className="text-xs text-muted-foreground">
                  {safePercentage(testDrives.cancelled, testDrives.total)}% de
                  agendamentos
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Test Drive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Taxa de Conversão
                    </h3>
                    <div className="text-3xl font-bold text-blue-600">
                      {testDrives.conversionRate}%
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Test drives que resultaram em compra
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Taxa de Conclusão
                    </h3>
                    <div className="text-3xl font-bold text-green-600">
                      {safePercentage(testDrives.completed, testDrives.total)}%
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Test drives concluídos com sucesso
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <h3 className="font-medium">
                    Detalhamento de Status de Agendamento
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pendentes</span>
                      <span className="font-medium">
                        {testDrives.pending} (
                        {safePercentage(testDrives.pending, testDrives.total)}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-amber-500 h-2.5 rounded-full"
                        style={{
                          width: `${safePercentage(
                            testDrives.pending,
                            testDrives.total
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confirmados</span>
                      <span className="font-medium">
                        {testDrives.confirmed} (
                        {safePercentage(
                          testDrives.confirmed,
                          testDrives.total
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{
                          width: `${safePercentage(
                            testDrives.confirmed,
                            testDrives.total
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Concluídos</span>
                      <span className="font-medium">
                        {testDrives.completed} (
                        {safePercentage(
                          testDrives.completed,
                          testDrives.total
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${safePercentage(
                            testDrives.completed,
                            testDrives.total
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cancelados</span>
                      <span className="font-medium">
                        {testDrives.cancelled} (
                        {safePercentage(
                          testDrives.cancelled,
                          testDrives.total
                        )}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{
                          width: `${safePercentage(
                            testDrives.cancelled,
                            testDrives.total
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Não Compareceu</span>
                      <span className="font-medium">
                        {testDrives.noShow} (
                        {safePercentage(testDrives.noShow, testDrives.total)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gray-500 h-2.5 rounded-full"
                        style={{
                          width: `${safePercentage(
                            testDrives.noShow,
                            testDrives.total
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}