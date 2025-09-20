# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2025-09-20

### Added

- **Universal Space Parameter Support**: Extended space parameter support to all Core module functions
  - All viewport functions now support space parameter: `vwc`, `vhc`, `vwe`, `vhe` and their variants (`dvwc`, `lvwc`, `svwc`, etc.)
  - Extended to utility functions: `percent`, `em`, `lh` now all support optional space parameter
  - Consistent API across all Core functions with uniform space handling
  - Enhanced flexibility for spacing control in all CSS unit calculations

### Enhanced

- **Core Module Refactoring**: Comprehensive refactoring of Core module architecture
  - Introduced unified `exec` function for consistent parameter validation and space handling
  - Streamlined error handling across all Core functions with centralized logic
  - Improved code maintainability and consistency
  - Better separation of concerns between validation, execution, and space handling

- **Gen Module Integration**: Updated Gen module to fully support new space parameter system
  - All generated functions from `genFuncsDraftWidth` and `genFuncsDraftHeight` now properly pass space parameters
  - Enhanced integration between Core and Gen modules for consistent behavior
  - Improved function generation logic to handle space parameters correctly

- **Validation Module Improvements**: Refactored validation module for better error handling
  - Enhanced parameter validation with more robust error reporting
  - Improved validation functions for better type safety and error messages
  - Better integration with the new unified execution system

### Changed

- **API Consistency**: Standardized space parameter behavior across all functions
  - All Core functions now follow the same pattern: `function(params..., space?: SpaceFlag)`
  - Consistent space parameter handling eliminates API inconsistencies
  - Better developer experience with uniform function signatures

### Fixed

- **Test Coverage**: Updated comprehensive test suite for new space parameter system
  - Added tests for all newly supported space parameters across Core functions
  - Enhanced test coverage for Gen module space parameter integration
  - Improved test reliability and coverage for edge cases

### Documentation

- **Complete Documentation Update**: Updated all documentation to reflect space parameter changes
  - README files (English and Traditional Chinese) updated with correct API signatures
  - Simplified parameter documentation with categorized approach instead of exhaustive lists
  - Enhanced examples and usage patterns for new space parameter functionality
  - Better API documentation structure for improved readability

## [1.4.0] - 2025-09-09

### Added

- **Snippet Prefix Parameter**: New `snippetPrefix` parameter decoupled from function name parameters
  - Added independent snippet prefix parameters for all generation functions
  - `genFuncsDraftWidth()`, `genFuncsDraftHeight()`, and `genFuncsCore()` now support custom snippet prefixes
  - Allows different snippet prefixes while maintaining original function names
  - Available for all viewport units: `snippetPrefixVw`, `snippetPrefixDvw`, `snippetPrefixVh`, etc.
  - Enhanced flexibility for VSCode snippet customization

### Changed

- **Breaking**: Changed `firstIndex` parameter default from `1` to `0`
  - Updated default starting index to align with standard programming convention (0-based indexing)
  - Affects `genFuncsDraftWidth()`, `genFuncsDraftHeight()`, and related generation functions
  - Better consistency with array indexing and general programming expectations
  - Users relying on the previous default should explicitly set `firstIndex: 1`

### Enhanced

- **Generation Function Flexibility**: Improved customization options for generated functions
  - Better separation of concerns between function naming and snippet prefixes
  - More intuitive parameter defaults aligned with common programming patterns
  - Enhanced developer experience with more predictable behavior

## [1.3.3] - 2025-09-08

### Fixed

- **Space Parameter Validation**: Fixed bug where passing string `'1'` as space parameter would not add trailing space
  - Updated `spaceFlagSchema` to use `z.coerce.number().pipe(z.union([z.literal(1), z.literal(0)]))` for proper string-to-number conversion
  - Added `checkSpaceFlag` validation function with comprehensive error handling
  - Enhanced Core module functions to properly validate both viewport and space parameters separately
  - Fixes issue with PostCSS Functions where parameters are received as strings instead of numbers

### Added

- **Comprehensive Test Coverage**: Significantly improved test coverage for edge cases
  - Added complete test suite for `checkSpaceFlag` function with 9 test cases covering all input types
  - Enhanced Core module error handling tests for clamp, percent, em, lh, and extend functions
  - Added tests for invalid space parameter combinations and error scenarios
  - Increased overall test coverage: statements 99.02% → 100%, branches 93.38% → 96.01%
  - Core module coverage improved from 87.67% to 100%
  - Total tests increased from 148 to 167 test cases

### Changed

- **Enhanced Error Handling**: Improved error reporting for parameter validation
  - Core module functions now separately validate viewport and space parameters
  - Better error messages for invalid space flag inputs
  - More granular error reporting with multiple validation failures handled appropriately

## [1.3.2] - 2025-09-07

### Fixed

- Improved error handling for file operations in `build-configs/io.ts` and `build-snippets/io.ts`
  - Added try-catch blocks around `fs.writeFileSync` operations to handle write failures gracefully
  - Enhanced error messages with specific file path information
- Updated test coverage to include write error scenarios

### Documentation

- Updated example configurations for v1.3.2

## [1.3.1] - 2025-09-07

### Fixed

