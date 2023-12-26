const importCategoryData = (categoryName: string) => {
  switch (categoryName) {
    case 'PersonalRelationship':
      return import('../data/PersonalRelationship');
    case 'FamilyRelationship':
      return import('../data/FamilyRelationship');
    case 'PersonalDevelopment':
      return import('../data/PersonalDevelopment');
    case 'HealthAndFitness':
      return import('../data/HealthAndFitness');
    case 'FinancialHealthAndHabits':
      return import('../data/FinancialHealthAndHabits');
    case 'Hobbies':
      return import('../data/Hobbies');
    case 'Career':
      return import('../data/Career');
    case 'Workplace':
      return import('../data/Workplace');
    default:
      throw new Error('Unkown Category');
  }
};

export default importCategoryData;