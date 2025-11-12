#!/usr/bin/env node

/**
 * Test script to verify CSV parsing logic for WildCAT
 * Tests the parsing of Dena's master Campaign Import List.csv
 */

import fs from 'fs';
import path from 'path';

// Helper function to parse a single CSV row into cells (matches CSVColumnReorderer.jsx)
const parseCSVRow = (row) => {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"') {
      // Handle escaped quotes ("")
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of cell
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last cell
  values.push(current.trim());

  return values;
};

// Parse CSV file (matches CSVColumnReorderer.jsx parseFile logic)
const parseCSVFile = (filePath) => {
  let text = fs.readFileSync(filePath, 'utf-8');

  // Remove BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  // Parse CSV rows in a quote-aware manner
  const rows = [];
  let currentRow = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      // Check for escaped quote ("")
      if (inQuotes && nextChar === '"') {
        currentRow += '""';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
        currentRow += char;
      }
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of row (only if not inside quotes)
      if (currentRow.trim()) {
        rows.push(currentRow);
      }
      currentRow = '';
      // Skip \r\n combination
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
    } else {
      currentRow += char;
    }
  }

  // Add last row if exists
  if (currentRow.trim()) {
    rows.push(currentRow);
  }

  return rows;
};

// Main test function
const testCSVParsing = () => {
  const csvPath = "/Users/beauxwalton/WildCAT/test-data/Dena's master Campaign Import List.csv";

  console.log('🧪 Testing CSV Parsing for WildCAT\n');
  console.log('📁 Test file:', csvPath);
  console.log('=' .repeat(80));

  try {
    // Parse the CSV file
    const rows = parseCSVFile(csvPath);
    console.log(`\n✅ Successfully parsed ${rows.length} rows`);

    if (rows.length === 0) {
      console.log('❌ ERROR: No rows found in CSV file');
      return;
    }

    // Parse headers
    const headers = parseCSVRow(rows[0]);
    console.log(`\n📊 Column Count: ${headers.length}`);
    console.log('=' .repeat(80));

    // Display column names
    console.log('\n📋 Column Names:');
    headers.forEach((header, index) => {
      const displayHeader = header.replace(/\n/g, ' ');
      const hasNewline = header.includes('\n');
      const hasQuotes = header.includes('"');

      let flags = [];
      if (hasNewline) flags.push('📝 newline');
      if (hasQuotes) flags.push('💬 quotes');

      const flagStr = flags.length > 0 ? ` [${flags.join(', ')}]` : '';
      console.log(`  ${(index + 1).toString().padStart(2)}. ${displayHeader}${flagStr}`);
    });

    // Expected column names
    const expectedColumns = [
      'Launch Date MM/DD/YY',
      'Last Review Date',
      'V1 Tool Title',
      'Salesforce Campaign Name',
      'SF ACTIVISM Campaign',
      'NewMode Action ID',
      'Campaign ID',
      'Description',
      'Website Title',
      'Tool type',
      'V1 "Campaign" Title',
      'NewMode Submissions',
      'Salesforce campaign members'
    ];

    console.log('\n✓ Verification:');
    console.log('=' .repeat(80));

    // Check column count
    const expectedCount = 13;
    if (headers.length === expectedCount) {
      console.log(`✅ Column count correct: ${headers.length}/${expectedCount}`);
    } else {
      console.log(`❌ Column count mismatch: ${headers.length}/${expectedCount}`);
    }

    // Check specific columns
    let correctCount = 0;
    expectedColumns.forEach((expected, index) => {
      const actual = headers[index]?.replace(/\n/g, ' ');
      const match = actual === expected;
      if (match) correctCount++;

      const icon = match ? '✅' : '❌';
      if (!match) {
        console.log(`${icon} Column ${index + 1}:`);
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
      }
    });

    if (correctCount === expectedCount) {
      console.log(`✅ All column names correct: ${correctCount}/${expectedCount}`);
    } else {
      console.log(`⚠️  Column names: ${correctCount}/${expectedCount} correct`);
    }

    // Parse first data row
    if (rows.length > 1) {
      const firstDataRow = parseCSVRow(rows[1]);
      console.log('\n📄 First Data Row Preview:');
      console.log('=' .repeat(80));

      headers.forEach((header, index) => {
        const displayHeader = header.replace(/\n/g, ' ');
        const value = firstDataRow[index] || '(empty)';
        console.log(`  ${displayHeader}: ${value}`);
      });
    }

    // Summary
    console.log('\n' + '=' .repeat(80));
    console.log('📊 SUMMARY:');
    console.log(`  Total Rows: ${rows.length}`);
    console.log(`  Total Columns: ${headers.length}`);
    console.log(`  Expected Columns: ${expectedCount}`);
    console.log(`  Match Status: ${headers.length === expectedCount ? '✅ PASS' : '❌ FAIL'}`);
    console.log('=' .repeat(80));

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error(error.stack);
  }
};

// Run the test
testCSVParsing();
