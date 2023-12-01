import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Industry } from 'src/app/common/industry';
import { IndustryService } from 'src/app/services/industry.service';

@Component({
  selector: 'app-industry-details',
  templateUrl: './industry-details.component.html',
  styleUrls: ['./industry-details.component.css']
})
export class IndustryDetailsComponent implements OnInit {

  industry!: Industry;

  constructor(private industryService: IndustryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleIndustryList()
    })
  }

  handleIndustryList() {

    //get the id string and convert it to number using + symbol
    const theIndustryId: number = +this.route.snapshot.paramMap.get('id')!;

    this.industryService.getIndustry(theIndustryId).subscribe(
      data => {
        this.industry = data;
      })
  }

}
