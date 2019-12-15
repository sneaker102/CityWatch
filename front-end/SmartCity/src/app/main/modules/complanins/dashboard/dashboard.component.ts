import { Component, OnInit } from '@angular/core';
import * as vega from 'vega';
import embed from 'vega-embed';
import { TopLevelSpec } from 'vega-lite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  buildLineChart(chartData: any) {
    const spec: TopLevelSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.0.0-beta.10.json',
      data: {
        values: chartData
      },
      mark: {
        type: 'line',
        point: {
          filled: false,
          fill: 'white'
        },
        tooltip: { content: 'encoding' }
      },
      encoding: {
        x: {
          field: 'date',
          type: 'temporal',
          timeUnit: 'yearmonthdatehoursminutesseconds',
          axis: { title: null }
        },
        y: { field: 'active', type: 'quantitative', axis: { title: null } }
      },
      width: 800,
      height: 185
    };

    embed('#trafficLineChart', spec, {
      actions: false,
      renderer: 'svg'
    });
  }
}
