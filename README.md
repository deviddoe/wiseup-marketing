# Wiseup plugins for Claude Code

A Claude Code plugin marketplace. Add it once, then install what you need.

```bash
claude plugin marketplace add <this repository's URL>
```

## Plugins

### [Wiseup Marketing](./wiseup-marketing) (`wiseup-marketing`)

A complete marketing department you can drop into any project: a CMO orchestrator, nine specialist agents, and a self-contained `Marketing/` folder for everything they produce. It ships with **no brand, no colours, no fonts, no language and no prices** - all of that is captured in a first-run interview instead of assumed - and no agent ever publishes, sends or spends anything.

```bash
claude plugin install wiseup-marketing@wiseup
```

Then, in the project that needs a marketing department:

```
/wiseup-marketing:wm-init
```

Full documentation: [wiseup-marketing/README.md](./wiseup-marketing/README.md).

## Licence

MIT - see [LICENSE](./LICENSE).

Wiseup Marketing bundles two MIT-licensed projects, with attribution and licence texts preserved: the [AI Marketing Suite](https://github.com/zubair-trabzada/ai-marketing-claude) by Zubair Trabzada, and the [grilling skills](https://github.com/mattpocock/skills) by Matt Pocock. Details in [wiseup-marketing/THIRD-PARTY.md](./wiseup-marketing/THIRD-PARTY.md).
