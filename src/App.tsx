import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import InputField from './components/InputField';
import DataTable from './components/DataTable';
import { useTheme } from './hooks/useTheme';
import { Column } from './types';

interface ExampleData {
  id: number;
  name: string;
  email: string;
  role: string;
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<ExampleData[]>([]);

  const exampleData: ExampleData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer' },
  ];

  const columns: Column<ExampleData>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">React Components Demo</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">InputField Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputField
                label="Default Input"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                clearable
                onClear={() => setInputValue('')}
              />
            </div>
            <div>
              <InputField
                label="Password Input"
                type="password"
                placeholder="Enter your password"
                helperText="Must be at least 8 characters"
              />
            </div>
            <div>
              <InputField
                label="Error State"
                placeholder="This field has an error"
                invalid
                errorMessage="This field is required"
              />
            </div>
            <div>
              <InputField
                label="Disabled Input"
                placeholder="Cannot type here"
                value="Disabled value"
                disabled
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">DataTable Component</h2>
          <DataTable
            data={exampleData}
            columns={columns}
            selectable="multiple"
            onRowSelect={setSelectedRows}
            rowKey="id"
          />
          
          {selectedRows.length > 0 && (
            <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Selected Rows:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(selectedRows, null, 2)}
              </pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;