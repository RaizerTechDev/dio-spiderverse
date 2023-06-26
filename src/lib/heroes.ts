import { IHeroData } from "@/interfaces/heroes";
import data from "./json/heroes.json";

export function getData(){
  return data as IHeroData[];
}