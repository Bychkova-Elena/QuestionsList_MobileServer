import { Component, OnInit } from "@angular/core";
import { MainService } from "../shared/services/main.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {

  categories: any;

  constructor(private api: MainService) {}

  async ngOnInit() {
    try {
      this.categories = await this.api.get(
        "/categories"
      );
      console.log(this.categories)
    }
    catch (error) {
      console.log(error)
    }

  }

}

