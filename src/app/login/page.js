
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Zap, Mail, Lock, Chrome, KeyRound, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'
import Link from 'next/link';
export default function LoginPage() {
  return (
    <Suspense fallback={  <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-15 w-15 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
      {/* <h2 className="mt-6 text-xl font-bold text-slate-800">Opening ...</h2> */}
    </div>}>
      <LoginPage2 /> 
    </Suspense>
  )
}
function LoginPage2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState('auth'); // auth, forgot-password, verify-otp
 const searchParams = useSearchParams();

 // 'asc'
useEffect(()=>{
 const sort = searchParams.get('signup');
 if(sort === 'true'){
  setIsSignUp(true);
 }
},[])


  // --- 1. طلب رمز OTP لاستعادة كلمة المرور ---
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email first");
    
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    } else {
      Swal.fire({
        title: "Good !",
        text: "An 8-digit code has been sent to your email!",
        icon: "success"
      });
      setStep('verify-otp');
    }
  };

  // --- 2. التحقق من الرمز والتوجه لصفحة التحديث ---



  // دالة إنشاء الحساب (Sign Up)
// --- 3. تسجيل الدخول أو إنشاء الحساب ---
// --- 3. تسجيل الحساب (Sign Up) ---
// --- 1. تسجيل الحساب أو تسجيل الدخول ---
const handleEmailAuth = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (isSignUp) {
    // التأكد أولاً من جدول البروفايل (UX)
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email.trim())
      .single();

    if (existingUser) {
      setLoading(false);
      return Swal.fire({ 
        icon: "error", 
        title: "Account exists", 
        text: "This email is already registered. Please sign in." 
      });
    }

    // إنشاء الحساب (إرسال OTP)
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        // نضع التوجيه كاحتياط ولكننا سنعتمد على OTP
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      Swal.fire({ icon: "error", title: "Sign up error", text: error.message });
    } else {
      Swal.fire({
        title: "Verify your email",
        text: "Please enter the verification code sent to your inbox.",
        icon: "info"
      });
      setStep('verify-otp'); 
    }
  } else {
    // تسجيل دخول عادي بكلمة المرور
    const { error } = await supabase.auth.signInWithPassword({ 
      email: email.trim(), 
      password 
    });
    
    if (error) {
      Swal.fire({ icon: "error", title: "Login error", text: error.message });
    } else {
      window.location.href = '/dashboard';
    }
  }
  setLoading(false);
};

// --- 2. التحقق من الكود (Verify OTP) ---
const handleVerifyOTP = async (e) => {
  e.preventDefault();
  
  // تنظيف الكود من أي مسافات زائدة قد يضعها المستخدم بالخطأ
  const cleanOtp = otpCode.trim();
  console.log('Verifying code:', cleanOtp);
  
  setLoading(true);

  // المنطق: نحاول بـ signup أولاً، وإذا ظهر خطأ الـ database أو unexpected ننتقل لـ email
  let verifyType = isSignUp ? 'signup' : 'recovery';

  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token: cleanOtp,
    type: verifyType,
  });

  if (error) {
    // إذا كان الخطأ متعلقاً بالفشل في التأكيد (غالباً بسبب تضارب الإعدادات أو الـ Trigger)
    // نجرب النوع العام 'email' كحل أخير ومضمون
    if (isSignUp) {
      console.log("Retrying with type 'email'...");
      const secondAttempt = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: cleanOtp,
        type: 'email',
      });

      if (!secondAttempt.error) {
        window.location.href = '/dashboard';
        return;
      }
      
      setLoading(false);
      return Swal.fire({ 
        icon: "error", 
        title: "Verification Failed", 
        text: secondAttempt.error.message 
      });
    }

    setLoading(false);
    Swal.fire({ icon: "error", title: "Error", text: error.message });
  } else {
    // في حال النجاح
    Swal.fire({ icon: "success", title: "Success!", timer: 1000, showConfirmButton: false });
    window.location.href = isSignUp ? '/dashboard' : '/auth/update-password';
  }
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
          <div className="inline-flex items-center justify-center w-14 h-14  mb-4">
              <img src='log.webp' className=' w-[50px] rounded-full ' alt='Direop Logo'/>
                              <span className="text-[23px] font-bold tracking-[2px]  text-slate-900 dark:text-white translate-x-[-7px]">ireop</span>

          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {step === 'verify-otp' ? "Verify Code" : step === 'forgot-password' ? "Reset Password" : (isSignUp ? "Create Account" : "Welcome Back")}
          </h1>
        </div>

        {step === 'verify-otp' ? (
          <form onSubmit={handleVerifyOTP} className="space-y-6 text-center">
            <p className="text-sm text-slate-500 font-medium">Enter the 8-digit code sent to {email}</p>
            <input 
              type="text" 
              maxLength="8"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full text-center text-3xl tracking-[0.4em] font-bold py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all"
              placeholder="00000000"
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
          <>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all mb-6 shadow-sm">
              <img src='google.png' alt="Google" className="w-5 h-5" />
              {isSignUp ? "Sign up with Google" : "Sign in with Google"}
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
          {isSignUp ?     <p className="mt-4 text-[12px] text-center text-slate-400 leading-relaxed px-4">
    By creating an account, you agree to our 
    <Link href="/terms" className="text-indigo-500 hover:underline mx-1 font-semibold">Terms of Service</Link> 
    and 
    <Link href="/privacy" className="text-indigo-500 hover:underline mx-1 font-semibold">Privacy Policy</Link>.
  </p> : null}

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








// <div id="paypal-button-container-P-6AD80152G40923511NFR6OVQ"></div>
// <script src="https://www.paypal.com/sdk/js?client-id=AcAKIARVYtE8l6w9gtcDOBxhSNMZOM_gq52XGtQx7DmAEkD-TCFAx-4mmCNKw2sFpH6hQHKVFOKPqQnO&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
// <script>
//   paypal.Buttons({
//       style: {
//           shape: 'rect',
//           color: 'gold',
//           layout: 'vertical',
//           label: 'subscribe'
//       },
//       createSubscription: function(data, actions) {
//         return actions.subscription.create({
//           /* Creates the subscription */
//           plan_id: 'P-6AD80152G40923511NFR6OVQ'
//         });
//       },
//       onApprove: function(data, actions) {
//         alert(data.subscriptionID); // You can add optional success message for the subscriber here
//       }
//   }).render('#paypal-button-container-P-6AD80152G40923511NFR6OVQ'); // Renders the PayPal button
// </script>