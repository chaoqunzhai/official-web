<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="服务器日志">
        <!--  这是由系统生成的CURD表格，你可以将此行注释改为表格的描述 -->
      </n-card>
    </div>
    <n-card :bordered="false" class="proCard">
      <BasicForm
        ref="searchFormRef"
        @register="register"
        @submit="reloadTable"
        @reset="reloadTable"
        @keyup.enter="reloadTable"
      >
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </BasicForm>
      <BasicTable
        ref="actionRef"
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        :actionColumn="actionColumn"
        :scroll-x="scrollX"
        :resizeHeightOffset="-10000"
      >
        <template #tableTitle></template>
      </BasicTable>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { h, reactive, ref, computed } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { usePermission } from '@/hooks/web/usePermission';
  import { List } from '@/api/addons/cdn/cdnServerLog';
  import { columns, schemas } from './model';
  import { adaTableScrollX } from '@/utils/hotgo';

  const dialog = useDialog();
  const message = useMessage();
  const { hasPermission } = usePermission();
  const actionRef = ref();
  const searchFormRef = ref<any>({});
  const editRef = ref();

  const actionColumn = reactive({
    width: 0,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [],
      });
    },
  });

  const scrollX = computed(() => {
    return adaTableScrollX(columns, actionColumn.width);
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  // 加载表格数据
  const loadDataTable = async (res) => {
    return await List({ ...searchFormRef.value?.formModel, ...res });
  };

  // 重新加载表格数据
  function reloadTable() {
    actionRef.value?.reload();
  }
</script>

<style lang="less" scoped></style>
