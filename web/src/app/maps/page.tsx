/* eslint-disable @next/next/no-img-element */
'use client'

import { FiSliders } from 'react-icons/fi'

import Header from '@/components/Header'
import dynamic from 'next/dynamic'

import styles from './styles.module.scss'
import { Skeleton } from '@/components/Skeleton'
import { useState } from 'react'

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => <Skeleton />,
})

export default function Maps() {
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  return (
    <>
      <Header />
      <div className={`${styles.wrapper} ${isOpenFilter && styles.open}`}>
        {isOpenFilter && (
          <div>
            <h1>ola</h1>
          </div>
        )}

        <div className={styles.containerMap}>
          <Map />
          <button
            className={styles.buttonFilter}
            onClick={() => {
              setIsOpenFilter((prev) => !prev)
            }}
          >
            <FiSliders color="#1E293B" size={24} />
          </button>
        </div>

        <section className={styles.houses}>
          <span className={styles.quantity}>120 propriedades</span>

          <div className={styles.containerHouses}>
            <div className={styles.house}>
              <div className={styles.containerImage}>
                <img src="/assets/imgs/house-1.png" alt="house" />
              </div>
              <h3 className={styles.title}>containerImage</h3>
              <p className={styles.address}>
                av antonio macek - MATÃO - sÃO PAULO
              </p>
              <div className={styles.containerPrices}>
                <div>
                  <span className={styles.type}>Comprar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
                <div>
                  <span className={styles.type}>Alugar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
              </div>
            </div>
            <div className={styles.house}>
              <div className={styles.containerImage}>
                <img src="/assets/imgs/house-1.png" alt="house" />
              </div>
              <h3 className={styles.title}>containerImage</h3>
              <p className={styles.address}>
                av antonio macek - MATÃO - sÃO PAULO
              </p>
              <div className={styles.containerPrices}>
                <div>
                  <span className={styles.type}>Comprar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
                <div>
                  <span className={styles.type}>Alugar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
              </div>
            </div>

            <div className={styles.house}>
              <div className={styles.containerImage}>
                <img src="/assets/imgs/house-1.png" alt="house" />
              </div>
              <h3 className={styles.title}>containerImage</h3>
              <p className={styles.address}>
                av antonio macek - MATÃO - sÃO PAULO
              </p>
              <div className={styles.containerPrices}>
                <div>
                  <span className={styles.type}>Comprar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
                <div>
                  <span className={styles.type}>Alugar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
              </div>
            </div>

            <div className={styles.house}>
              <div className={styles.containerImage}>
                <img src="/assets/imgs/house-1.png" alt="house" />
              </div>
              <h3 className={styles.title}>containerImage</h3>
              <p className={styles.address}>
                av antonio macek - MATÃO - sÃO PAULO
              </p>
              <div className={styles.containerPrices}>
                <div>
                  <span className={styles.type}>Comprar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
                <div>
                  <span className={styles.type}>Alugar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
              </div>
            </div>

            <div className={styles.house}>
              <div className={styles.containerImage}>
                <img src="/assets/imgs/house-1.png" alt="house" />
              </div>
              <h3 className={styles.title}>containerImage</h3>
              <p className={styles.address}>
                av antonio macek - MATÃO - sÃO PAULO
              </p>
              <div className={styles.containerPrices}>
                <div>
                  <span className={styles.type}>Comprar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
                <div>
                  <span className={styles.type}>Alugar</span>
                  <span className={styles.price}>r$20000,00</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
