"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function parseError(error: any): string {
    if (typeof error === 'string') return error;
    
    // Handle Zod validation errors
    if (error?.fieldErrors) {
      const errors: string[] = [];
      Object.entries(error.fieldErrors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          errors.push(`${fieldName}: ${messages[0]}`);
        }
      });
      if (errors.length > 0) return errors.join(', ');
    }
    
    if (error?.formErrors && Array.isArray(error.formErrors) && error.formErrors.length > 0) {
      return error.formErrors[0];
    }
    
    return 'An error occurred';
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();
    setIsLoading(false);
    
    if (!res.ok) {
      const errorMessage = parseError(data.error);
      toast.error("Registration failed", {
        description: errorMessage
      });
      return;
    }
    
    toast.success("Account created successfully", {
      description: "Redirecting to dashboard..."
    });
    
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-12">
        <Card className="w-full max-w-md border-slate-200 dark:border-slate-800 shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 bg-slate-900 dark:bg-slate-50 rounded-full flex items-center justify-center mb-2">
              <UserPlus className="w-6 h-6 text-slate-50 dark:text-slate-900" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Sign Up
            </CardTitle>
            <CardDescription className="text-base">
              Join us today and get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="transition-all"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="transition-all"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-500" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button 
              onClick={submit}
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 h-11 text-base font-medium"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
                  Already registered?
                </span>
              </div>
            </div>

            <div className="text-center">
              <a 
                href="/" 
                className="text-sm font-medium text-slate-900 dark:text-slate-50 hover:underline underline-offset-4"
              >
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}