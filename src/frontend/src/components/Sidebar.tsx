import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Mail, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/subscribers", label: "Subscribers", icon: Users, exact: false },
  { to: "/campaigns", label: "Campaigns", icon: Mail, exact: false },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  function isActive(to: string, exact: boolean) {
    return exact ? currentPath === to : currentPath.startsWith(to);
  }

  return (
    <aside className="flex flex-col h-full w-64 bg-sidebar">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sidebar-accent">
            <Leaf className="w-4 h-4 text-sidebar-accent-foreground" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-sidebar-foreground">
            MailForest
          </span>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-7 w-7 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" data-ocid="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, exact }) => {
          const active = isActive(to, exact);
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              data-ocid={`nav-${label.toLowerCase()}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border text-xs text-sidebar-foreground/40">
        © {new Date().getFullYear()}{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sidebar-foreground/70 transition-smooth"
        >
          caffeine.ai
        </a>
      </div>
    </aside>
  );
}
