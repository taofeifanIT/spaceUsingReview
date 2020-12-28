import React, { useEffect, useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { useModel } from 'umi';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '设备状态',
    dataIndex: 'status',
    filters: true,
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '设备使用场景',
    dataIndex: 'scene',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '设备号',
    dataIndex: 'serial',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '设备创建时间',
    key: 'add_time',
    dataIndex: 'add_time',
    valueType: 'date',
  },
  {
    title: '设备最近连接时间',
    key: 'last_time',
    dataIndex: 'last_time',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();
  // const { initialState } = useModel('@@initialState')
  const test = (params: any) => {
    new Promise((resolve) => {
      request<{
        data: GithubIssueItem[];
      }>('/api/user', {
        params,
      }).then((res: any) => {
        resolve(res.users)
      })
    })
  }
  useEffect(() => {
    test({})
  }, [])
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) =>
       new Promise((resolve: any) => {
        request<{
          data: GithubIssueItem[];
        }>('/device/list?token=8d6d46450acd9413e08663e596c6a5de&page=1', {
          params,
        }).then((res:any) => {
          resolve({
            data: res.data.list,
            success: true,
          })
        })
       })
      }
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
