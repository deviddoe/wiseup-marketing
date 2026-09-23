# SOP 01 - Approval workflow

Every deliverable - a post, an ad, a landing spec, a report, an outreach message, a visual - carries a `status` in its frontmatter.

```
draft --> review --> approved --> published
  ^         |
  +- changes+        (owner's notes send it back to draft)
```

| Status | Who sets it | Means |
|---|---|---|
| `draft` | the specialist agent | in progress |
| `review` | CMO, after the quality check | ready for the owner to look at |
| `approved` | CMO, **only after the owner says yes in chat** | may be published |
| `published` | CMO, when the owner says it is live | published; add `published_at` and `url` |
| `rejected` | CMO, after the owner declines | with the reason recorded |

## The CMO's check before `review`
1. **Brief**: does it answer the task - right segment, channel, goal?
2. **Claims**: `_context/claims-policy.md`. One violation is enough to send it back to `draft`.
3. **Voice**: `_context/brand-voice-guide.md` - tone, form of address, glossary.
4. **Language**: spelling, natural phrasing, no machine-translation feel.
5. **CTA and link**: correct destination, UTM present (SOP 02).
6. **File**: right folder, right name, complete frontmatter.

## Presenting to the owner
The CMO writes, in the reply language:
- what is ready, with file links
- what needs the owner's decision
- what the owner must do personally

Owner's answers: approval sets `approved`; notes send it back to `draft` with a `## Revision notes` section; a no sets `rejected` with the reason.

## Later: automatic publishing
When platform APIs are connected, an agent may publish **only** material already at `approved`, and only after the owner confirms that specific item in chat.
