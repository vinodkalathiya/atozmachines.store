"use client";

import {
  User, VendorProfile, MachineListing, RFQ, Quote,
  STORAGE_KEYS, SEED_USERS, SEED_VENDORS, SEED_LISTINGS, SEED_RFQS, SEED_QUOTES,
} from "./data";

// ─── Seed ─────────────────────────────────────────────────────────────────────

export function seedIfNeeded() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(STORAGE_KEYS.SEEDED)) return;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(SEED_VENDORS));
  localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(SEED_LISTINGS));
  localStorage.setItem(STORAGE_KEYS.RFQS, JSON.stringify(SEED_RFQS));
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(SEED_QUOTES));
  localStorage.setItem(STORAGE_KEYS.SEEDED, "1");
}

// ─── Generic helpers ─────────────────────────────────────────────────────────

function getAll<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}

function setAll<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Users ───────────────────────────────────────────────────────────────────

export function getUsers(): User[] { return getAll<User>(STORAGE_KEYS.USERS); }

export function getUserById(id: string): User | null {
  return getUsers().find((u) => u.id === id) ?? null;
}

export function getUserByEmail(email: string): User | null {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function createUser(data: Omit<User, "id" | "createdAt">): User {
  const user: User = { ...data, id: genId(), createdAt: new Date().toISOString() };
  const users = getUsers();
  users.push(user);
  setAll(STORAGE_KEYS.USERS, users);
  return user;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// ─── Vendors ─────────────────────────────────────────────────────────────────

export function getVendors(): VendorProfile[] { return getAll<VendorProfile>(STORAGE_KEYS.VENDORS); }

export function getVendorById(id: string): VendorProfile | null {
  return getVendors().find((v) => v.id === id) ?? null;
}

export function getVendorByUserId(userId: string): VendorProfile | null {
  return getVendors().find((v) => v.userId === userId) ?? null;
}

export function getApprovedVendors(): VendorProfile[] {
  return getVendors().filter((v) => v.isApproved);
}

export function createVendor(data: Omit<VendorProfile, "id">): VendorProfile {
  const vendor: VendorProfile = { ...data, id: genId() };
  const vendors = getVendors();
  vendors.push(vendor);
  setAll(STORAGE_KEYS.VENDORS, vendors);
  return vendor;
}

export function updateVendor(id: string, data: Partial<VendorProfile>) {
  const vendors = getVendors();
  const idx = vendors.findIndex((v) => v.id === id);
  if (idx !== -1) { vendors[idx] = { ...vendors[idx], ...data }; setAll(STORAGE_KEYS.VENDORS, vendors); }
}

export function approveVendor(id: string) { updateVendor(id, { isApproved: true }); }
export function rejectVendor(id: string) {
  const vendors = getVendors().filter((v) => v.id !== id);
  setAll(STORAGE_KEYS.VENDORS, vendors);
}

// ─── Listings ─────────────────────────────────────────────────────────────────

export function getListings(): MachineListing[] { return getAll<MachineListing>(STORAGE_KEYS.LISTINGS); }

export function getListingById(id: string): MachineListing | null {
  return getListings().find((l) => l.id === id) ?? null;
}

export function getListingsByVendor(vendorId: string): MachineListing[] {
  return getListings().filter((l) => l.vendorId === vendorId);
}

export function getListingsByCategory(slug: string): MachineListing[] {
  return getListings().filter((l) => l.categorySlug === slug && l.isApproved && l.isActive);
}

export function getApprovedListings(): MachineListing[] {
  return getListings().filter((l) => l.isApproved && l.isActive);
}

export function createListing(data: Omit<MachineListing, "id" | "createdAt">): MachineListing {
  const listing: MachineListing = { ...data, id: genId(), createdAt: new Date().toISOString() };
  const listings = getListings();
  listings.push(listing);
  setAll(STORAGE_KEYS.LISTINGS, listings);
  return listing;
}

export function approveListing(id: string) {
  const listings = getListings();
  const idx = listings.findIndex((l) => l.id === id);
  if (idx !== -1) { listings[idx].isApproved = true; setAll(STORAGE_KEYS.LISTINGS, listings); }
}

export function deleteListing(id: string) {
  setAll(STORAGE_KEYS.LISTINGS, getListings().filter((l) => l.id !== id));
}

// ─── RFQs ─────────────────────────────────────────────────────────────────────

export function getRFQs(): RFQ[] { return getAll<RFQ>(STORAGE_KEYS.RFQS); }

export function getRFQById(id: string): RFQ | null {
  return getRFQs().find((r) => r.id === id) ?? null;
}

export function getRFQsByBuyer(buyerId: string): RFQ[] {
  return getRFQs().filter((r) => r.buyerId === buyerId);
}

export function getRFQsByCategory(slug: string): RFQ[] {
  return getRFQs().filter((r) => r.categorySlug === slug && r.status === "open");
}

export function createRFQ(data: Omit<RFQ, "id" | "createdAt" | "expiresAt">): RFQ {
  const now = new Date();
  const expires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const rfq: RFQ = {
    ...data,
    id: genId(),
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };
  const rfqs = getRFQs();
  rfqs.push(rfq);
  setAll(STORAGE_KEYS.RFQS, rfqs);
  return rfq;
}

export function updateRFQStatus(id: string, status: RFQ["status"]) {
  const rfqs = getRFQs();
  const idx = rfqs.findIndex((r) => r.id === id);
  if (idx !== -1) { rfqs[idx].status = status; setAll(STORAGE_KEYS.RFQS, rfqs); }
}

// ─── Quotes ──────────────────────────────────────────────────────────────────

export function getQuotes(): Quote[] { return getAll<Quote>(STORAGE_KEYS.QUOTES); }

export function getQuotesByRFQ(rfqId: string): Quote[] {
  return getQuotes().filter((q) => q.rfqId === rfqId);
}

export function getQuotesByVendor(vendorId: string): Quote[] {
  return getQuotes().filter((q) => q.vendorId === vendorId);
}

export function hasVendorQuoted(rfqId: string, vendorId: string): boolean {
  return getQuotes().some((q) => q.rfqId === rfqId && q.vendorId === vendorId);
}

export function createQuote(data: Omit<Quote, "id" | "submittedAt">): Quote {
  const quote: Quote = { ...data, id: genId(), submittedAt: new Date().toISOString() };
  const quotes = getQuotes();
  quotes.push(quote);
  setAll(STORAGE_KEYS.QUOTES, quotes);
  return quote;
}

export function updateQuoteStatus(id: string, status: Quote["status"]) {
  const quotes = getQuotes();
  const idx = quotes.findIndex((q) => q.id === id);
  if (idx !== -1) { quotes[idx].status = status; setAll(STORAGE_KEYS.QUOTES, quotes); }
}

// ─── Search ───────────────────────────────────────────────────────────────────

export function searchListings(query: string): MachineListing[] {
  const q = query.toLowerCase();
  return getApprovedListings().filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.categoryName.toLowerCase().includes(q) ||
      l.vendorName.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q)
  );
}
