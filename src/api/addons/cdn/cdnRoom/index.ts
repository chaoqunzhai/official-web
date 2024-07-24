import { http, jumpExport } from '@/utils/http/axios';

// 获取机房信息列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnRoom/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除机房信息
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnRoom/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑机房信息
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnRoom/edit',
    method: 'POST',
    params,
  });
}

// 操作机房信息开关
export function Switch(params) {
  return http.request({
    url: '/cdn/cdnRoom/switch',
    method: 'POST',
    params,
  });
}

// 获取机房信息指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnRoom/view',
    method: 'GET',
    params,
  });
}

// 导出机房信息
export function Export(params) {
  jumpExport('/cdn/cdnRoom/export', params);
}