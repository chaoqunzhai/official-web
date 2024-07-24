import { h, ref } from "vue";
import { NTag } from "naive-ui";
import { cloneDeep } from "lodash-es";
import { FormSchema } from "@/components/Form";
import { Dicts } from "@/api/dict/dict";
import { isNullObject } from "@/utils/is";
import { getOptionLabel, getOptionTag, Option } from "@/utils/hotgo";

export class State {
  public id = 0; // 编号
  public sid = ''; // 服务器唯一ID
  public hostname = ""; // 主机名
  public roomId = null; // 所在机房
  public provinceId = null; // 所在省份
  public cityId = null; // 所在市
  public isp = null; // 运营商
  public online = null; // 在线
  public saltKey = ""; // saltkey 唯一
  public lineBw = 0; // 线路带宽
  public lineCount = 0; // 线路数
  public lineType = 0; // 线路类型
  public enableCrossProvince = null; // 可跨省
  public address = ""; // 所在地详细
  public sn = ""; // 服务器SN
  public status = 1; // 服务器状态
  public lastestSent = 0; // 最新上传速度
  public lastest95 = 0; // 昨日95
  public grafanaBwUrl = "";
  public grafanaMetricUrl = "";
  public note = ''; // 备注
  public belongTo = 1; // 机器归属

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
  enableCrossProvince: {
    required: true,
    trigger: ["blur", "input"],
    type: "number",
    message: "请输入可跨省"
  },


  belongTo: {
    required: true,
    trigger: ['blur', 'input'],
    type: 'number',
    message: '请输入机器归属',
  },
};

// 表格搜索表单
export const schemas = ref<FormSchema[]>([
  {
    field: "hostname",
    component: "NInput",
    label: "主机名",
    componentProps: {
      placeholder: "请输入主机名",
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  },
  {
    field: "isp",
    component: "NSelect",
    label: "运营商",
    componentProps: {
      placeholder: "请选择运营商",
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  },
  {
    field: "roomId",
    component: "NSelect",
    label: "所在机房",
    defaultValue: null,
    componentProps: {
      placeholder: "请选择所在机房",
      filterable: true,
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  },
  {
    field: "status",
    component: "NSelect",
    label: "状态",
    defaultValue: null,
    componentProps: {
      placeholder: "请选择服务器状态",
      options: [],
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  },
  {
    field: "cdnRoomName",
    component: "NInput",
    label: "机房名称",
    componentProps: {
      placeholder: "请输入机房名称",
      onUpdateValue: (e: any) => {
        console.log(e);
      }
    }
  }
]);

// 表格列
export const columns = [
  {
    title: "机房编号",
    key: "cdnRoomCode",
    align: "left",
    width: -1
  },
  {
    title: "机房名称",
    key: "roomId",
    align: "left",
    width: -1,
    render(row) {
      if (isNullObject(row.roomId)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: "6px"
          },
          type: getOptionTag(options.value.cdnRoomOption, row.roomId),
          bordered: false
        },
        {
          default: () => getOptionLabel(options.value.cdnRoomOption, row.roomId)
        }
      );
    }
  },
  {
    title: "所在地区",
    key: "location",
    align: "left",
    width: -1
  },
  {
    title: "运营商",
    key: "isp",
    align: "left",
    width: -1,
    render(row) {
      if (isNullObject(row.isp)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: "6px"
          },
          type: getOptionTag(options.value.cdn_isp, row.isp),
          bordered: false
        },
        {
          default: () => getOptionLabel(options.value.cdn_isp, row.isp)
        }
      );
    }
  },
  {
    title: "主机名",
    key: "hostname",
    align: "left",
    width: -1
  },
  {
    title: "状态",
    key: "status",
    align: "left",
    width: -1,
    render(row) {
      if (isNullObject(row.status)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: "6px"
          },
          type: getOptionTag(options.value.cdn_server_status, row.status),
          bordered: false
        },
        {
          default: () => getOptionLabel(options.value.cdn_server_status, row.status)
        }
      );
    }
  },
  {
    title: "线路数",
    key: "lineCount",
    align: "left",
    width: -1
  },
  {
    title: "线路带宽",
    key: "lineBw",
    align: "left",
    width: -1
  },
  {
    title: "可跨省",
    key: "enableCrossProvince",
    align: "left",
    width: -1,
    render(row) {
      if (isNullObject(row.enableCrossProvince)) {
        return ``;
      }
      return h(
        NTag,
        {
          style: {
            marginRight: "6px"
          },
          type: getOptionTag(options.value.cdn_cross_province, row.enableCrossProvince),
          bordered: false
        },
        {
          default: () => getOptionLabel(options.value.cdn_cross_province, row.enableCrossProvince)
        }
      );
    }
  },
  {
    title: "所在地详细",
    key: "address",
    align: "left",
    width: -1
  },
  {
    title: "服务器SN",
    key: "sn",
    align: "left",
    width: -1
  },
  {
    title: "最新上传速度",
    key: "latestSentHuman",
    align: "left",
    width: -1
  },
  {
    title: "昨日95",
    key: "latest95Human",
    align: "left",
    width: -1
  },
  {
    title: "机房归属",
    key: "cdnRoomBelong",
    align: "left",
    width: -1
  },
  {
    title: "商务人员",
    key: "cdnRoomBelongUserId",
    align: "left",
    width: -1
  },
  {
    title: "供应商",
    key: "cdnRoomSupplierId",
    align: "left",
    width: -1
  },
  {
    title: "计费方式",
    key: "cdnRoomBillingPlan",
    align: "left",
    width: -1
  }
];

// 字典数据选项
export const options = ref({
  cdn_isp: [] as Option[],
  cdn_server_status: [] as Option[],
  cdn_server_online: [] as Option[],
  cdn_cross_province: [] as Option[],
  cdnRoomOption: [] as Option[]
});

// 加载字典数据选项
export function loadOptions() {
  Dicts({
    types: [
      "cdn_isp",
      "cdn_server_status",
      "cdn_server_online",
      "cdn_cross_province",
      "cdnRoomOption"
    ]
  }).then((res) => {
    options.value = res;
    for (const item of schemas.value) {
      switch (item.field) {
        case "isp":
          item.componentProps.options = options.value.cdn_isp;
          break;
        case "status":
          item.componentProps.options = options.value.cdn_server_status;
          break;
        case "online":
          item.componentProps.options = options.value.cdn_server_online;
          break;
        case "enableCrossProvince":
          item.componentProps.options = options.value.cdn_cross_province;
          break;
        case "roomId":
          item.componentProps.options = options.value.cdnRoomOption;
          break;
      }
    }
  });
}
