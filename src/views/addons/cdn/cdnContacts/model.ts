import { h, ref } from 'vue';
import { NTag } from 'naive-ui';
import { cloneDeep } from 'lodash-es';
import { FormSchema } from '@/components/Form';
import { Dicts } from '@/api/dict/dict';
import { isNullObject } from '@/utils/is';
import { defRangeShortcuts } from '@/utils/dateUtil';
import { validate } from '@/utils/validateUtil';
import { Option, getOptionLabel, getOptionTag } from '@/utils/hotgo';
import { renderPopoverMemberSumma, MemberSumma } from '@/utils';

export class State {
  public id = 0; // 编号
  public name = ''; // 姓名
  public phone = ''; // 手机号
  public mobile = ''; // 联系电话
  public commerceId = 0; // 商务人员
  public department = ''; // 部门
  public duties = ''; // 职务
  public email = ''; // 邮箱
  public provinceId = null; // 所在地
  public address = ''; // 详细地址
  public note = ''; // 备注
  public customerId = null; // 所属客户
  public createdBy = 0; // 创建者
  public createdBySumma?: null | MemberSumma = null; // 创建者摘要信息
  public updatedBy = 0; // 更新者
  public updatedBySumma?: null | MemberSumma = null; // 更新者摘要信息
  public createdAt = ''; // 创建时间
  public updatedAt = ''; // 修改时间

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
  name: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入姓名',
  },
  phone: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入手机号',
  },
  mobile: {
    required: false,
    trigger: ['blur', 'input'],
    type: 'string',
    validator: validate.phone,
  },
  commerceId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入商务人员',
  },
  email: {
    required: false,
    trigger: ['blur', 'input'],
    type: 'string',
    validator: validate.email,
  },
  provinceId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入所在地',
  },
  customerId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入所属客户',
  },
};

// 表格搜索表单
export const schemas = ref<FormSchema[]>([
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
    title: '姓名',
    key: 'name',
    align: 'left',
    width: -1,
  },
  {
    title: '手机号',
    key: 'phone',
    align: 'left',
    width: -1,
  },
  {
    title: '联系电话',
    key: 'mobile',
    align: 'left',
    width: -1,
  },
  {
    title: '商务人员',
    key: 'commerceId',
    align: 'left',
    width: -1,
  },
  {
    title: '部门',
    key: 'department',
    align: 'left',
    width: -1,
  },
  {
    title: '职务',
    key: 'duties',
    align: 'left',
    width: -1,
  },
  {
    title: '邮箱',
    key: 'email',
    align: 'left',
    width: -1,
  },
  {
    title: '所在地',
    key: 'provinceId',
    align: 'left',
    width: -1,
  },
  {
    title: '详细地址',
    key: 'address',
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
    title: '所属客户',
    key: 'customerId',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.customerId)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdnCustomerOption, row.customerId),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdnCustomerOption, row.customerId),
        }
      );
    },
  },
  {
    title: '创建者',
    key: 'createdBy',
    align: 'left',
    width: -1,
    render(row) {
      return renderPopoverMemberSumma(row.createdBySumma);
    },
  },
  {
    title: '更新者',
    key: 'updatedBy',
    align: 'left',
    width: -1,
    render(row) {
      return renderPopoverMemberSumma(row.updatedBySumma);
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    align: 'left',
    width: -1,
  },
  {
    title: '修改时间',
    key: 'updatedAt',
    align: 'left',
    width: -1,
  },
];

// 字典数据选项
export const options = ref({
  cdnCustomerOption: [] as Option[],
});

// 加载字典数据选项
export function loadOptions() {
  Dicts({
    types: ['cdnCustomerOption'],
  }).then((res) => {
    options.value = res;
    for (const item of schemas.value) {
      switch (item.field) {
        case 'customerId':
          item.componentProps.options = options.value.cdnCustomerOption;
          break;
      }
    }
  });
}