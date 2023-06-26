import HeroesList from "@/components/HeroesList"
import { getData } from "@/lib/heroes";

export default async function Home() {
  const heroes = await getData();
  return (
    <main className="flex items-center flex-col relative">
      <HeroesList heroes={heroes} />
    </main>
  )
}

