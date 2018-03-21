import './polyfills';

import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { LineChartModule } from './line-chart/line-chart.module';

@NgModule({
  exports: [
    ChartCommonModule,
    AreaChartModule,
    LineChartModule
  ]
})
export class NgxChartsModule {}
