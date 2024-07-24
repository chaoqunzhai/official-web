import { http, jumpExport } from '@/utils/http/axios';

// 获取联系人列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnContacts/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除联系人
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnContacts/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑联系人
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnContacts/edit',
    method: 'POST',
    params,
  });
}

// 获取联系人指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnContacts/view',
    method: 'GET',
    params,
  });
}

// 导出联系人
export function Export(params) {
  jumpExport('/cdn/cdnContacts/export', params);
}