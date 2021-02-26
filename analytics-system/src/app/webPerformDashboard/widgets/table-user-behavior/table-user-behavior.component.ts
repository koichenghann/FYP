import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatomoService } from '../../../matomo/matomo.service';
import { Subscription } from 'rxjs';
import { FormControl, FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-user-behavior-table',
  templateUrl: './table-user-behavior.component.html',
  styleUrls: ['./table-user-behavior.component.scss']
})
export class TableUserBehaviorComponent implements OnInit {

  constructor(private matomoService:MatomoService, private formBuilder: FormBuilder) {}

  behaviorSub: Subscription;

  userBehaviorDate;
  behaviorListData;

  selectedDate;

  date = new FormControl(new Date());

  dateForm = this.formBuilder.group({
    date: ''
  })

  /*
  behaviorList: {
    avg_page_load_time: number,
    avg_time_on_page: number,
    avg_time_server: number,
    bounce_rate: string,
    entry_bounce_count: string,
    entry_nb_actions: string,
    entry_nb_uniq_visitors: string,
    entry_nb_visits: string,
    entry_sum_visit_length: string,
    exit_nb_uniq_visitors: string,
    exit_nb_visits: string,
    exit_rate: string,
    label: string,
    max_time_server: string,
    min_time_server: string,
    nb_hits: number,
    nb_hits_with_time_server: string,
    nb_uniq_visitors: number,
    nb_visits: number,
    segment: string,
    sum_time_spent: number,
    url: string,

  }[]
  */



  ngOnInit(): void {
    //this.getSelectedDate();

    //console.log(this.date.value);
    this.setSelectedDate();


  }

  ngOnDestroy() {
    this.behaviorSub.unsubscribe();
  }

  getSelectedDate(){
    return console.log(this.date.value);
  }

  setSelectedDate(){
    console.log(this.date.value);

    var d = new Date(this.date.value),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formattedDate = [year, month, day].join('-');
    console.log(formattedDate);

    this.matomoService.getBehaviors(formattedDate);
    this.behaviorSub = this.matomoService.getBehaviorsRetrivedListener()
    .subscribe( (response: BehaviorList[]) => {
      this.dataSource = new MatTableDataSource<BehaviorList>(response);
      console.log("Data Retrived:" ,response);
      //this.setBehaviorData(response);

    });

  }



  displayedColumns: string[] = ['url', 'bounce_rate', 'exit_rate', 'avg_time_on_page', 'avg_page_load_time'];
  dataSource = new MatTableDataSource<BehaviorList>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  setBehaviorData(response){
    this.behaviorListData = response;
  }

  getBehaviorData(){
    return this.behaviorListData;
  }

}

export interface BehaviorList{
    avg_page_load_time: number,
    avg_time_on_page: number,
    avg_time_server: number,
    bounce_rate: string,
    entry_bounce_count: string,
    entry_nb_actions: string,
    entry_nb_uniq_visitors: string,
    entry_nb_visits: string,
    entry_sum_visit_length: string,
    exit_nb_uniq_visitors: string,
    exit_nb_visits: string,
    exit_rate: string,
    label: string,
    max_time_server: string,
    min_time_server: string,
    nb_hits: number,
    nb_hits_with_time_server: string,
    nb_uniq_visitors: number,
    nb_visits: number,
    segment: string,
    sum_time_spent: number,
    url: string,
}




