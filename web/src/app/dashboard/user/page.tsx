'use client'

import { FiEye } from 'react-icons/fi'

import { Input } from '@/components/Input'
import styles from './styles.module.scss'
import { Button } from '@/components/Button'

export default function UserDashboard() {
  return (
    <>
      <section className={styles.avatar}>
        <img src="/assets/imgs/profile.jpg" alt="" />

        <div>
          <h4>Foto de perfil</h4>
          <p>Suporte para PNGs, JPEGs e GIFS abaixo de 10mb</p>

          <div className={styles.wrapperButtons}>
            <label htmlFor="avatar">
              enviar novo avatar
              <input type="file" name="" id="avatar" />
            </label>
            <button>deletar imagem</button>
          </div>
        </div>
      </section>

      <section className={styles.config}>
        <h2>Altere seus dados</h2>
        <form>
          <div className={styles.containerInputs}>
            <Input.Label name="Nome" id="name" isError={false}>
              <Input.Field id="name" />
            </Input.Label>

            <Input.Label name="Email" id="email" isError={false}>
              <Input.Field id="email" />
            </Input.Label>

            <Input.Label name="Senha" id="password" isError={false}>
              <Input.Field id="password">
                <Input.Icon
                  icon={FiEye}
                  handleClick={() => {
                    console.log('')
                  }}
                />
              </Input.Field>
            </Input.Label>

            <Input.Label
              name="Confirmar senha"
              id="confirmPassword"
              isError={false}
            >
              <Input.Field id="confirmPassword">
                <Input.Icon
                  icon={FiEye}
                  handleClick={() => {
                    console.log('')
                  }}
                />
              </Input.Field>
            </Input.Label>
          </div>
          <Button>Alterar dados</Button>
        </form>
      </section>

      <section className={styles.deleteAccount}>
        <h2>Zona perigosa </h2>
        <p>
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <button>deletar conta</button>
      </section>
    </>
  )
}
