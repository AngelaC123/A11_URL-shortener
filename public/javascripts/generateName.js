function nameGenerator(length) {
  // const nameLength = 5

  const number = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()

  const collection = number.split('').concat(lowerCaseLetters.split(''), upperCaseLetters.split(''))

  let name = ''
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * collection.length)
    name += collection[index]
  }

  return name

}

module.exports = nameGenerator


