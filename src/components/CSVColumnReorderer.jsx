import React, { useState, useEffect } from 'react';
import { Upload, Save, Download, Trash2, GripVertical, FileText, Star, FileDown, FileUp, Eye, EyeOff, Plus, CheckSquare } from 'lucide-react';

const CSVColumnReorderer = () => {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [savedArrangements, setSavedArrangements] = useState([]);
  const [arrangementName, setArrangementName] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedArrangements, setSelectedArrangements] = useState(new Set());
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Load saved arrangements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('csvColumnArrangements');
    if (saved) {
      setSavedArrangements(JSON.parse(saved));
    }
  }, []);

  // Parse CSV file
  const parseFile = (file) => {
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
          originalIndex: index,
          excluded: false,
          isCustom: false
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    parseFile(file);
  };

  // File drag and drop handlers
  const handleFileDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      parseFile(file);
    } else if (file) {
      alert('Please drop a CSV file');
    }
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

  // Toggle column exclusion
  const toggleColumnExclusion = (index) => {
    const newColumns = [...columns];
    newColumns[index].excluded = !newColumns[index].excluded;
    setColumns(newColumns);
  };

  // Add blank column
  const addBlankColumn = () => {
    const newColumnId = Date.now();
    const newColumn = {
      id: newColumnId,
      name: `New Column ${columns.filter(c => c.isCustom).length + 1}`,
      originalIndex: -1, // Custom columns don't have original index
      excluded: false,
      isCustom: true
    };
    setColumns([...columns, newColumn]);
  };

  // Delete custom column
  const deleteCustomColumn = (index) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
  };

  // Rename column
  const renameColumn = (index, newName) => {
    const newColumns = [...columns];
    newColumns[index].name = newName;
    setColumns(newColumns);
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
      columnOrder: columns.map(col => ({
        originalIndex: col.originalIndex,
        name: col.name,
        excluded: col.excluded,
        isCustom: col.isCustom
      }))
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

    // Handle both old format (array of indices) and new format (array of objects)
    const isOldFormat = typeof arrangement.columnOrder[0] === 'number';

    if (isOldFormat) {
      // Legacy support for old arrangements
      const reorderedColumns = arrangement.columnOrder
        .map(originalIndex => columns.find(col => col.originalIndex === originalIndex))
        .filter(Boolean);

      if (reorderedColumns.length === columns.length) {
        setColumns(reorderedColumns);
      } else {
        alert('This arrangement doesn\'t match the current CSV structure');
      }
    } else {
      // New format with excluded and custom columns
      const reorderedColumns = arrangement.columnOrder.map(colData => {
        if (colData.isCustom) {
          // Recreate custom column
          return {
            id: Date.now() + Math.random(),
            name: colData.name,
            originalIndex: -1,
            excluded: colData.excluded || false,
            isCustom: true
          };
        } else {
          // Find matching column from current CSV
          const matchedColumn = columns.find(col => col.originalIndex === colData.originalIndex);
          if (matchedColumn) {
            return {
              ...matchedColumn,
              excluded: colData.excluded || false
            };
          }
          return null;
        }
      }).filter(Boolean);

      setColumns(reorderedColumns);
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

    // Filter out excluded columns
    const activeColumns = columns.filter(col => !col.excluded);

    // Create header row
    const headers = activeColumns.map(col =>
      col.name.includes(',') || col.name.includes('"')
        ? `"${col.name.replace(/"/g, '""')}"`
        : col.name
    ).join(',');

    // Create data rows with reordered columns
    const rows = csvData.map(row => {
      return activeColumns.map(col => {
        // Custom columns get empty values
        const value = col.isCustom ? '' : (row[col.originalIndex] || '');
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

  // Reset to original order and make all visible
  const resetOrder = () => {
    const resetColumns = columns
      .filter(col => !col.isCustom) // Remove custom columns
      .map(col => ({ ...col, excluded: false })) // Make all visible
      .sort((a, b) => a.originalIndex - b.originalIndex); // Sort by original order
    setColumns(resetColumns);
  };

  // Toggle arrangement selection
  const toggleArrangementSelection = (id) => {
    const newSelected = new Set(selectedArrangements);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedArrangements(newSelected);
  };

  // Select all arrangements
  const selectAllArrangements = () => {
    setSelectedArrangements(new Set(savedArrangements.map(arr => arr.id)));
  };

  // Deselect all arrangements
  const deselectAllArrangements = () => {
    setSelectedArrangements(new Set());
  };

  // Export arrangements as JSON file
  const exportArrangements = () => {
    const arrangementsToExport = selectedArrangements.size > 0
      ? savedArrangements.filter(arr => selectedArrangements.has(arr.id))
      : savedArrangements;

    if (arrangementsToExport.length === 0) {
      alert('No arrangements selected to export');
      return;
    }

    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      arrangements: arrangementsToExport
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Generate filename based on arrangement names
    let filename;
    if (arrangementsToExport.length === 1) {
      // Single arrangement: use its name
      filename = `${arrangementsToExport[0].name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
    } else if (arrangementsToExport.length <= 3) {
      // Multiple (up to 3): combine names
      const names = arrangementsToExport.map(arr =>
        arr.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
      ).join('-');
      filename = `${names}.json`;
    } else {
      // Many arrangements: use generic name with count
      filename = `${arrangementsToExport.length}-arrangements.json`;
    }

    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    // Clear selection after export
    setSelectedArrangements(new Set());
  };

  // Import arrangements from JSON file
  const handleImportArrangements = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importData = JSON.parse(event.target.result);

        // Validate the imported data structure
        if (!importData.arrangements || !Array.isArray(importData.arrangements)) {
          alert('Invalid file format. Please select a valid arrangements JSON file.');
          return;
        }

        // Merge imported arrangements with existing ones, avoiding duplicates by name
        const existingNames = new Set(savedArrangements.map(arr => arr.name));
        const newArrangements = importData.arrangements.filter(arr => {
          // Validate each arrangement has required fields
          if (!arr.name || !arr.columnOrder || !Array.isArray(arr.columnOrder)) {
            return false;
          }
          return !existingNames.has(arr.name);
        });

        if (newArrangements.length === 0) {
          alert('No new arrangements to import. All arrangements already exist.');
          return;
        }

        // Assign new IDs to imported arrangements
        const arrangementsWithNewIds = newArrangements.map(arr => ({
          ...arr,
          id: Date.now() + Math.random() // Ensure unique IDs
        }));

        const updated = [...savedArrangements, ...arrangementsWithNewIds];
        setSavedArrangements(updated);
        localStorage.setItem('csvColumnArrangements', JSON.stringify(updated));

        alert(`Successfully imported ${newArrangements.length} arrangement(s)`);
        // Hide import section after successful import
        setShowImport(false);
      } catch (error) {
        alert('Error reading file. Please ensure it is a valid JSON file.');
        console.error('Import error:', error);
      }
    };

    reader.readAsText(file);
    // Reset file input so the same file can be imported again if needed
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wildcat-cream via-white to-wildcat-green p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-wildcat-brown mb-8 flex items-center gap-3">
            <img
              src="/images/wildcat-logo-placeholder.png"
              alt="WildCAT Logo"
              className="w-32 h-32 object-contain"
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
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                  isDraggingFile
                    ? 'border-wildcat-orange bg-wildcat-cream scale-105 shadow-lg'
                    : 'border-wildcat-green bg-wildcat-cream/30 hover:border-wildcat-orange'
                }`}
                onDragEnter={handleFileDragEnter}
                onDragOver={handleFileDragOver}
                onDragLeave={handleFileDragLeave}
                onDrop={handleFileDrop}
              >
                <Upload className={`mx-auto mb-3 transition-transform ${
                  isDraggingFile ? 'text-wildcat-orange scale-110' : 'text-wildcat-orange'
                }`} size={48} />
                <p className="text-lg font-medium text-gray-700">
                  {isDraggingFile ? 'Drop CSV file here' : 'Click or drag to upload CSV file'}
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
                <div className="flex gap-2">
                  <button
                    onClick={addBlankColumn}
                    className="px-4 py-2 bg-wildcat-green text-white rounded-lg hover:bg-wildcat-dark-green transition-colors flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add Column
                  </button>
                  <button
                    onClick={resetOrder}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Reset
                  </button>
                </div>
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
                    className={`flex items-center gap-2 px-4 py-3 bg-white border-2 rounded-lg transition-all ${
                      column.excluded
                        ? 'opacity-40 border-red-300 bg-red-50'
                        : draggedItem === index
                          ? 'opacity-50 border-wildcat-orange shadow-lg'
                          : 'border-gray-200 hover:border-wildcat-green hover:shadow-md'
                    } ${column.isCustom ? 'border-wildcat-green bg-wildcat-cream/50' : ''}`}
                  >
                    <GripVertical size={16} className="text-gray-400 cursor-move" />
                    {column.isCustom ? (
                      <input
                        type="text"
                        value={column.name}
                        onChange={(e) => renameColumn(index, e.target.value)}
                        className="font-medium text-gray-700 bg-transparent border-none outline-none focus:ring-1 focus:ring-wildcat-green rounded px-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="font-medium text-gray-700">{column.name}</span>
                    )}
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    {column.isCustom && (
                      <span className="text-xs text-wildcat-green bg-wildcat-cream px-2 py-1 rounded font-medium">
                        Custom
                      </span>
                    )}
                    <div className="flex gap-1 ml-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleColumnExclusion(index);
                        }}
                        className={`p-1 rounded transition-colors ${
                          column.excluded
                            ? 'text-red-600 hover:bg-red-100'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={column.excluded ? 'Include column' : 'Exclude column'}
                      >
                        {column.excluded ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {column.isCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCustomColumn(index);
                          }}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete custom column"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click the eye icon to exclude columns from export. Custom columns appear with empty values.
              </p>
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
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Saved Arrangements
                </h3>
                {/* Import/Export Toolbar */}
                <div className="flex gap-2 items-center">
                  {/* Import Button */}
                  <label className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <FileUp size={16} />
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportArrangements}
                      className="hidden"
                    />
                  </label>

                  {/* Export All Button */}
                  <button
                    onClick={() => {
                      setSelectedArrangements(new Set());
                      setTimeout(() => exportArrangements(), 0);
                    }}
                    className="px-4 py-2 bg-wildcat-green text-white rounded-lg hover:bg-wildcat-green/90 transition-colors flex items-center gap-2 text-sm font-medium"
                    title="Export all arrangements"
                  >
                    <FileDown size={16} />
                    Export All
                  </button>

                  {/* Divider */}
                  <div className="h-8 w-px bg-gray-300"></div>

                  {/* Select & Export or Show Selection Count */}
                  {selectedArrangements.size === 0 ? (
                    <button
                      onClick={selectAllArrangements}
                      className="px-4 py-2 bg-wildcat-orange text-white rounded-lg hover:bg-wildcat-orange/90 transition-colors flex items-center gap-2 text-sm font-medium"
                      title="Select arrangements to export"
                    >
                      <CheckSquare size={16} />
                      Select to Export
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={deselectAllArrangements}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                      >
                        Clear ({selectedArrangements.size})
                      </button>
                      <button
                        onClick={exportArrangements}
                        className="px-4 py-2 bg-wildcat-orange text-white rounded-lg hover:bg-wildcat-orange/90 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <FileDown size={16} />
                        Export Selected
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedArrangements.map(arrangement => (
                  <div
                    key={arrangement.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      selectedArrangements.has(arrangement.id)
                        ? 'bg-purple-100 border-purple-400'
                        : 'bg-wildcat-cream/30 border-wildcat-green/50 hover:border-wildcat-orange'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedArrangements.has(arrangement.id)}
                        onChange={() => toggleArrangementSelection(arrangement.id)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="font-medium text-wildcat-brown flex items-center gap-2">
                        <Star size={16} className="text-wildcat-orange" />
                        {arrangement.name}
                      </span>
                    </div>
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
                      {columns.filter(col => !col.excluded).map((column) => (
                        <th key={column.id} className={`px-4 py-3 text-left text-sm font-medium text-wildcat-brown border-b border-wildcat-green/30 ${column.isCustom ? 'bg-wildcat-green/20' : ''}`}>
                          {column.name}
                          {column.isCustom && <span className="ml-2 text-xs text-wildcat-green">(Custom)</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.slice(0, 10).map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        {columns.filter(col => !col.excluded).map((column) => (
                          <td key={column.id} className={`px-4 py-3 text-sm text-gray-600 border-b ${column.isCustom ? 'bg-wildcat-cream/30 italic text-gray-400' : ''}`}>
                            {column.isCustom ? '(empty)' : (row[column.originalIndex] || '')}
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