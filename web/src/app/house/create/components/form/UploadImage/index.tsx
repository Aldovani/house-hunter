import styles from './styles.module.scss'
import { FiImage } from 'react-icons/fi'
export function UploadImage() {
  return (
    <>
      <h2>Agora adicione uma forma de entrar em contato com você </h2>

      <form className={styles.form}>
        <div className={styles.containerImages}>
          <FiImage size={64} color="#2563EB" />
          <h4>Arraste suas fotos para cá</h4>
          <span>Escolha pelo menos 5 fotos</span>
          <label htmlFor="upload">
            Escolher diretamente do dispositivo
            <input type="file" id="upload" multiple />
          </label>
        </div>
      </form>
    </>
  )
}
