<div align="center">

# 🛡️ Zero-Gap Voting Architecture
**A Formal Technical Proposal for the Modernization of the Indian Electronic Voting System**

[![React](https://img.shields.io/badge/React-18.x-blue?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-f97316?style=flat&logo=framer)](https://www.framer.com/motion/)

*An open technical blueprint proposing a dual-node, cryptographically secured electronic voting system that makes vote manipulation physically and mathematically impossible.*

</div>

---

## 📖 Overview

India conducts the largest democratic election on Earth, mobilizing over 960 million eligible voters. Despite decades of successful EVM deployment, persistent public skepticism remains. 

This repository contains the interactive visual representation and formal architectural blueprint for the **Zero-Gap Voting Architecture** — a next-generation, dual-node election system. By severing the connection between identity validation and ballot casting through an optical airgap, anchoring all vote records in immutable cryptographic ledgers, and backing every digital action with an immediate physical paper trail, this system eliminates the attack surface that critics and adversaries currently target.

## ✨ Core Architectural Protocols

This system is built upon four fundamental interference protocols that transition trust from software integrity to the laws of physics and mathematics:

1. **The Optical Airgap (Severing the Wire)**
   Node A (Online Identity) and Node B (Offline EVM) are completely physically isolated. They communicate via a single, time-sensitive, cryptographically signed optical QR code. No Wi-Fi, Bluetooth, or RF signals are used.
   
2. **Cryptographic Hash Ledgers (Immutable Memory)**
   Votes are recorded in an EEPROM ledger structured as a cryptographic hash chain. Modifying any historical entry breaks the entire chain, instantly locking the machine on reboot.
   
3. **Hardware Watchdog Timers (State Recovery)**
   An independent microcontroller monitors the main EVM software. If a crash or freeze occurs mid-vote, it physically cuts power, purges volatile RAM, and reboots the machine in under 30ms, preventing incomplete or ambiguous states.
   
4. **VVPAT Black Box Resolution (Physical Proof Layer)**
   The VVPAT prints a physical record of the vote *before* the digital commitment is made. The paper is the legally binding ground truth; the digital record is its mirror.

## 🛠️ Technology Stack

This interactive architectural blueprint is built using modern web technologies:

* **React 18** — Component-driven UI architecture
* **Vite** — High-performance build tooling
* **Tailwind CSS** — Custom utility-class styling with a custom `kesari`, `ashoka`, and `india-green` color palette
* **Framer Motion** — Fluid, physics-based micro-interactions and layout transitions
* **Lucide React** — Crisp, consistent SVG iconography

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/roshhellwett/projectzerogapvote.git
   cd projectzerogapvote
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is fully configured for seamless deployment across two major platforms:

* **GitHub Pages:** Handled automatically via GitHub Actions. Push to the `main` branch to trigger the `.github/workflows/deploy.yml` workflow. The Vite `base` configuration intelligently maps the relative paths.
* **Vercel:** Deploys automatically. The project includes a `vercel.json` rewrite configuration to ensure stable Single Page Application (SPA) routing.

## 📄 Proposal Author

**Roshan Kr Singh (@roshhellwett)**  
Submitted to the Election Commission of India, UIDAI, and MeitY (April 2026).

> **Open Source Proposal** — This document is released as a public blueprint. Anyone may freely use, adapt, or improve upon the ideas presented herein.
