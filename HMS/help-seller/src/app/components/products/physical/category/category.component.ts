import { Component, OnInit } from '@angular/core';
import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RestapiService } from '../../../../restapi.service';
import { DataService } from '../../../../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public closeResult: string;
  public categories = []

  constructor(
    private modalService: NgbModal,
    private rest: RestapiService,
    public data: DataService) {
   
  }
  public powers = [{
    'id': "0",
    'name': 'City-link Express'
  }, {
    'id': "1",
    'name': 'DHL eCommerce'
  },
  {
    'id': "2",
    'name': 'J&T Express'
  },
  {
    'id': "3",
    'name': 'Ninja Van'
  },
  {
    'id': "4",
    'name': 'Poslaju'
  }
  ];
  id = this.powers[0].id
  status = false
  open(content) {
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
  onSubmit(val){
    console.log('val:', val)
    val.name = this.powers[val.id].name
    val.image = this.powers[val.id].id
    this.rest.post('seller/shipment',val).subscribe((res:any)=>{
      this.getShipmentDetails()
      this.modalService.dismissAll()
      // this.router.navigateByUrl('/products/digital/digital-product-list');
      },
      (err:any)=>{
        this.data.error(err.error['message']);
      })
  }

  public settings = {
    actions: {
      position: 'right',
    },
    columns: {
      image: {
        title: 'Image',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { return '<img src= ' + value + ' class="imgTable"  />' }
      },
      name: {
        title: 'Name',
        editable: false,
      },
      price: {
        title: 'Price',
        valuePrepareFunction: (value) => { return 'RM ' + value + '/Kg' }
      },
      status: {
        title: 'Status',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { 
          if(value)
          return "<i class=\"fa fa-circle font-primary f-12\"></i> Default"
          else 
          return "<i class=\"fa fa-circle font-success f-12\"></i> Available"
          
        }
      }
    },
    mode : 'inline',
    delete: { confirmDelete: true },
    edit: { confirmSave: true },
  };

  
  onDeleteConfirm(event) {
    this.rest.delete(`seller/shipment/${event.data.id}`).subscribe((res: any) => {
      this.data.success(res.message);
      event.confirm.resolve(event.newData);
    },
      (err: any) => {
        this.data.error(err['message']);
      }
    )
  }
  onEditConfirm(event){
    this.rest.patch(
      'seller/shipment',{id : event.newData.id, price :event.newData.price }
    ).subscribe((res: any) => {
      this.data.success(res.message);
      event.confirm.resolve(event.newData);
    },
      (err: any) => {
        this.data.error(err['message']);
      }
    );
  }


  getShipmentDetails(){
    this.rest.get('seller/shipment').subscribe((res: any) => {
      this.categories = res.shipmentDetails.sort(function(a, b){return a - b});
   },
     (err: any) => {
       this.data.error(err['message']);
     }
   )
 }

  ngOnInit() {
    this.getShipmentDetails()
  }

}
