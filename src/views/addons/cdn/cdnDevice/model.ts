import { h, ref } from 'vue';
import { NTag } from 'naive-ui';
import { cloneDeep } from 'lodash-es';
import { FormSchema } from '@/components/Form';
import { Dicts } from '@/api/dict/dict';
import { isNullObject } from '@/utils/is';
import { defRangeShortcuts } from '@/utils/dateUtil';
import { Option, getOptionLabel, getOptionTag } from '@/utils/hotgo';

export class State {
  public id = 0; // 编号
  public sn = ''; // SN
  public no = ''; // 资产编号
  public categoryId = null; // 资产分类
  public brand = ''; // 品牌
  public model = ''; // 规格型号
  public status = 1; // 状态
  public roomId = null; // 所在位置
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
  sn: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入SN',
  },
  no: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入资产编号',
  },
  categoryId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入资产分类',
  },
  brand: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入品牌',
  },
  status: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入状态',
  },
  roomId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入所在位置',
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
    title: 'SN',
    key: 'sn',
    align: 'left',
    width: -1,
  },
  {
    title: '资产编号',
    key: 'no',
    align: 'left',
    width: -1,
  },
  {
    title: '资产分类',
    key: 'categoryId',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.categoryId)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdnDeviceCategoryOption, row.categoryId),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdnDeviceCategoryOption, row.categoryId),
        }
      );
    },
  },
  {
    title: '品牌',
    key: 'brand',
    align: 'left',
    width: -1,
  },
  {
    title: '规格型号',
    key: 'model',
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
    title: '所在位置',
    key: 'roomId',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.roomId)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdnRoomOption, row.roomId),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdnRoomOption, row.roomId),
        }
      );
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
  cdnDeviceCategoryOption: [] as Option[],
  cdnRoomOption: [] as Option[],
});

// 加载字典数据选项
export function loadOptions() {
  Dicts({
    types: ['sys_normal_disable', 'cdnDeviceCategoryOption', 'cdnRoomOption'],
  }).then((res) => {
    options.value = res;
    for (const item of schemas.value) {
      switch (item.field) {
        case 'status':
          item.componentProps.options = options.value.sys_normal_disable;
          break;
        case 'categoryId':
          item.componentProps.options = options.value.cdnDeviceCategoryOption;
          break;
        case 'roomId':
          item.componentProps.options = options.value.cdnRoomOption;
          break;
      }
    }
  });
}