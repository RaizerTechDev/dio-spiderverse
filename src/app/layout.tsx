import "./globals.css"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: 'Spider-verse',
  description: 'Criando um carrossel parallax do Aranhaverso com React, Next.js 13 e Framer Motion',
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="
        text-white
        max-w-hero
        overflow-scroll
        lg:overflow-hidden
        relative
        m-auto
        h-[calc(100vh-3.5rem)]
        ">
        <header className="
          flex
          items-center
          justify-between
          m-4 mb-0
          hero-screen:m-[3rem] hero-screen:mb-0
          relative
          z-[4]
        ">
                 <Link href="https://portifolio-rafarz76dev.netlify.app/">
            <Image
              src="/icons/CartãoApresentação_1.gif"
              alt="Meu portfólio"
              width={55}
              height={50}
              priority
            />
          </Link>

          <Link href="/">
            <Image
              src="/spider-logo.svg"
              alt="Spiderman"
              width={260}
              height={70}
              priority
            />
          </Link>

          <Link href="https://api.whatsapp.com/send/?phone=47999327137&text&app_absent=0">
            <Image
              src="/icons/whatsapp.svg"
              alt="whatsapp"
              width={36}
              height={36}
              priority
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
