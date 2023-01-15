# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2022-xx-xx

### Added

- Added season management
- Added achievement deletion
- Added duplicate match prevention
- Added achievement tests
- Added season selector

### Changed

- Improved match deletion

### Fixed

- Fix Underdog and similar achievements

## [0.2.0] - 2022-12-21

### Added
- Added seasons
- Added team profiles
- Added achievements
- Added dark mode
- Added match table filtering
- Added animations
- Added tRPC
- Added CHANGELOG
- Added README
- Added LICENSE
- Added GitHub workflow
- Added utility scripts (`utils:migrate-sqlite` and `teams:recalculate-ratings`)

### Changed
- Switched from SQLite to MySQL
- Improved React component structure
- Changed elo `k` factor to be dynamic

### Fixed
- Fixed OpenSSL alpine docker issue (by using `alpine:3.16` instead of `alpine:latest`)

### Removed
- Removed old Statistics page
- Removed monthly leaderboards (for now)

## [0.1.0] - 2022-04-27

### Added
- Initial Release
