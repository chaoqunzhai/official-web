<template>
  <div>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      :show-icon="false"
      preset="dialog"
      transform-origin="center"
      :title="formValue.id > 0 ? '编辑机房信息 #' + formValue.id : '添加机房信息'"
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
            <n-grid cols="2 s:1 m:2 l:2 xl:2 2xl:2" responsive="screen" x-gap="20">
              <n-gi span="2">
                <n-divider title-placement="left">基本信息</n-divider>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="机房编码" path="code">
                  <n-input placeholder="请输入机房编码" v-model:value="formValue.code" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="机房名称" path="name">
                  <n-input placeholder="请输入机房名称" v-model:value="formValue.name" />
                </n-form-item>
              </n-gi>

              <n-gi span="1">
                <n-form-item label="机房归属" path="belong">
                  <n-select v-model:value="formValue.belong" :options="options.cdn_belong_to" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="商务人员" path="commerceId">
                  <n-input-number placeholder="请输入商务人员" v-model:value="formValue.commerceId" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="所属客户" path="customerId">
                  <n-select v-model:value="formValue.customerId" :options="options.cdnCustomerOption" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="所在地区" path="provinceId">
                  <CitySelector v-model:value="formValue.provinceId" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="计费方式" path="billingPlan">
                  <n-input-number placeholder="请输入计费方式" v-model:value="formValue.billingPlan" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="单价 元/M" path="price">
                  <n-input-number placeholder="请输入单价 元/M" v-model:value="formValue.price" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="机房类型" path="type">
                  <n-select v-model:value="formValue.type" :options="options.cdn_room_type" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="运营商 多个" path="isp">
                  <n-input placeholder="请输入运营商 多个" v-model:value="formValue.isp" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="IP类型" path="ipType">
                  <n-select v-model:value="formValue.ipType" :options="options.cdn_ip_type" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="网络类型" path="natType">
                  <n-select v-model:value="formValue.natType" :options="options.cdn_net_type" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="是否支持IPV6" path="isIpv6Supported">
                  <n-switch
                    :unchecked-value="2"
                    :checked-value="1"
                    v-model:value="formValue.isIpv6Supported"
                  />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="企业微信群名称" path="wechatName">
                  <n-input placeholder="请输入企业微信群名称" v-model:value="formValue.wechatName" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="状态" path="stage">
                  <n-select v-model:value="formValue.stage" :options="options.cdn_room_stage" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="详细地址" path="address">
                  <n-input placeholder="请输入详细地址" v-model:value="formValue.address" />
                </n-form-item>
              </n-gi>
              <n-gi span="2">
                <n-form-item label="备注" path="note">
                  <n-input type="textarea" placeholder="备注" v-model:value="formValue.note" />
                </n-form-item>
              </n-gi>
              <n-gi span="2">
                <n-divider title-placement="left">宽带信息</n-divider>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="机房总带宽" path="bandwidth">
                  <n-input-number placeholder="请输入机房总带宽" v-model:value="formValue.bandwidth" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="机房线路数" path="lineCount">
                  <n-input-number placeholder="请输入机房线路数" v-model:value="formValue.lineCount" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="管理线路数" path="lineManagerCount">
                  <n-input-number placeholder="请输入管理线路数" v-model:value="formValue.lineManagerCount" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="上行带宽" path="bwUp">
                  <n-input-number placeholder="请输入上行带宽" v-model:value="formValue.bwUp" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="下行带宽" path="bwDown">
                  <n-input-number placeholder="请输入下行带宽" v-model:value="formValue.bwDown" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="带宽类型" path="bwType">
                  <n-input placeholder="请输入带宽类型" v-model:value="formValue.bwType" />
                </n-form-item>
              </n-gi>
              <n-gi span="1">
                <n-form-item label="是否支持多拨" path="isMulticastSupported">
                  <n-switch
                    :unchecked-value="2"
                    :checked-value="1"
                    v-model:value="formValue.isMulticastSupported"
                  />
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
  import { Edit, View } from '@/api/addons/cdn/cdnRoom';
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
