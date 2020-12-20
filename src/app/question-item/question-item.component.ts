import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {
  show: boolean;

  @Input() question: any;

  constructor(){}

  ngOnInit() {
    this.show = false;

  }
  showBlock() {
    this.show = !this.show;
  }
}
