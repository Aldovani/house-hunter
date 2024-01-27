'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'

import { useVerifyCode } from './useVerifyCode'

export default function VerifyCode() {
  const { pinsLength, handleChange, handleKey, pinsInputs } = useVerifyCode()

  return (
    <>
      <h2 className="text-2xl text-slate-900 leading-[130%]">
        Verifique o código
      </h2>
      <p className="text-sm mt-2 text-slate-400">
        Digite o código que enviamos para o e-mail{' '}
        <strong>exemplo@gmail.com</strong>
      </p>

      <form className="max-w-[26.5rem]">
        <div className="flex gap-2 mt-8">
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
        <Button className="mt-5">Verificar código</Button>
      </form>
    </>
  )
}
