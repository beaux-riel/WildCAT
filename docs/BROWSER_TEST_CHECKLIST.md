# Browser Test Checklist - Input Field Verification

**URL:** http://localhost:3000/WildCAT/
**Test CSV File:** `/Users/beauxwalton/WildCAT/docs/test-data.csv`

## Pre-Test Setup

1. ✅ Development server is running (`npm run dev`)
2. ✅ Browser is open to http://localhost:3000/WildCAT/
3. ✅ Test CSV file is available for upload

---

## Test 1: Save Current Arrangement Input Field

### Steps:
1. [ ] Upload the test CSV file (`docs/test-data.csv`)
2. [ ] Scroll down to the "Save Current Arrangement" section (gold/cream background with star icon)
3. [ ] Locate the input field with placeholder "Enter arrangement name..."

### Visual Checks:
- [ ] Input field has **white background** (not cream or transparent)
- [ ] Input field has **green border** (Wildcat green)
- [ ] Placeholder text "Enter arrangement name..." is **gray and visible**
- [ ] Click into the field - **orange focus ring** appears
- [ ] Type "Test Arrangement" - text is **black/dark gray and clearly readable**
- [ ] Text is **not** white, light gray, or hard to see
- [ ] Background remains **white** while typing

### Expected Appearance:
```
┌──────────────────────────────────────────────────┐
│ Enter arrangement name...                        │  ← White background
└──────────────────────────────────────────────────┘    Gray placeholder
   ↑                                          ↑
Green border                          Orange ring on focus
```

**Result:** [ ] PASS [ ] FAIL

**Notes:**
________________________________________________________________

---

## Test 2: Custom Column Rename Input

### Steps:
1. [ ] Ensure CSV is uploaded (from Test 1)
2. [ ] Click the **"Add Column"** button (green button, top right of column section)
3. [ ] A new column chip appears (light green background, labeled "New Column 1")
4. [ ] Click directly on the text "New Column 1" to edit

### Visual Checks:
- [ ] Input field appears with **white background**
- [ ] Input field has **green focus ring**
- [ ] Current text "New Column 1" is **dark and readable**
- [ ] Type "Custom Field" - new text is **black/dark gray and clearly visible**
- [ ] Text is **not** hard to see against white background
- [ ] Click elsewhere - renamed column shows new name clearly

### Expected Appearance:
```
┌─────────────────────────────────────────┐
│ ≡ New Column 1    1  Custom         × │  ← Column chip
│   ↑                                     │
│   Click here to edit                    │
└─────────────────────────────────────────┘
    When editing:
┌───────────────┐
│ Custom Field  │  ← White background, dark text
└───────────────┘
```

**Result:** [ ] PASS [ ] FAIL

**Notes:**
________________________________________________________________

---

## Test 3: Overall Visual Consistency

### Steps:
1. [ ] Review all visible input fields on the page
2. [ ] Check for any dark-on-dark or light-on-light text combinations

### Areas to Check:
- [ ] File upload section - No direct input (uses file picker)
- [ ] Save arrangement input - White background, dark text ✓
- [ ] Custom column inputs - White background, dark text ✓
- [ ] No other text inputs exist

### Visual Checks:
- [ ] All text inputs have **white or light backgrounds**
- [ ] All text is **dark and easily readable**
- [ ] No inputs have **white text on white background**
- [ ] No inputs have **dark text on dark background**
- [ ] Focus states are **clearly visible**

**Result:** [ ] PASS [ ] FAIL

**Notes:**
________________________________________________________________

---

## Test 4: Interaction Testing

### Save Arrangement Flow:
1. [ ] Type "Department Salary View" in save arrangement input
2. [ ] Text is clearly visible as you type
3. [ ] Click "Save" button
4. [ ] Arrangement appears in "Saved Arrangements" section below

### Custom Column Flow:
1. [ ] Add 2-3 custom columns
2. [ ] Rename each one
3. [ ] All renamed columns remain readable
4. [ ] Drag columns to reorder - names stay visible

**Result:** [ ] PASS [ ] FAIL

**Notes:**
________________________________________________________________

---

## Test 5: Focus State Testing

### Steps:
1. [ ] Click in save arrangement input field
2. [ ] **Orange ring** appears around input
3. [ ] Click in custom column input (edit column name)
4. [ ] **Green ring** appears around input
5. [ ] Tab through inputs with keyboard
6. [ ] Focus rings appear on each input

### Expected Focus States:
- **Save Arrangement Input:** Orange ring (`ring-wildcat-orange`)
- **Custom Column Input:** Green ring (`ring-wildcat-green`)

**Result:** [ ] PASS [ ] FAIL

**Notes:**
________________________________________________________________

---

## Test 6: Placeholder Visibility

### Steps:
1. [ ] Refresh the page
2. [ ] Upload CSV file
3. [ ] Before typing, verify placeholder text is visible and gray
4. [ ] Placeholder text: "Enter arrangement name..."
5. [ ] Placeholder is **not** white or invisible
6. [ ] Placeholder is **readable** but lighter than regular text

**Result:** [ ] PASS [ ] FAIL

**Notes:**
________________________________________________________________

---

## Summary Checklist

### All Tests Must Pass:
- [ ] Test 1: Save Arrangement Input - PASS
- [ ] Test 2: Custom Column Rename - PASS
- [ ] Test 3: Visual Consistency - PASS
- [ ] Test 4: Interaction Testing - PASS
- [ ] Test 5: Focus States - PASS
- [ ] Test 6: Placeholder Visibility - PASS

---

## Issues Found

### Issue 1:
**Location:** _______________________________________________
**Description:** ___________________________________________
**Severity:** [ ] Critical [ ] Major [ ] Minor
**Screenshot:** ___________________________________________

### Issue 2:
**Location:** _______________________________________________
**Description:** ___________________________________________
**Severity:** [ ] Critical [ ] Major [ ] Minor
**Screenshot:** ___________________________________________

---

## Final Result

**Overall Status:** [ ] ALL PASS [ ] ISSUES FOUND

**Date Tested:** _____________________
**Tester:** __________________________
**Browser:** _________________________
**OS:** ______________________________

---

## Quick Reference - Expected Colors

- **Wildcat Orange:** `#FF6B35` (focus rings, accents)
- **Wildcat Green:** `#4A7C59` (borders, buttons)
- **Wildcat Brown:** `#6B4423` (headings)
- **Wildcat Cream:** `#F5E6D3` (backgrounds)
- **White:** `#FFFFFF` (input backgrounds)
- **Gray 900:** `#111827` (text)
- **Gray 500:** `#6B7280` (placeholder)
