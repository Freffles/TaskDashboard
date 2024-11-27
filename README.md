# TaskDashboard

A modern task management application built with Next.js 14, TypeScript, and Shadcn UI. Features a clean, responsive design with local storage persistence.

## Features

- Create, edit, and delete tasks
- Due date scheduling
- Task assignment
- Priority levels
- Responsive design
- Light/Dark mode
- List and Calendar views
- Local storage persistence

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Date Handling:** date-fns
- **Icons:** Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TaskDashboard.git
cd TaskDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
TaskDashboard/
├── app/                 # Next.js app directory
├── components/         
│   ├── task/           # Task-related components
│   └── ui/             # Shadcn UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Key Components

- **TaskDashboard:** Main container component
- **TaskDialog:** Task creation and editing modal
- **TaskList:** Grid layout task display
- **TaskCalendar:** Calendar view of tasks

## Data Persistence

Tasks are stored in the browser's localStorage, making the application fully functional without a backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework