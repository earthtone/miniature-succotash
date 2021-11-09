type Dict <T> = {
  [key: string | number | symbol]: T
}

type Ruleset <T> = Record<keyof T, Function | Function[]>

const ObjectKeys = Object.keys as <T extends unknown>(x: Dict<T>) => Array<keyof T>;

export function validate <T = Dict<unknown>>(rls: Ruleset<T>, src: T) {
  const exceptions: Dict<string>[] = [];

  const keysToCheck = ObjectKeys(rls)

  // keysToCheck.every((fn) => {
  //    if (!typeof rls[fn] !== 'function') new TypeError(`${fn} is not a function`)
  // })

  keysToCheck.forEach((key) => {
    let validators: Function[] = Array.isArray(rls[key]) ? rls[key] : [rls[key]];
    for (let fn of validators) {
      if (!(fn(src[key]))) {
        exceptions.push({ [key]: `failed on ${fn.name}` })
      }
    }
  })

  return {
    src,
    exceptions
  }
}
