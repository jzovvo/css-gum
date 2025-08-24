# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-08-25

### Added

- **Space Parameter**: Added optional `space` parameter to `vw()` and `vh()` functions for Tailwind CSS compatibility
  - `space: 1` (default) - Adds trailing space for multi-value syntax
  - `space: 0` - No trailing space for single values
  - Fixes Tailwind CSS compilation issue where values concatenate without spaces
- New `SpaceFlag` type (1 | 0) for space parameter
- Comprehensive Q&A section explaining space parameter rationale
- Enhanced documentation with Tailwind CSS usage examples

### Changed

- **Breaking**: Updated `vw(pixel, designDraft, space?)` signature with optional space parameter
- **Breaking**: Updated `vh(pixel, designDraft, space?)` signature with optional space parameter
- Generated functions from Gen module now include space parameter support
- Enhanced README documentation in both English and Traditional Chinese
- Updated all test cases to match new API with space parameter

### Fixed

- **Critical**: Tailwind CSS multi-value syntax compilation issue (`padding: 1.39vw2.08vw` → `padding: 1.39vw 2.08vw`)

## [1.1.0] - 2025-08-24

### Added

- Conditional exports in package.json for browser/node environments
- New `writeSnippetsToFiles` function for Node.js environments
- Comprehensive project documentation and release guide

### Changed

- Split into separate entry points: `index.browser.ts` and `index.node.ts`
- Updated Gen module API: `genVSCodeSnippet()` method → `VSCodeSnippet` property
- Moved file writing functionality to separate `snippets-file.ts` module
- Updated dependencies to match package-lock.json versions
- Improved tsup configuration consistency with TypeScript target

### Fixed

- Browser compatibility issue with `fs` module resolution
- Separated Node.js file operations from browser code using conditional exports

### Removed

- Dynamic imports (no longer needed)
- Redundant index.ts file
- Non-JSDoc comments from codebase

## [1.0.0] - 2024-08-24

Initial stable release with comprehensive CSS viewport utility functions and VSCode integration.

### Added

- **Core Functions**: Complete set of viewport unit converters
  - `vw`, `vh` - Basic viewport units conversion
  - `vwc`, `vhc` - Constrained viewport units (prevents scaling beyond design size)
  - `vwe`, `vhe` - Extended viewport units for screens larger than design drafts
  - `percent`, `em`, `lh` - Additional utility converters
- **Util Module**: Curried versions of all core functions for functional programming
- **Gen Module**: Batch generation system for multiple design breakpoints with customizable function names
- **Snippet Module**: Auto-generation of VSCode code snippets for enhanced developer experience
- **Browser/Node.js Support**: Conditional exports for different environments
- **Comprehensive Documentation**: Complete API docs in English and Traditional Chinese
- **Example Integration**: PostCSS Functions example with visual demonstrations
- **Developer Tools**:
  - Comprehensive test suite with 94.89% coverage
  - Error handling with colored console messages
  - CI/CD pipeline with GitHub Actions
  - Code quality tools: ESLint, Prettier, TypeScript, Husky

### Features Evolution (0.0.1 → 1.0.0)

- **0.0.1-0.0.3**: Initial project structure and core viewport conversion functions
- **0.0.4**: Added Vite example integration and custom function naming
- **0.0.5**: Performance optimizations and GitHub compatibility improvements
- **0.0.6**: Enhanced documentation with visual demonstrations
- **1.0.0**: Major feature completion with VSCode integration and comprehensive tooling

### Browser Support

- Modern browsers with viewport units (`vw`, `vh`)
- CSS `calc()` function support
- CSS `min()`/`max()` functions support
