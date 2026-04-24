import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Bell, Palette, Lock, HelpCircle, Info, Sun, Moon, RotateCcw, Check, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useTheme, themeColors, type ColorTheme } from "../contexts/ThemeContext";

const colorThemes: { id: ColorTheme; name: string; description: string }[] = [
  { id: "forest", name: "Forest Green", description: "Natural and calming" },
  { id: "ocean", name: "Ocean Blue", description: "Fresh and professional" },
  { id: "lavender", name: "Lavender", description: "Elegant and creative" },
  { id: "sunset", name: "Sunset", description: "Warm and energetic" },
];

export function Settings() {
  const { colorTheme, themeMode, setColorTheme, setThemeMode, resetTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    dailyDigest: false,
    weeklyReport: true,
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@university.edu",
    university: "State University",
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Settings
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your TaskFlow experience
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Theme Customization Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                  Theme & Appearance
                </h2>
                <p className="text-sm text-muted-foreground">
                  Personalize your visual experience
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={resetTheme}
              className="rounded-xl gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Theme Mode Toggle */}
          <div className="mb-8">
            <Label className="text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Theme Mode
            </Label>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setThemeMode("light")}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  themeMode === "light"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-xl ${themeMode === "light" ? "bg-primary" : "bg-muted"}`}>
                    <Sun className={`w-6 h-6 ${themeMode === "light" ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Light Mode</p>
                    <p className="text-xs text-muted-foreground">Bright & clear</p>
                  </div>
                </div>
                <AnimatePresence>
                  {themeMode === "light" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setThemeMode("dark")}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  themeMode === "dark"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-xl ${themeMode === "dark" ? "bg-primary" : "bg-muted"}`}>
                    <Moon className={`w-6 h-6 ${themeMode === "dark" ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Easy on eyes</p>
                  </div>
                </div>
                <AnimatePresence>
                  {themeMode === "dark" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Color Theme Selector */}
          <div>
            <Label className="text-base mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              Color Theme
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {colorThemes.map((theme, index) => {
                const colors = themeColors[theme.id][themeMode];
                const isSelected = colorTheme === theme.id;

                return (
                  <motion.button
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setColorTheme(theme.id)}
                    className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Color Preview */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex gap-1.5">
                        <div
                          className="w-8 h-8 rounded-lg shadow-sm"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded-lg shadow-sm"
                          style={{ backgroundColor: colors.accent }}
                        />
                        <div
                          className="w-8 h-8 rounded-lg shadow-sm"
                          style={{ backgroundColor: colors.secondary }}
                        />
                      </div>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="ml-auto w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Theme Info */}
                    <div className="text-left">
                      <h3 className="font-medium text-base mb-1">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>

                    {/* Live Preview Mini Card */}
                    <motion.div
                      className="mt-4 p-3 rounded-xl transition-all duration-300"
                      style={{ backgroundColor: colors.background }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <div
                          className="h-1.5 flex-1 rounded-full"
                          style={{ backgroundColor: colors.muted }}
                        />
                      </div>
                      <div className="flex gap-1.5">
                        <div
                          className="h-1 flex-1 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                        />
                        <div
                          className="h-1 flex-1 rounded-full"
                          style={{ backgroundColor: colors.secondary }}
                        />
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Preview Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <p className="text-sm text-center">
              <Sparkles className="w-4 h-4 inline mr-2 text-primary" />
              Changes are applied instantly and saved automatically
            </p>
          </motion.div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                Profile
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your personal information
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="rounded-xl">
                Change Photo
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <Button className="rounded-xl bg-primary">
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                Notifications
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure how you receive updates
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <p className="font-medium">Task Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about upcoming deadlines
                </p>
              </div>
              <Switch
                checked={notifications.taskReminders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, taskReminders: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <p className="font-medium">Daily Digest</p>
                <p className="text-sm text-muted-foreground">
                  Receive a daily summary of your tasks
                </p>
              </div>
              <Switch
                checked={notifications.dailyDigest}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, dailyDigest: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <p className="font-medium">Weekly Report</p>
                <p className="text-sm text-muted-foreground">
                  Get a weekly overview of your progress
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyReport: checked })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                Security
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your account security
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start rounded-xl h-auto py-4">
              <div className="text-left flex-1">
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start rounded-xl h-auto py-4">
              <div className="text-left flex-1">
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start rounded-xl h-auto py-4">
              <div className="text-left flex-1">
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground">
                  Manage devices and sessions
                </p>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Additional Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                Help & Support
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get help with TaskFlow or report an issue
            </p>
            <Button variant="outline" className="w-full rounded-xl">
              Contact Support
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-xl">
                <Info className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                About
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Version 1.0.0 - Academic Edition
            </p>
            <Button variant="outline" className="w-full rounded-xl">
              View Documentation
            </Button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border-2 border-destructive/20 shadow-sm"
        >
          <h3 className="text-xl mb-4 text-destructive" style={{ fontFamily: "var(--font-heading)" }}>
            Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive" className="rounded-xl">
            Delete Account
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
