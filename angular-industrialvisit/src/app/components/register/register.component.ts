import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Visitor } from 'src/app/common/visitor';
import { EnquiryFormService } from 'src/app/services/enquiry-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private enquiryFormService: EnquiryFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      register: this.formBuilder.group({
        collegeName: [''],
        email: [''],
        password: ['']
      })
    });

  }

  onSubmit() {
    
    //set up user
    let visitor = new Visitor();

    //populate user
    visitor.registerDetails = this.checkoutFormGroup.controls['register'].value;

    console.log(visitor.registerDetails.collegeName);

    //call Rest Api via the checkoutService
    this.enquiryFormService.saveRegister(visitor).subscribe({
      next: response => {
        alert(`Your have successfully registered`)
      },
      
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }


}
