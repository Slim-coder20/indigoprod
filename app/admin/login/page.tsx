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
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-8">
        <Image src={logo} alt="IndigoProduction" className="h-10 w-auto" />
        <h1 className="mt-6 text-xl font-semibold text-foreground">
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
