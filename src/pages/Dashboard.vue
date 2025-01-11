<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <h2 class="card-title d-flex align-items-center">
                  {{ $t("dashboard.count") }}: {{ totalCount }}
                  <span class="badge badge-info ml-2">+{{ todayCount }} {{ $t("dashboard.new") }}</span>
                </h2>
              </div>
              <div class="col-sm-6">
                <div
                    class="btn-group btn-group-toggle"
                    :class="'float-left'"
                    data-toggle="buttons"
                >
                  <label
                      v-for="(option, index) in tabs"
                      :key="option"
                      class="btn btn-sm btn-primary btn-simple"
                      :class="{ active: activeTab === index }"
                      :id="index"
                  >
                    <input
                        type="radio"
                        @click="changeTab(index)"
                        name="options"
                        autocomplete="off"
                        :checked="activeTab === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
                style="height: 100%"
                ref="bigChart"
                chart-id="big-line-chart"
                :chart-data="bigLineChart.chartData"
                :gradient-colors="bigLineChart.gradientColors"
                :gradient-stops="bigLineChart.gradientStops"
                :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import {fetchMessagesStats, fetchUsersStats} from "@/api/dashboard";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      activeTab: 0,
      tabs: ["Users", "Messages"],
      totalCount: 0,
      todayCount: 0,
      bigLineChart: {
        allData: [],
        chartData: {
          datasets: [{}],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  methods: {
    async changeTab(index) {
      this.activeTab = index;
      await this.loadChartData();
    },
    async loadChartData() {
      const stats =
          this.activeTab === 0
              ? await fetchUsersStats()
              : await fetchMessagesStats();

      this.bigLineChart.allData = stats.data;
      this.bigLineChart.chartData.labels = stats.labels;
      this.totalCount = stats.total;
      this.todayCount = stats.today;
      this.initBigChart();
    },
    initBigChart() {
      const chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData,
          },
        ],
        labels: this.bigLineChart.chartData.labels,
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
    },
  },
  async mounted() {
    await this.loadChartData();
  },
};
</script>
