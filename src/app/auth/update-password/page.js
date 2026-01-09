'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);
useEffect(() => {
  const checkUser = async () => {
    // getUser أكثر أماناً لأنها تتحقق من السيرفر
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setHasSession(true);
    } else {
      // انتظر قليلاً فقد تكون الجلسة في طور التحميل
      setTimeout(async () => {
         const { data: { user: retryUser } } = await supabase.auth.getUser();
         if (retryUser) setHasSession(true);
         else    Swal.fire({
              icon: "error",
              title: 'Error',
              text: "Session not found. Please try requesting a new link.",
            })
      }, 1000);
    }
  };
  checkUser();
}, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      // alert("Error: " + error.message);
        Swal.fire({
              icon: "error",
              title: error.message,
            });
    } else {
          Swal.fire({
              title: "Good !",
              text: "Password updated! You can now login.",
              icon: "success"
            });
      // alert("Password updated! You can now login.");
      window.location.href = '/login';
    }
    setLoading(false);
  };

  if (!hasSession) return <p className="text-center p-10">Verifying link... Please wait.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">New Password</h2>
        <input 
          type="password" 
          placeholder="Min 6 characters" 
          className="w-full p-4 border rounded-xl mb-4 outline-indigo-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} 
          required
        />
        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Set New Password'}
        </button>
      </form>
    </div>
  );
}