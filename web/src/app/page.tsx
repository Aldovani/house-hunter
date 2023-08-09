import Link from 'next/link'
import styles from './page.module.scss'
import { FiSmile, FiShield, FiClock, FiList } from 'react-icons/fi'
export default function Home() {
  return (
    <>
      <header className={`${styles.container} ${styles.header}`}>
        <h2 className={styles.logo}>House-Hunter</h2>
        <Link href="/auth/login" className={styles.button}>
          Entrar
        </Link>
      </header>
      <div className={styles['bg-hero']}></div>

      <div className={`${styles.main} ${styles.container}`}>
        <h1>
          A caça à casa <span>perfeita</span> nunca foi tão fácil.
        </h1>
        <p>
          Encontre a casa dos seus sonhos em nossa plataforma intuitiva e
          amigável. Experimente agora!
        </p>
        <Link href="/maps">Procurar</Link>
      </div>

      <section className={styles.services}>
        <div className={styles.container}>
          <div>
            <h2 className={styles.subtitle}>
              Descubra como nosso serviço pode transformar sua <span>vida</span>
            </h2>
            <p>
              Com o House-Hunter, você encontra o imóvel ideal em três passos
              simples: pesquise, filtre e agende uma visita. Explore as opções
              de imóveis disponíveis e encontre a casa dos seus sonhos hoje
              mesmo.
            </p>
            <p>
              Encontre sua casa dos sonhos hoje mesmo!
              <Link href="/maps">Comece agora</Link>.
            </p>
          </div>
          <div className={styles.images}>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.benefits}`}>
        <div className={styles.images}>
          <div className={styles.image}></div>
          <div className={styles.image}></div>
          <div className={styles.image}></div>
          <div className={styles.image}></div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.subtitle}>
            conheça os <span>benefícios</span> do nosso serviço de busca
          </h2>

          <div>
            <div className={styles.benefit}>
              <div>
                <div className={styles.icon}>
                  <FiClock size={24} color="#2563EB" />
                </div>
                <h5>Economize tempo</h5>
              </div>
              <p>pesquise, filtre e agende visitas com apenas alguns cliques</p>
            </div>

            <div className={styles.benefit}>
              <div>
                <div className={styles.icon}>
                  <FiShield size={24} color="#2563EB" />
                </div>
                <h5>Confiança</h5>
              </div>
              <p>
                conte com um serviço confiável e seguro para encontrar o imóvel
                ideal para você
              </p>
            </div>

            <div className={styles.benefit}>
              <div>
                <div className={styles.icon}>
                  <FiSmile size={24} color="#2563EB" />
                </div>
                <h5>Facilidade de uso</h5>
              </div>
              <p>
                interface intuitiva e fácil de usar para que você encontre o que
                precisa rapidamente
              </p>
            </div>

            <div className={styles.benefit}>
              <div>
                <div className={styles.icon}>
                  <FiList size={24} color="#2563EB" />
                </div>
                <h5>Opções personalizadas</h5>
              </div>
              <p>
                escolha filtros específicos para encontrar o imóvel perfeito
                para você
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.houses}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.subtitle}>
              Casas <span>Incríveis</span> à sua Escolha!
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, earum. Libero esse cumque accusamus minima unde
              debitis recusandae vel commodi quaerat optio?
            </p>
          </div>

          <div className={styles.images}>
            <div className={styles.image} />
            <div className={styles.image} />
            <div className={styles.image} />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <h3 className={styles.logo}>House-hunter</h3>
          <span>
            feito com 💙 por{' '}
            <Link target="_blank" href="http://aldovani.github.io/portfolio">
              aldovani
            </Link>
          </span>

          <div>
            <Link href="https://linkedin.com/in/aldovani">Linkedin</Link>
            <Link href="https://github.com/aldovani">Github</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
