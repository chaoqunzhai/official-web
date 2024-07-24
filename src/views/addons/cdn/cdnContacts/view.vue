<template>
  <div>
    <n-drawer v-model:show="showModal" :width="dialogWidth">
      <n-drawer-content title="联系人详情" closable>
        <n-spin :show="loading" description="请稍候...">
          <n-descriptions label-placement="left" class="py-2" column="1">
            <n-descriptions-item>
              <template #label>
                姓名
              </template>
              {{ formValue.name }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                手机号
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
                商务人员
              </template>
              {{ formValue.commerceId }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                部门
              </template>
              {{ formValue.department }}
            </n-descriptions-item>
            <n-descriptions-item>
              <template #label>
                职务
              </template>
              {{ formValue.duties }}
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
            <n-descriptions-item label="所属客户">
              <n-tag :type="getOptionTag(options.cdnCustomerOption, formValue?.customerId)" size="small" class="min-left-space">
                {{ getOptionLabel(options.cdnCustomerOption, formValue?.customerId) }}
              </n-tag>
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
  import { View } from '@/api/addons/cdn/cdnContacts';
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