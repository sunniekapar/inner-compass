export interface Category {
  category: string;
  questions: Question[];
}

export interface Question {
  _id: number;
  subCategory: string;
  question: string;
  value: number;
}