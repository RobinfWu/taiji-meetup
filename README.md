# Taiji Lab

Website and class management platform for a small Chen Family Taijiquan practice group in Kingston, Ontario, Canada.

**Live website:** https://chentaijilab.ca/  
**Source repository:** https://github.com/RobinfWu/taiji-meetup

## Overview

Taiji Lab is a full-stack web application built to support the development of a local Chen Taijiquan training community.

The website introduces prospective students to the training methodology, instructor background, class schedule, and membership options. It also provides an online reservation system for students and administrative tools for managing classes and registrations.

The application uses a statically generated Next.js frontend, Cloudflare Pages Functions for serverless APIs, and Cloudflare D1 for relational data storage.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Hosting | Cloudflare Pages |
| Backend | Cloudflare Pages Functions |
| Database | Cloudflare D1 (SQLite) |
| Bot protection | Cloudflare Turnstile |

## Features

- Responsive website introducing Chen Family Taijiquan and its training methodology.
- Class schedules, locations, and membership pricing.
- Online class reservations with email verification.
- Reservation capacity management.
- Administrative tools for managing class sessions and registrations.
- Support for manual payment verification through Interac e-Transfer or cash.
- Cloudflare Turnstile integration for protecting public forms.

## Architecture

The application separates the statically generated frontend from its serverless backend.

- **Frontend:** Next.js generates static assets deployed to Cloudflare Pages.
- **API:** Cloudflare Pages Functions handle dynamic requests, including reservations and administrative operations.
- **Database:** Cloudflare D1 stores class sessions, reservations, and related application data.
- **Payments:** Payments are handled outside the application through Interac e-Transfer or cash, with manual confirmation by the instructor.

This architecture keeps infrastructure and operational costs low while supporting dynamic functionality without a continuously running application server.

## Hosting

The application is hosted on Cloudflare Pages, with Pages Functions and D1 providing backend functionality.

Cloudflare was selected for its support for commercial projects on its free tier, integrated serverless infrastructure, and suitability for a small community-operated website.