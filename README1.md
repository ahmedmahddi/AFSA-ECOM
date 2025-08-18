# AFSA - Multi-Tenant E-commerce Platform

A modern, scalable multi-tenant e-commerce platform built with Next.js, Payload CMS, and TypeScript. AFSA enables multiple vendors to create their own branded stores and sell digital products through a unified marketplace.

## 🚀 Features

### Core Platform
- **Multi-Tenant Architecture**: Each vendor gets their own subdomain (e.g., `vendor.afsa.com`)
- **Headless CMS**: Powered by Payload CMS for flexible content management
- **Type-Safe APIs**: Full-stack type safety with tRPC
- **Modern UI**: Responsive design with Radix UI and Tailwind CSS
- **Real-time Updates**: Optimistic updates with TanStack Query

### Vendor Features
- **Store Management**: Custom branding with logos and store names
- **Product Management**: Rich product descriptions with categories and tags
- **Pricing Control**: Flexible pricing with refund policy options
- **Stripe Integration**: Individual Stripe accounts per vendor

### Customer Features
- **Product Discovery**: Browse by categories with hierarchical subcategories
- **Advanced Filtering**: Filter by price range, categories, and tags
- **Search & Sort**: Multiple sorting options (curated, trending, hot & new)
- **Shopping Cart**: Add products and proceed to checkout
- **Responsive Design**: Optimized for desktop and mobile

### Categories Supported
- **Business & Money**: Accounting, Entrepreneurship, Investing, Real Estate
- **Software Development**: Web, Mobile, Game Development, DevOps
- **Creative**: Design, Photography, Music, Drawing & Painting
- **Education**: Online Courses, Tutoring, Language Learning
- **Self Improvement**: Productivity, Personal Development, Mindfulness
- **Writing & Publishing**: Fiction, Non-Fiction, Blogging, Copywriting

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod validation

