import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";
import { CardCompact } from "@/components/card-compact";
import { PasswordResetForm } from "@/features/password/components/password-reset-form";
import { signInPath } from "@/paths";
import { searchParamsCache } from "@/utils/search-params";

type PasswordResetPageProps = {
  searchParams: Promise<SearchParams>;
};

const PasswordResetPage = async ({ searchParams }: PasswordResetPageProps) => {
  const { token } = searchParamsCache.parse(await searchParams);

  if (!token) {
    redirect(signInPath());
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <CardCompact
        title="Reset Password"
        description="Enter your new password"
        className="w-full max-w-md animate-fade-in-from-top"
        content={<PasswordResetForm token={token} />}
      />
    </div>
  );
};

export default PasswordResetPage;
