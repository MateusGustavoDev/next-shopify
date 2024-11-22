import Link from 'next/link'
import { Wrapper } from '@/components/wrapper'
import { Visa } from './payment-methods/visa'
import { MasterCard } from './payment-methods/mastercard'
import { Elo } from './payment-methods/elo'
import { Pix } from './payment-methods/pix'
import { BankSlip } from './payment-methods/bank-slip'
const { SITE_NAME } = process.env

export function Footer() {
  return (
    <footer className="mt-32 border-t border-neutral-800">
      <Wrapper className="flex w-full gap-16 py-9 lg:flex-col lg:flex-wrap">
        <div className="grid w-full max-w-[1338px] grid-cols-4 gap-10 lg:grid-cols-3 sm:lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-neutral-400">
              <li>
                <Link href="" className="hover:text-white">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-white">
                  Watches
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-white">
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-white">
                  Todos os Produtos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Nossas Politicas</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-neutral-400">
              <li>
                <Link href="" className="hover:text-white">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-white">
                  Envio e Entrega
                </Link>
              </li>
              <li className="flex-shrink-0">
                <Link href="" className="block hover:text-white">
                  Troca, Devolução e Reembolso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Minha conta</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-neutral-400">
              <li>
                <Link href="" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-white">
                  Cadastrar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Contato</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-neutral-400">
              <li>
                <Link href="">nextfy@example.com</Link>
              </li>
              <li>
                <Link href="">{`(11) 9999-9999`}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Formas de Pagamento</p>
          <div className="mt-4 flex gap-2">
            <Visa size={45} />
            <MasterCard size={45} />
            <Elo size={45} />
            <Pix size={45} />
            <BankSlip size={45} />
          </div>
        </div>
      </Wrapper>
      <div className="w-full border-t border-neutral-800">
        <Wrapper className="flex justify-between py-5 lg:flex-col-reverse lg:gap-8">
          <span className="text-sm text-neutral-400 lg:text-center">
            © 2024 | {SITE_NAME} | Todos os direitos reservados.
          </span>
          <div className="flex gap-4 text-sm text-neutral-400 lg:flex-col">
            <Link href="" className="hover:text-white">
              Política de privacidade
            </Link>
            <Link href="" className="hover:text-white">
              Termos de Uso
            </Link>
            <Link href="" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </Wrapper>
      </div>
    </footer>
  )
}
