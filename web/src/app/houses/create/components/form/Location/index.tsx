import { Input } from '@/components/ui/input'
import { useLocation } from './useLocation'

export function Location() {
  const { errors, register, handleSubmit, handleSubmitLocation } = useLocation()

  return (
    <>
      <h2 className="text-slate-900 text-2xl font-semibold ">
        Nos informe o endereço do seu imóvel{' '}
      </h2>
      <p className="text-slate-400 mt-2 mb-8 max-w-lg">
        Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </p>
      <form
        id="house"
        className="[&>*]:mt-3"
        onSubmit={handleSubmit((e) =>
          handleSubmitLocation({
            address: e.address,
            city: e.city,
            district: e.district,
            state: e.state,
          }),
        )}
      >
        <Input.Label name="Estado" id="state" isError={!!errors.state}>
          <Input.Field
            id="state"
            {...register('state')}
            placeholder="Digite o estado"
          />
          <Input.MessageError message={errors.state?.message} />
        </Input.Label>

        <Input.Label name="Cidade" id="city" isError={!!errors.city}>
          <Input.Field
            id="city"
            {...register('city')}
            placeholder="Digite a cidade"
          />
          <Input.MessageError message={errors.city?.message} />
        </Input.Label>
        <Input.Label name="Bairro" id="district" isError={!!errors.district}>
          <Input.Field
            id="district"
            {...register('district')}
            placeholder="Digite o bairro"
          />
          <Input.MessageError message={errors.district?.message} />
        </Input.Label>
        <Input.Label name="Endereço" id="address" isError={!!errors.address}>
          <Input.Field
            id="address"
            {...register('address')}
            placeholder="Digite o endereço"
          />
          <Input.MessageError message={errors.address?.message} />
        </Input.Label>
      </form>
    </>
  )
}
