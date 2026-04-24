import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  BookOpen, LayoutDashboard, CheckSquare, Calendar, Settings,
  LogOut, User, Menu, X, ChevronRight, UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { GrainOverlay } from "../components/GrainOverlay";
import { logout, getUser } from "../services/api";

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = getUser();
  const initials = user?.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "?";

  function handleLogout() {
    logout();
    navigate("/");
  }

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/app/dashboard" },
    { id: "tasks", icon: CheckSquare, label: "Tasks", path: "/app/tasks" },
    { id: "calendar", icon: Calendar, label: "Calendar", path: "/app/calendar" },
    { id: "settings", icon: Settings, label: "Settings", path: "/app/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <GrainOverlay />

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden rounded-xl bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar - Desktop */}
      <TooltipProvider delayDuration={300}>
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            width: isCollapsed ? "5rem" : "18rem"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:flex bg-sidebar border-r border-sidebar-border flex-col relative"
        >
          {/* Toggle Button */}
          <motion.div
            className="absolute -right-3 top-8 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-6 w-6 rounded-full bg-white border-2 border-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 relative z-10"
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 0 : 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
              </Button>
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Logo */}
          <div className={`p-8 border-b border-sidebar-border ${isCollapsed ? 'px-4' : ''}`}>
            <motion.div
              className="flex items-center gap-3"
              animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <h2 className="text-2xl whitespace-nowrap" style={{ fontFamily: "var(--font-heading)" }}>
                      TaskFlow
                    </h2>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">Academic Edition</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 p-6 space-y-2 ${isCollapsed ? 'px-3' : ''}`}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);

              const navButton = (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: isActive ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:shadow-sm hover:text-primary"
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  {isActive && (
                    <>
                      {!isCollapsed && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {isCollapsed && (
                        <motion.div
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );

              return isCollapsed ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    {navButton}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-primary text-white">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : navButton;
            })}
          </nav>

          {/* User profile */}
          <div className={`p-6 border-t border-sidebar-border ${isCollapsed ? 'px-3' : ''}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent transition-all duration-200 ${
                    isCollapsed ? 'flex-col justify-center' : ''
                  }`}
                >
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
                  </Avatar>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 overflow-hidden text-left"
                      >
                        <p className="font-medium whitespace-nowrap">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{user?.email || ""}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isCollapsed ? "right" : "top"}
                align="end"
                className="w-64 rounded-2xl p-2"
              >
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-primary">
                      <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">John Doe</p>
                      <p className="text-xs text-muted-foreground truncate">john.doe@university.edu</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl cursor-pointer py-3 px-3"
                >
                  <UserCircle className="w-4 h-4 mr-3" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl cursor-pointer py-3 px-3"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl cursor-pointer py-3 px-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.aside>
      </TooltipProvider>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border flex flex-col z-50 md:hidden"
            >
              {/* Logo */}
              <div className="p-8 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                      TaskFlow
                    </h2>
                    <p className="text-xs text-muted-foreground">Academic Edition</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* User profile */}
              <div className="p-6 border-t border-sidebar-border">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent transition-all duration-200">
                      <Avatar className="w-12 h-12 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john.doe@university.edu</p>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="end"
                    className="w-64 rounded-2xl p-2"
                  >
                    <DropdownMenuLabel className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-primary">
                          <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">John Doe</p>
                          <p className="text-xs text-muted-foreground truncate">john.doe@university.edu</p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/app/settings");
                        setIsMobileMenuOpen(false);
                      }}
                      className="rounded-xl cursor-pointer py-3 px-3"
                    >
                      <UserCircle className="w-4 h-4 mr-3" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/app/settings");
                        setIsMobileMenuOpen(false);
                      }}
                      className="rounded-xl cursor-pointer py-3 px-3"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/");
                        setIsMobileMenuOpen(false);
                      }}
                      className="rounded-xl cursor-pointer py-3 px-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <motion.header
          className="h-20 border-b border-border bg-white px-4 md:px-8 flex items-center justify-between"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="md:ml-0 ml-12">
            <motion.h1
              key={location.pathname}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {navItems.find(item => location.pathname === item.path || location.pathname.startsWith(item.path))?.label || "Dashboard"}
            </motion.h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-xl bg-accent hover:bg-accent/90 text-white shadow-md hidden sm:flex transition-all duration-200 hover:shadow-lg hover:scale-105">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="end"
                className="w-64 rounded-2xl p-2"
              >
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-primary">
                      <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">John Doe</p>
                      <p className="text-xs text-muted-foreground truncate">john.doe@university.edu</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl cursor-pointer py-3 px-3"
                >
                  <UserCircle className="w-4 h-4 mr-3" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl cursor-pointer py-3 px-3"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/")}
                  className="rounded-xl cursor-pointer py-3 px-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-xl bg-accent hover:bg-accent/90 text-white shadow-md sm:hidden">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="end"
                className="w-64 rounded-2xl p-2"
              >
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-primary">
                      <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">John Doe</p>
                      <p className="text-xs text-muted-foreground truncate">john.doe@university.edu</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl cursor-pointer py-3 px-3"
                >
                  <UserCircle className="w-4 h-4 mr-3" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl cursor-pointer py-3 px-3"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/")}
                  className="rounded-xl cursor-pointer py-3 px-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
