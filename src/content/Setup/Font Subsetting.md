---
title: "Font Subsetting"
description: "Optimise your fonts by only providing what's needed."
tags:
- fonts
- performance
date: 2022-01-29
---

Just read this: 
https://www.sarasoueidan.com/blog/glyphhanger/

And keep in mind:
Needs to be called in font directory

Otherwise it won't work.

Run: `glyphhanger casda`

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
