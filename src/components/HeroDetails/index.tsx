import { IHeroData } from "@/interfaces/heroes";
import { Quicksand } from "next/font/google";
import localFont from 'next/font/local'
import Image from "next/image";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})
const spidermanFont = localFont({ src: '../../fonts/spider-man.otf' })

interface IProps {
  data: IHeroData;
}

export default function HeroDetails({data}: IProps) {
  const {id, name, universe, details} = data;
  return(
    <div className={quicksand.className}>
      <h1 className={`text-[3.5rem] m-0 ${spidermanFont.className}`}>{name} (Universo-{universe})</h1>
      <div className="border-t border-solid border-white border-opacity-50
        my-4 mx-0 py-4 px-0 w-[70%]
      ">
        <h2 className="text-base uppercase font-bold">Informações</h2>
        <table>
          <tbody>
            <tr>
              <td className="font-normal pr-8">Nome Completo</td>
              <td className="font-semibold pr-8">{details.fullName}</td>
            </tr>
            <tr>
              <td className="font-normal pr-8">Data de Nascimento</td>
              <td className="font-semibold pr-8">{new Date(details.birthday).toLocaleDateString("pt-BR")}</td>
            </tr>
            <tr>
              <td className="font-normal pr-8">Terra Natal</td>
              <td className="font-semibold pr-8">{details.homeland}</td>
            </tr>
            <tr>
              <td className="font-normal pr-8">Altura</td>
              <td className="font-semibold pr-8">{details.height.toFixed(2)} m</td>
            </tr>
            <tr>
              <td className="font-normal pr-8">Peso</td>
              <td className="font-semibold pr-8">{details.weight.toFixed(2)} Kg</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border-t border-solid border-white border-opacity-50
        my-4 mx-0 py-4 px-0 w-[70%]"
      >
        <h2 className="text-base uppercase font-bold">Primeira Aparição</h2>
        <Image
          src={`/spiders/${id}-comic-book.png`}
          alt={`Primeira aparição nos quadrinhos de ${name}`}
          width={80}
          height={122}
          className="w-auto h-auto"
        />
      </div>
    </div>
  )
}