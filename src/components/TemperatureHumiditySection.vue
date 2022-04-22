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

async function onRefresh() {
  loading.value = true
  const data = <any[]>await userData(props.scope, props.node, props.type)
  const tData = data.map(({ value: { t, c }, created }) => [created, t, c])
  const hData = data.map(({ value: { h, c }, created }) => [created, h, c])
  chart?.setOption({
    series: [{ data: tData }, { data: hData }]
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
      formatter: ([
        {
          axisValueLabel,
          marker: marker0,
          seriesName: seriesName0,
          value: [, value0, samples]
        },
        {
          marker: marker1,
          seriesName: seriesName1,
          value: [, value1]
        }
      ]: any[]) =>
        `${axisValueLabel}<br/>
        Samples: ${samples}<br/>
        ${marker0}${seriesName0}: ${value0.toFixed(1)} °C<br/>
        ${marker1}${seriesName1}: ${value1.toFixed(1)} %`
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
