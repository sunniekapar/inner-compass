export const normalizeCategoryName = (categoryName : string) => {
  return categoryName.replaceAll(' ', '').replaceAll('&', 'And');
}