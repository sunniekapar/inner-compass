const importCategoryData = (categoryName: string) => {
  const str = categoryName.toLowerCase().replaceAll(' ', '').replaceAll('&', 'and');
  switch (str) {
    case 'personalrelationship':
      return import('../data/PersonalRelationship');
    case 'familyrelationship':
      return import('../data/FamilyRelationship');
    case 'personaldevelopment':
      return import('../data/PersonalDevelopment');
    case 'healthandfitness':
      return import('../data/HealthAndFitness');
    case 'financialhealthandhabits':
      return import('../data/FinancialHealthAndHabits');
    case 'hobbiesandinterests':
      return import('../data/HobbiesAndInterests');
    case 'career':
      return import('../data/Career');
    case 'workplace':
      return import('../data/Workplace');
    default:
      throw new Error('Unkown Category');
  }
};

export default importCategoryData;