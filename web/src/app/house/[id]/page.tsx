import styles from './styles.module.scss'

import Header from '@/components/Header/index'

import Image from 'node_modules/next/image'

export default function HousePage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.carrosel}>
          <Image
            alt=""
            src={'/assets/imgs/house-main.jpg'}
            width={800}
            height={440}
          />
          <Image
            alt=""
            src={'/assets/imgs/house-main.jpg'}
            width={800}
            height={440}
          />
        </section>
      </main>
    </>
  )
}
