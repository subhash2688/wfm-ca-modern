import type { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your World Food Movement account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
