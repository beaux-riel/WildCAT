import React, { useState, useEffect } from 'react';
import { Upload, Save, Download, Trash2, GripVertical, FileText, Star } from 'lucide-react';

const CSVColumnReorderer = () => {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [savedArrangements, setSavedArrangements] = useState([]);
  const [arrangementName, setArrangementName] = useState('');
  const [fileName, setFileName] = useState('');

  // Load saved arrangements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('csvColumnArrangements');
    if (saved) {
      setSavedArrangements(JSON.parse(saved));
    }
  }, []);

  // Parse CSV file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').filter(row => row.trim());
      
      if (rows.length > 0) {
        // Parse headers
        const headers = rows[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        setColumns(headers.map((header, index) => ({
          id: index,
          name: header,
          originalIndex: index
        })));
        
        // Parse data rows
        const dataRows = rows.slice(1).map(row => {
          const values = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim());
          
          return values;
        });
        
        setCsvData(dataRows);
      }
    };
    
    reader.readAsText(file);
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null) return;
    
    const draggedColumn = columns[draggedItem];
    const newColumns = columns.filter((_, index) => index !== draggedItem);
    newColumns.splice(dropIndex, 0, draggedColumn);
    
    setColumns(newColumns);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Save current arrangement
  const saveArrangement = () => {
    if (!arrangementName.trim()) {
      alert('Please enter a name for this arrangement');
      return;
    }
    
    const newArrangement = {
      id: Date.now(),
      name: arrangementName,
      columnOrder: columns.map(col => col.originalIndex)
    };
    
    const updated = [...savedArrangements, newArrangement];
    setSavedArrangements(updated);
    localStorage.setItem('csvColumnArrangements', JSON.stringify(updated));
    setArrangementName('');
  };

  // Load saved arrangement
  const loadArrangement = (arrangement) => {
    if (columns.length === 0) {
      alert('Please upload a CSV file first');
      return;
    }
    
    const reorderedColumns = arrangement.columnOrder
      .map(originalIndex => columns.find(col => col.originalIndex === originalIndex))
      .filter(Boolean);
    
    if (reorderedColumns.length === columns.length) {
      setColumns(reorderedColumns);
    } else {
      alert('This arrangement doesn\'t match the current CSV structure');
    }
  };

  // Delete saved arrangement
  const deleteArrangement = (id) => {
    const updated = savedArrangements.filter(arr => arr.id !== id);
    setSavedArrangements(updated);
    localStorage.setItem('csvColumnArrangements', JSON.stringify(updated));
  };

  // Export reordered CSV
  const exportCSV = () => {
    if (columns.length === 0) return;
    
    // Create header row
    const headers = columns.map(col => 
      col.name.includes(',') || col.name.includes('"') 
        ? `"${col.name.replace(/"/g, '""')}"` 
        : col.name
    ).join(',');
    
    // Create data rows with reordered columns
    const rows = csvData.map(row => {
      return columns.map(col => {
        const value = row[col.originalIndex] || '';
        return value.includes(',') || value.includes('"') || value.includes('\n')
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',');
    });
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reordered_${fileName || 'export.csv'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to original order
  const resetOrder = () => {
    setColumns(columns.sort((a, b) => a.originalIndex - b.originalIndex));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wildcat-cream via-white to-wildcat-green p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-wildcat-brown mb-8 flex items-center gap-3">
            <img
              src="/images/wildcat-logo-placeholder.png"
              alt="WildCAT Logo"
              className="w-32 h-32 object-contain rounded-md"
              onError={(e) => {
                // Fallback to FileText icon if logo not found
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <FileText className="text-wildcat-orange hidden" />
            <span className="bg-gradient-to-r from-wildcat-brown to-wildcat-orange bg-clip-text text-transparent">
              WildCAT
            </span>
            <span className="text-gray-600 text-2xl">Column Arrangement Tool</span>
          </h1>
          
          {/* File Upload */}
          <div className="mb-8">
            <label className="block">
              <div className="border-2 border-dashed border-wildcat-green rounded-lg p-8 text-center hover:border-wildcat-orange transition-colors cursor-pointer bg-wildcat-cream/30">
                <Upload className="mx-auto text-wildcat-orange mb-3" size={48} />
                <p className="text-lg font-medium text-gray-700">
                  Click to upload CSV file
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {fileName || 'No file selected'}
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Column Reordering Section */}
          {columns.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Drag columns to reorder
                </h2>
                <button
                  onClick={resetOrder}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Reset Order
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg min-h-[100px]">
                {columns.map((column, index) => (
                  <div
                    key={column.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-2 px-4 py-3 bg-white border-2 rounded-lg cursor-move transition-all ${
                      draggedItem === index
                        ? 'opacity-50 border-wildcat-orange shadow-lg'
                        : 'border-gray-200 hover:border-wildcat-green hover:shadow-md'
                    }`}
                  >
                    <GripVertical size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-700">{column.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Arrangement Section */}
          {columns.length > 0 && (
            <div className="mb-8 p-4 bg-wildcat-cream/50 rounded-lg border-2 border-wildcat-green">
              <h3 className="text-lg font-semibold text-wildcat-brown mb-3 flex items-center gap-2">
                <Star className="text-wildcat-orange" size={20} />
                Save Current Arrangement
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter arrangement name..."
                  value={arrangementName}
                  onChange={(e) => setArrangementName(e.target.value)}
                  className="flex-1 px-4 py-2 border border-wildcat-green rounded-lg focus:outline-none focus:ring-2 focus:ring-wildcat-orange"
                />
                <button
                  onClick={saveArrangement}
                  className="px-6 py-2 bg-wildcat-orange text-white rounded-lg hover:bg-wildcat-brown transition-colors flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Saved Arrangements */}
          {savedArrangements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Saved Arrangements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedArrangements.map(arrangement => (
                  <div
                    key={arrangement.id}
                    className="flex items-center justify-between p-3 bg-wildcat-cream/30 rounded-lg border border-wildcat-green/50 hover:border-wildcat-orange transition-colors"
                  >
                    <span className="font-medium text-wildcat-brown flex items-center gap-2">
                      <Star size={16} className="text-wildcat-orange" />
                      {arrangement.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadArrangement(arrangement)}
                        className="px-3 py-1 bg-wildcat-green text-white rounded hover:bg-wildcat-dark-green transition-colors text-sm font-medium"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteArrangement(arrangement.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Preview */}
          {csvData.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Data Preview (First 10 rows)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-wildcat-green/30 rounded-lg overflow-hidden">
                  <thead className="bg-wildcat-cream/50">
                    <tr>
                      {columns.map((column, index) => (
                        <th key={column.id} className="px-4 py-3 text-left text-sm font-medium text-wildcat-brown border-b border-wildcat-green/30">
                          {column.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.slice(0, 10).map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        {columns.map((column) => (
                          <td key={column.id} className="px-4 py-3 text-sm text-gray-600 border-b">
                            {row[column.originalIndex] || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {csvData.length > 10 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing 10 of {csvData.length} rows
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Export Button */}
          {columns.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={exportCSV}
                className="px-6 py-3 bg-wildcat-orange text-white rounded-lg hover:bg-wildcat-brown transition-colors flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
              >
                <Download size={20} />
                Export Reordered CSV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVColumnReorderer;