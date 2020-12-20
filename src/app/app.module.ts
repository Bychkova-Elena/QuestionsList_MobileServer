import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MainComponent } from "./main/main.component";

import { FormsModule } from "@angular/forms";
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionItemComponent } from './question-item/question-item.component';
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    QuestionListComponent,
    QuestionItemComponent,
    AddQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
