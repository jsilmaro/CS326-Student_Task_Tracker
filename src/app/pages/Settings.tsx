import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Bell, Palette, Lock, HelpCircle, Info, Sun, Moon, RotateCcw, Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useTheme, themeColors, type ColorTheme } from "../contexts/ThemeContext";
import { getUser, updateProfile, changePassword, updateNotifications, deleteAccount } from "../services/api";
import { useNavigate } from "react-router";

const colorThemes: { id: ColorTheme; name: string; description: string }[] = [
  { id: "forest", name: "Forest Green", description: "Natural and calming" },
  { id: "ocean", name: "Ocean Blue", description: "Fresh and professional" },
  { id: "lavender", name: "Lavender", description: "Elegant and creative" },
  { id: "sunset", name: "Sunset", description: "Warm and energetic" },
];

export function Settings() {
  const navigate = useNavigate();
  const { colorTheme, themeMode, setColorTheme, setThemeMode, resetTheme } = useTheme();

  const storedUser = getUser();
  const [profile, setProfile] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    university: storedUser?.university || "",
  });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    taskReminders: true,
    dailyDigest: false,
    weeklyReport: true,
  });
  const [notifSaving, setNotifSaving] = useState(false);

  // Load fresh user data on mount
  useEffect(() => {
    if (storedUser) {
      setProfile({ name: storedUser.name, email: storedUser.email, university: storedUser.university || "" });
    }
  }, []);

  const handleProfileSave = async () => {
    setProfileSaving(true);
    setProfileMsg("");
    try {
      await updateProfile(profile);
      setProfileMsg("Profile updated successfully");
    } catch (err: unknown) {
      setProfileMsg(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    if (passwords.next !== passwords.confirm) {
      setPasswordMsg("New passwords do not match");
      return;
    }
    setPasswordSaving(true);
    setPasswordMsg("");
    try {
      await changePassword(passwords.current, passwords.next);
      setPasswordMsg("Password updated successfully");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (err: unknown) {
      setPasswordMsg(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleNotifChange = async (key: keyof typeof notifications, value: boolean) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    setNotifSaving(true);
    try {
      await updateNotifications(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setNotifSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    try {
      await deleteAccount();
      navigate("/");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete account");
    }
  };

  const initials = profile.name.split(" ").map(n => n[0]).join("").toUpperCase() || "?";

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>Settings</h1>
        <p className="text-lg text-muted-foreground">Customize your TaskFlow experience</p>
      </motion.div>

      <div className="space-y-6">
        {/* Theme */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl"><Palette className="w-5 h-5 text-primary" /></div>
              <div>
                <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>Theme & Appearance</h2>
                <p className="text-sm text-muted-foreground">Personalize your visual experience</p>
              </div>
            </div>
            <Button variant="outline" onClick={resetTheme} className="rounded-xl gap-2">
              <RotateCcw className="w-4 h-4" />Reset
            </Button>
          </div>

          <div className="mb-8">
            <Label className="text-base mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" />Theme Mode</Label>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {(["light", "dark"] as const).map(mode => (
                <motion.button key={mode} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setThemeMode(mode)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${themeMode === mode ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"}`}>
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-4 rounded-xl ${themeMode === mode ? "bg-primary" : "bg-muted"}`}>
                      {mode === "light" ? <Sun className={`w-6 h-6 ${themeMode === mode ? "text-white" : "text-muted-foreground"}`} /> : <Moon className={`w-6 h-6 ${themeMode === mode ? "text-white" : "text-muted-foreground"}`} />}
                    </div>
                    <div className="text-center">
                      <p className="font-medium capitalize">{mode} Mode</p>
                      <p className="text-xs text-muted-foreground">{mode === "light" ? "Bright & clear" : "Easy on eyes"}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {themeMode === mode && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <Label className="text-base mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-primary" />Color Theme</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {colorThemes.map((theme, i) => {
                const colors = themeColors[theme.id][themeMode];
                const isSelected = colorTheme === theme.id;
                return (
                  <motion.button key={theme.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setColorTheme(theme.id)}
                    className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${isSelected ? "border-primary shadow-lg" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex gap-1.5">
                        {[colors.primary, colors.accent, colors.secondary].map((c, ci) => (
                          <div key={ci} className="w-8 h-8 rounded-lg shadow-sm" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="ml-auto w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-base mb-1">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl"><User className="w-5 h-5 text-primary" /></div>
            <div>
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>Profile</h2>
              <p className="text-sm text-muted-foreground">Manage your personal information</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarFallback className="bg-primary text-white text-2xl">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>University</Label>
                <Input value={profile.university} onChange={e => setProfile({ ...profile, university: e.target.value })} className="rounded-xl" placeholder="Your university" />
              </div>
              {profileMsg && <p className={`text-sm ${profileMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>{profileMsg}</p>}
              <Button onClick={handleProfileSave} disabled={profileSaving} className="rounded-xl bg-primary">
                {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-xl"><Bell className="w-5 h-5 text-accent" /></div>
            <div>
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>Notifications</h2>
              <p className="text-sm text-muted-foreground">Configure how you receive updates {notifSaving && <Loader2 className="w-3 h-3 inline animate-spin ml-1" />}</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: "taskReminders" as const, label: "Task Reminders", desc: "Get notified about upcoming deadlines" },
              { key: "dailyDigest" as const, label: "Daily Digest", desc: "Receive a daily summary of your tasks" },
              { key: "weeklyReport" as const, label: "Weekly Report", desc: "Get a weekly overview of your progress" },
            ].map(({ key, label, desc }, i) => (
              <div key={key}>
                {i > 0 && <Separator />}
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <Switch checked={notifications[key]} onCheckedChange={v => handleNotifChange(key, v)} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-xl"><Lock className="w-5 h-5 text-accent" /></div>
            <div>
              <h2 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>Security</h2>
              <p className="text-sm text-muted-foreground">Change your password</p>
            </div>
          </div>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" value={passwords.next} onChange={e => setPasswords({ ...passwords, next: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className="rounded-xl" />
            </div>
            {passwordMsg && <p className={`text-sm ${passwordMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>{passwordMsg}</p>}
            <Button onClick={handlePasswordSave} disabled={passwordSaving} className="rounded-xl bg-primary">
              {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
            </Button>
          </div>
        </motion.div>

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl"><HelpCircle className="w-5 h-5 text-primary" /></div>
              <h3 className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>Help & Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Get help with TaskFlow or report an issue</p>
            <Button variant="outline" className="w-full rounded-xl">Contact Support</Button>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-xl"><Info className="w-5 h-5 text-accent" /></div>
              <h3 className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>About</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Version 1.0.0 — Academic Edition</p>
            <Button variant="outline" className="w-full rounded-xl">View Documentation</Button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 border-2 border-destructive/20 shadow-sm">
          <h3 className="text-xl mb-4 text-destructive" style={{ fontFamily: "var(--font-heading)" }}>Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <Button variant="destructive" onClick={handleDeleteAccount} className="rounded-xl">Delete Account</Button>
        </motion.div>
      </div>
    </div>
  );
}
