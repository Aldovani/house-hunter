'use client'
import Link from 'next/link'

import styles from './styles.module.scss'
import { Principal } from './components/form/Principal'
import { Location } from './components/form/Location'
import { Contact } from './components/form/Contact'
import { MapPicker } from './components/form/MapPicker'
import { Rooms } from './components/form/Rooms'
import { UploadImage } from './components/form/UploadImage'
import { useCreateHouse } from './context/CreateHouseProvider'

export default function CreateHouse() {
  const { formStep, handlePrevFormStep, progressBar } = useCreateHouse()
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          House-Hunter
        </Link>
      </header>
      <main className={styles.container}>
        {/* {formStep === 0 && <Principal />} */}
        {/* {formStep === 1 && <MapPicker />} */}
        {/* {formStep === 2 && <Location />} */}
        {/* {formStep === 3 && <Contact />} */}
        {/* {formStep === 4 && <Rooms />} */}
        {/* {formStep === 5 && <UploadImage />} */}
        <UploadImage />
      </main>

      <footer className={styles.footer}>
        <div className={styles.containerProgressBar}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressBar}%` }}
          ></div>
        </div>

        <div className={styles.containerButtons}>
          <button className={styles.prev} onClick={handlePrevFormStep}>
            voltar
          </button>
          <button type="submit" className={styles.next} form="house-1">
            avançar
          </button>
        </div>
      </footer>
    </>
  )
}
