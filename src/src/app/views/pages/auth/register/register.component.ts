import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { PasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validators';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  genderTypeList: any[];
  filtergenderTypeList: any[];
  show: boolean;
  show2: boolean;
  isDisable = false;
  selectedFileName = 'Choose File';
  accesstype: any;
  filesResult: any;
  images: any[];

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private _lightbox: Lightbox) { 

    this.genderTypeList = [];
    this.filtergenderTypeList = [];
    this.genderTypeList = [
      {
        key: 0,
        value: "Male"
      },
      {
        key: 1,
        value: "Female"
      },
      {
        key: 2,
        value: "Transgender"
      }
    ];
    this.filtergenderTypeList = this.genderTypeList.slice();

  }

  ngOnInit(): void {
    this.initializeValidators();
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      genderType: [null, [Validators.required]],
      mobileNo: [null, [Validators.required]],
      address: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      // newpassword:  ['',Validators.required, PasswordStrengthValidator, Validators.maxLength(12), Validators.minLength(8)],
      newpassword:  ['',Validators.required, Validators.maxLength(12), Validators.minLength(8)],
      confirmpassword: ['',Validators.required],
      userPhoto: [null],
      userPhotoPath: [null],
    });
  }



  onFileSelected(event1:any) {
    const file = event1.target.files[0];
    if(file){
    this.accesstype = file && (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')
    if(this.accesstype){
    this.selectedFileName = file.name;
    let filesize = file.size;
      let acceptsize = parseInt((filesize / 1024).toFixed(2));
      if (acceptsize < 1000){
        if (event1.target.files && event1.target.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(event1.target.files[0]);
          reader.onload = (event: any) => {
            this.filesResult = event.target.result.split(',')[1];
            if (this.filesResult) {
              this.form.controls['userPhoto'].setValue(this.filesResult);
              this.form.controls['userPhotoPath'].setValue(this.filesResult ? this.selectedFileName : ''); // <-- Set Value for Validation
            }
          }
        }
      }else {
        this.alertService.error('File size is large');
        this.selectedFileName = '';
      }
    }

    } else {
      this.alertService.error('Please upload JPG, Jpeg & PNG images');
    }
  }


  open() {
    this.images = [];
    this.images.push(
      {
       src: 'data:image/jpg;base64,'+ this.filesResult,
       caption: 'image',
       thumb: 'data:image/jpg;base64,'+ this.filesResult
      });

    this._lightbox.open(this.images, 0, { centerVertically:true });

  }

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  onChangedob() {
  }

  genderChange(event: any){
    
  }



  password() {
    this.show = !this.show;
  }

  confirmpassword() {
    this.show2 = !this.show2;
  }

}
