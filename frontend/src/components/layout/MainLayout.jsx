import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleOpenUploadModal = () => {
    window.dispatchEvent(new CustomEvent('open-upload-modal'));
  };

  return (
    <div className="min-h-screen bg-industrial-bgPrimary text-industrial-textMain flex flex-col">
      {/* Top Fixed Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onOpenUploadModal={handleOpenUploadModal}
      />

      <div className="flex flex-1">
        {/* Left Collapsible Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
