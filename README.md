# Camera List Table Project

## Description
This project is a web-based application that displays a table of cameras with their details, including location and status (active/inactive). The table provides several functionalities to manage and filter camera data:

- **Search**: A search feature with debouncing to optimize search queries.
- **Filters**: Options to filter cameras by location and status.
- **Update Status**: Functionality to update the status of a camera (active/inactive).
- **Delete Row**: Ability to delete any row from the table.

## Technologies Used
- **Frontend**: React.js
- **CSS**: TailwindCSS or plain CSS for styling
- **Debouncing**: Implemented using JavaScript/React Hooks

## Features
1. **Camera List Table**:
   - Displays a list of cameras with their details.
2. **Search with Debouncing**:
   - Efficiently handles user input with a delay to avoid frequent re-rendering.
3. **Filters**:
   - Filter by **location**: Displays cameras based on the selected location.
   - Filter by **status**: Displays active or inactive cameras based on the filter.
4. **Update Status**:
   - Allows users to toggle the status (active/inactive) of a camera.
5. **Delete Row**:
   - Removes a camera entry from the table.
6. **Efficient redring**
- optimise code with help of usecallback and usememo hooks

## Getting Started

### Prerequisites
Ensure the following software is installed on your system:
- Node.js (v16 or later)
- npm (v7 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Govind-Joshi/wobotProject.git

### Navigate to the project directory
2.cd wobot_project.

### Install dependencies
3.npm install.

### Start the development server

4.npm start