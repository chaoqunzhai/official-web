import { h, ref } from 'vue';
import { NTag, NSwitch } from 'naive-ui';
import { cloneDeep } from 'lodash-es';
import { FormSchema } from '@/components/Form';
import { Dicts } from '@/api/dict/dict';
import { isNullObject } from '@/utils/is';
import { validate } from '@/utils/validateUtil';
import { Option, getOptionLabel, getOptionTag } from '@/utils/hotgo';
import { renderPopoverMemberSumma, MemberSumma } from '@/utils';
import { Switch } from '@/api/addons/cdn/cdnRoom';
import { usePermission } from '@/hooks/web/usePermission';
const { hasPermission } = usePermission();
const $message = window['$message'];

export class State {
  public id = 0; // 编号
  public code = ''; // 机房编码
  public name = ''; // 机房名称
  public belong = null; // 机房归属
  public commerceId = 0; // 商务人员
  public customerId = null; // 所属客户
  public provinceId = null; // 所在地区
  public billingPlan = 0; // 计费方式
  public price = 0; // 单价 元/M
  public type = null; // 机房类型
  public isp = null; // 运营商 多个
  public ipType = null; // IP类型
  public natType = null; // 网络类型
  public isIpv6Supported = 2; // 是否支持IPV6
  public wechatName = ''; // 企业微信群名称
  public stage = null; // 状态
  public address = ''; // 详细地址
  public note = ''; // 备注
  public bandwidth = 0; // 机房总带宽
  public lineCount = 0; // 机房线路数
  public lineManagerCount = 0; // 管理线路数
  public bwUp = null; // 上行带宽
  public bwDown = null; // 下行带宽
  public bwType = ''; // 带宽类型
  public isMulticastSupported = 2; // 是否支持多播
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
    message: '请输入机房编码',
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入机房名称',
  },
  belong: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入机房归属',
  },
  customerId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入所属客户',
  },
  provinceId: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入所在地区',
  },
  billingPlan: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入计费方式',
  },
  price: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    validator: validate.amount,
  },
  type: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入机房类型',
  },
  isp: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'any',
    message: '请输入运营商 多个',
  },
  isIpv6Supported: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入是否支持IPV6',
  },
  stage: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入状态',
  },
  lineCount: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入机房线路数',
  },
  lineManagerCount: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入管理线路数',
  },
  bwUp: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入上行带宽',
  },
  bwDown: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入下行带宽',
  },
  bwType: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'string',
    message: '请输入带宽类型',
  },
  isMulticastSupported: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入是否支持多播',
  },
};

