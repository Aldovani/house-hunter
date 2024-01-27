'use client'
import Link from 'next/link'

import { useCreateHouse } from './context/CreateHouseProvider'
import { Button } from '@/components/ui/Button'

import { lazy } from 'react'

const PropertyType = lazy(() =>
  import('./components/form/PropertyType').then((module) => ({
    default: module.PropertyType,
  })),
)
const Location = lazy(() =>
  import('./components/form/Location').then((module) => ({
    default: module.Location,
  })),
)
const MapPicker = lazy(() =>
  import('./components/form/MapPicker').then((module) => ({
    default: module.MapPicker,
  })),
)
const BasicInformation = lazy(() =>
  import('./components/form/BasicInformation').then((module) => ({
    default: module.BasicInformation,
  })),
)
const Benefits = lazy(() =>
  import('./components/form/Benefits').then((module) => ({
    default: module.Benefits,
  })),
)
const Price = lazy(() =>
  import('./components/form/Price').then((module) => ({
    default: module.Price,
  })),
)
const UploadImage = lazy(() =>
  import('./components/form/UploadImage').then((module) => ({
    default: module.UploadImage,
  })),
)
const About = lazy(() =>
  import('./components/form/About').then((module) => ({
    default: module.About,
  })),
)

const steps = [
  { step: <PropertyType /> },
  { step: <Location /> },
  { step: <MapPicker /> },
  { step: <BasicInformation /> },
  { step: <Benefits /> },
  { step: <Price /> },
  { step: <About /> },
  { step: <UploadImage /> },
]

export default function CreateHouse() {
  const { handlePrevStep, progressBar, step } = useCreateHouse()
  return (
    <>
      <header className="relative z-50 container mt-6 mx-auto flex justify-between items-center">
        <Link href="/" className="text-indigo-700 text-2xl font-semibold">
          House-Hunter
        </Link>

        <Button className="w-fit px-6 bg-slate-50" variant="outline">
          Salvar e sair
        </Button>
      </header>
      <main className="max-w-[40rem] mx-auto mt-28 pb-36">
        {steps[step].step}
      </main>

      <footer className="fixed z-50 bottom-0 left-0 w-full bg-slate-50 ">
        <div className="h-1 bg-slate-200 relative w-full">
          <div
            className="h-1 absolute top-0 left-0  bg-indigo-700 transition-all"
            style={{ width: `${progressBar}%` }}
          ></div>
        </div>

        <div className="py-8  container mx-auto">
          <div className="ml-auto flex items-center justify-end max-w-xs gap-3">
            <Button variant="secondary" onClick={handlePrevStep}>
              voltar
            </Button>
            <Button type="submit" form="house">
              avançar
            </Button>
          </div>
        </div>
      </footer>
    </>
  )
}
