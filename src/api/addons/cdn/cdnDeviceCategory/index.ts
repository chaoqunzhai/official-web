import { http, jumpExport } from '@/utils/http/axios';

// 获取分类列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnDeviceCategory/list',
    method: 'get',
    params,
  });
}

// 删除/批量删除分类
export function Delete(params) {
  return http.request({
    url: '/cdn/cdnDeviceCategory/delete',
    method: 'POST',
    params,
  });
}

// 添加/编辑分类
export function Edit(params) {
  return http.request({
    url: '/cdn/cdnDeviceCategory/edit',
    method: 'POST',
    params,
  });
}

// 获取分类指定详情
export function View(params) {
  return http.request({
    url: '/cdn/cdnDeviceCategory/view',
    method: 'GET',
    params,
  });
}

// 获取分类最大排序
export function MaxSort() {
  return http.request({
    url: '/cdn/cdnDeviceCategory/maxSort',
    method: 'GET',
  });
}

// 获取分类关系树选项
export function TreeOption() {
  return http.request({
    url: '/cdn/cdnDeviceCategory/treeOption',
    method: 'GET',
  });
}