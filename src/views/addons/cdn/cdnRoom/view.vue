<template>
  <div>
    <n-drawer v-model:show="showModal" :width="dialogWidth">
      <n-drawer-content title="机房信息详情" closable>
        <n-spin :show="loading" description="请稍候...">
          <n-descriptions label-placement="left" class="py-2" column="2">
            <n-descriptions-item>
              <template #label>
                机房编码
              </template>
              {{ formValue.code }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                机房名称
              </template>
              {{ formValue.name }}
            </n-descriptions-item>
            <n-descriptions-item label="机房归属">
              <n-tag :type="getOptionTag(options.cdn_belong_to, formValue?.belong)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdn_belong_to, formValue?.belong) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                商务人员
              </template>
              {{ formValue.commerceId }}
            </n-descriptions-item>
            <n-descriptions-item label="所属客户">
              <n-tag :type="getOptionTag(options.cdnCustomerOption, formValue?.customerId)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdnCustomerOption, formValue?.customerId) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                所在地区
              </template>
              {{ formValue.provinceId }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                计费方式
              </template>
              {{ formValue.billingPlan }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                单价 元/M
              </template>
              {{ formValue.price }}
            </n-descriptions-item>
            <n-descriptions-item label="机房类型">
              <n-tag :type="getOptionTag(options.cdn_room_type, formValue?.type)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdn_room_type, formValue?.type) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                运营商 多个
              </template>
              {{ formValue.isp }}
            </n-descriptions-item>
            <n-descriptions-item label="IP类型">
              <n-tag :type="getOptionTag(options.cdn_ip_type, formValue?.ipType)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdn_ip_type, formValue?.ipType) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="网络类型">
              <n-tag :type="getOptionTag(options.cdn_net_type, formValue?.natType)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdn_net_type, formValue?.natType) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="是否支持IPV6">
              <n-switch v-model:value="formValue.isIpv6Supported" :unchecked-value="2" :checked-value="1" :disabled="true"/>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                企业微信群名称
              </template>
              {{ formValue.wechatName }}
            </n-descriptions-item>
            <n-descriptions-item label="状态">
              <n-tag :type="getOptionTag(options.cdn_room_stage, formValue?.stage)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdn_room_stage, formValue?.stage) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                详细地址
              </template>
              {{ formValue.address }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                备注
              </template>
              <span v-html="formValue.note"></span>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                机房总带宽
              </template>
              {{ formValue.bandwidth }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                机房线路数
              </template>
              {{ formValue.lineCount }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                管理线路数
              </template>
              {{ formValue.lineManagerCount }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                上行带宽
              </template>
              {{ formValue.bwUp }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                下行带宽
              </template>
              {{ formValue.bwDown }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                带宽类型
              </template>
              {{ formValue.bwType }}
            </n-descriptions-item>
            <n-descriptions-item label="是否支持多播">
              <n-switch v-model:value="formValue.isMulticastSupported" :unchecked-value="2" :checked-value="1" :disabled="true"/>
            </n-descriptions-item>
          </n-descriptions>
        </n-spin>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { View } from '@/api/addons/cdn/cdnRoom';
  import { State, newState, options } from './model';
  import { adaModalWidth, getOptionLabel, getOptionTag } from '@/utils/hotgo';
  import { getFileExt } from '@/utils/urlUtils';

  const message = useMessage();
  const loading = ref(false);
  const showModal = ref(false);
  const formValue = ref(newState(null));
  const dialogWidth = computed(() => {
    return adaModalWidth(document.body.clientWidth - 100);
  });
  const fileAvatarCSS = computed(() => {
    return {
      '--n-merged-size': `var(--n-avatar-size-override, 80px)`,
      '--n-font-size': `18px`,
    };
  });

  //下载
  function download(url: string) {
    window.open(url);
  }

  function openModal(state: State) {
    showModal.value = true;
    loading.value = true;
    View({ id: state.id })
      .then((res) => {
        formValue.value = res;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  defineExpose({
    openModal,
  });
</script>

<style lang="less" scoped></style>
