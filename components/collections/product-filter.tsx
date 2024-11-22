import { ChevronDown, Filter } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export function ProductFilter() {
  return (
    <div className="h-full w-full max-w-[300px] rounded-lg border border-neutral-800 bg-neutral-900">
      <div className="flex gap-2 p-4 font-semibold">
        <Filter className="w-5" />
        <p>Filtrar e classificar</p>
      </div>
      <div className="flex flex-col gap-2 border-t border-neutral-800 p-4">
        <span className="text-sm">Ordenar por</span>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-sm border border-neutral-800 bg-neutral-800 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
            Mais Recentes
          </button>
          <button className="rounded-sm border border-neutral-800 bg-neutral-800 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
            Maior preço
          </button>
          <button className="rounded-sm border border-neutral-800 bg-neutral-800 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
            Menor preço
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProductFilterMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 font-semibold">
          <div className="flex items-center gap-2">
            <Filter className="w-4" />
            <p className="text-xs uppercase">Filtrar</p>
          </div>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="border-neutral-800 bg-black p-0">
        <div className="flex items-center gap-2 border-b border-neutral-800 p-5">
          <Filter className="w-4" />
          <p className="text-sm font-semibold uppercase">Filtrar e classificar</p>
        </div>
        <div className="flex flex-col gap-4 border-b border-neutral-800 p-5">
          <span className="text-sm">Ordenar por</span>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
              Mais Recentes
            </button>
            <button className="rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
              Maior preço
            </button>
            <button className="rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
              Menor preço
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
