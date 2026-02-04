'use client';

import React, { useState, Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* 1. Desktop Sidebar (Always visible on lg+) */}
      <div className="hidden lg:block z-40 relative">
         <Suspense fallback={<div className="w-72 h-screen bg-gray-50/80 border-r border-gray-200" />}>
            <Sidebar />
         </Suspense>
      </div>

      {/* 2. Mobile Sidebar Drawer (Slides over content) */}
      {/* Invisible Overlay for click-away to close (No dimming) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Drawer with stronger shadow */}
      <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-[0_0_50px_rgba(0,0,0,0.15)] transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-3 left-3 z-50">
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
            </button>
        </div>
        
        {/* Reuse Sidebar Component */}
        <div className="h-full overflow-y-auto pt-14"> 
             <Suspense fallback={<div className="w-full h-full bg-gray-50/80" />}>
                <Sidebar isMobile={true} />
             </Suspense>
        </div>
      </div>


      {/* 3. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 bg-white lg:pl-72 transition-all duration-300">
        
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100 px-4 h-14 flex items-center justify-between">
          <span className="font-serif font-bold text-lg text-gray-900">Hola Spanish</span>
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full">
           <div className="max-w-screen-2xl mx-auto p-4 md:p-8 lg:p-10 w-full">
             {children}
           </div>
        </main>
      </div>
    </div>
  );
}
