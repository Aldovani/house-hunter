import { usePrice } from './usePrice'

export function Price() {
  const {
    handleChangeAvailable,
    handleChangeInput,
    price,
    handleSubmit,
    available,
  } = usePrice()
  return (
    <>
      <h2 className="text-slate-900 text-2xl font-semibold max-w-sm">
        Informe o valor do seu imóvel e o que deseja fazer com ele?
      </h2>
      <p className="text-slate-400 mt-2 mb-8 max-w-xl">
        Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.{' '}
      </p>

      <form id="house" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <input
              type="radio"
              id="rent"
              value="rent"
              name="price"
              defaultChecked={available === 'rent'}
              onChange={handleChangeAvailable}
              className="peer hidden pointer-events-none"
            />
            <label
              htmlFor="rent"
              className="cursor-pointer font-medium peer-checked:text-indigo-700 peer-checked:border-indigo-700 peer-checked:bg-indigo-50 rounded-lg text-slate-500 w-full border border-slate-200 py-4 flex items-center justify-center"
            >
              Alugar
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="sell"
              value="sell"
              name="price"
              defaultChecked={available === 'sell'}
              onChange={handleChangeAvailable}
              className="peer hidden pointer-events-none"
            />
            <label
              htmlFor="sell"
              className="cursor-pointer font-medium peer-checked:text-indigo-700 peer-checked:border-indigo-700 peer-checked:bg-indigo-50 rounded-lg text-slate-500 w-full border border-slate-200 py-4 flex items-center justify-center"
            >
              Vender
            </label>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="R$ 00,00"
            onChange={handleChangeInput}
            value={price}
            className="text-8xl text-center w-full text-slate-500 mt-6"
          />
        </div>
      </form>
    </>
  )
}
