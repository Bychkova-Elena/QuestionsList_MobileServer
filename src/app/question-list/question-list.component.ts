import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/services/main.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  categories: any;
  questions: any;
  id: number;
  name: String;

    constructor(private activeRoute: ActivatedRoute, private api: MainService) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    });
}

  async ngOnInit() {
        try {
      this.questions = await this.api.get(
        "/questions/" + this.id
      );
      console.log(this.questions)
    }
    catch (error) {
      console.log(error)
    };
     try {
      this.categories = await this.api.get(
        "/categories"
      );
       console.log(this.categories)
       this.name = this.categories[this.id-1].name;
    }
    catch (error) {
      console.log(error)
    }

  }
}
