import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DataTable from './DataTable';
import { Column } from '../../types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export default {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    selectable: {
      control: { type: 'select', options: [false, 'single', 'multiple'] },
    },
  },
} as Meta;

const mockData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-08-15 14:32',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2023-08-17 09:45',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2023-08-10 16:20',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2023-08-18 11:30',
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Admin',
    status: 'inactive',
    lastLogin: '2023-08-05 08:15',
  },
];

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value: any) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
  },
];

const Template: StoryFn<any> = (args) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  
  return (
    <div>
      <DataTable {...args} onRowSelect={setSelectedRows} />
      {selectedRows.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <h3 className="font-medium text-blue-800 dark:text-blue-300">Selected Rows:</h3>
          <pre className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            {JSON.stringify(selectedRows, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: mockData,
  columns,
};

export const SelectableSingle = Template.bind({});
SelectableSingle.args = {
  data: mockData,
  columns,
  selectable: 'single',
};

export const SelectableMultiple = Template.bind({});
SelectableMultiple.args = {
  data: mockData,
  columns,
  selectable: 'multiple',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  data: [],
  columns,
  loading: true,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
  columns,
  loading: false,
};

// Custom render example
const customColumns: Column<User>[] = [
  ...columns,
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'id',
    sortable: false,
    render: (value: any, record: User) => (
      <button className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50">
        Edit
      </button>
    ),
  },
];

export const WithCustomRender = Template.bind({});
WithCustomRender.args = {
  data: mockData,
  columns: customColumns,
};