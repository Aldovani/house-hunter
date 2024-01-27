'use client'

import { HouseCard } from '@/components/houseCard'
import { Edit, ExternalLink, LockKeyhole, Trash } from 'lucide-react'

export default function PropertiesDashboard() {
  return (
    <main>
      <header className="border-b border-slate-200">
        <div className="pl-10 py-8">
          <h2 className="font-medium text-2xl text-slate-900">Imóveis</h2>
        </div>
      </header>

      <section>
        <div className="px-10 py-8">
          <span className="text-lg text-slate-400 mb-5 block">05 imóveis</span>

          <div className="grid gap-8 grid-cols-3 grid-flow-row-dense">
            <HouseCard.Container>
              <HouseCard.Header>
                <HouseCard.MenuConfig />
              </HouseCard.Header>
              <HouseCard.Body />
            </HouseCard.Container>
            <HouseCard.Container>
              <HouseCard.Header>
                <HouseCard.MenuConfig />
              </HouseCard.Header>
              <HouseCard.Body />
            </HouseCard.Container>
            <HouseCard.Container>
              <HouseCard.Header>
                <HouseCard.MenuConfig />
              </HouseCard.Header>
              <HouseCard.Body />
            </HouseCard.Container>
            <HouseCard.Container>
              <HouseCard.Header>
                <HouseCard.MenuConfig />
              </HouseCard.Header>
              <HouseCard.Body />
            </HouseCard.Container>
            <HouseCard.Container>
              <HouseCard.Header>
                <HouseCard.MenuConfig />
              </HouseCard.Header>
              <HouseCard.Body />
            </HouseCard.Container>
          </div>
        </div>
      </section>
    </main>
  )
}
