/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { FiImage } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'

interface ImageFile extends File {
  preview?: string
}

export function UploadImage() {
  const [files, setFiles] = useState<ImageFile[] | null>(null)

  const onDrop = useCallback((files: File[]) => {
    setFiles(
      files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [])

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  })

  const thumbs = files?.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview ?? '')
          }}
        />
      </div>
    </div>
  ))
  useEffect(() => {
    console.log(files)
  }, [files])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files!.forEach((file) => URL.revokeObjectURL(file.preview ?? ''))
  }, [])
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

      <aside className={styles.containerImages}>{thumbs}</aside>
    </>
  )
}
