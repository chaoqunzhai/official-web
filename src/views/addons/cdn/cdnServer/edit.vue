<template>
  <div>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      :show-icon="false"
      :style="{
        width: dialogWidth,
      }"
      :title="formValue.id > 0 ? '编辑服务器 #' + formValue.id : '添加服务器'"
      preset="dialog"
      transform-origin="center"
    >
      <n-scrollbar class="pr-5" style="max-height: 87vh">
        <n-spin :show="loading" description="请稍候...">
          <n-form
            ref="formRef"
            :label-placement="settingStore.isMobile ? 'top' : 'left'"
            :label-width="'auto'"
            :model="formValue"
            :rules="rules"
            class="py-4"
          >
            <n-grid cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
              <n-gi span="1">
                <n-form-item label="服务器唯一ID" path="sid">
                  <n-input placeholder="请输入服务器唯一ID" v-model:value="formValue.sid" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="机器归属" path="belongTo">
                  <n-input-number placeholder="请输入机器归属" v-model:value="formValue.belongTo" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="线路类型" path="lineType">
                  <n-input-number placeholder="请输入线路类型" v-model:value="formValue.lineType" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="可跨省" path="enableCrossProvince">
                  <n-select v-model:value="formValue.enableCrossProvince" :options="options.cdn_cross_province" />
                </n-form-item>
              </n-gi>

              <n-gi span="2">
                <n-form-item label="备注" path="note">
                  <n-input placeholder="请输入备注" v-model:value="formValue.note" />
                </n-form-item>
              </n-gi>
            </n-grid>
          </n-form>
        </n-spin>
      </n-scrollbar>
      <template #action>
        <n-space>
          <n-button @click="closeForm"> 取消 </n-button>
          <n-button :loading="formBtnLoading" type="info" @click="confirmForm"> 确定 </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Edit, View } from '@/api/addons/cdn/cdnServer';
  import { newState, options, rules, State } from './model';
  import CitySelector from '@/components/CitySelector/citySelector.vue';
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
