# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Manual call to `game.logOut()` after setting user password. Seems like v11 and up does not log out when the password changed.

### Changed

- Code style implemented
- Courtesy of @esheyw
    - Various code cleanup
    - Replaced deprecated `fas` with `fa-solid`
    - Added form tag wrapper to dialog
    - Improve dialog ids to better follow HTML standards
    - Future proofing for FoundryVTT v13

## [2.2.0] - 2024-12-13

### Added

- Verified for Foundry VTT 13

### Fixed

- Bug in password confirmation check (thanks @GyroFalc)

## [2.1.0] - 2024-07-06

### Added

- Settings menu item to allow exposing the `updatePasswordDialog()` function to macros and scripts
    - Defaults to false
    - Exposed at `game.updateYourPassword.showDialog()`

## [2.0.0] - 2024-06-13

### Added

- Verified for Foundry VTT 12

### Changed

- Changed token controls default visibility to false

## [1.1.0] - 2023-06-24

### Added

- Menu option to change password in user list
- Settings to control visibility of token controls and user list menu items
    - Both default to true
- Verified for Foundry VTT 11

## [1.0.0] - 2022-12-29

### Added

- First release
