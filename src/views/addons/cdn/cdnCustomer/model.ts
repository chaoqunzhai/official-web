import { h, ref } from "vue";
import { NTag } from "naive-ui";
import { cloneDeep } from "lodash-es";
import { FormSchema } from "@/components/Form";
import { Dicts } from "@/api/dict/dict";
import { isNullObject } from "@/utils/is";
import { defRangeShortcuts } from "@/utils/dateUtil";
import { validate } from "@/utils/validateUtil";
import { getOptionLabel, getOptionTag, Option } from "@/utils/hotgo";
import { MemberSumma, renderPopoverMemberSumma } from "@/utils";

export class State {
  public id = 0; // 编号
  public code = ""; // 编码
  public type = null; // 客户类型
  public name = ""; // 客户名称
  public contacts = ""; // 客户联系人
  public phone = ""; // 手机号码
  public mobile = ""; // 联系电话
  public level = null; // 客户等级
  public email = ""; // 邮箱
  public provinceId = null; // 所在地
  public address = ""; // 详细地址
  public note = ""; // 备注
  public commerceId = 0; // 商务人员
  public commerceBySumma?: null | MemberSumma = null; // 创建者摘要信息
  public createdBy = 0; // 创建者
  public createdBySumma?: null | MemberSumma = null; // 创建者摘要信息
  public updatedBy = 0; // 更新者
  public updatedBySumma?: null | MemberSumma = null; // 更新者摘要信息
  public createdAt = ""; // 创建时间
  public updatedAt = ""; // 修改时间
  public memberId = 0; // 用户编号

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
    trigger: ["blur", "input"],
    type: "string",
    message: "请输入编码"
  },
  type: {
    required: true,
    trigger: ["blur", "input"],
    type: "number",
    message: "请输入客户类型"
  },
  name: {
    required: true,
    trigger: ["blur", "input"],
    type: "string",
    message: "请输入客户名称"
  },
  contacts: {
    required: true,
    trigger: ["blur", "input"],
    type: "string",
    message: "请输入客户联系人"
  },
  phone: {
    required: true,
    trigger: ["blur", "input"],
    type: "string",
    message: "请输入手机号码"
  },
  mobile: {
    required: true,
    trigger: ["blur", "input"],
    type: "string",
    validator: validate.phone
  },
  email: {
    required: false,
    trigger: ["blur", "input"],
    type: "string",
    validator: validate.email
  },
  provinceId: {
    required: true,
    trigger: ["blur", "input"],
    type: "number",
    message: "请输入所在地"
  },
  commerceId: {
    required: true,
    trigger: ["blur", "input"],
    type: "number",
    message: "请输入商务人员"
  }
};

// 表格搜索表单
export const schemas = ref<FormSchema[]>([
  {
    field: "id",
    component: "NInputNumber",
    label: "编号",
    componentProps: {
      placeholder: "请输入编号",
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  },
  {
    field: "commerceId",
    component: "NInputNumber",
    label: "商务人员",
    componentProps: {
      placeholder: "请输入商务人员",
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  },
  {
    field: "createdAt",
    component: "NDatePicker",
    label: "创建时间",
    componentProps: {
      type: "datetimerange",
      clearable: true,
      shortcuts: defRangeShortcuts(),
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  }
]);

// 表格列
export const columns = [
  {
    title: "编号",
    key: "id",
    align: "left",
    width: -1
  },
  {
    title: "编码",
    key: "code",
    align: "left",
    width: -1
  },
  {
    title: "客户类型",
    key: "type",
    align: "left",
    width: -1,
    render(row) {
      if (isNullObject(row.type)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: "6px"
          },
          type: getOptionTag(options.value.cdn_customer_type, row.type),
          bordered: false
        },
        {
          default: () => getOptionLabel(options.value.cdn_customer_type, row.type)
        }
      );
    }
  },
  {
    title: "客户名称",
    key: "name",
    align: "left",
    width: -1
  },
  {
    title: "客户联系人",
    key: "contacts",
    align: "left",
    width: -1
  },
  {
    title: "手机号码",
    key: "phone",
    align: "left",
    width: -1
  },
  {
    title: "联系电话",
    key: "mobile",
    align: "left",
    width: -1
  },
  {
    title: "邮箱",
    key: "email",
    align: "left",
    width: -1
  },
  {
    title: "所在地",
    key: "provinceId",
    align: "left",
    width: -1
  },
  {
    title: "详细地址",
    key: "address",
    align: "left",
    width: -1
  },
  {
    title: "备注",
    key: "note",
    align: "left",
    width: -1
  },
  {
    title: "商务人员",
    key: "commerceId",
    align: "left",
    width: -1,
    render(row) {
      return renderPopoverMemberSumma(row.commerceBySumma);
    }
  },
  {
    title: "创建者",
    key: "createdBy",
    align: "left",
    width: -1,
    render(row) {
      return renderPopoverMemberSumma(row.createdBySumma);
    }
  },
  {
    title: "更新者",
    key: "updatedBy",
    align: "left",
    width: -1,
    render(row) {
      return renderPopoverMemberSumma(row.updatedBySumma);
    }
  },
  {
    title: "创建时间",
    key: "createdAt",
    align: "left",
    width: -1
  },
  {
    title: "修改时间",
    key: "updatedAt",
    align: "left",
    width: -1
  }
];

// 字典数据选项
export const options = ref({
  cdn_customer_type: [] as Option[],
  cdn_customer_level: [] as Option[]
});

// 加载字典数据选项
export function loadOptions() {
  Dicts({
    types: ["cdn_customer_type", "cdn_customer_level"]
  }).then((res) => {
    options.value = res;
    for (const item of schemas.value) {
      switch (item.field) {
        case "type":
          item.componentProps.options = options.value.cdn_customer_type;
          break;
        case "level":
          item.componentProps.options = options.value.cdn_customer_level;
          break;
      }
    }
  });
}
