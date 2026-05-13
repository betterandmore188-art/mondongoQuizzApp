'use client';

import {useAdminAuth } from '@/app/context/adminAuth';
import AdminLogin from '@/app/components/admin-login';
import AdminPanel from '@/app/components/admin-panel';

export default function AdminPage() {
  const { isAuthenticated, isHydrated } = useAdminAuth();

  if (!isHydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-background to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? <AdminPanel /> : <AdminLogin />}
    </>
  );
}
