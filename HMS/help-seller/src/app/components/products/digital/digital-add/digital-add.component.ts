import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../../../restapi.service';
import { DataService } from '../../../../data.service';


@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss']
})
export class DigitalAddComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rest: RestapiService,
    private data: DataService,
  ) { }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  public categories = []
  productForm: FormGroup

  public onUploadInit(args: any): void {

   }

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void {
    this.pf.image.setValue(args[0].dataURL)
   }

  ngOnInit() {
    this.rest.get('categories').subscribe((res:any)=>{
    this.categories = res.categories.map(e => e.name )
    },
    (err:any)=>{
      this.data.error(err.error['message']);
    })
    this.productForm = this.formBuilder.group({
      // sellerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      productDescription: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ],
      brand: ['', [Validators.required] ],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      weight: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      image: ['', [Validators.required]],
      parcelLength: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      parcelWidth: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      parcelHeight: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      category: [null, [Validators.required]],
    });
  }
  // Choose city using select dropdown
  changeCat(e) {
    this.pf.category.setValue(e.target.value,{onlySelf: true})
  }

  get pf() { return this.productForm.controls; }

  addProduct(){
    if(this.productForm.valid){
      this.rest.post('seller/products',this.productForm.value).subscribe((res:any)=>{
        console.log("Testing",res)
        this.router.navigateByUrl('/products/digital/digital-product-list');
        },
        (err:any)=>{
          this.data.error(err.error['message']);
        })
    }
  }

}
