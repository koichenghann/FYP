import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { RestapiService } from '../../../../restapi.service';
import { DataService } from '../../../../data.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss']
})
export class DigitalCategoryComponent implements OnInit {
  public closeResult: string;
  public digital_categories = []
  registrationForm: FormGroup
  submitted = false;

  @ViewChild("content") modalContent: TemplateRef<any>;
  constructor(
    private rest: RestapiService,
    private router: Router,
    private modalService: NgbModal,
    private data: DataService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    )
   {
  }


   register() {
    console.log("asdfasdfas",this.registrationForm.value)
    console.log("token",localStorage.getItem('token'))
    const form = new FormData;
    form.append('image', this.registrationForm.controls['image'].value);
    form.append('name', this.registrationForm.controls['name'].value);
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  localStorage.getItem('token'))
        .set('Accept', 'application/json')
    }
    this.httpClient.post(`http://localhost:3030/api/admin/categories`, form,header).subscribe(
      async (data)=>{
        if (data['success']) {
          this.data.success('Category added successfully.');
          const data = await this.rest.get(
            '/admin/categories'
          );
          if (data['success']) {
            this.digital_categories = data['categories'];
            this.modalService.dismissAll();
            return;
          } else {
            this.data.error(data['message']);
          }

        }

    },
    err => {
      if(!err.error.success)
      this.data.error(err.error['message']);
    }
    )


  }
  onUploadSuccess($event){
    console.log('$event:', $event)
    const image = $event.target.files[0];
    this.registrationForm.controls['image'].setValue(image);
  }
  open(content) {
    this.registrationForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      image: [null, [Validators.required] ],
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      image: {
        title: 'Image',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => {
          return `<img src=${value} class="imgTable" />`
        }
      },
      name: {
        title: 'Name',
        editable: false
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (value) => {
          if(value == "A")
          return `<i class='fa fa-circle font-success f-12'></i> Active`
          else
          return `<i class='fa fa-circle  f-12'></i> Inactive`
        }
      },
    },
    mode: 'inline',
    edit: { confirmSave: true },
    delete: { confirmDelete: true }
  };

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        '/admin/categories'
      );
      if (data['success']) {
        this.digital_categories = data['categories'];
        console.log('user_list:', this.digital_categories.length)
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
   }


  async onDeleteConfirm(event){
    this.rest.delete(`/admin/categories/?name=${event.data.name}`).subscribe(
      (data:any) =>{
        this.data.success(data.message);
        event.confirm.resolve(event.newData);
      },
      err =>{
        this.data.error(err.error['message']);
      })
    event.confirm.resolve(event.newData);
  }

  onEditConfirm(event){
    console.log('event:', event)
    this.rest.patch('/admin/categories', event.newData).subscribe(
    (data:any) =>{
      this.data.success(data.message);
      event.confirm.resolve(event.newData);
    },
    err =>{
      this.data.error(err.error['message']);
    })

  }

}
