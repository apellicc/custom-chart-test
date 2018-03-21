declare var APP_VERSION: string;

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

import { colorSets } from '../src/utils/color-sets';
import { formatLabel } from '../src/common/label.helper';

import { generateData2 } from './data';

import { data as countries } from 'emoji-flags';
import chartGroups from './chartTypes';
import { barChart, lineChartSeries } from './combo-chart-data';

@Component({
  selector: 'app',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../node_modules/@swimlane/ngx-ui/release/index.css', './app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  version = APP_VERSION;

  theme = 'dark';
  chartType: string;
  chartGroups: any[];
  chart: any;

  dataArmando: any[];

  linearScale: boolean = false;
  range: boolean = false;

  view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  showXAxisLabel = true;
  tooltipDisabled = false;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true;
  animations: boolean = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;

  colorSets: any;
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;

  test: any[];
  // Override colors for certain values
  // customColors: any[] = [
  //   {
  //     name: 'Germany',
  //     value: '#0000ff'
  //   }
  // ];

  // line, area
  autoScale = true;
  timeline = false;

  // Reference lines
  showRefLines: boolean = true;
  showRefLabels: boolean = true;

  // Supports any number of reference lines.
  // refLines = [
  //   { value: 42500, name: 'Maximum' },
  //   { value: 37750, name: 'Average' },
  //   { value: 33000, name: 'Minimum' }
  // ];

  constructor(public location: Location) {

    Object.assign(this, {
      countries,
      chartGroups,
      colorSets,
    });

    this.dataArmando = generateData2();
    
    this.test = this.dataArmando;

    this.setColorScheme('cool');
  }

  get dataArmandoTest() {
    return this.dataArmando;
  }

  onActivateAndDeactivate(bol: string) { // keep the highlights on all the time
    console.log(bol);
    this.test = [...this.dataArmando];
  }

  ngOnInit() {
    const state = this.location.path(true);

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer(event) {
    this.fitContainer = event;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }


  select(data) {
    console.log('Item clicked', data);
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  onFilter(event) {
    console.log('timeline filter', event);
  }

  /*
  **
  Combo Chart
  **
  [yLeftAxisScaleFactor]="yLeftAxisScale" and [yRightAxisScaleFactor]="yRightAxisScale"
  exposes the left and right min and max axis values for custom scaling, it is probably best to
  scale one axis in relation to the other axis but for flexibility to scale either the left or
  right axis bowth were exposed.
  **
  */

  yLeftAxisScale(min, max) {
    return {min: `${min}`, max: `${max}`};
  }

  yRightAxisScale(min, max) {
    return {min: `${min}`, max: `${max}`};
  }

  yLeftTickFormat(data) {
    return `${data.toLocaleString()}`;
  }

  yRightTickFormat(data) {
    return `${data}%`;
  }
  /*
  **
  End of Combo Chart
  **
  */

  onSelect(event) {
    console.log(event);
  }
}
