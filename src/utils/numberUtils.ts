// Функция для форматирования чисел
export const formatNumber = (value: string | number) => {
  if (typeof value === "number" || !isNaN(Number(value))) {
    return Number(value).toLocaleString();
  }
  return value;
};
