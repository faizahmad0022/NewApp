import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/store/userSlice";

export function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); 
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-semibold text-foreground">NewsApp</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard/news-page" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/dashboard/tasla" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tasla
              </Link>
              <Link href="/dashboard/bussiness-news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Bussiness
              </Link>
              <Link href="/dashboard/source" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Source
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
