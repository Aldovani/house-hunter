'use client'
import styles from './styles.module.scss'
import { useProperties } from './useProperties'

export default function PropertiesDashboard() {
  const { handleHouseState, houseStates } = useProperties()
  return (
    <div className={styles.container}>
      <form>
        <label
          htmlFor="all"
          className={houseStates === 'all' ? styles.selected : ''}
        >
          <span>todas</span>
          <input
            type="radio"
            name="type"
            checked={houseStates === 'all'}
            id="all"
            onChange={() => handleHouseState('all')}
          />
        </label>

        <label
          htmlFor="available"
          className={houseStates === 'available' ? styles.selected : ''}
        >
          <span>Disponíveis</span>
          <input
            type="radio"
            name="type"
            checked={houseStates === 'available'}
            id="available"
            onChange={() => handleHouseState('available')}
          />
        </label>

        <label
          htmlFor="unavailable"
          className={houseStates === 'unavailable' ? styles.selected : ''}
        >
          <span>indisponível</span>
          <input
            type="radio"
            name="type"
            id="unavailable"
            checked={houseStates === 'unavailable'}
            onChange={() => handleHouseState('unavailable')}
          />
        </label>
      </form>

      <div className={styles.containerHouses}>
        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>

        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>

        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>

        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>

        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>

        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>

        <div className={styles.house}>
          <img src="/assets/imgs/house-main.jpg" alt="" />

          <h2>Casa na arvore</h2>

          <div className={styles.infos}>
            <div>
              <span className={styles.type}>Comprar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>alugar</span>
              <span className={styles.value}>$20000</span>
            </div>
            <div>
              <span className={styles.type}>Status</span>
              <span className={styles.status}>disponível</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
