// @flow

export const format = {
  dollars: {
    //  '$100,000' -> '$100,000'
    //  100000    -> '$100,000'
    //  ''        -> ''
    toString: (value: number | string | void): string => {
      if (typeof value === 'number') {
        return numberToDollarString(value)
      } else if (typeof value === 'string') {
        const cleaned = cleanDollarString(value)
        if (cleaned) {
          return numberToDollarString(cleaned)
        }
      }
      return ''
    },
    //  '$100,000' -> 100000
    //  100000    -> 100000
    //  ''        -> null
    toValue: (value: number | string | void): number | void => {
      if (typeof value === 'number') {
        return value
      } else if (typeof value === 'string') {
        const cleaned = cleanDollarString(value)
        if (cleaned) {
          return cleaned
        }
      }
      return
    },
  },
  integer: {
    //  '100,000' -> '100,000'
    //  100000    -> '100,000'
    //  ''        -> ''
    toString: (value: number | string | void): string => {
      if (typeof value === 'number') {
        return numberToIntegerString(value)
      } else if (typeof value === 'string') {
        const cleaned = cleanNumString(value)
        if (cleaned) {
          return numberToIntegerString(cleaned)
        }
      }
      return ''
    },
    //  '100,000' -> 100000
    //  100000    -> 100000
    //  ''        -> null
    toValue: (value: number | string | void): number | void => {
      if (typeof value === 'number') {
        return value
      } else if (typeof value === 'string') {
        const cleaned = cleanNumString(value)
        if (cleaned) {
          return cleaned
        }
      }
      return
    },
  },
}

const cleanDollarString = (s: string): number | null => {
  const numString = s
    .replace('$', '')
    .replace(/,/g, '')
    .trim()
  if (!numString || isNaN(numString)) return null
  return parseFloat(numString)
}

const cleanNumString = (s: string): number | null => {
  const numString = s.replace(/,/g, '').trim()
  if (!numString || isNaN(numString)) return null
  return parseFloat(numString)
}

const numberToDollarString = (num: number): string =>
  `$${numberToIntegerString(num)}`

const numberToIntegerString = (num: number): string =>
  `${num.toLocaleString().split('.')[0]}`
