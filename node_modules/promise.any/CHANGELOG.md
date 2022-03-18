# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.3](https://github.com/es-shims/Promise.any/compare/v2.0.2...v2.0.3) - 2021-12-27

### Commits

- [Tests] migrate tests to Github Actions; reuse common workflows [`c63969e`](https://github.com/es-shims/Promise.any/commit/c63969e02b2d67a1e911f7bf1e42f20d9d0c2b1d)
- [meta] do not publish workflow files [`4ff056f`](https://github.com/es-shims/Promise.any/commit/4ff056feb0710f962008645babf0461de6379bc5)
- [Tests] run `nyc` on all tests; use `tape` runner; add `implementation` tests [`12d6b33`](https://github.com/es-shims/Promise.any/commit/12d6b330d0ec8818e3485476db2ee613af83a212)
- [Fix] remove an incorrect observable subclass `.then` call [`e1ea758`](https://github.com/es-shims/Promise.any/commit/e1ea7587f44bf62a441ce4ddf5e792df18ba9bb0)
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `@es-shims/api`, `aud`, `es6-shim`, `functions-have-names`, `safe-publish-latest`, `tape` [`78d952b`](https://github.com/es-shims/Promise.any/commit/78d952b471459029830d66e28aed8b6c2aa4c8a6)
- [Fix] a poisoned `.then` should not be wrapped in an AggregateError [`a103a3e`](https://github.com/es-shims/Promise.any/commit/a103a3ef713c3b15245a11d8fda832246118012e)
- [meta] add `auto-changelog` [`85a371f`](https://github.com/es-shims/Promise.any/commit/85a371f9f40f2b60dc6db5619f46d3041a20dc36)
- [readme] remove travis badge; add github actions/codecov badges; update URLs [`af66814`](https://github.com/es-shims/Promise.any/commit/af668149cd90f8570fc3098324d86c32f4233c87)
- [readme] update to point to finished spec [`3ae1cd9`](https://github.com/es-shims/Promise.any/commit/3ae1cd935b572e0e357ab275aa1c24733474ca21)
- [Deps] update `array.prototype.map`, `es-abstract`, `es-aggregate-error` [`885cd59`](https://github.com/es-shims/Promise.any/commit/885cd5905d90ca14a6b9a0597ac8a4590824ef28)

<!-- auto-changelog-above -->
v2.0.2 / 2020-03-09
=================
  * [Fix] avoid "Promise.all called on non-object" error
  * [Docs] fix rejection examples
  * [Deps] update `array.prototype.map`, `es-abstract`, `es-aggregate-error`, `iterate-value`
  * [meta] only run `aud` on prod deps
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `tape`, `functions-have-names`; add `aud`
  * [actions] add "Allow Edits" workflow
  * [actions] switch Automatic Rebase workflow to `pull_request_target` event

v2.0.1 / 2019-12-14
=================
  * [Fix] no longer require `Array.from`; works in older envs
  * [Refactor] use split-up `es-abstract` (39% bundle size decrease)
  * [Deps] update `es-abstract`, `es-aggregate-error`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `safe-publish-latest`
  * [meta] add `funding` field
  * [Tests] run `evalmd` in `postlint`
  * [Tests] use shared travis-ci configs
  * [actions] add automatic rebasing / merge commit blocking

v2.0.0 / 2019-10-21
=================
  * [Breaking] `Promise.any` rejects with an `AggregateError`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `functions-have-names`
  * [Deps] update `es-abstract`

v1.0.0 / 2019-03-27
=================
  * Initial spec-compliant release.

v0.1.1 / 2016-10-26
=================
  * Some improvements.

v0.1.0 / 2016-08-17
=================
  * Initial release of forked version of `promise-any`.
