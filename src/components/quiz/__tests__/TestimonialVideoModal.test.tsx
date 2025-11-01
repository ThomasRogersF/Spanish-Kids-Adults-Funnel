/**
 * Tests for TestimonialVideoModal
 * Fix: use relative import to avoid alias resolution issues in non-Vite test runners.
 */

import { TestimonialVideoModal } from "../TestimonialVideoModal";

// Declare minimal test globals to satisfy TypeScript when test runner types are absent.
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (value: unknown) => { toBe: (expected: unknown) => void };

// Smoke test: component should be a function (React FC)
describe("TestimonialVideoModal", () => {
  it("exports a React component function", () => {
    expect(typeof TestimonialVideoModal).toBe("function");
  });
});