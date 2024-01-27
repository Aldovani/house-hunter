import { BasicInformationItem } from './item'
import { useBasicInformation } from './useBasicInformation'

export function BasicInformation() {
  const { information, handleSubmit, dispatch } = useBasicInformation()
  return (
    <>
      <h2 className="text-slate-900 text-2xl font-semibold max-w-sm">
        Informe o que sua residência tem para oferecer?
      </h2>
      <p className="text-slate-400 mt-2 mb-8 max-w-xl">
        Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.{' '}
      </p>
      <form id="house" onSubmit={handleSubmit}>
        <ul className="[&>*]:mt-6">
          <BasicInformationItem
            onDecrement={() =>
              dispatch({
                type: 'decrement',
                information: 'bedroom',
              })
            }
            onIncrement={() =>
              dispatch({
                type: 'increment',
                information: 'bedroom',
              })
            }
            value={information.bedroom}
            name="Quartos"
          />
          <BasicInformationItem
            onDecrement={() =>
              dispatch({
                type: 'decrement',
                information: 'bathroom',
              })
            }
            onIncrement={() =>
              dispatch({
                type: 'increment',
                information: 'bathroom',
              })
            }
            value={information.bathroom}
            name="Banheiras"
          />
          <BasicInformationItem
            onDecrement={() =>
              dispatch({
                type: 'decrement',
                information: 'car',
              })
            }
            onIncrement={() =>
              dispatch({
                type: 'increment',
                information: 'car',
              })
            }
            value={information.car}
            name="Vagas de carros"
          />
          <BasicInformationItem
            onDecrement={() =>
              dispatch({
                type: 'decrement',
                information: 'room',
              })
            }
            onIncrement={() =>
              dispatch({
                type: 'increment',
                information: 'room',
              })
            }
            value={information.room}
            name="Cômodos"
          />
        </ul>
      </form>
    </>
  )
}
