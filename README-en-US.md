# Fortune Summoners Manual - HTML4 to HTML5 Migration

## ⛓️ Appendix: Game Download and HD Compatibility Patch Guide

> [!IMPORTANT]
> This section is solely based on personal opinions and experiences, and is not part of the project's core content. Any risks associated with related operations are borne by the user. If legal issues arise, it will be removed immediately.

See also: [Game Download and HD Compatibility Patch](Guide-en-US.md)

## 📖 Game Background and Project Positioning

*Fortune Summoners: Secret of the Elemental Stone* (Japanese: 《フォーチュンサモナーズ 〜アルチェの精霊石〜》 (*Fōchun Samonāzu ~Aruche no Seirei Seki~*)) is a single-player real-time action role-playing game developed by the independent studio **Lizsoft**. Development began in April 2005, with a free demo titled "Prologue" released on July 7, 2007. A trailer was uploaded to YouTube on September 8, 2008, and the full version launched on September 10, 2008. This was the studio's third work overall but the first released under the "Lizsoft" name.

Following its release, the game received several updates: On June 18, 2009, Jungle Co., Ltd. published a boxed Deluxe edition (《フォーチュンサモナーズ 〜アルチェの精霊石〜 Deluxe》) with additional content and exclusive bonuses. On January 31, 2012, the American company Carpe Fulgur—which previously localized *Recettear: An Item Shop's Tale* (《ルセッティア 〜アイテム屋さんのはじめ方〜》 (*Rusettia ~Aitemu-ya-san no Hajimekata~*))—released a fully English-localized version on Steam and other platforms. Additionally, according to the Lizsoft website and Steam store page, the Japanese original version **ver.1.6** received a major update years later and was released on Steam on August 21, 2020.

This project modernizes the original HTML4 manual from the Steam English version (**January 31, 2012, ver.1.2**) using contemporary web technologies, while archiving the historical materials. It reconstructs the manual with modern frontend techniques for perfect compatibility with current browsers, fully preserving the original content and structure. This serves as a real-world case study for frontend migration and helps preserve valuable official documentation for this niche classic game.

## 🎮 Core Game Settings and Gameplay Features

This game, born in the late 2000s, boasts a rich world-building foundation. It continues the "Scottish Holm" fantasy setting from Lizsoft's 2001 title 《みならい魔法使いフワルの冒険》 (*Minarai Mahō Tsukai Fuwaru no Bōken*), featuring 2D side-scrolling action as its core mechanic. The story follows three young girls—a swordswoman, a healing mage, and an offensive mage—embarking on adventures together.

## 🎯 Project Technical Background

This project is a frontend modernization effort with both technical reference value and archival significance. The original manual is a document from over a decade ago, written in HTML4 standards, using outdated `<frameset>` layouts and `Shift_JIS` encoding. It faces compatibility issues in modern browsers, lacks multi-language support, and has disorganized resources.

The project migrates this legacy manual to HTML5, enhancing functionality and user experience while fully retaining the original structure and files, resulting in a dual-version setup: archived original + modern usable version.

### Project Goals

1. **Preserving a Niche Classic**: Ensure the official manual for this indie gem runs stably in modern browsers without compatibility issues, supporting online access, local opening, and server hosting.
2. **Technical Reference**: Provide a complete, practical case study of HTML4-to-HTML5 migration for frontend learners and enthusiasts, covering encoding conversion, layout refactoring, resource optimization, and SPA architecture.
3. **Multi-Language Support**: Retain the official English content, supplement with Japanese references, and add a Simplified Chinese translation for easier access by Chinese players, with a scalable multi-language framework.
4. **Historical Archiving**: Fully preserve the original HTML4 files and structure, offering a reference for preserving documentation of similar niche games.

## 🔄 Migration Notes

### HTML4 vs HTML5 Technical Comparison

