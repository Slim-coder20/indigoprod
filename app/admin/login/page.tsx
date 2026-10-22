import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminUser } from "@/lib/admin/auth";
import logo from "@/public/logo-indigo.png";

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  if (await getAdminUser()) redirect("/admin");

  const { next } = await searchParams;

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender blur-3xl"
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-lg shadow-violet/10">
        <Image src={logo} alt="IndigoProduction" className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-foreground">
          Espace administration
        </h1>
        <p className="mt-1 mb-6 text-sm text-muted">
          Connectez-vous pour gérer le contenu du site.
        </p>
        <LoginForm next={typeof next === "string" ? next : undefined} />
      </div>
    </main>
  );
}
