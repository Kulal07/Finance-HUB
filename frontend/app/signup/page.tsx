import Link from "next/link"
import { SignupForm } from "@/components/signup-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="ml-2 text-xl font-bold">Finance Hub</span>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold dark:text-white">Join Your Smart Finance Hub</h1>
            <p className="text-sm text-muted-foreground dark:text-white">
              Create Your Account and Take Charge of Your Financial Future.
            </p>
          </div>
          <div className="mt-8">
            <SignupForm />
          </div>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-medium text-primary underline underline-offset-4 hover:text-primary/90">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

