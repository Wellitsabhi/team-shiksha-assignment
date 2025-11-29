import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "../lib/jwt";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";

export default async function NotFound() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  let isAuthenticated = false;

  if (token) {
    try {
      const payload = await verifyToken(token);
      if (payload && (payload as any).id) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-12">
      <Card className="w-full max-w-2xl border-slate-200 dark:border-slate-800 shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-4">
          <div className="space-y-2">
            <CardTitle className="text-5xl font-bold tracking-tight">
              404
            </CardTitle>
            <CardDescription className="text-xl font-medium text-slate-900 dark:text-slate-100">
              Page Not Found
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-base">
            The page you are looking for does not exist.
          </p>

          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                You are signed in. Go to your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Sign in to continue or return to the homepage.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900"
                >
                  <Link href="/">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <Link href="/signup">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create an Account
                  </Link>
                </Button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
