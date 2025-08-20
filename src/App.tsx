import React, { useState } from 'react';
import { Moon, Sun, Code, Palette, Database, Settings, Github, ExternalLink } from 'lucide-react';
import InputField from './components/InputField';
import DataTable from './components/DataTable';
import { useTheme } from './hooks/useTheme';
import { Column } from './types';

interface ExampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<ExampleData[]>([]);
  const [activeTab, setActiveTab] = useState('components');

  const exampleData: ExampleData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Developer', status: 'active', joinDate: '2023-04-05' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Designer', status: 'inactive', joinDate: '2023-05-12' },
  ];

  const columns: Column<ExampleData>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
    { 
      key: 'status', 
      title: 'Status', 
      dataIndex: 'status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'joinDate', title: 'Join Date', dataIndex: 'joinDate', sortable: true },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Component Showcase
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                <Settings className="h-5 w-5" />
              </button>
              
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit mx-auto mb-8">
          {['components', 'documentation', 'examples'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl transition-all duration-300 capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-700 shadow-lg text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Beautiful React Components
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern, accessible, and highly customizable UI components built with React, TypeScript, and TailwindCSS.
          </p>
        </div>

        {/* InputField Component Showcase */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold">InputField Component</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Basic Inputs</h3>
              <div className="space-y-6">
                <InputField
                  label="Default Input"
                  placeholder="Type something amazing..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  clearable
                  onClear={() => setInputValue('')}
                />
                
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  helperText="We'll never share your email with anyone else."
                />
                
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  helperText="Must be at least 8 characters with numbers and symbols"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Input States</h3>
              <div className="space-y-6">
                <InputField
                  label="Error State"
                  placeholder="This field has an error"
                  invalid
                  errorMessage="This field is required"
                  value=""
                  onChange={() => {}}
                />
                
                <InputField
                  label="Disabled Input"
                  placeholder="Cannot type here"
                  value="Disabled value"
                  disabled
                  readOnly
                />
                
                <InputField
                  label="Loading State"
                  placeholder="Loading content..."
                  loading
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">Variants & Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Filled Variant"
                placeholder="Filled style"
                variant="filled"
                value=""
                onChange={() => {}}
              />
              <InputField
                label="Outlined Variant"
                placeholder="Outlined style"
                variant="outlined"
                value=""
                onChange={() => {}}
              />
              <InputField
                label="Ghost Variant"
                placeholder="Ghost style"
                variant="ghost"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
        </section>

        {/* DataTable Component Showcase */}
        <section>
          <div className="flex items-center mb-8">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
              <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold">DataTable Component</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                User Management Table
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive table with sorting, selection, and multiple display options.
              </p>
            </div>
            
            <DataTable
              data={exampleData}
              columns={columns}
              selectable="multiple"
              onRowSelect={setSelectedRows}
              rowKey="id"
            />
            
            {selectedRows.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-2">
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  Selected Users ({selectedRows.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedRows.map((user) => (
                    <div key={user.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg border">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm mt-2">©Component Showcase. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;