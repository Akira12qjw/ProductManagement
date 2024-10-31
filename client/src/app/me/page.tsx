import envConfig from "@/config";
import { cookies } from "next/headers";
import Profile from "./profile";
import accountApiRequest from "@/apiRequests/account";
import ProfileForm from "./profile-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hồ sơ người dùng",
};

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(sessionToken);
  const result = await accountApiRequest.me(sessionToken?.value ?? "");
  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm profile={result.payload.data} />
    </div>
  );
}
