# AI Analytics Study Tracker

A lightweight browser-based study tracker for an AI analytics roadmap. The tracker helps you plan learning and building tasks across multiple phases, track progress visually, add notes, and sync progress across devices.

## Overview

This project provides a single-page tracker that breaks down an analytics-to-GenAI learning plan into seven study phases. Each phase includes both Learn and Build tasks, plus space for phase-specific notes.

## Features

- Track task completion across all phases with checkboxes
- View overall and per-phase progress percentages
- Add project-wide notes and phase-specific notes
- Record start date, weekly study hours, and current focus
- Export progress to JSON
- Import progress from JSON
- Reset saved progress
- Persist state locally using browser localStorage
- Automatically sync progress across devices with Supabase

## Study Phases

The roadmap includes the following phases:

1. Phase 1: Strengthen Analytics Foundation
2. Phase 2: Core Machine Learning
3. Phase 3: LLM Fundamentals
4. Phase 4: RAG Engineering
5. Phase 5: AI Agents
6. Phase 6: Databricks + GenAI
7. Phase 7: MLOps and Deployment

Each phase contains a mix of learning goals and practical build tasks designed to help you prepare for analytics and GenAI roles.

## Usage

1. Open the hosted GitHub Pages site or `index.html` in a browser.
2. Check off completed tasks in the Learn and Build sections.
3. Use the top section to record your study start date, weekly hours, and current focus.
4. Add notes for the overall plan or for individual phases.
5. Use the Export button to download a JSON snapshot of your progress.
6. Use the Import control to restore progress from a saved JSON file.
7. Use the Reset button to clear all saved progress.

## Supabase Sync Setup

The tracker is configured to use this Supabase project:

`https://hhstfhlbpjdaqysjjkzf.supabase.co`

To enable automatic sync, open your Supabase project, go to SQL Editor, and run the contents of `supabase-setup.sql`.

After the table exists, the website will:

- Load the latest cloud progress automatically on page open
- Save edits automatically after a short delay
- Refresh from cloud when the page regains focus
- Refresh in the background about once per minute

The embedded publishable key is safe to use in a public static site, but this setup does not include personal authentication. Do not store passwords, private financial data, or sensitive personal information in tracker notes.

## Project Structure

- `index.html` - main HTML layout and UI template
- `styles.css` - visual styling for the tracker
- `app.js` - application state, rendering, progress calculations, sync, and persistence logic
- `supabase-setup.sql` - Supabase table and row-level security setup

## Notes

The tracker is intentionally simple and runs in the browser. No server or build step is required.
