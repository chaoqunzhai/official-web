<template>
  <div>
    <n-drawer v-model:show="showModal" :width="dialogWidth">
      <n-drawer-content closable title="服务器详情">
        <n-tabs
          :value="defaultTab"
          animated
          class="card-tabs"
          type="card"
          @before-leave="handleBeforeLeave"
        >
          <n-tab-pane name="balance" tab="流量">
            <Iframe :src="formValue.grafanaBwUrl" style="zoom: 0.8" />
          </n-tab-pane>
          <n-tab-pane name="integral" tab="监控看板">
            <Iframe :src="formValue.grafanaMetricUrl" style="zoom: 0.8" />
          </n-tab-pane>
          <n-tab-pane name="" tab="详情">
            <n-spin :show="loading" description="请稍候...">
              <n-descriptions class="py-2" column="1" label-placement="left">
                <n-descriptions-item>
                  <template #label> 主机名</template>
                  {{ formValue.hostname }}
                </n-descriptions-item>
                <n-descriptions-item label="所在机房">
                  <n-tag
                    :type="getOptionTag(options.cdnRoomOption, formValue?.roomId)"
                    class="min-left-space"
                    size="small"
                  >
                    {{ getOptionLabel(options.cdnRoomOption, formValue?.roomId) }}
                  </n-tag>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 所在省份</template>
                  {{ formValue.provinceId }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 所在市</template>
                  {{ formValue.cityId }}
                </n-descriptions-item>
                <n-descriptions-item label="运营商">
                  <n-tag
                    :type="getOptionTag(options.cdn_isp, formValue?.isp)"
                    class="min-left-space"
                    size="small"
                  >
                    {{ getOptionLabel(options.cdn_isp, formValue?.isp) }}
                  </n-tag>
                </n-descriptions-item>
                <n-descriptions-item label="在线">
                  <n-tag
                    :type="getOptionTag(options.cdn_server_online, formValue?.online)"
                    class="min-left-space"
                    size="small"
                  >
                    {{ getOptionLabel(options.cdn_server_online, formValue?.online) }}
                  </n-tag>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 线路带宽</template>
                  {{ formValue.lineBw }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 线路数</template>
                  {{ formValue.lineCount }}
                </n-descriptions-item>
                <n-descriptions-item label="可跨省">
                  <n-tag
                    :type="getOptionTag(options.cdn_cross_province, formValue?.enableCrossProvince)"
                    class="min-left-space"
                    size="small"
                  >
                    {{ getOptionLabel(options.cdn_cross_province, formValue?.enableCrossProvince) }}
                  </n-tag>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 所在地详细</template>
                  {{ formValue.address }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 服务器SN</template>
                  {{ formValue.sn }}
                </n-descriptions-item>
                <n-descriptions-item label="服务器状态">
                  <n-tag
                    :type="getOptionTag(options.cdn_server_status, formValue?.status)"
                    class="min-left-space"
                    size="small"
                  >
                    {{ getOptionLabel(options.cdn_server_status, formValue?.status) }}
                  </n-tag>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 最新上传速度</template>
                  {{ formValue.lastestSent }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label> 昨日95</template>
                  {{ formValue.lastest95 }}
                </n-descriptions-item>
              </n-descriptions>
            </n-spin>
          </n-tab-pane>
        </n-tabs>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useMessage } from "naive-ui";
import { View } from "@/api/addons/cdn/cdnServer";
import { newState, options, State } from "./model";
import { adaModalWidth, getOptionLabel, getOptionTag } from "@/utils/hotgo";
import Iframe from "@/views/iframe/index.vue";

const message = useMessage();
const loading = ref(false);
const showModal = ref(false);
const formValue = ref(newState(null));
const defaultTab = ref("balance");

const dialogWidth = computed(() => {
  return adaModalWidth(1900);
});
const fileAvatarCSS = computed(() => {
  return {
    "--n-merged-size": `var(--n-avatar-size-override, 80px)`,
    "--n-font-size": `18px`
  };
});

onMounted(() => {
});

//下载
function download(url: string) {
  window.open(url);
}

function handleBeforeLeave(tabName: string) {
  defaultTab.value = tabName;
}

function openModal(state: State) {
  showModal.value = true;
  loading.value = true;
  View({ id: state.id })
    .then((res) => {
      res.grafanaBwUrl = state.grafanaBwUrl;
      res.grafanaMetricUrl = state.grafanaMetricUrl;
      formValue.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
}

defineExpose({
  openModal
});
</script>

<style lang="less" scoped></style>
