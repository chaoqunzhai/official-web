import { http, jumpExport } from '@/utils/http/axios';

// 获取资产列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnDevice/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除资产
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnDevice/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑资产
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnDevice/edit',
    method: 'POST',
    params,
  });
}

// 修改资产状态
export function Status(params) {
  return http.request({
    url: '/cdn/cdnDevice/status',
    method: 'POST',
    params,
  });
}

// 获取资产指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnDevice/view',
    method: 'GET',
    params,
  });
}

// 导出资产
export function Export(params) {
  jumpExport('/cdn/cdnDevice/export', params);
}