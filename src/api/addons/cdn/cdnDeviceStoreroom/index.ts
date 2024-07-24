import { http, jumpExport } from '@/utils/http/axios';

// 获取库房列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnDeviceStoreroom/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除库房
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnDeviceStoreroom/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑库房
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnDeviceStoreroom/edit',
    method: 'POST',
    params,
  });
}

// 获取库房指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnDeviceStoreroom/view',
    method: 'GET',
    params,
  });
}

// 获取库房最大排序
export function MaxSort() {
  return http.request({
    url: '/cdn/cdnDeviceStoreroom/maxSort',
    method: 'GET',
  });
}

// 导出库房
export function Export(params) {
  jumpExport('/cdn/cdnDeviceStoreroom/export', params);
}