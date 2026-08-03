/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/** Site-wide contact & social links (footer, cart, contact page). */

export const TEL_NUMBER_LINK = "tel:212666201740";
export const WHATSAPP_NUMBER = "+212 666 2017 40";
export const WHATSAPP_NUMBER_LINK = "https://wa.me/212666201740";

export const INSTAGRAM = "KosmetikaIG";
export const INSTAGRAM_LINK = "INSTAGRAM_LINK"; // TODO: real Instagram profile URL
export const FACEBOOK = "KosmetikaFB";
export const FACEBOOK_LINK = "FACEBOOK_LINK"; // TODO: real Facebook page URL
export const TIKTOK = "Kosmetika";
export const TIKTOK_LINK = "TIKTOK_LINK"; // TODO: real TikTok profile URL

/**
 * Sentinel values the social constants still carry while no real profile URL
 * has been filled in. Compared literally, never against the constants
 * themselves: once a constant holds a real URL it must stop matching.
 */
const SOCIAL_LINK_PLACEHOLDERS = ["INSTAGRAM_LINK", "FACEBOOK_LINK", "TIKTOK_LINK"];

/**
 * A social link still holding a sentinel has no destination yet: it opens an
 * explanatory dialog instead of leading nowhere. Filling in the constant above
 * turns it back into a plain link, with nothing else to change.
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isPlaceholderSocialLink(url) {
  return SOCIAL_LINK_PLACEHOLDERS.includes(url);
}
