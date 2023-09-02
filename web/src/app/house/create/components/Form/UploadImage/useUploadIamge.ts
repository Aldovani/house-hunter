import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageFile extends File {
  preview?: string
}

export function useUploadImage() {
  const [files, setFiles] = useState<ImageFile[] | null>(null)

  useEffect(() => {
    return () =>
      files?.forEach((file) => URL.revokeObjectURL(file.preview ?? ''))
  }, [files])

  const onDrop = useCallback((files: File[]) => {
    setFiles(
      files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [])

  function removeImage(name: string) {
    setFiles((prev) => {
      if (!prev) return prev

      return prev.filter((img) => img.name !== name)
    })
  }

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  })

  return { removeImage, dropzone, files }
}
