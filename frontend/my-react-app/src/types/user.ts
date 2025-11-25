// src/types/user.ts

export interface Preferences {
  user_id: number;
  tone?: string;
  writing_style?: string;
  goals?: string[];
  topics?: string[];
  target_audience?: string[];
  post_frequency?: string;
  post_length?: string;
  hashtag_preferences?: string[];
  emoji_preference?: string;
}

export interface PreferencesUpdate {
  tone?: string;
  writing_style?: string;
  goals?: string[];
  topics?: string[];
  target_audience?: string[];
  post_frequency?: string;
  post_length?: string;
  hashtag_preferences?: string[];
  emoji_preference?: string;
}

export interface OnboardingPayload {
  step: number;
  answer: Record<string, any>;
}
