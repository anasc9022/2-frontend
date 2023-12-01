import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Visitor } from 'src/app/common/visitor';
import { EnquiryFormService } from 'src/app/services/enquiry-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  countries: Country[] = [];
  addressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private enquiryFormService: EnquiryFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      visitor: this.formBuilder.group({
        firstName: [''],
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        email: [''],
        city: [''],
        state: [''],
        country: ['']
      })
    });

    //populate countries
    this.enquiryFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  get phone() { return this.checkoutFormGroup.get('visitor.phone')}

  onSubmit() {
    
    console.log(this.checkoutFormGroup.get('visitor')!.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //set up user
    let visitor = new Visitor();

    //populate user
    visitor.visitorDetails = this.checkoutFormGroup.controls['visitor'].value;

    const shippngState: State = JSON.parse(JSON.stringify(visitor.visitorDetails.state));
    const shipingCountry: Country = JSON.parse(JSON.stringify(visitor.visitorDetails.country));
    visitor.visitorDetails.state = shippngState.name;
    visitor.visitorDetails.country = shipingCountry.name;

    console.log(shipingCountry.code);

    console.log(visitor.visitorDetails.state);

    //call Rest Api via the checkoutService
    this.enquiryFormService.saveVisitor(visitor).subscribe({
      next: response => {
        alert(`Your details has been saved...`)
      },
      
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName)!;

    const countryCode = formGroup.value.country.code;

    console.log('contry code', formGroup.value.country.code)

    this.enquiryFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'visitor') {
          this.addressStates = data;
        }
        //select 1st state by default
        formGroup.get('state')!.setValue(data[0]);
      }
    );
  }

}

