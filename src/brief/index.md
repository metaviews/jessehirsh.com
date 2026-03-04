---
layout: layouts/page.njk
title: Get a custom briefing
dek: Describe your organization or event and get a tailored pitch — relevant topic, suggested format, and a draft booking email.
description: Tell Jesse Hirsh about your event or audience and receive a custom briefing on how his work fits your context.
permalink: /brief/
---

This tool uses an AI model grounded in Jesse's actual topics, voice, and approach. Give it a sentence or two about your organization, sector, or event — it will generate a recommended topic angle, format, outcomes, and a draft email you can send directly.

<form id="brief-form" class="brief-form" novalidate>
  <label for="brief-description">Tell me about your organization or event</label>
  <textarea
    id="brief-description"
    name="description"
    rows="5"
    maxlength="1000"
    placeholder="e.g. We're a national association of credit union executives hosting our annual conference in June. About 300 leaders, focused on digital transformation and member trust."
    required
  ></textarea>
  <button type="submit" id="brief-submit">Generate briefing</button>
</form>

<div id="brief-result" class="brief-result" hidden>
  <h2>Your briefing</h2>
  <div id="brief-output"></div>
  <button id="brief-reset" class="brief-reset">Start over</button>
</div>

<div id="brief-error" class="brief-error" hidden></div>

<script src="/assets/js/brief.js"></script>
