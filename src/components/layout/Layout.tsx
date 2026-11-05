import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatbotWidget } from '../chatbot/ChatbotWidget';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Layout;
