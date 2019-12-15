import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RideActionComponent } from '../ride-action/ride-action.component';
import * as vega from 'vega';
import embed from 'vega-embed';
import { TopLevelSpec } from 'vega-lite';
import { ApiService } from 'src/app/shared/services/api.service';
import { Spec } from 'vega';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLineChartLoaded = false;
  currentAddress: string;
  streets = [
    'Muresenilor',
    'Brediceanu Tiberiu',
    'Constelatiei',
    'Constructorilor',
    'Lacramioarelor',
    'Lupeni',
    'Minerva',
    'Garii',
    'Grivitei',
    'Saturn'
  ];
  constructor(
    public dialogRef: MatDialogRef<RideActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getAddress(this.data.lat, this.data.lng).subscribe(
      address => this.currentAddress = new DOMParser()
        .parseFromString(address, 'text/xml').getElementsByTagName('result')[0].childNodes[0].nodeValue,
      () => { },
      () => {
        console.log(this.currentAddress);
        this.buildChart();
      }
    );

    this.buildChart();
    const date = [
      {
        count: 30,
        type: 'Muresenilor'
      },
      {
        count: 130,
        type: 'Constructorilor'
      },
      {
        count: 230,
        type: 'Constelatiei'
      },
      {
        count: 10,
        type: 'Brediceanu Tiberiu'
      }
    ];
    this.buildPieChart(date);
  }
  buildChart() {
    const i = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    this.streets[i]
    this.api.getTraffic('Strada Castanilor').subscribe(resp => {
      const date = resp.map(r => {
        return { date: r.date, cars: r.carsPerSecond };
      });
      this.isLineChartLoaded = true;
      this.buildLineChart(date);
    });
    // const date = [
    //   {
    //     date: new Date().getTime(),
    //     cars: 30
    //   },
    //   {
    //     date:
    //       new Date().getTime() -
    //       Math.floor(Math.random() * (10000 - 500 + 1)) +
    //       500,
    //     cars: 70
    //   },
    //   {
    //     date:
    //       new Date().getTime() -
    //       Math.floor(Math.random() * (10000 - 500 + 1)) +
    //       500,
    //     cars: 170
    //   },
    //   {
    //     date:
    //       new Date().getTime() -
    //       Math.floor(Math.random() * (10000 - 500 + 1)) +
    //       500,
    //     cars: 10
    //   }
    // ];
    // this.buildLineChart(date);
  }
  buildLineChart(chartData: any) {
    const spec: TopLevelSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.0.0-beta.10.json',
      data: {
        values: chartData
      },
      mark: {
        type: 'line',
        point: {
          filled: true,
        },
        tooltip: { content: 'encoding' }
      },
      encoding: {
        x: {
          field: 'date',
          type: 'temporal',
          timeUnit: 'yearmonthdate',
          axis: { title: null }
        },
        y: { field: 'cars', type: 'quantitative', axis: { title: null } }
      },
      width: 800,
      height: 185
    };

    embed('#trafficLineChart', spec, {
      actions: false,
      renderer: 'svg'
    });
  }

  buildPieChart(parsedArr: any[]) {
    new vega.View(vega.parse(this.pieSettings(parsedArr)))
      .renderer('svg') // set renderer (canvas or svg)
      .initialize('#trafficPieChart') // initialize view within parent DOM container
      .width(185) // set chart width
      .height(185) // set chart height
      .hover() // enable hover encode set processing
      .run();
  }

  pieSettings(chartData: any[]): Spec {
    const spec: Spec = {
      $schema: 'https://vega.github.io/schema/vega/v5.json',
      autosize: 'pad',
      data: [
        {
          name: 'table',
          values: chartData,
          transform: [
            {
              type: 'joinaggregate',
              as: ['total'],
              ops: ['sum'],
              fields: ['count']
            },
            {
              type: 'pie',
              field: 'count',
              startAngle: 0,
              endAngle: 6.29
            }
          ]
        }
      ],
      scales: [
        {
          name: 'color',
          type: 'ordinal',
          domain: {
            data: 'table',
            field: 'type'
          },
          range: ['#2ecc71', '#16a085', '#8e44ad', '#23d2b5']
        },
        {
          name: 'r',
          domain: { data: 'table', field: 'count' },
          range: [{ signal: 'width / 2 + 10' }, { signal: 'width / 2' }]
        }
      ],
      marks: [
        {
          type: 'arc',
          from: { data: 'table' },
          encode: {
            enter: {
              fill: {
                scale: 'color',
                field: 'type'
              },
              x: { signal: 'width / 2' },
              y: { signal: 'height / 2' }
            },
            update: {
              startAngle: { field: 'startAngle' },
              endAngle: { field: 'endAngle' },
              innerRadius: { value: 50.1 },
              outerRadius: { scale: 'r', field: 'count' },
              tooltip: {
                signal: '{"Type": datum.type, "Count": datum.count}'
              }
            }
          }
        },
        {
          type: 'text',
          from: { data: 'table' },
          encode: {
            enter: {
              x: { signal: 'width / 2' },
              y: { signal: 'height / 2' },
              fill: { value: '#fff' },
              text: {
                signal:
                  'round(datum.count / datum.total * 100) == 0 ? "" : round(datum.count / datum.total * 100) + "%"'
              },
              theta: { signal: '(datum.startAngle + datum.endAngle)/2' },
              radius: { scale: 'r', field: 'count', offset: -20 },
              align: { value: 'center' },
              baseline: { value: 'middle' },
              fontSize: { value: 16 }
            }
          }
        }
      ]
    };
    return spec;
  }
}
