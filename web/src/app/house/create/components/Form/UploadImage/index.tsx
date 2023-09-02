/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { FiImage, FiTrash } from 'react-icons/fi'
import { useUploadImage } from './useUploadIamge'

export function UploadImage() {
  const { dropzone, removeImage, files } = useUploadImage()

  return (
    <>
      <h2>Agora adicione uma forma de entrar em contato com você </h2>

      <form className={styles.form}>
        <div {...dropzone.getRootProps()} className={styles.containerDropzone}>
          <label htmlFor="upload">
            <FiImage size={64} color="#2563EB" />
            <h4>Arraste suas fotos para cá</h4>
            <span>Escolha pelo menos 5 fotos</span>
            Escolher diretamente do dispositivo
          </label>
          <input {...dropzone.getInputProps()} />
        </div>
      </form>

      <aside className={styles.containerImages}>
        {files?.map((file) => (
          <div className={styles.thumb} key={file.name}>
            <img
              src={file.preview}
              className={styles.img}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview ?? '')
              }}
            />
            <button
              className={styles.removeImage}
              onClick={() => removeImage(file.name)}
            >
              <FiTrash size={18} />
            </button>
          </div>
        ))}
      </aside>
    </>
  )
}
