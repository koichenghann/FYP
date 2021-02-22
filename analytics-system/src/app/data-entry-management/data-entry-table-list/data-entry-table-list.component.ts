import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';
export interface Data{
  fileType: string,
  format: string,
  fileName: string,
  dateCreated: string,
  fileSize: string,
  description: string,
}

const dummyData: Data[] = [
  {fileType: 'fas fa-file-csv', format:'.csv', fileName:'customer_data_2019', dateCreated:'2019-09-30', fileSize:'46 KB', description:'-' },
  {fileType: 'far fa-file-pdf', format:'.pdf', fileName:'Sale record (March 2020)', dateCreated:'2020-04-06', fileSize:'79 KB', description:'-' },
  {fileType: 'far fa-file-word', format:'.docx', fileName:'Product Categories list (2020_03)', dateCreated:'2020-03-06', fileSize:'16 KB', description:'-' },
  {fileType: 'fas fa-database', format:'.sql', fileName:'TransactionRecord2020Q3', dateCreated:'2020-10-02', fileSize:'176 KB', description:'-' },
  {fileType: 'far fa-file-alt', format:'.txt', fileName:'New_customer_list_2020', dateCreated:'2020-10-15', fileSize:'25 KB', description:'-' },
];

export interface PeriodicElement {
  customerID: string;
  name: string;

  contact: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {customerID: 'C001', name: 'Marry', contact: '01781321321', address: 'Taman Jaya'},
  {customerID: 'C002', name: 'Chris', contact: '01982312313', address: 'Setia Alam'},
  {customerID: 'C003', name: 'Kylie', contact: '0167221321', address: 'Puchong'},
  {customerID: 'C004', name: 'Brian', contact: '0167221321', address: 'Subang Jaya'},
  {customerID: 'C005', name: 'Brandon', contact: '0167221321', address: 'Kepong'},
  {customerID: 'C006', name: 'Jason', contact: '0167221321', address: 'Sri Petaling'},
  {customerID: 'C007', name: 'Nick', contact: '0167221321', address: 'Bukit Jalil'},
  {customerID: 'C008', name: 'Alexander', contact: '0167221321', address: 'Bukit Damansara'},
  {customerID: 'C009', name: 'Figo', contact: '0167221321', address: 'Kota Damansara'},
  {customerID: 'C010', name: 'Ronaldo', contact: '0167221321', address: 'Shah Alam'},
];

@Component({
  selector: 'data-entry-table-list',
  templateUrl: './data-entry-table-list.component.html',
  styleUrls: ['./data-entry-table-list.component.css']
})
export class DataEntryTableListComponent implements OnInit {

  displayedColumns: string[] = ['fileType',
                      'fileName',
                      'format',
                      'dateCreated',
                      'fileSize',
                      'description',
                      'action'
                    ];
  dataSource = dummyData;

  displayedColumnsInfo: string[] = ['customerID', 'name', 'contact', 'address'];
  dataSourceInfo = ELEMENT_DATA;



  ngOnInit(){

  }












}
