import { Component, OnInit } from '@angular/core';
import { Industry } from 'src/app/common/industry';
import { IndustryService } from 'src/app/services/industry.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {

  industries: Industry[] = [];
  currentCategoryId: number = 2;
  searchMode: boolean = false;

  constructor(private industryService: IndustryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listIndustries();
  });
}

  listIndustries() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    
    if(this.searchMode) {
      this.handleSearchIndustries();
    }

    else{
    this.handleListIndustries();
    }
  }

  handleListIndustries() {

     //check id is available
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

     if (hasCategoryId) {
       //get the id string.. convert the string to number using + symbol
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
     }
     else{
       //id is not available.. default to category id 1
       this.currentCategoryId = 1

     }
 
     this.industryService.getIndustryList(this.currentCategoryId).subscribe(
       data => {
       this.industries = data;
       }
     );
  }

  handleSearchIndustries() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //now search for industries using keyword
    this.industryService.searchIndustries(theKeyword).subscribe(
      data => {
      this.industries = data;
    });
  }

}
