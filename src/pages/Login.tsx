


//updated code
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import logo from "@/assets/logo.png";
import IngradientBG from "../assets/Ingradient-Background.webp";

type Step = "form" | "otp" | "forgot-password" | "reset-password";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<Step>("form"); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  // ---------------- LOGIN / SIGNUP ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

       // Phone validation (signup only)
if (!isLogin) {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    setError("Phone number must be exactly 10 digits");
    return;
  }
}

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }


    const url = isLogin
      ? `${API_BASE_URL}/api/auth/login`
      : `${API_BASE_URL}/api/auth/register`;

    const body = isLogin
      ? { email, password }
      : { username, email, password, phone };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // 🔹 LOGIN FLOW (admin + user)
      if (isLogin) {
        localStorage.setItem("userInfo", JSON.stringify(data));

        toast({
          title: "Login successful",
          description: "Welcome back!",
        });

        navigate(data.role === "admin" ? "/admin" : "/recipes");
        return;
      }

      // 🔹 SIGNUP FLOW → SHOW OTP
      toast({
        title: "OTP Sent",
        description: "Check your email to verify your account",
      });

      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    try {
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast({
        title: "Verified",
        description: "Account verified successfully",
      });

      navigate("/recipes");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ---------------- Forget Password ----------------
  const handleForgotPassword = async () => {
    try {
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast({
        title: "OTP Sent",
        description: "Check your email for the OTP to reset your password",
      });

      // setStep("forgot-password");
      setStep("reset-password");

    } catch (err: any) {
      setError(err.message);
    }
  };

  // ---------------- Reset Password ----------------
  const handleResetPassword = async () => {
    try {
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  email,
  otp: forgotOtp, // 🔥 THIS LINE FIXES YOUR ERROR
  newPassword,
})

      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast({
        title: "Password Reset",
        description: "Your password has been reset successfully",
      });

      setStep("form");
    } catch (err: any) {
      setError(err.message);
    }
  };

 

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-12">
       <div
                className="absolute inset-0  bg-[length:auto_100%] md:bg-[length:120%_100%] bg-top bg-no-repeat opacity-10 pointer-events-none"
               style={{ backgroundImage: `url(${IngradientBG})` }}
            />

        <Card className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl border-0">
          <CardHeader className="text-center space-y-2">
            <img src={logo} alt="EasyPans" className="h-12 w-28 mx-auto" />

            <CardTitle className="text-2xl font-semibold">
              {isLogin
                ? "Welcome back to EasyPans"
                : step === "otp"
                ? "Verify your email"
                : "Create your EasyPans account"}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Login to manage your meals effortlessly"
                : step === "otp"
                ? "Enter the OTP sent to your email"
                : "Sign up and start ordering smarter"}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* SIGNUP EXTRA FIELDS */}
              {!isLogin && step === "form" && (
                <>
                  <div>
                    <Label>Username</Label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      
                    />
                  </div>

                  <div>
                    <Label>Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* EMAIL */}
             {/* EMAIL (Login / Signup only) */}
{step !== "forgot-password" && step !== "reset-password" && (
  <div>
    <Label>Email <span className="text-red-500">*</span></Label>
    <Input
      type="email"
      value={email}
      disabled={step === "otp"}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
)}


      

              {step === "form" && (
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Forgot Password link (Login only) */}
                  {isLogin && (
                    <p
  className="text-sm text-emerald-600 cursor-pointer text-right mt-1"
  onClick={() => setStep("forgot-password")}
>
  Forgot Password?
</p>

                  )}
                </div>
              )}


              {/* OTP */}
              {step === "otp" && (
                <div>
                  <Label>Enter OTP</Label>
                  <Input
                    value={otp}
                    placeholder="6-digit OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              {step === "forgot-password" && (
  <>
    <div>
      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <Button type="button" className="w-full" onClick={handleForgotPassword}>
  Send OTP
</Button>
  </>
)}

{step === "reset-password" && (
  <>
    <div>
      <Label>OTP</Label>
      <Input
        value={forgotOtp}
        onChange={(e) => setForgotOtp(e.target.value)}
      />
    </div>
    <div>
      <Label>New Password</Label>
      <Input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>
    <Button type="button" className="w-full" onClick={handleResetPassword}>
      Reset Password
    </Button>
  </>
)}


              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* {step === "form" ? (
                <Button type="submit" className="w-full rounded-xl">
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full rounded-xl bg-emerald-600"
                >
                  Verify OTP
                </Button>
              )} */}

              {/* FORM SUBMIT (Login / Signup) */}
{step === "form" && (
  <Button type="submit" className="w-full rounded-xl">
    {isLogin ? "Login" : "Sign Up"}
  </Button>
)}

{/* SIGNUP OTP VERIFY */}
{step === "otp" && (
  <Button
    type="button"
    onClick={handleVerifyOtp}
    className="w-full rounded-xl bg-emerald-600"
  >
    Verify OTP
  </Button>
)}


                  {/* Google OAuth Button */}
                  <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-3 flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-5 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white transition-colors"
                  onClick={() =>
                    (window.location.href = `${API_BASE_URL}/api/auth/google`)
                  }
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  <span>Sign up with Google</span>
                </Button>
            </form>

            {step === "form" && (
              <div className="mt-6 text-center text-sm">
                {isLogin ? "New to EasyPans?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="font-medium text-emerald-600 hover:underline"
                >
                  {isLogin ? "Create account" : "Login"}
                </button>
              </div>
            )}

            
          </CardContent>
          
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
