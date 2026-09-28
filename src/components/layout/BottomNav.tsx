import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Shield,
  LayoutGrid,
  FileText,
  User,
} from 'lucide-react';

interface BottomNavProps {
  isInsideFrame?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ isInsideFrame = false }) => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home', label: 'خانه', icon: Home },
    { id: 'safety', label: 'امنیت', icon: Shield },
    { id: 'services', label: 'خدمات', icon: LayoutGrid },
    { id: 'cases', label: 'پرونده‌ها', icon: FileText },
    { id: 'profile', label: 'پروفایل', icon: User },
  ] as const;

  return (
    <nav
      className={`${
        isInsideFrame ? 'relative w-full' : 'fixed bottom-0 left-0 right-0 z-40'
      } bg-[#090D1A]/95 backdrop-blur-xl border-t border-purple-500/15 px-3 py-1.5 shadow-2xl safe-area-bottom`}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 relative ${
                isActive ? 'text-purple-400 font-semibold' : 'text-[#8E95A9] hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute -top-1.5 w-7 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              )}
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-purple-600/20 text-purple-400 scale-105' : 'text-[#8E95A9]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
