export type Platform = "instagram" | "x" | "linkedin" | "tiktok" | "facebook" | "youtube";

export interface ConnectedAccount {
  id: string;
  platform: Platform;
  handle: string;
  followers: number;
  followersDelta: number;
  postsThisWeek: number;
  connected: boolean;
  lastSync: string;
}

export interface Post {
  id: string;
  platform: Platform;
  accountHandle: string;
  content: string;
  scheduledAt: string;
  status: "scheduled" | "published" | "draft";
  impressions: number;
  engagement: number;
}

export interface InboxItem {
  id: string;
  platform: Platform;
  author: string;
  message: string;
  type: "comment" | "dm" | "mention";
  receivedAt: string;
  replied: boolean;
  priority: "high" | "normal" | "low";
  suggestedReply?: string;
}

export const accounts: ConnectedAccount[] = [
  { id: "1", platform: "instagram", handle: "@pulsebrand", followers: 12480, followersDelta: 312, postsThisWeek: 4, connected: true, lastSync: "2 min ago" },
  { id: "2", platform: "x", handle: "@pulsebrand", followers: 8920, followersDelta: -45, postsThisWeek: 7, connected: true, lastSync: "5 min ago" },
  { id: "3", platform: "linkedin", handle: "Pulse Marketing", followers: 3410, followersDelta: 88, postsThisWeek: 2, connected: true, lastSync: "12 min ago" },
  { id: "4", platform: "tiktok", handle: "@pulsebrand", followers: 27650, followersDelta: 1240, postsThisWeek: 3, connected: true, lastSync: "8 min ago" },
  { id: "5", platform: "facebook", handle: "Pulse Marketing", followers: 5120, followersDelta: 12, postsThisWeek: 1, connected: false, lastSync: "never" },
  { id: "6", platform: "youtube", handle: "Pulse Marketing", followers: 1890, followersDelta: 24, postsThisWeek: 1, connected: true, lastSync: "1 hr ago" },
];

export const posts: Post[] = [
  { id: "p1", platform: "instagram", accountHandle: "@pulsebrand", content: "Behind the scenes of our new campaign shoot", scheduledAt: "2026-11-15T09:00:00", status: "scheduled", impressions: 0, engagement: 0 },
  { id: "p2", platform: "x", accountHandle: "@pulsebrand", content: "We just shipped a feature our users have been asking for. Thread below.", scheduledAt: "2026-11-15T11:30:00", status: "scheduled", impressions: 0, engagement: 0 },
  { id: "p3", platform: "linkedin", accountHandle: "Pulse Marketing", content: "How we cut our content production time by 60% using automation", scheduledAt: "2026-11-14T14:00:00", status: "published", impressions: 4820, engagement: 312 },
  { id: "p4", platform: "tiktok", accountHandle: "@pulsebrand", content: "POV: you finally automated your social media", scheduledAt: "2026-11-13T18:00:00", status: "published", impressions: 42100, engagement: 3890 },
  { id: "p5", platform: "instagram", accountHandle: "@pulsebrand", content: "New carousel: 5 metrics that actually matter", scheduledAt: "2026-11-16T10:00:00", status: "draft", impressions: 0, engagement: 0 },
  { id: "p6", platform: "youtube", accountHandle: "Pulse Marketing", content: "Tutorial: automating your first marketing workflow", scheduledAt: "2026-11-17T12:00:00", status: "scheduled", impressions: 0, engagement: 0 },
];

export const inboxItems: InboxItem[] = [
  { id: "i1", platform: "instagram", author: "@sarahmktg", message: "Love this! Do you have a free trial?", type: "comment", receivedAt: "5 min ago", replied: false, priority: "high", suggestedReply: "Thanks Sarah! Yes — 14-day free trial, no card needed. Link in bio." },
  { id: "i2", platform: "x", author: "@devjoe", message: "Feature request: bulk scheduling for threads", type: "mention", receivedAt: "12 min ago", replied: false, priority: "normal", suggestedReply: "Great idea Joe — added to our roadmap. We're scoping it for Q1." },
  { id: "i3", platform: "linkedin", author: "Maya Chen", message: "Great post. Would love to chat about a partnership.", type: "dm", receivedAt: "1 hr ago", replied: false, priority: "high", suggestedReply: "Thanks Maya! I'd love to chat — sending you a DM with my calendar link." },
  { id: "i4", platform: "tiktok", author: "@creator_kim", message: "This is exactly what I needed.", type: "comment", receivedAt: "2 hr ago", replied: true, priority: "low" },
  { id: "i5", platform: "x", author: "@angry_user", message: "Your app keeps crashing on mobile", type: "mention", receivedAt: "3 hr ago", replied: false, priority: "high", suggestedReply: "Sorry about that! Could you share your device/OS? We're investigating and will DM you a fix." },
];

export const platformMeta: Record<Platform, { label: string; color: string; initial: string }> = {
  instagram: { label: "Instagram", color: "#E1306C", initial: "I" },
  x: { label: "X", color: "#3a3336", initial: "X" },
  linkedin: { label: "LinkedIn", color: "#0A66C2", initial: "L" },
  tiktok: { label: "TikTok", color: "#2b2427", initial: "T" },
  facebook: { label: "Facebook", color: "#1877F2", initial: "F" },
  youtube: { label: "YouTube", color: "#FF0000", initial: "Y" },
};

export const totals = {
  followers: accounts.reduce((s, a) => s + (a.connected ? a.followers : 0), 0),
  followersDelta: accounts.reduce((s, a) => s + (a.connected ? a.followersDelta : 0), 0),
  postsThisWeek: accounts.reduce((s, a) => s + (a.connected ? a.postsThisWeek : 0), 0),
  scheduled: posts.filter((p) => p.status === "scheduled").length,
  published: posts.filter((p) => p.status === "published").length,
  drafts: posts.filter((p) => p.status === "draft").length,
  unreadInbox: inboxItems.filter((i) => !i.replied).length,
};

// Daily series for the last 14 days (1 to 14 Nov 2026), connected channels only.
// Followers gained per day; the 14 values add up to each account's 7-day delta over days 8-14.
export const days14 = Array.from({ length: 14 }, (_, i) => new Date(2026, 10, 1 + i));
export const followersGained: Record<string, number[]> = {
  tiktok:    [80, 95, 110, 90, 120, 140, 105, 150, 170, 190, 160, 210, 180, 180],
  instagram: [30, 28, 35, 31, 40, 38, 33, 42, 46, 50, 41, 52, 40, 41],
  linkedin:  [8, 9, 7, 11, 10, 12, 9, 11, 13, 14, 12, 13, 12, 13],
  youtube:   [2, 3, 2, 4, 3, 3, 2, 3, 4, 4, 3, 4, 3, 3],
  x:         [-4, 2, -6, 1, -3, 4, -2, -8, 3, -9, -6, -7, -5, -13],
};
