# 📦 Release Guide

This guide outlines the release process for css-gum, including automated workflows, manual steps, and best practices.

## 🚀 Quick Release Commands

| Version Type | Command                 | When to Use                       |
| ------------ | ----------------------- | --------------------------------- |
| **Patch**    | `npm run release:patch` | Bug fixes, minor improvements     |
| **Minor**    | `npm run release:minor` | New features, backward compatible |
| **Major**    | `npm run release:major` | Breaking changes                  |

## 📋 Pre-Release Checklist

Before releasing, ensure all checks pass:

```bash
# Run all quality checks
npm run release:check
```

This command runs:

- ✅ Linting (`npm run lint`)
- ✅ Type checking (`npm run typecheck`)
- ✅ Tests (`npm run test:run`)
- ✅ Build (`npm run build`)

## 🔄 Release Process

### 1. Prepare for Release

1. **Update dependencies** (if needed):

   ```bash
   npm audit
   npm outdated
   ```

2. **Run quality checks**:

   ```bash
   npm run release:check
   ```

3. **Commit all changes**:
   ```bash
   git add .
   git commit -m "chore: prepare for release"
   ```

### 2. Create Release

Choose the appropriate version bump:

```bash
# For bug fixes (0.0.6 → 0.0.7)
npm run release:patch

# For new features (0.0.6 → 0.1.0)
npm run release:minor

# For breaking changes (0.0.6 → 1.0.0)
npm run release:major
```

### 3. Automated Release Pipeline

Once you push the version tag, GitHub Actions automatically:

1. **Runs CI Pipeline** (`test.yml`):
   - Tests on Node.js 18.x and 20.x
   - Linting and type checking
   - Build verification
   - Coverage reports

2. **Triggers Release** (`release.yml`):
   - Runs full test suite again
   - Publishes to npm registry
   - Creates GitHub release with changelog

## 🛠️ Manual Release Steps

If you need to release manually:

1. **Version bump**:

   ```bash
   npm version [patch|minor|major]
   ```

2. **Push with tags**:

   ```bash
   git push origin master --tags
   ```

3. **Publish to npm** (if automated publishing fails):
   ```bash
   npm publish
   ```

## 📝 Version Guidelines

### Patch Releases (0.0.X)

- Bug fixes
- Documentation updates
- Performance improvements
- Internal refactoring

### Minor Releases (0.X.0)

- New features
- New APIs (backward compatible)
- Deprecations (with warnings)
- Major performance improvements

### Major Releases (X.0.0)

- Breaking API changes
- Removed deprecated features
- Major architectural changes
- Minimum Node.js version changes

## 🔍 Release Verification

After release, verify:

1. **npm package**:

   ```bash
   npm view css-gum
   npm info css-gum@latest
   ```

2. **GitHub release**:
   - Check [releases page](https://github.com/jzovvo/css-gum/releases)
   - Verify release notes and assets

3. **Installation test**:
   ```bash
   npm install css-gum@latest
   ```

## 🚨 Rollback Process

If a release has issues:

1. **npm deprecate** (for npm):

   ```bash
   npm deprecate css-gum@X.Y.Z "Issue found, use X.Y.Z-1 instead"
   ```

2. **Delete GitHub release** (if needed):
   - Go to GitHub releases page
   - Delete the problematic release
   - Delete the git tag locally and remotely:
     ```bash
     git tag -d vX.Y.Z
     git push origin --delete vX.Y.Z
     ```

## 📊 Release Monitoring

Monitor releases through:

- **npm downloads**: [npmjs.com/package/css-gum](https://www.npmjs.com/package/css-gum)
- **GitHub insights**: Repository → Insights → Traffic
- **Issues/feedback**: Monitor GitHub issues after releases

## 🔧 Troubleshooting

### Common Issues

**CI fails on release:**

- Check GitHub Actions logs
- Ensure all tests pass locally
- Verify npm token is valid

**npm publish fails:**

- Check npm authentication: `npm whoami`
- Verify package version is unique
- Check npm registry status

**GitHub release not created:**

- Verify `softprops/action-gh-release` action permissions
- Check repository settings → Actions permissions
- Ensure GITHUB_TOKEN has write access

### Emergency Fixes

For critical bugs requiring immediate release:

1. Create hotfix branch from master
2. Make minimal fix
3. Run `npm run release:check`
4. Create patch release
5. Merge back to master

## 📚 Related Documentation

- [npm version documentation](https://docs.npmjs.com/cli/v9/commands/npm-version)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions workflow runs](https://github.com/jzovvo/css-gum/actions)

---

💡 **Tip**: Always test the release process in a fork or test environment before applying to the main repository.