// 表格搜索表单
export const schemas = ref<FormSchema[]>([
  {
    field: 'name',
    component: 'NInput',
    label: '机房名称',
    componentProps: {
      placeholder: '请输入机房名称',
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'belong',
    component: 'NSelect',
    label: '机房归属',
    defaultValue: null,
    componentProps: {
      placeholder: '请选择机房归属',
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'ipType',
    component: 'NSelect',
    label: 'IP类型',
    defaultValue: null,
    componentProps: {
      placeholder: '请选择IP类型',
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'natType',
    component: 'NSelect',
    label: '网络类型',
    defaultValue: null,
    componentProps: {
      placeholder: '请选择网络类型',
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'stage',
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
    field: 'adminMemberRealName',
    component: 'NInput',
    label: '商务人员',
    componentProps: {
      placeholder: '请输入商务人员',
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
    title: '机房编码',
    key: 'code',
    align: 'left',
    width: -1,
  },
  {
    title: '机房名称',
    key: 'name',
    align: 'left',
    width: -1,
  },
  {
    title: '机房归属',
    key: 'belong',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.belong)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdn_belong_to, row.belong),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdn_belong_to, row.belong),
        }
      );
    },
  },
  {
    title: '商务人员',
    key: 'commerceId',
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
    title: '所在地区',
    key: 'provinceId',
    align: 'left',
    width: -1,
  },
  {
    title: '计费方式',
    key: 'billingPlan',
    align: 'left',
    width: -1,
  },
  {
    title: '单价 元/M',
    key: 'price',
    align: 'left',
    width: -1,
  },
  {
    title: '机房类型',
    key: 'type',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.type)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdn_room_type, row.type),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdn_room_type, row.type),
        }
      );
    },
  },
  {
    title: '运营商 多个',
    key: 'isp',
    align: 'left',
    width: -1,
  },
  {
    title: 'IP类型',
    key: 'ipType',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.ipType)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdn_ip_type, row.ipType),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdn_ip_type, row.ipType),
        }
      );
    },
  },
  {
    title: '网络类型',
    key: 'natType',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.natType)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdn_net_type, row.natType),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdn_net_type, row.natType),
        }
      );
    },
  },
  {
    title: '是否支持IPV6',
    key: 'isIpv6Supported',
    align: 'left',
    width: -1,
    render(row) {
      return h(NSwitch, {
        value: row.isIpv6Supported === 1,
        checked: '开启',
        unchecked: '关闭',
        disabled: !hasPermission(['/cdn/cdnRoom/switch']),
        onUpdateValue: function (e) {
          console.log('onUpdateValue e:' + JSON.stringify(e));
          row.isIpv6Supported = e ? 1 : 2;
          Switch({ id: row.id, key: 'is_ipv6_supported', value: row.isIpv6Supported }).then((_res) => {
            $message.success('操作成功');
          });
        },
      });
    },
  },
  {
    title: '企业微信群名称',
    key: 'wechatName',
    align: 'left',
    width: -1,
  },
  {
    title: '状态',
    key: 'stage',
    align: 'left',
    width: -1,
    render(row) {
      if (isNullObject(row.stage)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: getOptionTag(options.value.cdn_room_stage, row.stage),
          bordered: false,
        },
        {
          default: () => getOptionLabel(options.value.cdn_room_stage, row.stage),
        }
      );
    },
  },
  {
    title: '详细地址',
    key: 'address',
    align: 'left',
    width: -1,
  },
  {
    title: '机房总带宽',
    key: 'bandwidth',
    align: 'left',
    width: -1,
  },
  {
    title: '机房线路数',
    key: 'lineCount',
    align: 'left',
    width: -1,
  },
  {
    title: '管理线路数',
    key: 'lineManagerCount',
    align: 'left',
    width: -1,
  },
  {
    title: '上行带宽',
    key: 'bwUp',
    align: 'left',
    width: -1,
  },
  {
    title: '下行带宽',
    key: 'bwDown',
    align: 'left',
    width: -1,
  },
  {
    title: '带宽类型',
    key: 'bwType',
    align: 'left',
    width: -1,
  },
  {
    title: '是否支持多播',
    key: 'isMulticastSupported',
    align: 'left',
    width: -1,
    render(row) {
      return h(NSwitch, {
        value: row.isMulticastSupported === 1,
        checked: '开启',
        unchecked: '关闭',
        disabled: !hasPermission(['/cdn/cdnRoom/switch']),
        onUpdateValue: function (e) {
          console.log('onUpdateValue e:' + JSON.stringify(e));
          row.isMulticastSupported = e ? 1 : 2;
          Switch({ id: row.id, key: 'is_multicast_supported', value: row.isMulticastSupported }).then((_res) => {
            $message.success('操作成功');
          });
        },
      });
    },
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
  {
    title: '商务人员',
    key: 'adminMemberRealName',
    align: 'left',
    width: -1,
  },
];

// 字典数据选项
export const options = ref({
  cdn_belong_to: [] as Option[],
  cdn_room_type: [] as Option[],
  cdn_ip_type: [] as Option[],
  cdn_net_type: [] as Option[],
  cdn_room_stage: [] as Option[],
  cdnCustomerOption: [] as Option[],
});

// 加载字典数据选项
export function loadOptions() {
  Dicts({
    types: ['cdn_belong_to', 'cdn_room_type', 'cdn_ip_type', 'cdn_net_type', 'cdn_room_stage', 'cdnCustomerOption'],
  }).then((res) => {
    options.value = res;
    for (const item of schemas.value) {
      switch (item.field) {
        case 'belong':
          item.componentProps.options = options.value.cdn_belong_to;
          break;
        case 'type':
          item.componentProps.options = options.value.cdn_room_type;
          break;
        case 'ipType':
          item.componentProps.options = options.value.cdn_ip_type;
          break;
        case 'natType':
          item.componentProps.options = options.value.cdn_net_type;
          break;
        case 'stage':
          item.componentProps.options = options.value.cdn_room_stage;
          break;
        case 'customerId':
          item.componentProps.options = options.value.cdnCustomerOption;
          break;
      }
    }
  });
}