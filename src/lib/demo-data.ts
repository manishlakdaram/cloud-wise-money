export const monthlySpending = [
  { month: "Jan", spent: 1820, saved: 480 },
  { month: "Feb", spent: 1650, saved: 620 },
  { month: "Mar", spent: 2100, saved: 380 },
  { month: "Apr", spent: 1980, saved: 510 },
  { month: "May", spent: 1740, saved: 720 },
  { month: "Jun", spent: 1890, saved: 690 },
  { month: "Jul", spent: 2050, saved: 540 },
  { month: "Aug", spent: 1780, saved: 810 },
];

export const categories = [
  { name: "Food", value: 540, color: "oklch(0.6 0.22 275)" },
  { name: "Transport", value: 230, color: "oklch(0.7 0.18 210)" },
  { name: "Subscriptions", value: 180, color: "oklch(0.65 0.2 320)" },
  { name: "Shopping", value: 420, color: "oklch(0.75 0.16 180)" },
  { name: "Bills", value: 380, color: "oklch(0.6 0.22 250)" },
];

export const transactions = [
  { id: 1, name: "Spotify Premium", category: "Subscriptions", amount: -9.99, date: "Today", icon: "🎵" },
  { id: 2, name: "Whole Foods", category: "Food", amount: -64.32, date: "Today", icon: "🛒" },
  { id: 3, name: "Salary - Acme Inc", category: "Income", amount: 3200, date: "Yesterday", icon: "💼" },
  { id: 4, name: "Uber Ride", category: "Transport", amount: -18.5, date: "Yesterday", icon: "🚗" },
  { id: 5, name: "Netflix", category: "Subscriptions", amount: -15.99, date: "2 days ago", icon: "🎬" },
  { id: 6, name: "Amazon", category: "Shopping", amount: -89.4, date: "3 days ago", icon: "📦" },
  { id: 7, name: "Electric Bill", category: "Bills", amount: -112.0, date: "4 days ago", icon: "⚡" },
  { id: 8, name: "Coffee Shop", category: "Food", amount: -6.75, date: "5 days ago", icon: "☕" },
];

export const subscriptions = [
  { name: "Spotify", price: 9.99, renews: "Dec 5", icon: "🎵" },
  { name: "Netflix", price: 15.99, renews: "Dec 12", icon: "🎬" },
  { name: "iCloud+", price: 2.99, renews: "Dec 18", icon: "☁️" },
  { name: "Notion", price: 8.0, renews: "Dec 22", icon: "📝" },
  { name: "Adobe CC", price: 22.99, renews: "Jan 3", icon: "🎨" },
];

export const aiInsights = [
  { icon: "💡", title: "Cut $42/mo on subscriptions", body: "You haven't used Adobe CC in 27 days. Consider pausing it." },
  { icon: "📈", title: "Savings up 18%", body: "You're saving faster than last quarter — at this rate you'll hit your goal 2 months early." },
  { icon: "⚠️", title: "Food budget at 84%", body: "You'll likely exceed your $650 food budget by ~$80 this month." },
];