- **VSCode Snippet Generation**: Fixed `genVSCodeSnippetPicture` pointOffset calculation for React version
  - Previously pointOffset was not being applied to React-specific picture snippets
  - Now correctly calculates pointOffset for both HTML and React variants

### Added

- Enhanced test coverage for snippet generation functions
  - Added comprehensive tests for pointOffset functionality
  - Improved test cases for picture snippet generation

## [1.3.0] - 2025-09-07

### Added

- **Tailwind CSS Config Generation**: New Config module for generating Tailwind CSS breakpoint configurations
  - `genTailwindBreakpointConfig()` - Generate CSS @theme rules with custom breakpoints
  - `writeConfigToFiles()` - Write config files with automatic backup and directory creation
  - Supports custom prefixes, units, wrappers, and ordering
- **Enhanced VSCode Snippets**: New responsive snippet generation functions
  - `genVSCodeSnippetMediaQuery()` - Generate media query snippets with both bracket and indent syntax variants
  - `genVSCodeSnippetPicture()` - Generate responsive picture element snippets for HTML and React
  - Support for custom scopes, prefixes, and breakpoint offsets
- **Extended Viewport Units**: Comprehensive support for all modern viewport units
  - Added `dvw`, `dvh` (dynamic viewport), `lvw`, `lvh` (large viewport), `svw`, `svh` (small viewport)
  - Extended clamped variants: `dvwc`, `dvhc`, `lvwc`, `lvhc`, `svwc`, `svhc`
  - Extended scaling variants: `dvwe`, `dvhe`, `lvwe`, `lvhe`, `svwe`, `svhe`
  - All variants available in Core, Util, and Gen modules

### Changed

- **Architecture Refactoring**: Improved project structure and organization
  - Reorganized directory structure for better maintainability
  - Enhanced type definitions with `ViewportWidthUnit` and `ViewportHeightUnit` types
  - Improved code organization across modules
- **Enhanced File Operations**: Improved file writing with better error handling and backup logic
  - Config files are only backed up when existing content is non-empty
  - Better error messages and recovery mechanisms
  - Automatic directory creation and file conflict resolution

### Fixed

- **Percentage Calculation**: Fixed division by zero issue in `cssPercent` function
  - Now properly handles cases where denominator is 0
  - Improved error handling and edge case management

### Documentation

- Updated README with new Config module documentation
- Enhanced API documentation for all new viewport units
- Added comprehensive examples for Tailwind CSS integration
- Improved PostCSS Functions example with latest features

## [1.2.1] - 2025-09-04

### Added

- **Snippet Scope Parameter**: Added `scope` parameter to all VSCode Snippet generation functions
  - `genVSCodeSnippetCore()`, `genVSCodeSnippetDraftWidth()`, `genVSCodeSnippetDraftHeight()` now accept optional `scope` parameter
  - `genFuncsDraftWidth()`, `genFuncsDraftHeight()`, `genFuncsCore()` now accept optional `scope` parameter for generated snippets
  - Default scope: `'html,css,sass,scss,less,stylus'` covers most style-related file types
  - Allows precise control over which file types can trigger VSCode snippets
  - Enhanced documentation with scope parameter usage examples and Q&A section

### Changed

- **Snippet Body Enhancement**: All generated VSCode snippets now include `$0` cursor position marker
  - Improves snippet user experience by positioning cursor at the end after expansion
  - Follows VSCode snippet best practices
- **Code Refactoring**: Reorganized `snippets.ts` module with improved structure
  - Functions now use object parameters instead of positional parameters for better maintainability
  - Enhanced JSDoc documentation with complete parameter descriptions
  - Improved type definitions and interfaces

### Fixed

- Enhanced test coverage for scope parameter functionality
- Updated all tests to expect `$0` marker in snippet bodies
- Improved code organization and maintainability

### Documentation

- **Complete README Updates**: Both English and Traditional Chinese versions updated
  - Added comprehensive scope parameter documentation
  - Enhanced examples showing scope parameter usage
  - New Q&A section explaining scope parameter benefits
  - Updated API documentation with complete parameter lists

## [1.2.0] - 2025-08-26

### Changed

- **Breaking**: Space parameter default value changed from `1` to `0`
  - `vw()` and `vh()` functions now default to no trailing space
  - This aligns better with common usage patterns where single values don't need trailing spaces
  - Use `space: 1` parameter explicitly if trailing space is needed for multi-value contexts
- **Gen Module Enhancement**: Added `space` parameter to generation functions
  - `genFuncsDraftWidth()`, `genFuncsDraftHeight()`, and `genFuncsCore()` now accept optional `space` parameter
  - Allows generating functions with pre-configured space behavior
  - Generated functions can still override space parameter at call time

### Added

- Enhanced cspell configuration for better spell checking
- Comprehensive test suite reorganization with improved coverage
  - New `browser-index.test.ts` for browser environment testing
  - New `console-utils.test.ts` for console utility validation
  - New `file-operations.test.ts` for file system operations
  - New `integration.test.ts` for end-to-end testing
  - New `validate.test.ts` for input validation testing
- Improved error handling and validation logic
- NextJS integration example documentation

### Fixed

- Test organization and maintainability improvements
- Better separation of concerns in test files
- Enhanced validation error messages and handling

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
