export function group<T>(arr: T[], fn: (item: T) => string) {
  return arr.reduce<Record<string, T[]>>((record, item) => {
    const result = fn(item);

    if (!record[result]) {
      record[result] = [ item ];
    } else {
      record[result].push(item);
    }

    return record;
  }, {});
}