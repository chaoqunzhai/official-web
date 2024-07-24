import { h, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { FormSchema } from '@/components/Form';

export class State {
  public id = 0; // id
  public serverId = 0; // 服务器
  public action = ''; // 操作类型: 创建，编辑
  public detail = ''; // 操作详情
  public createBy = 0; // 操作人
  public createAt = ''; // 操作时间

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
  serverId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入服务器',
  },
  action: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入操作类型: 创建，编辑',
  },
  detail: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入操作详情',
  },
  createBy: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入操作人',
  },
  createAt: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入操作时间',
  },
};

// 表格搜索表单
export const schemas = ref<FormSchema[]>([
  {
    field: 'id',
    component: 'NInputNumber',
    label: 'id',
    componentProps: {
      placeholder: '请输入id',
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
]);

// 表格列
export const columns = [
  {
    title: 'id',
    key: 'id',
    align: 'left',
    width: -1,
  },
  {
    title: '操作类型: 创建，编辑',
    key: 'action',
    align: 'left',
    width: -1,
  },
  {
    title: '操作详情',
    key: 'detail',
    align: 'left',
    width: -1,
  },
  {
    title: '操作人',
    key: 'createBy',
    align: 'left',
    width: -1,
  },
  {
    title: '操作时间',
    key: 'createAt',
    align: 'left',
    width: -1,
  },
  {
    title: '部门ID',
    key: 'adminMemberDeptId',
    align: 'left',
    width: -1,
  },
  {
    title: '真实姓名',
    key: 'adminMemberRealName',
    align: 'left',
    width: -1,
  },
];