type CastType = string | boolean | number;

export const env = <T>(id: string, or?: CastType): T => {
  const processVar = process.env[id];
  if (!or) return processVar as unknown as T;
  else if (processVar === undefined) return or as unknown as T;
  else {
    switch (typeof or) {
      case 'boolean':
        return !!processVar as unknown as T;
      case 'number':
        return Number(processVar) as unknown as T;
      case 'string':
        return processVar as unknown as T;
    }
  }
};

export const deepClone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

export const arrayUnique = <T>(array: Array<T>): Array<T> => [...new Set(array)];

export const isObject = (item: unknown): boolean =>
  <boolean>item && typeof item === 'object' && !Array.isArray(item);

// export const mergeDeep = (target: object, ...sources: object[]): object => {
//   if (!sources.length) return target;
//   const source = sources.shift();
//
//   if (isObject(target) && isObject(source)) {
//     for (const key in source) {
//       // check if source key exists and is an object
//       if (isObject(source[key])) {
//         if (!target[key]) Object.assign(target, { [key]: {} });
//         if (isObject(target[key])) mergeDeep(target[key], source[key]);
//       } else {
//         Object.assign(target, { [key]: source[key] });
//       }
//     }
//   }
//
//   return mergeDeep(target, ...sources);
// };

export function sliceIntoChunks<T>(arr: Array<T | unknown>, chunkSize: number): Array<Array<T>> {
  const res: Array<Array<T | unknown>> = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res as Array<Array<T>>;
}

export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const getUsernameOrEmail = (email: string, username?: string): string =>
  username || email.split('@')[0];
