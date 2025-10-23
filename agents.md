# Agents & Lovable Compatibility

This repository is wired to the Lovable prompting environment. Use this guide whenever you (or another agent) propose code changes so that every update remains compatible with Lovable's DOM tagging system.

## Core Principles
- **Keep the tagger active:** Never remove the `componentTagger` plugin from `vite.config.ts`; Lovable depends on it to inject `data-component-id` attributes when the project runs inside the hosted editor.
- **Preserve stable wrappers:** Lovable anchors edits to predictable wrapper nodes. Keep named React components with a single, semantic root element (`section`, `main`, etc.) so the generated IDs remain stable between prompts.
- **Prefer deterministic structure:** Do not generate DOM nodes conditionally just for styling. If a node must be optional, wrap it in a parent with a deterministic `data-component-id`.
- **Respect existing `data-*` attributes:** If you encounter manually added `data-component-id` (or other Lovable-specific tags), keep them unchanged unless a rename is absolutely required.

## ID Naming Conventions
- **Format:** `component-name__element` in kebab-case. Example: `data-component-id="hero-section__cta-button"`.
- **Component alignment:** The portion before `__` should mirror the React component or file name. The part after `__` should describe the specific element role.
- **Manual additions:** Add explicit IDs only when the automatic tagger cannot reach the node (e.g., dynamically rendered lists). Reuse existing prefixes to keep Lovable’s component tree tidy.

## Prompting & Automation Checklist
- Always mention in prompts that changes must remain “Lovable-compatible” so downstream agents keep the tagging rules in mind.
- When restructuring layouts, confirm that each major section still has a unique root element that the tagger can decorate.
- If you add new JSX helpers that return fragments, either wrap them in a tagged element or clearly explain why Lovable will not need to target them directly.

## Validation Steps
- Run `npm run lint` to catch obvious JSX issues that could break the tagger.
- Verify that new components export a default React component and are imported through the existing `@` alias structure—Lovable’s tooling expects this layout.
- Before shipping significant structural changes, skim the rendered JSX (or the build output) to ensure `data-component-id` attributes look consistent with the established `component-name__element` pattern.
