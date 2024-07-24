<template>
  <div>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      :show-icon="false"
      preset="dialog"
      transform-origin="center"
      :title="formValue.id > 0 ? '编辑资产 #' + formValue.id : '添加资产'"
      :style="{
        width: dialogWidth,
      }"
    >
      <n-scrollbar style="max-height: 87vh" class="pr-5">
        <n-spin :show="loading" description="请稍候...">
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :label-placement="settingStore.isMobile ? 'top' : 'left'"
            :label-width="100"
            class="py-4"
          >
            <n-grid cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
              <n-gi span="1">
                <n-form-item label="SN" path="sn">
                  <n-input placeholder="请输入SN" v-model:value="formValue.sn" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="资产编号" path="no">
                  <n-input placeholder="请输入资产编号" v-model:value="formValue.no" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="资产分类" path="categoryId">
                  <n-select v-model:value="formValue.categoryId" :options="options.cdnDeviceCategoryOption" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="品牌" path="brand">
                  <n-input placeholder="请输入品牌" v-model:value="formValue.brand" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="规格型号" path="model">
                  <n-input placeholder="请输入规格型号" v-model:value="formValue.model" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="状态" path="status">
                  <n-select v-model:value="formValue.status" :options="options.sys_normal_disable" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="所在位置" path="roomId">
                  <n-select v-model:value="formValue.roomId" :options="options.cdnRoomOption" />
                </n-form-item>
              </n-gi>
            </n-grid>
          </n-form>
        </n-spin>
      </n-scrollbar>
      <template #action>
        <n-space>
          <n-button @click="closeForm">
            取消
          </n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">
            确定
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Edit, View } from '@/api/addons/cdn/cdnDevice';
  import { options, State, newState, rules } from './model';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useMessage } from 'naive-ui';
  import { adaModalWidth } from '@/utils/hotgo';

  const emit = defineEmits(['reloadTable']);
  const message = useMessage();
  const settingStore = useProjectSettingStore();
  const loading = ref(false);
  const showModal = ref(false);
  const formValue = ref<State>(newState(null));
  const formRef = ref<any>({});
  const formBtnLoading = ref(false);
  const dialogWidth = computed(() => {
    return adaModalWidth(840);
  });

  function openModal(state: State) {
    showModal.value = true;

    // 新增
    if (!state || state.id < 1) {
      formValue.value = newState(state);

      return;
    }

    // 编辑
    loading.value = true;
    View({ id: state.id })
      .then((res) => {
        formValue.value = res;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        Edit(formValue.value).then((_res) => {
          message.success('操作成功');
          setTimeout(() => {
            closeForm();
            emit('reloadTable');
          });
        });
      } else {
        message.error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }

  function closeForm() {
    showModal.value = false;
    loading.value = false;
  }

  defineExpose({
    openModal,
  });
</script>

<style lang="less"></style>