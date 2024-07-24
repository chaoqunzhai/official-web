import { http, jumpExport } from '@/utils/http/axios';

// 获取客户列表列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnCustomer/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除客户列表
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnCustomer/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑客户列表
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnCustomer/edit',
    method: 'POST',
    params,
  });
}

// 获取客户列表指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnCustomer/view',
    method: 'GET',
    params,
  });
}

// 导出客户列表
export function Export(params) {
  jumpExport('/cdn/cdnCustomer/export', params);
}