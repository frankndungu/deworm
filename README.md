# Deworm Reminder

A simple web application that helps adults remember to deworm regularly. The WHO recommends deworming every 3 months in endemic areas, but most people haven't done it since childhood.

## About

This tool calculates your next deworming date based on when you last dewormed and provides calendar reminders to help you stay on track. No signup required, no data collection - just a straightforward utility.

## Features

- Calculate next deworming date (3 months from last dose)
- Download calendar reminder (.ics file) compatible with Google Calendar, Apple Calendar, and Outlook
- Copy reminder to clipboard
- Mobile-responsive design
- Zero data collection - everything runs client-side

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Fonts**: DM Serif Display, Karla

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/deworming.git
cd deworming
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
deworming/
├── app/
│   ├── globals.css       # Global styles and Tailwind configuration
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main application component
├── public/
│   └── favicon.ico
├── package.json
└── README.md
```

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## Support

If you find this tool helpful, consider supporting its development:

- Buy Me a Coffee: https://buymeacoffee.com/doshafrancc
- USDT (TRC20): `TC1xVYzpPdgkXS8ipXWMbURTz7uLGzBp4T`

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Built by Frank - Creator of [Lobocon](https://lobocon.co), a construction project management platform that helps you track if your projects will make money.

## Disclaimer

This tool is for informational purposes only. Please consult with a healthcare professional before starting any deworming regimen. The information provided is based on WHO guidelines but is not a substitute for professional medical advice.
