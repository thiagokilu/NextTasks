import Image from "next/image";
import Logo from "../public/img/logo.png";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm lg:px-10 lg:py-5">
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="TaskApp Logo"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-medium text-green-700 transition-colors rounded-md lg:text-base hover:bg-green-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2.5 text-sm font-medium text-white transition-colors bg-green-600 rounded-md shadow-sm lg:text-base hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="px-6 mx-auto max-w-7xl lg:px-10">
        <section className="grid items-center gap-12 py-16 lg:py-20 md:grid-cols-2 lg:gap-16">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl text-green-700">
                Mantenha a organização{" "}
                <span className="text-transparent bg-gradient-to-r from-green-600 to-green-500 bg-clip-text">
                  e o foco
                </span>
              </h1>

              <p className="text-lg text-gray-600 lg:text-xl">
                Gerencie suas tarefas de forma simples, rápida e eficiente,
                aumentando sua produtividade todos os dias.
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-3">
              {[
                "Controle total das tarefas",
                "Organização intuitiva",
                "Acompanhe seu progresso",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-green-100 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <button className="px-8 py-3 text-lg font-semibold text-white transition-all bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Começar agora
                </button>
              </Link>
              <button className="px-8 py-3 text-lg font-semibold text-green-700 transition-all bg-transparent border-2 border-green-600 rounded-lg hover:bg-green-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Saiba mais
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center order-first md:order-last">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl transform rotate-3 scale-105 blur-xl opacity-50" />

              {/* Main Image */}
              <img
                src="https://placehold.co/600x400/png"
                alt="TaskApp Dashboard Preview"
                width={600}
                height={400}
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 lg:py-28">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold lg:text-4xl text-green-700">
              Por que usar nossa plataforma?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 lg:text-lg">
              Descubra como podemos ajudar você a alcançar seus objetivos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Organização",
                description:
                  "Tenha todas as suas tarefas bem organizadas e acessíveis em um só lugar.",
                icon: "📋",
              },
              {
                title: "Produtividade",
                description:
                  "Foque no que realmente importa e produza mais com nossas ferramentas.",
                icon: "⚡",
              },
              {
                title: "Simplicidade",
                description:
                  "Interface limpa, moderna e fácil de usar para todos os perfis.",
                icon: "🎯",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3 lg:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-1 mt-6 bg-green-200 rounded-full group-hover:w-20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-8 mt-12 text-center bg-white border-t border-gray-200 lg:mt-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-500 lg:text-base">
            © {new Date().getFullYear()} TaskApp. Todos os direitos reservados.
          </p>

          {/* Optional Footer Links */}
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
            <a href="#" className="hover:text-green-600 transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
