<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart as EChartsBarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([EChartsBarChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer]);

const props = defineProps<{
  chartData: {
    xAxisData: string[];
    series: Array<{
      name: string;
      data: number[];
      color?: string;
    }>;
  };
  title?: string;
  height?: string;
}>();

const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const initChart = () => {
  if (chartContainer.value) {
    chart = echarts.init(chartContainer.value);
    
    const series = props.chartData.series.map(serie => {
      return {
        name: serie.name,
        type: 'bar',
        data: serie.data,
        itemStyle: serie.color ? {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: serie.color },
            { offset: 1, color: serie.color + '80' }
          ])
        } : undefined
      };
    });

    const option = {
      title: props.title ? {
        text: props.title,
        left: 'left',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      } : undefined,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: props.title ? '60' : '30',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: props.chartData.xAxisData,
        axisLine: {
          lineStyle: {
            color: '#eaeaea'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#eaeaea',
            type: 'dashed'
          }
        }
      },
      series: series
    };

    chart.setOption(option);

    window.addEventListener('resize', handleResize);
  }
};

const handleResize = () => {
  chart?.resize();
};

watch(() => props.chartData, () => {
  chart?.dispose();
  initChart();
}, { deep: true });

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  chart?.dispose();
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div ref="chartContainer" :style="{ height: height || '300px', width: '100%' }"></div>
</template>