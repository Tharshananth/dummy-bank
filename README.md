# SecureBank - Dummy Banking Website

A modern, responsive, and fully-functional dummy banking website built with React, TypeScript, and Tailwind CSS. This project is strictly for **educational and demonstration purposes only** (not a real bank).

## Features

### Pages & Modules

#### 1. Home / Login Page
- Professional bank branding with custom logo
- Username and password authentication
- Form validation
- "Forgot password" link (demo)
- Secure login with credentials:
  - **Username:** demo@bank.com
  - **Password:** demo123

#### 2. Dashboard
- Personalized welcome message
- Real-time account balance display (with show/hide toggle)
- Digital gold holdings overview
- Quick action buttons for all services:
  - Bill Payment
  - UPI Transfer
  - Digital Gold
  - Stock Trading
  - Profile Update
  - Autofill Form
- Recent transactions history with status indicators
- Responsive grid layout

#### 3. Bill Payment Module
- Service categories:
  - Electricity (BESCOM, MSEDCL, TNEB, KESCO)
  - Water (BWSSB, Mumbai Water, Delhi Jal Board, Kolkata Water)
  - Mobile Recharge (Airtel, Jio, VI, BSNL)
  - Internet (ACT Fibernet, Airtel Xstream, Jio Fiber, BSNL)
- Provider selection
- Consumer ID / Mobile number input
- Amount entry
- Confirmation page with transaction details
- Balance validation

#### 4. UPI Transfer Module
- Multiple payment methods:
  - UPI ID (with format validation)
  - Mobile number (10-digit validation)
  - QR Code (simulated scanner)
- Amount input
- Optional message/note
- UPI ID format validation (user@bank)
- Confirmation modal
- Success redirect

#### 5. Digital Gold Module
- Buy/Sell functionality
- Live dummy gold price (₹6,500/gram)
- Current holdings display
- Real-time value calculation
- Portfolio value tracking
- Quantity selector with decimal support
- Transaction confirmation
- Balance updates after purchase/sale

#### 6. Stock Trading Module
- Stock marketplace with real prices:
  - TCS, Infosys, Reliance, HDFC, Wipro, ITC
- Live price display with changes
- Buy/Sell toggle
- Stock search functionality
- Portfolio management:
  - Holdings tracking
  - Average price calculation
  - Profit/Loss display
  - Current value
- Quantity selector (whole shares only)
- Real-time portfolio value calculation
- Transaction confirmation

#### 7. Profile Update Module
- Editable fields:
  - Full Name
  - Email Address
  - Mobile Number
  - Address
  - Date of Birth
- Profile photo upload with preview
- Form validation (email, mobile)
- Success confirmation
- Account information display

#### 8. Generic Autofill Form Module
- Standard form fields:
  - Name
  - Email
  - Phone
  - Address
  - Date of Birth
- One-click "Autofill Using Profile Data" button
- Form submission with success animation
- Auto-reset after submission

#### 9. Transaction Success Page
- Transaction confirmation with:
  - Transaction ID
  - Date & time stamp
  - Amount
  - From/To details
  - Transaction type
  - Status badge
- Success animation
- Download receipt option (simulated)
- "Back to Dashboard" button

#### 10. Error Handling
- Invalid login credentials
- Insufficient balance alerts
- Invalid UPI ID format
- Empty required fields
- Mobile number validation
- Email format validation
- Stock quantity validation
- Network error simulation

## Technical Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Build Tool:** Vite
- **State Management:** React Context API
- **Data Persistence:** LocalStorage

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   └── SuccessAnimation.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── BillPayment.tsx
│   ├── UPITransfer.tsx
│   ├── DigitalGold.tsx
│   ├── StockTrading.tsx
│   ├── Profile.tsx
│   ├── AutofillForm.tsx
│   └── TransactionSuccess.tsx
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Utility functions
│   ├── dummyData.ts
│   └── localStorage.ts
├── App.tsx            # Main app component with routing
├── main.tsx          # Entry point
└── index.css         # Global styles and animations
```

## Design Features

- Modern banking-inspired UI with blue color scheme
- Responsive design for mobile, tablet, and desktop
- Smooth page transitions and animations
- Hover effects on interactive elements
- Professional gradient backgrounds
- Custom success animations
- Consistent shadow and border radius
- Icon-based navigation
- Clean typography with proper hierarchy

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps to Run Locally

1. Clone the repository or download the project files

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

5. Login with demo credentials:
   - **Username:** demo@bank.com
   - **Password:** demo123

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Run Production Build Locally

```bash
npm run preview
```

## Features Implemented

### Authentication
- Login page with validation
- Protected routes
- Session persistence via LocalStorage
- Logout functionality

### Data Management
- LocalStorage for data persistence
- Dummy JSON data for:
  - User profiles
  - Transactions
  - Stock prices
  - Gold prices
- Real-time balance updates
- Transaction history

### Validation
- All form inputs validated
- UPI ID format check (user@bank)
- Mobile number validation (10 digits)
- Email format validation
- Insufficient balance checks
- Empty field validation
- Numeric input validation

### UI/UX
- Responsive across all devices
- Smooth animations and transitions
- Success and error alerts
- Confirmation modals
- Loading states
- Icon-based navigation
- Professional banking theme

## Demo Features

- **No Backend Required:** Fully functional frontend simulation
- **LocalStorage Persistence:** Data persists across sessions
- **Dummy API Simulation:** Uses setTimeout for realistic delays
- **Real-time Updates:** Balance and portfolio update immediately
- **Transaction History:** All transactions logged and displayed

## Usage Guide

### Making a Bill Payment
1. Navigate to Bill Payment from dashboard
2. Select service type (Electricity, Water, Mobile, Internet)
3. Choose provider
4. Enter Consumer ID/Mobile number
5. Enter amount
6. Confirm and pay

### UPI Transfer
1. Go to UPI Transfer
2. Select payment method (UPI ID, Mobile, or QR)
3. Enter recipient details
4. Enter amount
5. Add optional note
6. Confirm transfer

### Digital Gold Trading
1. Navigate to Digital Gold
2. Toggle between Buy/Sell
3. Enter quantity in grams
4. Review total amount
5. Confirm transaction

### Stock Trading
1. Go to Stock Trading
2. Search for stock
3. Select stock from list
4. Choose Buy or Sell
5. Enter number of shares
6. Confirm trade

### Updating Profile
1. Navigate to Profile
2. Edit any field
3. Upload profile photo (optional)
4. Save changes

### Using Autofill Form
1. Go to Autofill Form
2. Click "Autofill Using Profile Data"
3. Review pre-filled information
4. Submit form

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Important Notes

- This is a **dummy banking website** for educational purposes only
- Not connected to any real banking systems
- No real money transactions
- All data is stored locally in browser
- Demo credentials are provided on login page

## Security Features (Demo)

- Password input masking
- Form validation
- Protected routes
- Session management
- Balance verification before transactions

## Future Enhancements (Ideas)

- Voice-based UPI
- Smart fraud detection
- Expense prediction with AI
- Transaction export (PDF/CSV)
- Dark mode
- Multi-language support
- Transaction filters and search
- Bill reminders
- Savings goals tracker

## License

This project is for educational purposes only. Free to use for learning and demonstration.

## Disclaimer

**This is NOT a real banking application. Do not enter real personal information, credentials, or banking details. This is a frontend prototype for educational and demonstration purposes only.**

---

Built with React + TypeScript + Tailwind CSS
