import { h, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { FormSchema } from '@/components/Form';
import { defRangeShortcuts } from '@/utils/dateUtil';

export class State {
  public id = 0; // 编号
  public code = ''; // 编码
  public name = ''; // 名称
  public pid = 0; // 上级部门
  public managerId = 0; // 管理员
  public note = ''; // 备注
  public sort = 0; // 排序
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
    message: '请输入编码',
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入名称',
  },
  pid: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入上级部门',
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
    title: '编码',
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
    title: '上级部门',
    key: 'pid',
    align: 'left',
    width: -1,
  },
  {
    title: '管理员',
    key: 'managerId',
    align: 'left',
    width: -1,
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
    title: '创建时间',
    key: 'createdAt',
    align: 'left',
    width: -1,
  },
];