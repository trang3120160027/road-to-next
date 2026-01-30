import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

const SignUpPage = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="w-full max-w-md animate-fade-in-from-top"
        content={<SignUpForm />}
        footer={
          <div>
            Already have an account?{" "}
            <Link href={signInPath()} className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default SignUpPage;
