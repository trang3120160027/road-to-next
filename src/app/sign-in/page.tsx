import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";

const SignInPage = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-md animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex-1 flex justify-between">
            <div>
              No account yet?{" "}
              <Link href={signUpPath()} className="hover:underline">
                Sign Up
              </Link>
            </div>

            <div>
              <Link href={passwordForgotPath()} className="hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
