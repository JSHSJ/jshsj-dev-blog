---
title: "Aspect Ratio Fix"
description: "Fix for browser that don't yet support aspect-ratio."
tags:
- css
- fix
- safari
date: 2022-01-29
---

Since Safari doesn't support `aspect-ratio` yet:

```css
  aspect-ratio: 16 / 9;

  @supports (not (aspect-ratio: 16 / 9)) {
    position: relative;
    padding-bottom: calc(9 / 16 * 100%);
    height: 0;

    img {
      position: absolute;
    }
  }
```

# Headline 1

## Headline 2

### Headline 3