| Feature              | Original HTML4 Version                          | Modern HTML5 Version                              |
|----------------------|-------------------------------------------------|---------------------------------------------------|
| **Document Type**    | `<!doctype html public "-//W3C//DTD HTML 4.0//EN">` | `<!DOCTYPE html>`                                |
| **Character Encoding**| `Shift_JIS` (Japanese encoding; risks garbled text in English) | `UTF-8` (Universal; supports multilingual without issues) |
| **Layout**           | `<frameset>` + `<frame>` (Non-semantic, inflexible, weakened modern support) | Semantic HTML5 tags (`<aside>`, `<main>`) + CSS Flex (Semantic, flexible, highly adaptable) |
| **Interaction**      | Static pages; relies on native frame navigation | Single-Page Application (SPA) with native JavaScript for dynamic loading and hash-based routing |
| **Language Support** | English only; no extensibility                  | English + Simplified Chinese (extensible to Japanese, Traditional Chinese, etc.); local storage for preferences |
| **File Extensions**  | `.htm` (Early HTML convention)                  | `.html` (Modern standard)                         |
| **Resource Organization** | Flat structure; mixed files                | Modular directories by function and language      |

### File Structure Refactoring

#### Original HTML4 Structure (`_html4/` Directory)

```
_html4/
└ *.htm               # 19 HTML files, all flat in root
└ contents.css        # CSS mixed with HTML
└ fs.css
└ img/                # Unsorted images, no subdirectories
└ main.htm            # Entry file with <frameset> layout
```

**Core Issues**:
- Flat mixing of resources and content; poor readability and maintenance.
- Unsorted images in a single directory; hard to manage.
- No modular structure; limited extensibility for multi-language or interactions.
- No JavaScript; no foundation for dynamic features.

#### New HTML5 Structure (Root Directory)

```
FortuneSummoners-Manual/
└ index.html          # SPA entry (HTML5-compliant, dynamic navigation and language switching)
└ favicon.ico         # Favicon for modern web visibility
└ _html4/             # Complete original HTML4 archive (read-only)
  ├── docs/           # Content files organized by language
  │   ├── en-US/      # English (identical to original)
  │   └── zh-CN/      # Simplified Chinese (translated and formatted)
  ├── styles/         # Centralized CSS
  │   ├── adapt-html5.css # New adaptation styles
  │   ├── contents.css    # Original content styles (unchanged)
  │   └── fs.css          # Original main styles (unchanged)
  ├── scripts/        # New JavaScript directory
  │   └── navigation.js   # Core logic for routing, switching, and loading
  └── images/         # Categorized images
      ├── advice/
      ├── battle/
      ├── battle_ex/
      ├── battle_magic/
      ├── battle_sword/
      ├── buttons/
      ├── character/
      ├── common/
      ├── concept/
      ├── game/
      ├── level/
      ├── operation/
      ├── other/
      ├── product/
      ├── skills_magic/
      └── start/
```

**Key Improvements**:
- ✅ **HTML Optimization**: Organized by language in `docs/` for extensibility and decoupling.
- ✅ **CSS Management**: Unified in `styles/`; separated new and original for traceability.
- ✅ **JavaScript Addition**: New `scripts/` for modular interactions; pure native, lightweight.
- ✅ **Image Categorization**: Functional subdirectories for easier management.
- ✅ **Entry Refactor**: From frameset to SPA for modern compatibility.
- ✅ **Version Isolation**: Original in `_html4/`; untouched for archiving.

## 🚀 Usage Instructions

The project supports four scenarios: online access, quick local use, local cloning for development, and server hosting.

### Scenario 1: Online Access

Access the deployed modern version via GitHub Pages—no downloads needed:

- **HTML5 Access**: `https://jaymushui.github.io/FortuneSummoners-Manual`
- **Instructions**:
  1. Defaults to Simplified Chinese (switch to English via top-right button).
  2. Left sidebar for navigation; click for seamless content loading.
  3. Supports bookmarking sections via hash routing.

### Scenario 2: Quick Local Use

For offline access, download the ZIP:

1. Visit the GitHub repo: `https://github.com/JayMuShui/FortuneSummoners-Manual`
2. Download ZIP via "Code" > "Download ZIP".
3. Extract to a path without special characters.

- **Modern Version**: Open `index.html` in root.
- **Original Version**: Open `_html4/main.htm` (note potential layout issues in modern browsers).

### Scenario 3: Local Cloning for Development

For extensions or modifications:

1. Install Git.
2. Clone: `git clone https://github.com/JayMuShui/FortuneSummoners-Manual.git`
3. Modify files as needed (e.g., add languages in `docs/` and update scripts).

### Compatibility Notes

- ✅ Modern browsers (Chrome, Firefox, Edge, Safari): Full support.
- ⚠️ Legacy browsers (IE11 and below): Unsupported (uses modern features).
- ⚠️ Original HTML4: Weakened `<frameset>` support; for reference only.

