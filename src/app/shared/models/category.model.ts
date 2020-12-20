// Модель класса Категории
export class Category {
  public id_category: number;
  public name: string;
  constructor(
    id_category:number,
    name: string,
  ) {
    this.id_category = id_category;
    this.name = name;
  }
}
