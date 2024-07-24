<template>
  <div>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      :show-icon="false"
      preset="dialog"
      transform-origin="center"
      :title="formValue.id > 0 ? '编辑客户列表 #' + formValue.id : '添加客户列表'"
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
            :label-width="'auto'"
            class="py-4"
          >
            <n-grid cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
              <n-gi span="1">
                <n-form-item label="编码" path="code">
                  <n-input placeholder="请输入编码" v-model:value="formValue.code" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="客户类型" path="type">
                  <n-select v-model:value="formValue.type" :options="options.cdn_customer_type" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="客户名称" path="name">
                  <n-input placeholder="请输入客户名称" v-model:value="formValue.name" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="客户联系人" path="contacts">
                  <n-input placeholder="请输入客户联系人" v-model:value="formValue.contacts" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="手机号码" path="phone">
                  <n-input placeholder="请输入手机号码" v-model:value="formValue.phone" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="联系电话" path="mobile">
                  <n-input placeholder="请输入联系电话" v-model:value="formValue.mobile" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="邮箱" path="email">
                  <n-input placeholder="请输入邮箱" v-model:value="formValue.email" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="所在地" path="provinceId">
                  <CitySelector v-model:value="formValue.provinceId" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="详细地址" path="address">
                  <n-input placeholder="请输入详细地址" v-model:value="formValue.address" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="备注" path="note">
                  <n-input placeholder="请输入备注" v-model:value="formValue.note" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="商务人员" path="commerceId">
                  <n-input-number placeholder="请输入商务人员" v-model:value="formValue.commerceId" />
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
  import { Edit, View } from '@/api/addons/cdn/cdnCustomer';
  import { options, State, newState, rules } from './model';
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