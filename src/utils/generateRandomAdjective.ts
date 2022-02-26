import { generateNumberBetween } from 'src/utils/generateNumberBetween'
import adjectives from 'src/seeds/adjectives'

export default function generateRandomAdjective(): string {
  const adjectivesCount = adjectives.length
  const randomIndex = generateNumberBetween(0, adjectivesCount - 1)
  return adjectives[randomIndex]
}
