import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(public data: DataService) { }
  public closed = false
  ngOnInit() {
  }

  onClose(){
    this.data.message = ""
  }

}
