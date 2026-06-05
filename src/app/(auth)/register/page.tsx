import type { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join the World Food Movement community.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
