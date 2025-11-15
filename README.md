# HackVeda - National Level Hackathon Website

A modern, interactive website for HackVeda, a national-level hackathon organized by IILM University in collaboration with IBM. Built with Next.js, React, TypeScript, and featuring stunning animations and interactive components.

## 🚀 Features

- **Interactive Home Page** with animated Orb component
- **Timeline Section** with animated table layout
- **About Section** with interactive cards and particle effects
- **Themes & Prerequisites** sections with detailed course information
- **Rounds Section** displaying hackathon phases
- **Contact Section** with team information
- **Responsive Design** optimized for all devices
- **Smooth Animations** using Framer Motion and GSAP
- **Modern UI/UX** with custom components and effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## 🛠️ Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/ArtistPrince/HackVeda.git
cd HackVeda
```

### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- Next.js 14
- React 18
- TypeScript
- Framer Motion
- GSAP
- Tailwind CSS
- And other required packages

### 3. Environment Setup

Currently, no environment variables are required. If you need to add any in the future, create a `.env.local` file in the root directory.

## 🎯 Running the Project

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

Open your browser and navigate to the URL above. The page will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Linting

To check for code quality issues:

```bash
npm run lint
```

## 📁 Project Structure

```
hackveda/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   └── ui/               # UI components
│       ├── sections/     # Page sections
│       │   ├── home-section.tsx
│       │   ├── about-section.tsx
│       │   ├── timeline-section.tsx
│       │   ├── themes-section.tsx
│       │   ├── prerequisites-section.tsx
│       │   ├── rounds-section.tsx
│       │   ├── contact-section.tsx
│       │   ├── navigation.tsx
│       │   └── footer.tsx
│       ├── Orb.tsx        # Interactive Orb component
│       ├── AnimatedList.tsx
│       └── ...            # Other UI components
├── lib/                   # Utility functions
│   └── utils.ts
├── public/                # Static assets
│   └── partners/         # Partner logos
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── README.md            # This file
```

## 🎨 Key Technologies

- **Next.js 14** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **GSAP** - Professional animation library
- **OGL** - Minimal WebGL library for Orb component

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
Contains TypeScript compiler options and path aliases.

### Tailwind CSS (`tailwind.config.ts`)
Configuration for Tailwind CSS including custom colors, fonts, and animations.

### Next.js (`next.config.js`)
Next.js configuration including React strict mode.

## 🎨 Customization

### Colors
The project uses a custom color palette defined in Tailwind config:
- Primary Orange: `#E16D3C`
- Beige/Cream: `#E8DDBF`
- Dark Blue: `#2C3E50`
- Dark Background: `#1A1A1A`

### Components
All reusable components are located in `components/ui/`. You can customize them as needed.

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors
If you encounter module not found errors:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
If you encounter build errors:

1. Clear the `.next` folder:
   ```bash
   rm -rf .next
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

## 📝 Development Guidelines

1. **Code Style**: Follow TypeScript and React best practices
2. **Components**: Keep components modular and reusable
3. **Styling**: Use Tailwind CSS classes for styling
4. **Animations**: Use Framer Motion for component animations
5. **Type Safety**: Always define proper TypeScript types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact & Support

For questions or support, please contact:
- **Email**: priyansh.singh.csibm26@iilm.edu
- **GitHub**: [ArtistPrince](https://github.com/ArtistPrince)

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- IILM University for organizing HackVeda
- IBM-AWS for collaboration and support
---

**Happy Coding! 🚀**

