import { http, jumpExport } from '@/utils/http/axios';

// 获取业务管理列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnBusiness/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除业务管理
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnBusiness/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑业务管理
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnBusiness/edit',
    method: 'POST',
    params,
  });
}

// 修改业务管理状态
export function Status(params) {
  return http.request({
    url: '/cdn/cdnBusiness/status',
    method: 'POST',
    params,
  });
}

// 获取业务管理指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnBusiness/view',
    method: 'GET',
    params,
  });
}

// 导出业务管理
export function Export(params) {
  jumpExport('/cdn/cdnBusiness/export', params);
}