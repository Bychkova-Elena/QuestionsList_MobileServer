// Модель класса Вопросы
export class Questions {
  public id_question: number;
  public id_category: number;
  public question: string;
  public answer: string;
  public clarification: string;
  constructor(
    id_question: number,
    id_category: number,
    question: string,
    answer: string,
    clarification: string
  ) {
    this.id_question = id_question;
    this.id_category = id_category;
    this.question = question;
    this.answer = answer;
    this.clarification = clarification;
  }
}
