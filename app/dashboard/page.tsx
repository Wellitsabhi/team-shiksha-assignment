"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, LogOut } from "lucide-react";
import { toast, Toaster } from "sonner";

type User = { id: string; email: string; name?: string };

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/user");
      if (!res.ok) {
        router.push("/");
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setName(data.user.name || "");
      setEmail(data.user.email || "");
    }
    load();
  }, [router]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });
    const data = await res.json();
    setIsSaving(false);
    
    if (!res.ok) {
      const errorMessage = parseError(data.error);
      toast.error("Update failed", {
        description: errorMessage
      });
      return;
    }
    setUser(data.user);
    toast.success("Changes saved successfully", {
      description: "Your profile has been updated"
    });
  }

  async function logout() {
    toast.promise(
      fetch("/api/logout", { method: "POST" }).then(() => {
        router.push("/");
      }),
      {
        loading: "Signing out...",
        success: "Signed out successfully",
        error: "Failed to sign out"
      }
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
          <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
          <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster  />
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your account settings
            </p>
          </div>

          <Card className="border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                Account Information
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-base">
                <Mail className="w-4 h-4" />
                Signed in as <span className="font-medium text-slate-900 dark:text-slate-100">{user.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={save}
                    disabled={isSaving}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="flex-1 sm:flex-none border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}