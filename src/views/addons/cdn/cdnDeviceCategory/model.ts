import { h, ref } from 'vue';
import { NTag } from 'naive-ui';
import { cloneDeep } from 'lodash-es';
import { FormSchema } from '@/components/Form';
import { Dicts } from '@/api/dict/dict';
import { isNullObject } from '@/utils/is';
import { defRangeShortcuts } from '@/utils/dateUtil';
import { Option, getOptionLabel, getOptionTag } from '@/utils/hotgo';
import { renderPopoverMemberSumma, MemberSumma } from '@/utils';
import { TreeOption } from '@/api/addons/cdn/cdnDeviceCategory';

export class State {
  public id = 0; // 编号
  public pid = 0; // 父类型
  public code = ''; // 编号
  public name = ''; // 名称
  public status = 1; // 状态
  public note = ''; // 备注
  public tree = ''; // 关系树
  public level = 0; // 关系树等级
  public sort = 0; // 排序
  public createdBy = 0; // 创建人
  public createdBySumma?: null | MemberSumma = null; // 创建人摘要信息
  public createdAt = ''; // 创建时间

  constructor(state?: Partial<State>) {
    if (state) {
      Object.assign(this, state);
    }
  }
}

export function newState(state: State | Record<string, any> | null): State {
  if (state !== null) {
    if (state instanceof State) {
      return cloneDeep(state);
    }
    return new State(state);
  }
  return new State();
}

// 表单验证规则
export const rules = {
  code: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入编号',
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入名称',
  },
  status: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入状态',
  },
};

// 表格搜索表单
export const schemas = ref<FormSchema[]>([
  {
    field: 'id',
    component: 'NInputNumber',
    label: '编号',
    componentProps: {
      placeholder: '请输入编号',
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '状态',
    defaultValue: null,
    componentProps: {
      placeholder: '请选择状态',
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'createdAt',
    component: 'NDatePicker',
    label: '创建时间',
    componentProps: {
      type: 'datetimerange',
      clearable: true,
      shortcuts: defRangeShortcuts(),
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
]);

// 表格列
export const columns = [
  {
    title: '编号',
    key: 'id',
    align: 'left',
    width: -1,
  },
  {
    title: '编号',
    key: 'code',
    align: 'left',
    width: -1,
  },
  {
    title: '名称',
    key: 'name',
    align: 'left',
    width: -1,
  },
  {
    title: '状态',
    key: 'status',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.status)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.sys_normal_disable, row.status),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.sys_normal_disable, row.status),
        }
      );
    },
  },
  {
    title: '备注',
    key: 'note',
    align: 'left',
    width: -1,
  },
  {
    title: '排序',
    key: 'sort',
    align: 'left',
    width: -1,
  },
  {
    title: '创建人',
    key: 'createdBy',
    align: 'left',
    width: -1,
    render(row) {
      return renderPopoverMemberSumma(row.createdBySumma);
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    align: 'left',
    width: -1,
  },
];

// 字典数据选项
export const options = ref({
  sys_normal_disable: [] as Option[],
});

// 加载字典数据选项
export function loadOptions() {
  Dicts({
    types: ['sys_normal_disable'],
  }).then((res) => {
    options.value = res;
    for (const item of schemas.value) {
      switch (item.field) {
        case 'status':
          item.componentProps.options = options.value.sys_normal_disable;
          break;
      }
    }
  });
}

// 关系树选项
export const treeOption = ref([]);

// 加载关系树选项
export function loadTreeOption() {
  TreeOption().then((res) => {
    treeOption.value = res;
  });
}