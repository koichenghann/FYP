import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import { Options } from "highcharts";


MapModule(Highcharts);

@Component({
  selector:'app-widget-map-location',
  templateUrl: 'map-location-my.component.html',
  styleUrls: ['map-location-my.component.scss'],

})


export class MapLocationComponent {




  constructor() {};

  title = "app";
  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartCallback;

  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];

  chartOptions: Options = {
    chart: {
      map: 'countries/my/my-all'
    },
    title: {
      text: "Highmaps basic demo"
    },
    subtitle: {
      text:
        'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        type: "map",
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
          ["my-sa", 0],
          ["my-sk", 1],
          ["my-la", 2],
          ["my-pg", 3],
          ["my-kh", 4],
          ["my-sl", 5],
          ["my-ph", 6],
          ["my-kl", 7],
          ["my-pj", 8],
          ["my-pl", 9],
          ["my-jh", 10],
          ["my-pk", 11],
          ["my-kn", 12],
          ["my-me", 13],
          ["my-ns", 14],
          ["my-te", 15]
        ]
      }
    ]
  };


}

