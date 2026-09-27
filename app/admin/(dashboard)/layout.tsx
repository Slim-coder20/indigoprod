import Image from "next/image";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { logout } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import logo from "@/public/logo-indigo.png";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const user = await requireAdmin();

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="flex flex-col gap-6 border-b border-line bg-surface p-4 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:border-r md:border-b-0 md:p-6">
        <Link href="/admin" className="flex items-center">
          <Image src={logo} alt="IndigoProduction" className="h-8 w-auto" />
        </Link>

        <AdminNav />

        <div className="flex flex-col gap-3 border-t border-line pt-4 text-sm md:mt-auto">
          <p className="truncate text-subtle" title={user.email}>
            {user.email}
          </p>
          <Link href="/" className="text-muted hover:text-foreground">
            Voir le site ↗
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="font-medium text-highlight hover:text-foreground"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
