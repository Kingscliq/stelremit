# StelRemit

StelRemit is a simple, beautifully designed remittance application built on the Stellar Testnet. It demonstrates the core flow of connecting a Freighter wallet, viewing a real-time XLM balance, and sending payments seamlessly via the `stellar-sdk` and `@stellar/freighter-api`.

**Level 1 Submission - Stellar x RiseIn Bootcamp**

## Features

- **Wallet Connection**: Prompt and connect the Freighter browser wallet.
- **Balance Viewing**: Queries the Horizon testnet to dynamically display the connected account's native XLM balance.
- **Transaction Submission**: Uses the `TransactionBuilder` to send Testnet XLM to any valid Stellar public key, authenticated right via the Freighter popup.
- **Real-Time Feedback**: Displays immediate error handling and outputs successful transaction hashes with a direct link to Stellar Expert explorer.
- **Beautiful UI**: Modern, responsive, dark-mode Tailwind v4 styling matching professional fintech standards.

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS v4
- `@stellar/stellar-sdk`
- `@stellar/freighter-api`

## Getting Started

First, ensure you have the [Freighter Browser Extension](https://www.freighter.app/) installed and set to the **Testnet** network. Make sure your account has some testnet XLM (use the laboratory faucet if needed).

To run the development server locally:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage Guide
1. **Connect**: Click "Connect Wallet" on the home page or navbar and approve the prompt in Freighter.
2. **View Balance**: Once connected, you will see your truncated address and your current XLM balance fetched from Horizon.
3. **Send XLM**: 
   - Enter a valid testnet destination address.
   - Enter an amount of XLM to send.
   - Click "Send".
4. **Sign**: Review and sign the transaction prompt in Freighter.
5. **Success**: The app will display the transaction hash and update your balance upon success!

## Screenshots
_Please add your local screenshots to the `public/` directory or README images folder here demonstrating:_
1. Wallet connected state
2. Balance displayed
3. Successful testnet transaction
4. The transaction result is shown to the user
