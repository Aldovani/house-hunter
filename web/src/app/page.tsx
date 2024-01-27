import { Link } from '@/components/ui/Link'
import Image from 'next/image'
import {
  ArrowUpRight,
  Timer,
  Smile,
  ShieldCheck,
  List,
  Search,
  Eye,
  Calendar,
  Quote,
  Twitter,
  Github,
  Linkedin,
} from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className="min-h-screen after:absolute after:block w-full relative after:-z-10  after:top-0 after:right-0 after:w-1/2 after:h-full after:bg-indigo-700">
        <div className="container mx-auto">
          <header className=" pt-4 flex  items-center justify-between">
            <h2 className="text-indigo-700 text-2xl font-semibold">
              House-Hunter
            </h2>

            <div className="flex items-center gap-8">
              <Link variant="ghost" href="/sign-in" className="text-slate-50">
                Entrar
              </Link>
              <Link variant="secondary" href="/register" className=" px-6 ">
                Cadastra-se
              </Link>
            </div>
          </header>

          <main className="mt-24">
            <div className="max-w-lg">
              <h1 className="text-slate-900 text-5xl font-semibold  leading-[120%]  ">
                A <span className="text-indigo-700">caça</span> à casa perfeita
                nunca foi tão <span className="text-indigo-700">fácil</span>.
              </h1>
              <p className="text-slate-400  mt-3">
                Encontre a casa dos seus sonhos em nossa plataforma intuitiva e
                amigável. Experimente agora!
              </p>
              <Link className="mt-4 max-w-60" href="/houses">
                Procurar
              </Link>
            </div>

            <div></div>
          </main>
        </div>
        <div className="bg-hero w-full h-full bg-no-repeat bg-contain pointer-events-none -z-[9] bg-right absolute  top-0 right-0  "></div>
      </div>

      <section>
        <div className="container mx-auto flex justify-between items-center mt-20">
          <h2 className="max-w-md font-medium text-slate-900 text-[2.5rem] leading-[120%]">
            Descubra como nosso
            <span className="text-indigo-700"> serviço </span>
            pode transformar sua
            <span className="text-indigo-700"> vida</span>
          </h2>
          <div>
            <p className="max-w-xl text-slate-500 text-right">
              Com o <span className="font-medium">House-Hunter</span>, você
              encontra o imóvel ideal em três passos simples: pesquise, filtre e
              agende uma visita. Explore as opções de imóveis disponíveis e
              encontre a casa dos seus sonhos hoje mesmo.
            </p>
            <Link variant="link" className="text-right" href="/maps">
              procurar imóvel
            </Link>
          </div>
        </div>

        <div className="mt-28 flex ">
          <div className="relative flex items-end w-full  h-[27.5rem]">
            <div className="absolute inset-0 bg-house-linear w-full h-full "></div>
            <Image
              fill
              className="object-cover -z-[1]"
              alt=""
              src="/assets/imgs/house-1.png"
            />

            <footer className="relative w-full  z-10 flex items-center justify-between px-8 pb-8">
              <div>
                <h3 className="text-2xl text-slate-50 font-medium">Casas</h3>
                <p className="text-slate-200">230 unidades disponíveis</p>
              </div>

              <ArrowUpRight className="text-slate-50" size={24} />
            </footer>
          </div>
          <div className="relative flex items-end w-full h-[27.5rem]">
            <div className="absolute inset-0 bg-house-linear w-full h-full "></div>
            <Image
              fill
              alt=""
              className="object-cover -z-[1]"
              src="/assets/imgs/house-2.png"
            />

            <footer className="relative w-full  z-10 flex items-center justify-between px-8 pb-8">
              <div>
                <h3 className="text-2xl text-slate-50 font-medium">
                  Apartamentos
                </h3>
                <p className="text-slate-200">230 unidades disponíveis</p>
              </div>

              <ArrowUpRight className="text-slate-50" size={24} />
            </footer>
          </div>
          <div className="relative flex items-end w-full h-[27.5rem]">
            <div className="absolute inset-0  bg-house-linear w-full h-full "></div>
            <Image
              fill
              alt=""
              className="object-cover -z-[1]"
              src="/assets/imgs/house-3.png"
            />

            <footer className="relative w-full  z-10 flex items-center justify-between px-8 pb-8">
              <div>
                <h3 className="text-2xl text-slate-50 font-medium">Vilas</h3>
                <p className="text-slate-200">230 unidades disponíveis</p>
              </div>

              <ArrowUpRight className="text-slate-50" size={24} />
            </footer>
          </div>
        </div>
      </section>

      <section className=" mt-32 flex ">
        <div className="relative ">
          <Image
            alt=""
            className=" rounded-lg -translate-x-[6.25rem]"
            width={548}
            height={700}
            src={'/assets/imgs/house-services.png'}
          />
        </div>
        <div className="py-8">
          <h2 className="max-w-xl font-medium text-slate-900 text-[2.5rem] leading-[120%]">
            Conheça os
            <span className="text-indigo-700"> benefícios </span>
            do nosso
            <span className="text-indigo-700"> serviço </span>
            de busca
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti
          </p>

          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 max-w-[50rem] pr-16">
            <div className="px-6 py-8 border border-slate-200 rounded-lg">
              <Timer size={24} className="text-indigo-700" />
              <h4 className="font-medium text-lg text-indigo-700 mt-5">
                Economize tempo
              </h4>
              <p className="text-gray-500 text-sm mt-2">
                pesquise, filtre e agende visitas com apenas alguns cliques
              </p>
            </div>
            <div className="px-6 py-8 border border-slate-200 rounded-lg">
              <List size={24} className="text-indigo-700" />
              <h4 className="font-medium text-lg text-indigo-700 mt-5">
                Opções personalizadas
              </h4>
              <p className="text-gray-500 text-sm mt-2">
                escolha filtros específicos para encontrar o imóvel perfeito
                para você
              </p>
            </div>
            <div className="px-6 py-8 border border-slate-200 rounded-lg">
              <ShieldCheck size={24} className="text-indigo-700" />
              <h4 className="font-medium text-lg text-indigo-700 mt-5">
                Confiança
              </h4>
              <p className="text-gray-500 text-sm mt-2">
                conte com um serviço confiável e seguro para encontrar o imóvel
                ideal para você{' '}
              </p>
            </div>
            <div className="px-6 py-8 border border-slate-200 rounded-lg">
              <Smile size={24} className="text-indigo-700" />
              <h4 className="font-medium text-lg text-indigo-700 mt-5">
                Facilidade de uso{' '}
              </h4>
              <p className="text-gray-500 text-sm mt-2">
                interface intuitiva e fácil de usar para que você encontre o que
                precisa rapidamente
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-36">
        <h2 className="max-w-lg font-medium text-slate-900 text-[2.5rem] leading-[120%]">
          Veja como é simples e<span className="text-indigo-700"> fácil </span>
          alugar um
          <span className="text-indigo-700"> imóvel </span>
        </h2>

        <div className="flex justify-between items-center gap-8 mt-12">
          <div className=" border border-slate-200 p-8 rounded-xl">
            <header className=" flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Search size={32} className="text-indigo-700" />
                <h4 className="text-2xl font-semibold text-slate-900">
                  Busque
                </h4>
              </div>

              <span className="text-slate-500 font-semibold  border border-slate-200 rounded-full size-8 flex items-center justify-center">
                1
              </span>
            </header>

            <p className="mt-6 text-slate-400 text-sm">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="  border border-slate-200 p-8 rounded-xl">
            <header className=" flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Calendar size={32} className="text-indigo-700" />
                <h4 className="text-2xl font-semibold text-slate-900">
                  Agende
                </h4>
              </div>

              <span className="text-slate-500 font-semibold  border border-slate-200 rounded-full size-8 flex items-center justify-center">
                2
              </span>
            </header>

            <p className="mt-6 text-slate-400 text-sm">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="  border border-slate-200 p-8 rounded-xl">
            <header className=" flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Eye size={32} className="text-indigo-700" />
                <h4 className="text-2xl font-semibold text-slate-900">
                  Visite
                </h4>
              </div>

              <span className="text-slate-500 font-semibold  border border-slate-200 rounded-full size-8 flex items-center justify-center">
                3
              </span>
            </header>

            <p className="mt-6 text-slate-400 text-sm">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16  mt-16">
        <div className="container mx-auto">
          <h2 className="max-w-xl font-medium text-slate-900 text-[2.5rem] leading-[120%]">
            Experiências{' '}
            <span className="text-indigo-700"> inesquecíveis </span> de{' '}
            <span className="text-indigo-700"> nossos </span> clientes
          </h2>
        </div>

        <div className="grid grid-cols-testimonials justify-center gap-10  overflow-hidden">
          <div className=" mt-20 rounded-xl border border-slate-200 bg-slate-50 w-5xl px-24 pt-20 pb-11 relative">
            <div className="flex items-center justify-center  size-16 bg-indigo-700 rounded-full absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <Quote size={32} className="text-slate-50  " />
            </div>

            <p className="text-slate-500 text-xl text-center ">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis
              condimentum ac, vestibulum eu nisl.
            </p>
            <span className="mt-8 text-slate-400 text-xl text-center block">
              josé de palma da silva - Micro empresario
            </span>
          </div>
          <div className=" mt-20 rounded-xl border border-slate-200 bg-slate-50 w-5xl px-24 pt-20 pb-11 relative">
            <div className="flex items-center justify-center  size-16 bg-indigo-700 rounded-full absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <Quote size={32} className="text-slate-50  " />
            </div>

            <p className="text-slate-500 text-xl text-center ">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis
              condimentum ac, vestibulum eu nisl.
            </p>
            <span className="mt-8 text-slate-400 text-xl text-center block">
              josé de palma da silva - Micro empresario
            </span>
          </div>
          <div className=" mt-20 rounded-xl border border-slate-200 bg-slate-50 w-5xl px-24 pt-20 pb-11 relative">
            <div className="flex items-center justify-center  size-16 bg-indigo-700 rounded-full absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <Quote size={32} className="text-slate-50  " />
            </div>

            <p className="text-slate-500 text-xl text-center ">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis
              condimentum ac, vestibulum eu nisl.
            </p>
            <span className="mt-8 text-slate-400 text-xl text-center block">
              josé de palma da silva - Micro empresario
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-32 grid grid-cols-2 gap-8">
        <div className=" grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="p-10 border border-slate-200 rounded-lg">
            <h4 className="text-center text-5xl text-indigo-700 font-semibold">
              +10 mil
            </h4>
            <p className="text-center text-slate-400 mt-3">Imóveis vendidos</p>
          </div>
          <div className="p-10 border border-slate-200 rounded-lg">
            <h4 className="text-center text-5xl text-indigo-700 font-semibold">
              +50 mil{' '}
            </h4>
            <p className="text-center text-slate-400 mt-3">
              Imóveis disponíveis{' '}
            </p>
          </div>
          <div className="p-10 flex items-center justify-center flex-col border border-slate-200 rounded-lg col-start-1 col-end-3">
            <h4 className="text-center text-5xl text-indigo-700 font-semibold">
              +100.000.000
            </h4>
            <p className="text-center text-slate-400 mt-3">
              Visitas realizadas
            </p>
          </div>
        </div>

        <div className="bg-indigo-700 p-8 rounded-xl relative">
          <h2 className="text-slate-50 text-[2.5rem] font-medium leading-[120%] max-w-[25rem]">
            Por que somos a sua melhor escolha
          </h2>
          <p className="text-sm text-slate-100 max-w-72 mt-2">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum
          </p>
          <Link
            variant="link"
            className="mt-5 text-slate-50 text-left w-fit"
            href="/register"
          >
            Cadastra-se
          </Link>

          <Image
            src="/assets/imgs/house-choose.png"
            width={340}
            height={190}
            alt=""
            className="absolute right-0 bottom-0"
          />
        </div>
      </section>

      <footer className="border-t border-slate-200 mt-32">
        <div className="container mx-auto flex  justify-between items-center py-6">
          <div className="max-w-[18.75rem]">
            <span className="text-indigo-700 text-2xl font-semibold">
              House-Hunter
            </span>
            <p className="text-slate-400 text-sm ">
              Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum
            </p>
            <div className="flex items-center gap-8 mt-6">
              <Twitter size={24} className="text-slate-400" />
              <Github size={24} className="text-slate-400" />
              <Linkedin size={24} className="text-slate-400" />
            </div>
          </div>

          <div>
            <nav className="flex gap-32 ">
              <div>
                <span className="text-slate-500 font-medium mb-3">Suporte</span>
                <ul className="flex flex-col gap-2">
                  <li className="text-slate-400 text-sm">Centra de ajuda</li>
                  <li className="text-slate-400 text-sm">Feedback</li>
                  <li className="text-slate-400 text-sm">Worem</li>
                </ul>
              </div>

              <div>
                <span className="text-slate-500 font-medium mb-3">Links</span>
                <ul className="flex flex-col gap-2">
                  <li className="text-slate-400 text-sm">Sobre nos</li>
                  <li className="text-slate-400 text-sm">Serviços</li>
                  <li className="text-slate-400 text-sm">FAQ</li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="container mx-auto flex items-center justify-between">
            <span className="text-slate-400 text-sm">
              © 2024 House-Hunter. Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-10 py-4">
              <span className="text-slate-400 text-sm">
                Politica de privacidade
              </span>
              <span className="text-slate-400 text-sm">Termo e condições</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
