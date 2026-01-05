// 'use client';
// import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { Zap, Mail, Lock, Chrome } from 'lucide-react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);


// const handleRequestOTP = async (email) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email);
//   if (error) alert(error.message);
//   else {
//     alert("تم إرسال رمز مكون من 6 أرقام إلى بريدك");
//     // هنا أظهر حقل إدخال الرمز للمستخدم
//     setShowOTPField(true); 
//   }
// };





// const handleVerifyOTP = async (email, otpCode) => {
//   const { error } = await supabase.auth.verifyOtp({
//     email,
//     token: otpCode,
//     type: 'recovery', // مهم جداً تحديد النوع كـ recovery
//   });

//   if (error) {
//     alert("الرمز غير صحيح أو انتهت صلاحيته: " + error.message);
//   } else {
//     // بمجرد النجاح، سوبابيس ستنشئ جلسة (Session) تلقائياً
//     // الآن يمكننا التوجه لصفحة التحديث مباشرة
//     window.location.href = '/auth/update-password';
//   }
// };
//   // دالة موحدة للتعامل مع الإيميل (إنشاء أو دخول)
//   const handleEmailAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (isSignUp) {
//       // --- عملية إنشاء حساب جديد ---
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//         },
//       });
//       if (error) {
//         alert("Sign up error: " + error.message);
//       } else {
//         alert("Please check your email for the confirmation link!");
//       }
//     } else {
//       // --- عملية تسجيل دخول لحساب موجود ---
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) {
//         alert("Login error: " + error.message);
//       } else {
//         window.location.href = '/dashboard';
//       }
//     }
//     setLoading(false);
//   };

//   const handleGoogleLogin = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-10 border border-slate-100">
        
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
//             <Zap size={32} className="fill-indigo-600" />
//           </div>
//           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//             {isSignUp ? "Create Account" : "Welcome Back"}
//           </h1>
//           <p className="text-slate-500 mt-2 font-medium">
//             {isSignUp ? "Join us to start creating deep links" : "Start creating smart deep links today"}
//           </p>
//         </div>

//         <button 
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all mb-6 shadow-sm"
//         >
//           <Chrome size={20} className="text-red-500" />
//           {isSignUp ? "Sign up with Google" : "Continue with Google"}
//         </button>

//         <div className="relative mb-8 text-center">
//           <hr className="border-slate-100" />
//           <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
//             OR
//           </span>
//         </div>

//         {/* تم تغيير الدالة هنا لتعمل بشكل ديناميكي */}
//         <form onSubmit={handleEmailAuth} className="space-y-5">
//           <div>
//             <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
//             <div className="relative">
//               <input 
//                 type="email" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium"
//                 placeholder="name@company.com"
//                 required
//               />
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
//             <div className="relative">
//               <input 
//                 type="password" 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium"
//                 placeholder="••••••••"
//                 required
//               />
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//             </div>
//           </div>

//           <button 
//             disabled={loading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200"
//           >
//             {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
//           </button>

//           <p 
//             onClick={() => setIsSignUp(!isSignUp)} 
//             className="cursor-pointer text-indigo-600 text-center mt-4 font-semibold hover:underline"
//           >
//             {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
//           </p>
//           <button onClick={() => handleForgotPassword(email)}>Reset Password</button>
//         </form>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Zap, Mail, Lock, Chrome, KeyRound, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState('auth'); // auth, forgot-password, verify-otp

  // --- 1. طلب رمز OTP لاستعادة كلمة المرور ---
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email first");
    
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
  alert("An 8-digit code has been sent to your email!"); // تغيير 6 إلى 8
  setStep('verify-otp');
}
  };

  // --- 2. التحقق من الرمز والتوجه لصفحة التحديث ---
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'recovery',
    });
    setLoading(false);

    if (error) {
      alert("Invalid code: " + error.message);
    } else {
      window.location.href = '/auth/update-password';
    }
  };

  // --- 3. تسجيل الدخول أو إنشاء الحساب العادي ---
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) alert("Sign up error: " + error.message);
      else alert("Check your email for the confirmation link!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Login error: " + error.message);
      else window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-10 border border-slate-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
            <Zap size={28} className="fill-indigo-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {step === 'verify-otp' ? "Verify Code" : step === 'forgot-password' ? "Reset Password" : (isSignUp ? "Create Account" : "Welcome Back")}
          </h1>
        </div>

        {/* --- STEP: VERIFY OTP --- */}
        {step === 'verify-otp' ? (
        <form onSubmit={handleVerifyOTP} className="space-y-6 text-center">
    {/* تم تعديل النص هنا ليقول 8 أرقام */}
    <p className="text-sm text-slate-500 font-medium">Enter the 8-digit code sent to {email}</p>
    
    <input 
      type="text" 
      maxLength="8" // تم التغيير من 6 إلى 8
      value={otpCode}
      onChange={(e) => setOtpCode(e.target.value)}
      // قمت بتقليل الـ tracking قليلاً لكي يتناسب حجم الـ 8 أرقام مع عرض الشاشة
      className="w-full text-center text-3xl tracking-[0.4em] font-bold py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all"
      placeholder="00000000" // 8 أصفار
      required
    />
    
    <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200">
      {loading ? 'Verifying...' : 'Confirm Code'}
    </button>
    
    <button type="button" onClick={() => setStep('auth')} className="flex items-center justify-center gap-2 text-slate-400 text-sm mx-auto hover:text-slate-600">
      <ArrowLeft size={16} /> Back to Login
    </button>
  </form>
        ) : step === 'forgot-password' ? (
          /* --- STEP: REQUEST OTP --- */
          <form onSubmit={handleRequestOTP} className="space-y-6">
             <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200">
              {loading ? 'Sending...' : 'Send Recovery Code'}
            </button>
            <button type="button" onClick={() => setStep('auth')} className="w-full text-center text-slate-400 text-sm hover:text-slate-600">
              Cancel
            </button>
          </form>
        ) : (
          /* --- STEP: MAIN AUTH (Login/SignUp) --- */
          <>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all mb-6 shadow-sm">
              <Chrome size={20} className="text-red-500" />
              {isSignUp ? "Sign up with Google" : "Continue with Google"}
            </button>

            <div className="relative mb-8 text-center">
              <hr className="border-slate-100" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium" placeholder="Email Address" required />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>

              <div className="relative">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium" placeholder="Password" required />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>

              {!isSignUp && (
                <div className="text-right">
                  <span onClick={() => setStep('forgot-password')} className="text-sm font-semibold text-indigo-600 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
              )}

              <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 mt-2">
                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>

              <p onClick={() => setIsSignUp(!isSignUp)} className="cursor-pointer text-slate-500 text-center mt-6 font-medium text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"} <span className="text-indigo-600 font-bold ml-1 hover:underline">{isSignUp ? "Sign In" : "Sign Up"}</span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}