import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Custom SVG icons to match the design
const SpacesIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
    <path d="M2 17L12 22L22 17"/>
    <path d="M2 12L12 17L22 12"/>
  </svg>
);

const DashboardIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const SessionsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const FractalsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L13.09 6.26L17 4L14.74 8.09L19 9L14.74 9.91L17 14L13.09 11.74L12 16L10.91 11.74L7 14L9.26 9.91L5 9L9.26 8.09L7 4L10.91 6.26L12 2Z"/>
  </svg>
);

const FapsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const LeaderboardIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-3h2v12h-2V9z"/>
  </svg>
);

const navigationItems = [
  { 
    title: "Spaces", 
    url: "/spaces", 
    icon: SpacesIcon 
  },
  { 
    title: "Dashboard", 
    url: "/", 
    icon: DashboardIcon 
  },
  { 
    title: "Sessions", 
    url: "/sessions", 
    icon: SessionsIcon 
  },
  { 
    title: "Fractals", 
    url: "/fractals", 
    icon: FractalsIcon 
  },
  { 
    title: "Faps", 
    url: "/faps", 
    icon: FapsIcon 
  },
  { 
    title: "Leaderboard", 
    url: "/leaderboard", 
    icon: LeaderboardIcon 
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarContent className="p-0">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 p-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className={`
                        h-12 justify-start gap-3 px-3 py-3 text-sm font-medium transition-all duration-200
                        ${isActive(item.url) 
                          ? 'bg-faps-primary/20 text-faps-primary border-l-2 border-faps-primary' 
                          : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80'
                        }
                      `}
                    >
                      <NavLink to={item.url}>
                        <Icon className="w-5 h-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}