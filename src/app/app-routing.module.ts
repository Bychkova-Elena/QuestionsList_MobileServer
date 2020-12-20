import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { QuestionListComponent } from "./question-list/question-list.component";
import { QuestionItemComponent } from "./question-item/question-item.component";
import { AddQuestionComponent } from "./add-question/add-question.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "question-list/:id", component: QuestionListComponent },
  { path: "question-item/:id", component: QuestionItemComponent },
  { path: "add-question/:id", component: AddQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
