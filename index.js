import fs from 'node:fs'
import path from 'node:path'

const FILE_PATH = path.resolve(path.join('data', 'A.csv'))

const file = fs.readFileSync(FILE_PATH, 'utf8')
const five_letter_words = file
  .split('\n')
  .map(_ => _.trim().replace(/"/g, '').split(' (')[0].toLowerCase())
  .filter(_ => !!_ && _.length === 5 && _.match(/^[a-z]+$/))

const unique_words = [...new Set(five_letter_words)]
const sorted_words = unique_words.sort()

const findWord = (pattern, letters_to_avoid) => {
  // pattern = 'a..e.'
  const regex = new RegExp(`^${pattern.replace(/\./g, `[^${letters_to_avoid}]`)}$`)
  const words = sorted_words.filter(word => regex.test(word))
  return words.filter(word => {
    const letters = word.split('')
    const letters_to_avoid_array = letters_to_avoid.split('')
    return letters.every(letter => !letters_to_avoid_array.includes(letter))
  })
}

console.log(findWord('a...e', ''))
