# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.0] - 2023-04-27

### Changed

- Make schema validation optional to avoid needing a schemaValidator if no schema validation is required

## [4.0.0] - 2021-10-02

### Breaking

- Dropped support for Node 10!

### Changed

- Updated devDependencies to latest versions

## [3.0.0] - 2020-11-28

## Added

- Ability to set global configuration for data path and schema validation function.

## Changed

- Upgraded README.md to explain usage and all available options.
- Reworked internal structure to make project more future-proof.

## Removed

- Removed `@hapi/joi` dependency to decouple package and provide better flexibility for end-users.

### Potentially Breaking

- Added `schemaValidator` function to validate data against Joi schemas and removed `@hapi/joi` validation functionality. This will break projects that were already using schema validation in their tests!!!
