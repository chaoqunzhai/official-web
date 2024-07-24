<template>
  <div>
    <n-drawer v-model:show="showModal" :width="dialogWidth">
      <n-drawer-content title="客户列表详情" closable>
        <n-spin :show="loading" description="请稍候...">
          <n-descriptions label-placement="left" class="py-2" column="1">
            <n-descriptions-item>
              <template #label>
                编码
              </template>
              {{ formValue.code }}
            </n-descriptions-item>
            <n-descriptions-item label="客户类型">
              <n-tag :type="getOptionTag(options.cdn_customer_type, formValue?.type)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdn_customer_type, formValue?.type) }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                客户名称
              </template>
              {{ formValue.name }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                客户联系人
              </template>
              {{ formValue.contacts }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                手机号码
              </template>
              {{ formValue.phone }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                联系电话
              </template>
              {{ formValue.mobile }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                邮箱
              </template>
              {{ formValue.email }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                所在地
              </template>
              {{ formValue.provinceId }}
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
              {{ formValue.note }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                商务人员
              </template>
              {{ formValue.commerceId }}
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
  import { View } from '@/api/addons/cdn/cdnCustomer';
  import { State, newState, options } from './model';
  import { adaModalWidth, getOptionLabel, getOptionTag } from '@/utils/hotgo';
  import { getFileExt } from '@/utils/urlUtils';

  const message = useMessage();
  const loading = ref(false);
  const showModal = ref(false);
  const formValue = ref(newState(null));
  const dialogWidth = computed(() => {
    return adaModalWidth(580);
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