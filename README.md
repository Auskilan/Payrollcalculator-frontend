# JewelFlow - SaaS Dashboard

## Overview
JewelFlow is a modern, enterprise-grade multi-tenant SaaS dashboard for Jewellery Attendance, Payroll & HR Management.
It features a premium "Stitch" design system with gold accents and dark/light mode support.

## Project Structure
- **/src/index.css**: Contains the Stitch Design System (Vars, Utilities).
- **/src/layout**: Dashboard Layout (Sidebar + Header).
- **/src/pages/auth**: Login & Authentication.
- **/src/pages/dashboard**: Main Dashboard Summary.
- **/src/pages/tenants**: Tenant Management Module.
- **/src/components**: reusable components (Header, Sidebar).

## Tech Stack
- React (Vite)
- Javascript (JSX)
- Lucide React (Icons)
- React Router DOM
- CSS Variables (Theming)

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173

## Modules Implemented
- **Auth**: Login UI with role selector.
- **Layout**: Responsive Sidebar & Topbar.
- **Dashboard**: Stats cards & recent attendance.
- **Tenant Management**: List view with status badges.

## Default Credentials
For testing purposes, the following credentials are pre-configured:

| Role | Username | Password |
|------|----------|----------|
| **Super Admin** | `superadmin` | `admin123` |
| **Tenant Admin** | `tenant_admin` | `tenant123` |
| **Branch Admin** | `branch_manager` | `branch123` |
| **Employee** | `employee01` | `user123` |

