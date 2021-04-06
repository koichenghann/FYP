import { Component, OnInit } from '@angular/core';
import { digitalListDB } from 'src/app/shared/tables/digital-list';
import { RestapiService } from '../../../../restapi.service'
import { DataService } from '../../../../data.service';

@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss']
})
export class DigitalListComponent implements OnInit {
  public digital_list = []

  constructor(
    private restapi: RestapiService,
    public data: DataService,
  ) {
    // this.digital_list = digitalListDB.digital_list;
  }

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      productId: {
        title: 'Id',
        editable: false,
      },
      image: {
        title: 'Product Image',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { return '<img src= ' + value + ' class="imgTable"  />' }
      },
      productName: {
        title: 'Product Title'
      },
      category: {
        title: 'Category',
        editable: false,
      },
      stock: {
        title: 'Quantity',
      }
    },
    edit: { confirmSave: true },
    delete: { confirmDelete: true }
  };

  ngOnInit() {
    this.restapi.get('seller/products').subscribe((res: any) => {
      console.log("Res",res)
      this.digital_list = res.products
    },
      (err: any) => {
        this.data.error(err['message']);
      }
    )

  }

  onDeleteConfirm(event) {
    this.restapi.delete(
      `seller/products/${event.data.productId}`).subscribe((res: any) => {
        event.confirm.resolve(event.newData);
      },(err: any) => {
          this.data.error(err.error['message']);
        });
  }

  onEditConfirm(event) {
    this.restapi.patch(
      `seller/products`,
      event.newData
    ).subscribe((res: any) => {
      event.confirm.resolve(event.newData);
    },(err: any) => {
        this.data.error(err.error['message']);
      })
  }

}
