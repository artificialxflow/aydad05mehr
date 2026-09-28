import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeScreen } from './components/user/HomeScreen';
import { SafetyMapScreen } from './components/user/SafetyMapScreen';
import { FreelanceLawyersScreen } from './components/user/FreelanceLawyersScreen';
import { MyCasesScreen } from './components/user/MyCasesScreen';
import { ProfileAndContactsScreen } from './components/user/ProfileAndContactsScreen';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LawyerApp } from './components/lawyer/LawyerApp';
import { SOSModal } from './components/user/SOSModal';
import { AuthModal } from './components/auth/AuthModal';
import { NewProjectModal } from './components/user/NewProjectModal';
import { BookingConsultationModal } from './components/user/BookingConsultationModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { currentRole, activeTab, viewDeviceFrame } = useApp();

  // 1. If Admin role is selected, show the full Admin Management Console
  if (currentRole === 'admin') {
    return (
      <div className="min-h-screen bg-[#0B1020] text-white flex flex-col">
        <Header />
        <main className="flex-1">
          <AdminDashboard />
        </main>
      </div>
    );
  }

  // 2. If Lawyer role is selected, show the dedicated Freelance Lawyer Workspace
  if (currentRole === 'lawyer') {
    return (
      <div className="min-h-screen bg-[#0B1020] text-white flex flex-col">
        <Header />
        <main className="flex-1">
          <LawyerApp />
        </main>
      </div>
    );
  }

  // 3. Citizen / User Mobile & Desktop Interface
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'safety':
        return <SafetyMapScreen />;
      case 'services':
        return <FreelanceLawyersScreen />;
      case 'cases':
        return <MyCasesScreen />;
      case 'profile':
        return <ProfileAndContactsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white flex flex-col">
      <Header />

      {/* If device frame preview is enabled on large screens */}
      {viewDeviceFrame ? (
        <div className="flex-1 flex items-center justify-center p-4 lg:py-8 bg-slate-950/60">
          <div className="relative w-[400px] h-[860px] rounded-[52px] bg-[#0B1020] border-[10px] border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 ml-4" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#151D35]" />
            </div>

            {/* Scrollable Mobile Body with safe padding */}
            <div className="flex-1 overflow-y-auto pt-8 pb-24 scrollbar-none">
              {renderTabContent()}
            </div>

            {/* Fixed Mobile Bottom Nav inside frame */}
            <div className="relative z-40 w-full">
              <BottomNav isInsideFrame />
            </div>
          </div>
        </div>
      ) : (
        /* Responsive View (Native Mobile & Fluid Tablet/Desktop) */
        <div className="flex-1 w-full flex flex-col">
          <main className="flex-1 max-w-4xl mx-auto w-full pb-24 md:pb-28">
            {renderTabContent()}
          </main>
          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
      {/* Global Overlays & Modals */}
      <SOSModal />
      <AuthModal />
      <NewProjectModal />
      <BookingConsultationModal />
      <ToastContainer />
    </AppProvider>
  );
}
