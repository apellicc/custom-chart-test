const chartGroups = [
  {
    name: 'Line/Area Charts',
    charts: [
      {
        name: 'Line Chart',
        selector: 'line-chart',
        inputFormat: 'multiSeries',
        options: [
          'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
          'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
          'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
          'rangeFillOpacity', 'roundDomains', 'tooltipDisabled', 'showRefLines',
          'referenceLines', 'showRefLabels',
          'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
        ],
        defaults: {
          yAxisLabel: 'GDP Per Capita',
          xAxisLabel: 'Census Date',
          linearScale: true
        }
      }
    ]
  }
];

export default chartGroups;
