import { Component, OnInit } from '@angular/core';
import { IndustrialCategory } from 'src/app/common/industrial-category';
import { IndustryService } from 'src/app/services/industry.service';

@Component({
  selector: 'app-industrial-category-menu',
  templateUrl: './industrial-category-menu.component.html',
  styleUrls: ['./industrial-category-menu.component.css']
})
export class IndustrialCategoryMenuComponent implements OnInit {

  industrialCategories: IndustrialCategory[] = [];

  constructor(private industryservice: IndustryService) { }

  ngOnInit(): void {
    this.listIndustrialCategories();
  }

  listIndustrialCategories() {

    this.industryservice.getIndustrialCategories().subscribe(
      data => {
        // console.log('Industrial Categories' + JSON.stringify(data));
        this.industrialCategories = data;
      });
  }

}
