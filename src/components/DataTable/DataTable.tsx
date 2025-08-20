import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { DataTableProps, Column } from '../../types';

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id' as keyof T,
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (row: T) => {
    if (!selectable) return;

    let newSelectedRows: T[];
    if (selectable === 'single') {
      newSelectedRows = [row];
    } else {
      const isSelected = selectedRows.some(
        (selectedRow) => selectedRow[rowKey] === row[rowKey]
      );

      if (isSelected) {
        newSelectedRows = selectedRows.filter(
          (selectedRow) => selectedRow[rowKey] !== row[rowKey]
        );
      } else {
        newSelectedRows = [...selectedRows, row];
      }
    }

    setSelectedRows(newSelectedRows);
    if (onRowSelect) onRowSelect(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectable !== 'multiple') return;

    const allSelected = selectedRows.length === data.length;
    const newSelectedRows = allSelected ? [] : [...data];

    setSelectedRows(newSelectedRows);
    if (onRowSelect) onRowSelect(newSelectedRows);
  };

  const isRowSelected = (row: T) => {
    return selectedRows.some(
      (selectedRow) => selectedRow[rowKey] === row[rowKey]
    );
  };

  const isAllSelected = selectable === 'multiple' && selectedRows.length === data.length && data.length > 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
        <Loader2 size={32} className="animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading data...</span>
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No data available</h3>
        <p className="text-gray-500 dark:text-gray-400">There are no records to display</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            {selectable && (
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                {selectable === 'multiple' && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                )}
              </th>
            )}
            {columns.map((column: Column<T>) => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors' : ''
                  }`}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && (
                    <span className="ml-2">
                      {sortConfig && sortConfig.key === column.key ? (
                        sortConfig.direction === 'ascending' ? (
                          <ChevronUp size={16} className="text-blue-500" />
                        ) : (
                          <ChevronDown size={16} className="text-blue-500" />
                        )
                      ) : (
                        <div className="opacity-40">
                          <ChevronUp size={16} />
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {sortedData.map((row: T, index: number) => (
            <tr
              key={index}
              className={`transition-all duration-200 ${isRowSelected(row)
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/30 even:bg-gray-50/50 dark:even:bg-gray-800/20'
                }`}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      type={selectable === 'single' ? 'radio' : 'checkbox'}
                      checked={isRowSelected(row)}
                      onChange={() => handleRowSelect(row)}
                      className={
                        selectable === 'single'
                          ? 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 transition-colors'
                          : 'h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors'
                      }
                    />
                  </div>
                </td>
              )}
              {columns.map((column: Column<T>) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {column.render
                    ? column.render(row[column.dataIndex], row)
                    : row[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;