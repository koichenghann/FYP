import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-area-one',
  templateUrl: './test-area-one.component.html',
  styleUrls: ['./test-area-one.component.scss']
})
export class TestAreaOneComponent implements OnInit {

  bigChart=[];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.bigChart = this.testService.bigChart();
  }

}
