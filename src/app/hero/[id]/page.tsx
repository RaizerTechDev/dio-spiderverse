import Carousel from "@/components/Carousel";
import { getData } from "@/lib/heroes";

interface IProps {
  params: {
    id: string;
  }
}

export default async function Hero ({params: {id}}: IProps){
  const heroes = await getData();
  return <Carousel heroes={heroes} activeId={id}/>
}