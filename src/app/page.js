import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      {/*<Hero />*/}

      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1>Encontre o carro dos seus sonhos na JF Veículos</h1>
            <p>
              Pesquisa avançada de carros usando IA e agendamento de visitas e
              test-drive para nossos veículos.
            </p>
          </div>
          {/* <Search /> */}
        </div>
      </section>
    </div>
  );
}
