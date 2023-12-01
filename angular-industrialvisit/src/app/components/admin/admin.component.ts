import { Component, OnInit } from '@angular/core';
import { IndustrialCategory } from 'src/app/common/industrial-category';
import { EnquiryFormService } from 'src/app/services/enquiry-form.service';
import { IndustryService } from 'src/app/services/industry.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  categories: IndustrialCategory[] = [];

  formData = {
    name: '',
    description: '',
    imageUrl: '',
    address: '',
    email: '',
    officeNumber: '',
    category: { id: null }
  };

  constructor(private enquiryFormService: EnquiryFormService, private industryService: IndustryService) { }

  ngOnInit(): void {

    this.industryService.getIndustrialCategories().subscribe(
      data => {
        this.categories = data;
      });

  }

  saveIndustry() {
    this.enquiryFormService.saveIndustry(this.formData).subscribe({
      next: response => {
        alert(`Your details has been saved...`)
      },

      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  onSubmit() {

    //call Rest Api via the service
    //   this.enquiryFormService.saveIndustry(addCategory).subscribe({
    //     next: response => {
    //       alert(`Your details has been saved...`)
    //     },

    //     error: err => {
    //       alert(`There was an error: ${err.message}`);
    //     }
    //   });
  }




}
