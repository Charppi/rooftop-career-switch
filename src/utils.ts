export const originalSortSolution = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
];

export function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export async function validate(data: string[] | string) {
  if (Array.isArray(data)) {
    const [predecessor, successor] = data;
    const parentIndex = originalSortSolution.indexOf(predecessor);
    const realChild = originalSortSolution[parentIndex + 1];
    if (successor === realChild) return true;
    return false;
  }
  return originalSortSolution.join("") === data;
}
