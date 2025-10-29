# Spanish Learning Quiz

A React-based interactive quiz application that helps users discover their perfect Spanish learning path through personalized recommendations.

## Project Overview

This Spanish Learning Quiz is designed for SpanishVIP to assess users' language learning goals, current skill level, and preferences. Based on their responses, the application recommends either group classes or private tutoring options that best fit their needs.

## Features

- Interactive quiz with multiple choice questions
- Personalized recommendations based on user responses
- Responsive design for mobile and desktop
- Progress tracking
- Modern UI with Tailwind CSS and shadcn/ui components
- Integration with SpanishVIP's booking system

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/spanish-learning-quiz.git
cd spanish-learning-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── quiz/           # Quiz-related components
│   └── ui/             # Reusable UI components
├── data/
│   └── spanishQuiz.ts  # Quiz configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Configuration

The quiz configuration is stored in `src/data/spanishQuiz.ts` and includes:

- Quiz questions and options
- Result templates
- Styling options
- Webhook URLs for data submission

## Deployment

This project can be deployed to any static hosting service. For production builds:

1. Run `npm run build`
2. Deploy the contents of the `dist` folder

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary to SpanishVIP.

## Contact

For questions or support, please contact the SpanishVIP team.
