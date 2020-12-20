import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../shared/services/main.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  categories: any;
  name: String;
  form: FormGroup;
  disabled = false;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private router:Router, private api: MainService) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    });
  }

  async ngOnInit() {
     this.form = new FormGroup({
      question: new FormControl( { value: '', disabled: this.disabled } , [Validators.required]),
      answer: new FormControl( { value: '', disabled: this.disabled } , [Validators.required]),
      clarification: new FormControl( { value: '', disabled: this.disabled } )
     });
    
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
  async onSubmit(){
    try {
        await this.api.post(
          JSON.stringify(this.form.value),
          "/add-question/" + this.id
        );
      this.router.navigate(['/question-list', this.id]);
      alert("Ваш вопрос успешно добавлен!");
      } catch (err) {
        console.log(err);
      }
  }
}