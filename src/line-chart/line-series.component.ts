import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { area, line } from 'd3-shape';

import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[ngx-charts-line-series]',
  template: `
    <svg:g>
      <svg:g ngx-charts-area
        class="line-highlight"
        [data]="data"
        [path]="areaPath"
        [fill]="colors.getColor(data.name)"
        [opacity]="0.5"
        [startOpacity]="0"
        [gradient]="true"
        [class.active]="true"
      />
      <svg:g ngx-charts-line
        class="line-series"
        [data]="data"
        [path]="path"
        [stroke]="stroke"
        [animations]="animations"
        [class.active]="true"
        [class.inactive]="false"
      />
      <svg:g ngx-charts-circle
        *ngFor="let circle of circles"
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circleRadius"
        [fill]="circle.color"
        [style.opacity]="1"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        tooltipType="tooltip"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesComponent implements OnChanges {

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() scaleType;
  @Input() curve: any;
  @Input() animations: boolean = true;

  circles: any[];
  circleRadius: number = 3;

  path: string;
  areaPath: string;
  stroke: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    const data = this.sortData(this.data.series);

    const lineGen = this.getLineGenerator();
    this.path = lineGen(data) || '';

    const areaGen = this.getAreaGenerator();
    this.areaPath = areaGen(data);

    this.stroke = this.colors.getColor(this.data.name);

    console.log(this.colors);
    const seriesName = this.data.name;

    this.circles = this.data.series.map((d, i) => {
      const value = d.value;
      const label = d.name;

      if (value) {
        const cx = this.xScale(label);
        const cy = this.yScale(value);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;

        const opacity = 1;
        const color = this.colors.getColor(seriesName);        

        const cData = {
          series: seriesName,
          value,
          name: label
        };

        return {
          classNames: [`circle-data-${i}`],
          value,
          label,
          data: cData,
          cx,
          cy,
          radius,
          height,
          color,
          opacity,
          seriesName,
          min: d.min,
          max: d.max
        };
      }
    }).filter((circle) => circle !== undefined);
  }
 
  getLineGenerator(): any {
    return line<any>()
      .x(d => {
        const label = d.name;
        const value = this.xScale(label);
     
        return value;
      })
      .y(d => this.yScale(d.value))
      .curve(this.curve);
  }

  getAreaGenerator(): any {
    const xProperty = (d) => {
      const label = d.name;
      return this.xScale(label);
    };

    return area<any>()
      .x(xProperty)
      .y0(() => this.yScale.range()[0])
      .y1(d => this.yScale(d.value))
      .curve(this.curve);
  }

  sortData(data) {
    data = sortByDomain(data, 'name', 'asc', this.xScale.domain());

    return data;
  }
}
