// src/api/userApi.ts

import type { Preferences, PreferencesUpdate, OnboardingPayload } from "../types/user";

const BASE_URL = "http://localhost:8000";

export async function saveOnboardingStep(data: OnboardingPayload) {
  const res = await fetch(`${BASE_URL}/user/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getPreferences(): Promise<Preferences> {
  const res = await fetch(`${BASE_URL}/user/preferences`);
  if (!res.ok) throw new Error("Failed to load preferences");
  return res.json();
}

export async function updatePreferences(data: PreferencesUpdate) {
  const res = await fetch(`${BASE_URL}/user/preferences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update preferences");
  return res.json();
}
