import { generateNumberBetween } from 'src/utils/generateNumberBetween'
import animals from 'src/seeds/animals'

export default function generateRandomAnimal(): string {
  const animalsCount = animals.length
  const randomIxndex = generateNumberBetween(0, animalsCount - 1)
  return animals[randomIxndex]
}
