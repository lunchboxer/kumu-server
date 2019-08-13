// safely access nested object properties that might be undefined
const isObject = object => object && typeof object === 'object'

const hasKey = (object, key) => key in object

export function getIfExists (object, property, callback) {
  return property.split('.').reduce((item, key) => {
    if (isObject(item) && hasKey(item, key)) {
      return item[key]
    }
    return typeof callback !== 'undefined' ? callback : undefined
  }, object)
}
