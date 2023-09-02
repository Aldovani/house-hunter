'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import styles from './styles.module.scss'
import authStyles from '../../page.module.scss'

import { useVerifyCode } from './useVerifyCode'

export default function VerifyCode() {
  const { pinsLength, handleChange, handleKey, pinsInputs } = useVerifyCode()

  return (
    <>
      <h2 className={authStyles.title}>Verifique o codigo</h2>
      <p className={authStyles.description}>
        Digite o código que enviamos para o e-mail{' '}
        <strong>exemplo@gmail.com</strong>
      </p>

      <form className={authStyles.form}>
        <div className={styles.containerPins}>
          {pinsLength.map((_, idx) => (
            <Input.Pin
              maxLength={1}
              key={idx}
              ref={(el) => (pinsInputs.current[idx] = el)}
              onChange={() => handleChange(idx)}
              onKeyDown={(e) => handleKey(e, idx)}
              placeholder="0"
            />
          ))}
        </div>
        <Button>Verificar código</Button>
      </form>
    </>
  )
}
