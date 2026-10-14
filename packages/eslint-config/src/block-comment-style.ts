import type { Rule } from 'eslint';

/**
 * Tooling directives are not recognised inside block comments (ESLint inline
 * directives, TS `@ts-*` pragmas), so they must stay `//` and are exempt.
 */
const DIRECTIVE_COMMENT = /^\s*(eslint\b|@ts-|globals?\b|exported\b)/;

/**
 * Repo convention: every comment is a JSDoc-style block (a `/**` opener), even
 * single-line. Off-the-shelf rules cannot enforce the `/**` opener (ESLint
 * Stylistic's `multiline-comment-style` emits single-star openers and treats
 * `/**` as author-owned), so we enforce it here:
 *   - a `//` line comment becomes a single-line `/**` block;
 *   - a single-star block gains the second star, preserving its existing
 *     aligned-`*` body (an aligned block body is identical under a single- or
 *     double-star opener, only the opener differs).
 * A block already opening with `/**` is left untouched. Directive comments are
 * exempt. Multi-line `//` runs are converted line-by-line, not merged.
 *
 * Not wired into any config yet: untested. Register it as a `lagetech/block-comment-style`
 * plugin rule once it is.
 */
export const blockCommentStyle: Rule.RuleModule = {
  meta: {
    type: 'layout',
    fixable: 'code',
    schema: [],
    messages: {
      lineToJsdoc: 'Use a /** … */ block comment instead of a // line comment.',
      blockToJsdoc: 'Use a /** … */ JSDoc block (double-star opener).',
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          if (!comment.loc || !comment.range || DIRECTIVE_COMMENT.test(comment.value)) {
            continue;
          }
          const range = comment.range;
          if (comment.type === 'Line') {
            context.report({
              loc: comment.loc,
              messageId: 'lineToJsdoc',
              fix: (fixer) => fixer.replaceTextRange(range, `/** ${comment.value.trim()} */`),
            });
            continue;
          }
          /**
           * Block comment: conforming only when it already opens with a
           * double-star, i.e. the text between the delimiters starts with `*`.
           */
          if (!comment.value.startsWith('*')) {
            context.report({
              loc: comment.loc,
              messageId: 'blockToJsdoc',
              fix: (fixer) => fixer.replaceTextRange(range, `/**${comment.value}*/`),
            });
          }
        }
      },
    };
  },
};
