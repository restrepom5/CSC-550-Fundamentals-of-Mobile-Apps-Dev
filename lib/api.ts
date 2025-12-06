import axios from "axios";
import { featuredCities } from "./cities";

export async function getCityById(id: string) {
  return featuredCities.find((c: any) => c.id == id);
}