//const behaviorList: BehaviorList[] = [{"label":"\/manager-dashboard","nb_visits":9,"nb_uniq_visitors":3,"nb_hits":11,"sum_time_spent":2027,"nb_hits_with_time_server":"1","min_time_server":"0.0010","max_time_server":"0.0010","entry_nb_uniq_visitors":"2","entry_nb_visits":"8","entry_nb_actions":"10","entry_sum_visit_length":"1607","entry_bounce_count":"6","exit_nb_uniq_visitors":"2","exit_nb_visits":"8","avg_time_server":0.001,"avg_page_load_time":0.001,"avg_time_on_page":184,"bounce_rate":"75%","exit_rate":"89%","url":"http:\/\/localhost:4200\/manager-dashboard","segment":"pageUrl==http%253A%252F%252Flocalhost%253A4200%252Fmanager-dashboard"},{"label":"\/home","nb_visits":3,"nb_uniq_visitors":3,"nb_hits":5,"sum_time_spent":162,"nb_hits_with_time_server":"1","min_time_server":"0.0010","max_time_server":"0.0010","entry_nb_uniq_visitors":"3","entry_nb_visits":"3","entry_nb_actions":"6","entry_sum_visit_length":"586","entry_bounce_count":"1","exit_nb_uniq_visitors":"3","exit_nb_visits":"3","avg_time_server":0.001,"avg_page_load_time":0.001,"avg_time_on_page":32,"bounce_rate":"33%","exit_rate":"100%","url":"http:\/\/localhost:4200\/home","segment":"pageUrl==http%253A%252F%252Flocalhost%253A4200%252Fhome"},{"label":"\/index","nb_visits":3,"nb_uniq_visitors":4,"nb_hits":5,"sum_time_spent":1176,"nb_hits_with_time_server":"0","min_time_server":null,"max_time_server":null,"entry_nb_uniq_visitors":"3","entry_nb_visits":"3","entry_nb_actions":"5","entry_sum_visit_length":"1177","entry_bounce_count":"2","exit_nb_uniq_visitors":"3","exit_nb_visits":"3","avg_time_server":0,"avg_page_load_time":0,"avg_time_on_page":235,"bounce_rate":"67%","exit_rate":"100%","url":"http:\/\/localhost:4200\/","segment":"pageUrl==http%253A%252F%252Flocalhost%253A4200%252F"}];




export interface Source {
  url:  string,
  bounceRate: string,
  exitRate: string,
  averageOnTime: string,
  icon: string
  performance: string
}

const sources: Source[] = [
  {url: 'merchant.help/product/club', bounceRate: '3.8%',  exitRate:'35.8%', averageOnTime:  '4m12s' , icon: 'fas fa-caret-up',performance:'4.3%'},
  {url:  'merchant.help/product', bounceRate: '7.6%',  exitRate: '17.6%', averageOnTime:  '3m22s', icon: 'fas fa-caret-up',performance:'2.5%'},
  {url:  'merchant.help/item', bounceRate: '12.8%',  exitRate: '12.8%', averageOnTime:  '1m12s', icon: 'fas fa-caret-down',performance:'0.7%'},
  {url:  'merchant.help/home', bounceRate: '9.6%',  exitRate: '9.6%', averageOnTime:  '5m25s', icon: 'fas fa-caret-down',performance:'5.6%'},
  {url:  'merchant.help/product/detail', bounceRate: '9.2%',  exitRate:'9.2%', averageOnTime: '6m21s', icon: 'fas fa-caret-up',performance:'2.3%'},
  {url:  'merchant.help/item/detail', bounceRate:'8.4%',  exitRate: '8.4%', averageOnTime: '4m12s', icon: 'fas fa-caret-down',performance:'5.7%'},
  {url:  'merchant.help/about-us', bounceRate: '4.3%',  exitRate: '4.3%', averageOnTime:  '3m43s', icon: 'fas fa-caret-up',performance:'4.3%'},
  {url:  'merchant.help/contact', bounceRate: '4.3%',  exitRate: '4.3%', averageOnTime: '4m23s', icon: 'fas fa-caret-up',performance:'8.3%'},
  {url:  'merchant.help/address', bounceRate: '4.3',  exitRate:'4.3%', averageOnTime:  '1m12s', icon: 'fas fa-caret-up',performance:'3.4%'},
  {url:  'merchant.help/club', bounceRate: '4.3%',  exitRate:'4.3%', averageOnTime:  '1m04s', icon: 'fas fa-caret-up',performance:'6.1%'}

];
