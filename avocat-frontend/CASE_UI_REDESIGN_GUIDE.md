# Case Details UI Redesign Guide

## Overview
The case details view has been reorganized into a structured layout that keeps critical case information visible while offering clear, tabbed access to clients, courts, procedures, sessions, and ads.

## Layout Changes
1. **Sticky Header**
   - Displays case title, status, file number, and date.
   - Includes action buttons (Edit, Delete, Add Procedure, Add Session).

2. **Overview Cards**
   - A quick summary grid with key metrics (case number, status, clients, courts).

3. **Tabbed Sections**
   - Tabs: Clients, Courts, Procedures, Sessions, Ads.
   - Each tab uses consistent headers, empty states, and CTA buttons.

## Sections & Components
- **Clients**
  - New inline `AddClientToCaseForm` for faster additions.
  - Responsive table and mobile cards.

- **Courts**
  - Court input rows are grouped with required markers.
  - Current courts table + responsive card list.

- **Procedures, Sessions, Ads**
  - Unified section headers, tables, and empty states.
  - Mobile-friendly card layouts for small screens.

## Form Harmonization
- Added distinct form components for procedures, sessions, ads, and case edit.
- Required markers, consistent labels, and structured error feedback.
- Save/Cancel button layouts are uniform across modals.

## Responsive Behavior
- Desktop uses tables with sticky headers.
- Mobile uses card lists with clear action buttons.
- Spacing and typography are standardized for 320–1440 breakpoints.
