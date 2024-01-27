/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Trash, Upload } from 'lucide-react'
import { useUploadImage } from './useUploadIamge'

export function UploadImage() {
  const { dropzone, removeImage, files } = useUploadImage()

  return (
    <>
      <h2 className="text-slate-900 text-2xl font-semibold max-w-sm">
        Para finalizar nos envie algumas imagens do imovel
      </h2>
      <p className="text-slate-400 mt-2 mb-8 max-w-xl">
        Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.{' '}
      </p>

      <div
        {...dropzone.getRootProps()}
        className="rounded-lg border border-slate-200 border-dashed py-10 flex flex-col items-center justify-center"
      >
        <label
          htmlFor="upload"
          className="flex flex-col items-center justify-center "
        >
          <Upload size={48} className="text-slate-400" />
          <p className="mt-6 text-slate-500 max-w-80 text-center">
            Arraste e solte ou{' '}
            <span className="text-indigo-700 cursor-pointer">
              {' '}
              escolha um arquivo{' '}
            </span>{' '}
            para fazer upload
          </p>
          <span className="mt-4 text-slate-400">PNG ou JPG</span>
        </label>
        <input {...dropzone.getInputProps()} />
      </div>

      <aside className="pb-64 grid grid-cols-3 mt-6 gap-6">
        {files?.map((file) => (
          <div className="relative" key={file.name}>
            <img
              src={file.preview}
              className="aspect-video rounded-lg w-full object-cover h-36"
              onLoad={() => {
                URL.revokeObjectURL(file.preview ?? '')
              }}
            />
            <button
              className="hover:text-rose-500 hover:brightness-95 transition-all text-slate-600 absolute top-0 right-0 rounded-full -translate-y-1/2 translate-x-1/2 border border-slate-200 bg-slate-50 p-2"
              onClick={() => removeImage(file.name)}
            >
              <Trash size={18} />
            </button>
          </div>
        ))}
      </aside>
    </>
  )
}
