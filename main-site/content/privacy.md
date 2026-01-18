---
title: "Privacy Policy"
description: "How we handle your data"
---

# Privacy Policy

We value your privacy. This policy explains what data we collect and how we use it.

## 1. Data Collection
We collect data in two primary ways:
- **Anonymous Progress Tracking:** We collect course completion status and quiz scores. This data is linked to an anonymous ID and is used to provide you with a persistent learning experience.
- **Aggregated Analytics:** we count unique anonymous users per course to show community engagement metrics.

## 2. Third-Party Services
- **Firebase:** We use Google Firebase for anonymous authentication and cloud synchronization of your learning progress.
- **Giscus:** We use Giscus for lesson comments, which stores data in GitHub Discussions.
- **CDN Services:** We use CDNs (like JSDelivr) to serve high-performance libraries.

## 3. Cookies
We use essential cookies and local storage to:
- Keep track of your progress through a course.
- Remember your theme preferences (Light/Dark mode).
- Maintain your session if you choose to link a Google account.

## 4. Privacy Settings

You can customize your data collection preferences here. These settings are saved in your browser's local storage.

<div class="privacy-settings-box">
  <div class="privacy-setting-item">
    <div class="setting-info">
      <div class="setting-title">Essential Progress Tracking</div>
      <div class="setting-desc">Required to save your course progress and quiz results locally in your browser.</div>
    </div>
    <div class="setting-toggle">
      <input type="checkbox" id="consent-essential" checked disabled>
      <label for="consent-essential" class="toggle-label"></label>
      <span class="setting-badge">Required</span>
    </div>
  </div>

  <div class="privacy-setting-item">
    <div class="setting-info">
      <div class="setting-title">Cloud Synchronization</div>
      <div class="setting-desc">Back up your progress to our secure cloud. Allows you to sync progress across multiple devices.</div>
    </div>
    <div class="setting-toggle">
      <input type="checkbox" id="consent-sync" class="consent-checkbox" data-consent="sync">
      <label for="consent-sync" class="toggle-label"></label>
    </div>
  </div>

  <div class="privacy-setting-item">
    <div class="setting-info">
      <div class="setting-title">Anonymous Analytics</div>
      <div class="setting-desc">Help us understand which courses are popular. We only count unique anonymous visits.</div>
    </div>
    <div class="setting-toggle">
      <input type="checkbox" id="consent-analytics" class="consent-checkbox" data-consent="analytics">
      <label for="consent-analytics" class="toggle-label"></label>
    </div>
  </div>
  
  <div class="privacy-actions">
    <button id="save-privacy-settings" class="btn btn--primary">Save Preferences</button>
    <span id="privacy-save-status" style="display: none; color: #22c55e; font-size: 0.875rem;">Settings saved!</span>
  </div>
</div>

## 5. Your Rights
You can delete your local progress at any time via the "Settings" menu in any course. If you have linked a Google account, your data is stored securely in Firebase and can be managed through your profile settings.

## 5. Contact
If you have any questions about our privacy practices, please open an issue on our GitHub repository.
