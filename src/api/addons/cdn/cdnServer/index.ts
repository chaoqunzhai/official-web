import { http, jumpExport } from '@/utils/http/axios';

// 获取服务器列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnServer/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除服务器
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnServer/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑服务器
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnServer/edit',
    method: 'POST',
    params,
  });
}

// 修改服务器状态
export function Status(params) {
  return http.request({
    url: '/cdn/cdnServer/status',
    method: 'POST',
    params,
  });
}

// 获取服务器指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnServer/view',
    method: 'GET',
    params,
  });
}

// 导出服务器
export function Export(params) {
  jumpExport('/cdn/cdnServer/export', params);
}