# React Components Assignment

This project contains two custom React components built with TypeScript and TailwindCSS:
- InputField: A flexible input component with validation states and multiple variants
- DataTable: A data table with sorting, selection, and loading states

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view the app

## Storybook

To view the component documentation in Storybook:
1. Run `npm run storybook`
2. Open [http://localhost:6006](http://localhost:6006)

## Building for Production

1. Build the app: `npm run build`
2. Build Storybook: `npm run build-storybook`

## Components

### InputField

A versatile input component with:
- Multiple variants: filled, outlined, ghost
- Different sizes: small, medium, large
- Validation states: valid, invalid, disabled, loading
- Additional features: clear button, password toggle, theme support

### DataTable

A feature-rich data table with:
- Column sorting
- Row selection (single/multiple)
- Loading and empty states
- Custom column rendering
- Responsive design

## Technologies Used

- React 18
- TypeScript
- TailwindCSS
- Storybook
- Lucide React (icons)