## 💡 Project Value

### Technical Reference Value

A complete, framework-free HTML4-to-HTML5 migration case, covering:

1. Layout refactoring from framesets to semantic + Flex.
2. Encoding migration and multi-language handling.
3. Static multi-page to native SPA transformation.
4. Resource organization improvements.
5. Pure static project practices for foundational understanding.

## 💭 Personal Story

### Project Origin

Until finishing this documentation, I had only a superficial knowledge of the game—I'd never played it before. The idea started as a small personal favor. My significant other has always been nostalgic and wanted to revisit a niche game from her otaku days in college. She stumbled upon *Fortune Summoners* on Steam, a childhood favorite, and went through great effort to apply a fan translation patch—only for Steam's integrity checks to remove it automatically. She asked me to help sort it out.

While troubleshooting the patch, I discovered this dusty HTML4 English manual in the Steam files. Seeing the outdated `<frameset>` layout and scattered images, I thought: if she replays it now without fully grasping the systems or finishing the story from back then, those childhood memories might not feel complete. So, I decided to tackle this project—a win-win: it gives her a high-quality guide in her preferred language to truly appreciate the game, and it serves as a hands-on example of frontend concepts she's exploring.

### Project Meaning

For her, it has multiple layers of value:

1. A proper manual to deeply understand the mechanics and design, turning blind playthroughs into meaningful appreciation.
2. Side-by-side comparison of old and new versions to see HTML evolution in action—more intuitive than abstract tutorials.
3. Dissecting the code to grasp native interactions, building solid fundamentals.

For me, it's a heartwarming example of applying tech to everyday life. It also offered a nostalgic dive into retro web tech, appreciating how far frontend has come and what makes a well-structured project.

### Project Outcomes and Time Investment

Completed in about 5-6 hours:

- Migration (2-3 hours): Structure analysis, refactoring, and dynamic logic.
- Translation and optimization (2-3 hours): Content translation and formatting.
- Testing (1 hour): Cross-browser and multi-scenario checks.

Passed self and AI reviews; all features stable.

## 📄 Copyright Statement

**Important Notice**: All game-related content (names, characters, images, text, systems, etc.) is copyrighted by developer **Lizsoft** and publisher **Carpe Fulgur**. All rights reserved.

This project is for personal learning and niche game archiving only—no commercial profit or redistribution:

- ✅ Technical learning/reference.
- ✅ Personal non-commercial use.
- ✅ Archival support for niche games.

It modernizes and translates the official Steam English manual; original files are official, and no game content copyright is claimed.

## 🔮 Future Outlook

Core migration and bilingual support complete. No formal long-term maintenance planned due to its personal/archival nature, but extensible foundation allows:

- 🌍 Multi-language expansions and translation refinements.
- 🎨 UI/UX improvements (e.g., mobile optimization, dark mode).
- 📚 Additional game-related documentation.

All code and resources are open-source on GitHub. Contributions welcome under copyright guidelines to support niche preservation and frontend learning.

# 🔗 Reference Links

- [Steam English ver.1.2 HTML5 Modernized Manual (English/Simplified Chinese)](https://jaymushui.github.io/FortuneSummoners-Manual)
- [Steam English ver.1.2](https://store.steampowered.com/app/203510/)
- [Steam Japanese ver.1.6](https://store.steampowered.com/app/1381770/)
- [Official Website (Japanese)](http://lizsoft.jp/fs/)
- [Wikipedia (Japanese)](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A9%E3%83%BC%E3%83%81%E3%83%A5%E3%83%B3%E3%82%B5%E3%83%A2%E3%83%8A%E3%83%BC%E3%82%BA_%E3%80%9C%E3%82%A2%E3%83%AB%E3%83%81%E3%82%A7%E3%81%AE%E7%B2%BE%E9%9C%8A%E7%9F%B3%E3%80%9C)
- [Wikipedia (English)](https://en.wikipedia.org/wiki/Fortune_Summoners:_Secret_of_the_Elemental_Stone)
- [Baidu Baike（Simplified Chinese）](https://baike.baidu.com/item/%E5%91%BD%E8%BF%90%E5%8F%AC%E5%94%A4%E5%B0%94%E8%8C%84%E7%9A%84%E7%B2%BE%E7%81%B5%E7%9F%B3)
>2025/12/30 14:00:00 (UTC)


