export interface Question {
  id: string;
  number: number;
  text: string;
  group_id: string;
  answer_type: 'yes_no' | 'yes_partial_no';
}

export interface Group {
  id: string;
  name: string;
}

export interface Assessment {
  client_name: string;
  company_name: string;
  cnpj: string;
  answers: Array<{
    question_id: string;
    answer: string;
    score: number;
  }>;
}