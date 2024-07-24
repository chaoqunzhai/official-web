<template>
  <div class="overflow-hidden flex flex-col bg-white" style="height: calc(100vh - 100px)">
    <div class="p-[12px] text-[16px]">
      监控看板
      <n-divider vertical />
      <n-switch :default-value="true" size="small" @update:value="handleChange">
        <template #checked>展开</template>
        <template #unchecked>收起</template>
      </n-switch>
    </div>
    <n-divider style="margin: 0" />

    <div class="flex flex-1 overflow-scroll p-[12px]">
      <NSplit v-model:size="size" direction="horizontal">
        <template #1>
          <div class="max-w-1/4 my-2">
            <n-input
              class="max-w-[250px]"
              size="small"
              v-model:value="pattern"
              placeholder="搜索"
            />
          </div>

          <div style="height: 100%">
            <n-tree
              :show-line="true"
              :pattern="pattern"
              :node-props="nodeProps"
              style="height: calc(100vh - 200px)"
              virtual-scroll
              ref="treeInstRef"
              block-line
              :data="options"
              :show-irrelevant-nodes="false"
              :default-expanded-keys="defaultExpandedKeys"
              key-field="id"
              label-field="title"
              children-field="Children"
              selectable
            />
          </div>
        </template>
        <template #2>
          <div class="p-[12px] overflow-y-scroll h-full">
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="(item, i) in graphs" :key="i">
                <div class="h-[400px]">
                  <Iframe :src="item + token" />
                </div>
              </n-gi>
            </n-grid>
            <!--              <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">-->
            <!--                <template #statusSlot="{ model, field }">-->
            <!--                  <n-input v-model:value="model[field]" />-->
            <!--                </template>-->
            <!--              </BasicForm>-->
          </div>
        </template>
      </NSplit>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { defRangeShortcuts } from '@/utils/dateUtil';
  import { FormSchema, useForm } from '@/components/Form/index';
  import { List, GraphList } from '@/api/addons/cdn/cdnMonitoringDashboard';
  import { NSplit } from 'naive-ui';
  import Iframe from '@/views/iframe/index.vue';

  const defaultExpandedKeys = ref(['40', '41']);
  const size = ref(0.25);
  const pattern = ref('');
  const formParams = ref({});
  const graphs = ref(null);
  let token =
    '&auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InlSVXlwa295QnN6TVRwRnd0ZkxsSzBRaDdETDB3NFpuOFVwMDNvT05INDQifQ.eyJzdWIiOiJyc3ZpZXdlciIsIm5hbWUiOiJyc3ZpZXdlciIsImlzcyI6Imh0dHBzOi8veGFyc2Nsb3VkLmNvbS8ifQ.MUsJO04N1QrdzyMtYC2Bl4sVQp1pMqKew1hq_M4iSns';

  const nodeProps = ({ option }) => {
    return {
      onClick() {
        if (!option.children) {
          loadGraphList(option.id);
        }
      },
    };
  };

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: '应用名称',
      componentProps: {
        placeholder: '请输入应用名称',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ trigger: ['blur'] }],
    },
    {
      field: 'firstTime',
      component: 'NDatePicker',
      label: '登录时间',
      componentProps: {
        type: 'datetimerange',
        clearable: true,
        shortcuts: defRangeShortcuts(),
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const options = ref();

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  const treeInstRef = ref(null);

  function loadList() {
    List({})
      .then((res) => {
        options.value = res;
        console.log(res);
      })
      .finally(() => {
        // loading.value = false;
      });
  }

  function loadGraphList(id) {
    GraphList({ id: id })
      .then((res) => {
        graphs.value = res?.graphs;
        console.log(graphs.value);
        console.log(res);
      })
      .finally(() => {
        // loading.value = false;
      });
  }

  function handleChange(value: boolean) {
    size.value = value ? 0.25 : 0;
  }

  function handleSubmit(values: Recordable) {
    formParams.value = values;
    // reloadTable();
  }

  function handleReset(_values: Recordable) {
    formParams.value = {};
    // reloadTable();
  }
  onMounted(() => {
    loadList();
    // loadGraphList();
  });
</script>
