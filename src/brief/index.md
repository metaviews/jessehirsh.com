---
layout: layouts/page.njk
title: Brief Jesse
dek: Describe your event. We'll build the talk together.
description: Describe your organization or event and receive a custom talk concept — title, premise, opening hook, and a draft booking email — built for your specific event.
permalink: /brief/
---

Describe your organization, sector, or event in a sentence or two — Jesse will build something for it. After you press the brief Jesse button, be patient, as it takes Jesse a moment to respond...

[Browse the talk concept gallery →](/talks/)

<div class="brief-wrap">
  <form id="brief-form" class="brief-form" novalidate>
    <label for="brief-description">Describe your organization or event</label>
    <br>
    <textarea
      id="brief-description"
      name="description"
      rows="6"
      maxlength="1000"
      placeholder="e.g. We're a national association of municipal leaders, about 400 people, meeting in October. The conversation is dominated by AI procurement anxiety and nobody knows what questions to ask."
      required
    ></textarea>
    <br>
    <div class="brief-form-footer">
      <span id="brief-charcount" class="brief-charcount">0 / 1000</span>
      <button type="submit" id="brief-submit">Brief Jesse →</button>
    </div>
  </form>

  <div id="brief-loading" class="brief-loading" hidden>
    <p id="brief-loading-msg" class="brief-loading-msg"></p>
  </div>

  <div id="brief-result" class="brief-result" hidden>
    <div id="brief-output"></div>
    <div class="brief-save-prompt">
      <button id="brief-save-btn" class="brief-save-btn">Save to gallery →</button>
      <p class="brief-save-note">Only the generated talk — title, premise, and opening — is saved. Your description is not.</p>
    </div>
    <div id="brief-save-status" class="brief-save-status" hidden></div>
    <div class="brief-actions">
      <button id="brief-reset" class="brief-reset">Brief Jesse again →</button>
      <a href="/talks/" class="brief-reset">Browse the gallery →</a>
    </div>
  </div>

  <div id="brief-error" class="brief-error" hidden></div>
</div>

<script src="/assets/js/brief.js"></script>
