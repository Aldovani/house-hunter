import Link from 'next/link'
import { FiClock, FiMapPin, FiExternalLink } from 'react-icons/fi'

import styles from './styles.module.scss'

export default function ScheduleDashboard() {
  return (
    <div className={styles.container}>
      <form>
        <label htmlFor="all">
          <span>todas</span>
          <input type="radio" name="type" id="all" />
        </label>

        <label htmlFor="pending">
          <span>pendente</span>

          <input type="radio" name="type" id="pending" />
        </label>

        <label htmlFor="cancel">
          <span>canceladas</span>

          <input type="radio" name="type" id="cancel" />
        </label>

        <label htmlFor="finished">
          <span>concluídas</span>
          <input type="radio" name="type" id="finished" />
        </label>

        <label htmlFor="pass">
          <span>passadas</span>
          <input type="radio" name="type" id="pass" />
        </label>
      </form>

      <div className={styles.schedule}>
        <div className={styles.containerMonth}>
          <span className={styles.month}>Dez</span>

          <div className={styles.containerDay}>
            <div className={styles.day}>
              <span>Qua</span>
              <h4>12</h4>
            </div>

            <div className={styles.infos}>
              <div>
                <div>
                  <p className={styles.time}>
                    <FiClock size={16} />
                    09:00-10:00
                  </p>
                  <span className={styles.status}>pendente</span>
                </div>

                <Link href="/house/:id" className={styles.houseLink}>
                  <FiExternalLink size={16} />
                  visualizar imovel
                </Link>
              </div>
              <p className={styles.address}>
                <FiMapPin size={16} />
                São Lourenço do Turvo, Matão-São paulo
              </p>
            </div>
          </div>

          <div className={styles.containerDay}>
            <div className={styles.day}>
              <span>Qua</span>
              <h4>12</h4>
            </div>

            <div className={styles.infos}>
              <div>
                <div>
                  <p className={styles.time}>
                    <FiClock size={16} />
                    09:00-10:00
                  </p>
                  <span className={styles.status}>pendente</span>
                </div>

                <Link href="/house/:id" className={styles.houseLink}>
                  <FiExternalLink size={16} />
                  visualizar imovel
                </Link>
              </div>
              <p className={styles.address}>
                <FiMapPin size={16} />
                São Lourenço do Turvo, Matão-São paulo
              </p>
            </div>
          </div>

          <div className={styles.containerDay}>
            <div className={styles.day}>
              <span>Sex</span>
              <h4>15</h4>
            </div>

            <div className={styles.infos}>
              <div>
                <div>
                  <p className={styles.time}>
                    <FiClock size={16} />
                    09:00-10:00
                  </p>
                  <span className={styles.status}>pendente</span>
                </div>

                <Link href="/house/:id" className={styles.houseLink}>
                  <FiExternalLink size={16} />
                  visualizar imovel
                </Link>
              </div>
              <p className={styles.address}>
                <FiMapPin size={16} />
                São Lourenço do Turvo, Matão-São paulo
              </p>
            </div>
          </div>

          <div className={styles.containerDay}>
            <div className={styles.day}>
              <span>Sab</span>
              <h4>16</h4>
            </div>

            <div className={styles.infos}>
              <div>
                <div>
                  <p className={styles.time}>
                    <FiClock size={16} />
                    09:00-10:00
                  </p>
                  <span className={styles.status}>pendente</span>
                </div>

                <Link href="/house/:id" className={styles.houseLink}>
                  <FiExternalLink size={16} />
                  visualizar imovel
                </Link>
              </div>
              <p className={styles.address}>
                <FiMapPin size={16} />
                São Lourenço do Turvo, Matão-São paulo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