### Backend
- **CMS**: Payload CMS 3.x
- **Database**: MongoDB with Mongoose
- **API**: tRPC for type-safe APIs
- **Authentication**: Payload Auth with JWT
- **File Storage**: Configurable storage adapter

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript with strict mode
- **Code Quality**: Prettier (implied by clean codebase)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (app)/                   # Main application routes
│   │   ├── (auth)/              # Authentication pages
│   │   ├── (home)/              # Public marketplace
│   │   ├── (tenants)/           # Tenant-specific routes
│   │   └── api/                 # API routes
│   └── (payload)/               # Payload CMS admin
├── collections/                  # Payload CMS collections
│   ├── Users.ts                 # User management
│   ├── Products.ts              # Product catalog
│   ├── Categories.ts            # Category hierarchy
│   ├── Tenants.ts               # Multi-tenant stores
│   ├── Tags.ts                  # Product tags
│   └── Media.ts                 # File uploads
├── modules/                      # Feature modules
│   ├── auth/                    # Authentication logic
│   ├── products/                # Product management
│   ├── categories/              # Category management
│   ├── tenants/                 # Tenant management
│   ├── checkout/                # Shopping cart & checkout
│   └── home/                    # Homepage features
├── trpc/                        # tRPC configuration
│   ├── routers/                 # API route definitions
│   ├── client.tsx               # Client-side setup
│   └── server.ts                # Server-side setup
├── components/                   # Reusable UI components
│   └── ui/                      # shadcn/ui components
├── lib/                         # Utility functions
├── constants.ts                 # Application constants
└── payload.config.ts            # Payload CMS configuration
```

### Module Architecture
Each feature module follows a consistent structure:
```
modules/[feature]/
├── hooks/                       # React hooks
├── server/                      # tRPC procedures
├── ui/
│   ├── components/              # Feature-specific components
│   └── views/                   # Page-level components
├── schemas.ts                   # Zod validation schemas
├── types.ts                     # TypeScript types
└── search-params.ts             # URL search params handling
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- MongoDB database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd afsa
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   PAYLOAD_SECRET=your-secret-key
   DATABASE_URI=mongodb://localhost:27017/afsa
   # Add other required environment variables
   ```

4. **Database Setup**
   ```bash
   # Fresh database with seed data
   bun run db:reset
   
   # Or run individually
   bun run db:fresh    # Reset database
   bun run db:seed     # Seed initial data
   ```

5. **Start Development Server**
   ```bash
   bun run dev
   ```

6. **Access the Application**
   - **Marketplace**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **Default Admin**: admin@demo.com / demo

### Available Scripts

```bash
bun run dev              # Start development server
bun run build            # Build for production
bun run start            # Start production server
bun run lint             # Run ESLint
bun run generate:types   # Generate Payload types
bun run db:fresh         # Reset database
bun run db:seed          # Seed initial data
bun run db:reset         # Fresh database + seed
```

## 🏗 Architecture Overview

### Multi-Tenancy
The platform uses Payload's multi-tenant plugin to isolate data between vendors:
- Each vendor has their own `Tenant` record
- Products are associated with specific tenants
- Users can belong to multiple tenants with different roles
- Super-admins have access to all tenants

### Authentication & Authorization
- **JWT-based authentication** via Payload CMS
- **Role-based access control**: `super-admin`, `user`
- **Tenant-specific permissions** for product management
- **Secure cookie handling** for session management

### API Design
- **tRPC routers** for each feature domain
- **Type-safe** client-server communication
- **Optimistic updates** for better UX
- **Error handling** with proper HTTP status codes

### Data Models

#### Users
- Email, username, password
- Role-based permissions
- Multi-tenant associations

#### Products
- Name, description, price (in TND)
- Category and tag relationships
- Image uploads
- Refund policy options
- Tenant association

#### Categories
- Hierarchical structure (parent/subcategories)
- Color coding for UI
- Slug-based routing

#### Tenants
- Store name and slug
- Custom branding (logo)
- Stripe account integration
- Store-specific settings

## 🔧 Configuration

### Payload CMS Configuration
The main configuration is in `src/payload.config.ts`:
- **Collections**: Users, Products, Categories, Tenants, Tags, Media
- **Multi-tenant plugin** with product isolation
- **Lexical editor** for rich text content
- **MongoDB adapter** for data persistence

### tRPC Setup
API routes are organized by feature:
- `auth`: Authentication and session management
- `products`: Product CRUD and filtering
- `categories`: Category management
- `tenants`: Tenant operations
- `checkout`: Shopping cart and checkout

## 🎨 UI/UX Design

### Design System
- **Radix UI primitives** for accessibility
- **shadcn/ui components** for consistent styling
- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach

### Key Components
- **Product Cards**: Consistent product display
- **Filter System**: Advanced filtering with price ranges
- **Category Navigation**: Hierarchical category browsing
- **Shopping Cart**: Persistent cart state
- **Authentication Forms**: Sign-up/sign-in with validation

## 🚧 Development Status

### ✅ Completed Features (65-75%)
- Core multi-tenant infrastructure
- Product catalog with filtering
- User authentication and registration
- Category management
- Shopping cart functionality
- Admin panel integration
- Responsive UI components

### 🚧 In Progress
- Stripe payment integration
- Tenant dashboard for vendors
- Order management system
- Email notifications

### 📋 Roadmap
- [ ] Complete payment processing
- [ ] Vendor analytics dashboard
- [ ] Order tracking and fulfillment
- [ ] Product reviews and ratings
- [ ] Advanced search with Elasticsearch
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced reporting tools

## 🤝 Contributing

### Development Guidelines
1. **Follow the module architecture** for new features
2. **Use TypeScript strictly** - no `any` types
3. **Write tRPC procedures** for all API endpoints
4. **Create reusable components** in the UI system
5. **Add proper error handling** and validation

### Code Style
- **ESLint configuration** enforces code quality
- **Consistent naming conventions** (camelCase, PascalCase)
- **Modular architecture** with clear separation of concerns
- **Type-safe development** throughout the stack

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions:
- Check the documentation in each module
- Review the Payload CMS documentation
- Consult the tRPC and Next.js documentation

---

**Built with ❤️ using modern web technologies**