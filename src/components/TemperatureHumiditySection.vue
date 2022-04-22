<template>
  <q-card-section class="text-center">
    <div class="q-pb-md row justify-between items-center">
      <div>
        <!--  -->
        {{ t('scope') }}: <code>{{ scope }}</code>
        &nbsp;
        <!--  -->
        {{ t('node') }}: <code>{{ node }}</code>
        &nbsp;
        <!--  -->
        {{ t('type') }}: <code>{{ type }}</code>
      </div>
      <q-btn outline :label="t('refresh')" @click="onRefresh" />
    </div>
    <q-separator />
    <div class="echarts-wrapper">
      <div class="echarts" ref="echartsDivRef"></div>
    </div>
    <q-inner-loading :showing="loading" />
  </q-card-section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { userData } from '@/utils/api'
import * as echarts from 'echarts'

const props = defineProps<{
  scope: string
  node: string
  type: string
}>()

const { t } = useI18n()

const echartsDivRef = ref<HTMLElement | null>(null)
const loading = ref(false)
let chart: echarts.ECharts | null = null
let data: any[] = []

async function onRefresh() {
  loading.value = true
  data = <any[]>await userData(props.scope, props.node, props.type)
  chart?.setOption({
    series: [
      { data: data.map(({ value: { tavg, c }, created }, i) => [created, tavg, c, i]) },
      { data: data.map(({ value: { havg, c }, created }, i) => [created, havg, c, i]) },
      { data: data.map(({ value: { tavg, tmin, tmax, c }, created }, i) => [created, tavg, c, i, tmin, tmax, tavg, tavg]) },
      { data: data.map(({ value: { havg, hmin, hmax, c }, created }, i) => [created, havg, c, i, hmin, hmax, havg, havg]) }
    ]
  })
  loading.value = false
}

const tem = (value: number) => `${value.toFixed(1)} °C`
const hum = (value: number) => `${value.toFixed(1)} %`
const minBound = ({ min }: { min: number }) => Math.floor(min)
const maxBound = ({ max }: { max: number }) => Math.ceil(max)

onMounted(async () => {
  chart = echarts.init(echartsDivRef.value!)
  new ResizeObserver(() => {
    chart?.resize()
  }).observe(echartsDivRef.value!)

  chart.setOption({
    title: {
      text: 'Environment'
    },
    legend: {
      top: 'bottom'
    },
    grid: { top: 80 },
    toolbox: {
      show: true,
      feature: {
        dataZoom: { yAxisIndex: 'none' },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontFamily: 'CascadiaCode',
        fontSize: 12,
        align: 'left'
      },
      formatter: ([
        {
          axisValueLabel,
          marker: marker0,
          value: [, value0, samples, i]
        }
      ]: any[]) =>
        `${axisValueLabel}<br/>
        Samples: ${samples}<br/>
        Tavg: ${data[i].value.tavg.toFixed(1)} °C<br/>
        Tmin: ${data[i].value.tmin.toFixed(1)} °C<br/>
        Tmax: ${data[i].value.tmax.toFixed(1)} °C<br/>
        Havg: ${data[i].value.havg.toFixed(1)} %<br/>
        Hmin: ${data[i].value.hmin.toFixed(1)} %<br/>
        Hmax: ${data[i].value.hmax.toFixed(1)} %`
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: [
      {
        type: 'value',
        name: 'Temperature',
        axisPointer: {
          label: {
            formatter: ({ value }: { value: number }) => tem(value)
          }
        },
        min: minBound,
        max: maxBound
      },
      {
        type: 'value',
        name: 'Humidity',
        axisPointer: {
          label: {
            formatter: ({ value }: { value: number }) => hum(value)
          }
        },
        min: minBound,
        max: maxBound
      }
    ],
    series: [
      {
        name: 'Temperature',
        data: [],
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
          label: {
            formatter: ({ value }: { value: number }) => tem(value)
          }
        }
      },
      {
        name: 'Humidity',
        data: [],
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
          label: {
            formatter: ({ value }: { value: number }) => hum(value)
          }
        }
      },
      {
        name: 'Temperature Boxplot',
        data: [],
        type: 'boxplot',
        yAxisIndex: 0,
        encode: {
          x: 0,
          y: [4, 6, 1, 7, 5]
        }
      },
      {
        name: 'Humidity Boxplot',
        data: [],
        type: 'boxplot',
        yAxisIndex: 1,
        encode: {
          x: 0,
          y: [4, 6, 1, 7, 5]
        }
      }
    ]
  })
  onRefresh()
})

onBeforeUnmount(() => {
  chart?.dispose()
})
</script>

<style scoped>
.echarts-wrapper {
  width: 100%;
  overflow-x: scroll;
}

.echarts {
  height: 300px;
  width: 100%;
  min-width: 640px;
}
</style>
