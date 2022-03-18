## 14.1.0 (2022-01-25)

* chore(deps): bumping all out of date deps (#51) ([926763b](https://github.com/readmeio/oas-to-har/commit/926763b)), closes [#51](https://github.com/readmeio/oas-to-har/issues/51)
* chore(deps): bumping node-fetch ([1405d30](https://github.com/readmeio/oas-to-har/commit/1405d30))
* feat: add support for styles on multipart/form-data request bodies (#50) ([e7596bd](https://github.com/readmeio/oas-to-har/commit/e7596bd)), closes [#50](https://github.com/readmeio/oas-to-har/issues/50)
* fix: check for orphaned apiDefinition-less pages (#52) ([04ed408](https://github.com/readmeio/oas-to-har/commit/04ed408)), closes [#52](https://github.com/readmeio/oas-to-har/issues/52)



## <small>14.0.5 (2022-01-03)</small>

* chore(deps-dev): bump @commitlint/cli from 15.0.0 to 16.0.1 (#45) ([4ce0b94](https://github.com/readmeio/oas-to-har/commit/4ce0b94)), closes [#45](https://github.com/readmeio/oas-to-har/issues/45)
* chore(deps-dev): bump @commitlint/config-conventional (#48) ([dc5195a](https://github.com/readmeio/oas-to-har/commit/dc5195a)), closes [#48](https://github.com/readmeio/oas-to-har/issues/48)
* chore(deps-dev): bump @readme/eslint-config from 8.0.4 to 8.1.1 (#46) ([8788c1e](https://github.com/readmeio/oas-to-har/commit/8788c1e)), closes [#46](https://github.com/readmeio/oas-to-har/issues/46)
* chore(deps-dev): bump eslint from 8.4.1 to 8.6.0 (#47) ([e211feb](https://github.com/readmeio/oas-to-har/commit/e211feb)), closes [#47](https://github.com/readmeio/oas-to-har/issues/47)
* chore(deps): bump actions/setup-node from 2.5.0 to 2.5.1 (#43) ([a05def3](https://github.com/readmeio/oas-to-har/commit/a05def3)), closes [#43](https://github.com/readmeio/oas-to-har/issues/43)
* chore(deps): bump oas from 17.3.2 to 17.4.0 (#44) ([8abb825](https://github.com/readmeio/oas-to-har/commit/8abb825)), closes [#44](https://github.com/readmeio/oas-to-har/issues/44)
* chore(deps): upgrading oas and @readme/oas-extensions (#49) ([822cb6d](https://github.com/readmeio/oas-to-har/commit/822cb6d)), closes [#49](https://github.com/readmeio/oas-to-har/issues/49)



## <small>14.0.4 (2021-12-16)</small>

* fix: issue where we'd try to stylize iterate over a nullilsh value (#42) ([5baa462](https://github.com/readmeio/oas-to-har/commit/5baa462)), closes [#42](https://github.com/readmeio/oas-to-har/issues/42)



## <small>14.0.3 (2021-12-16)</small>

* fix: cleaning up engine requirements and updating dev deps (#40) ([c377906](https://github.com/readmeio/oas-to-har/commit/c377906)), closes [#40](https://github.com/readmeio/oas-to-har/issues/40)
* test: overhauling the test suite to make it easier to maintain (#41) ([e04944d](https://github.com/readmeio/oas-to-har/commit/e04944d)), closes [#41](https://github.com/readmeio/oas-to-har/issues/41)



## <small>14.0.2 (2021-12-01)</small>

* chore(deps-dev): bump @commitlint/cli from 14.1.0 to 15.0.0 (#33) ([64cf308](https://github.com/readmeio/oas-to-har/commit/64cf308)), closes [#33](https://github.com/readmeio/oas-to-har/issues/33)
* chore(deps-dev): bump @commitlint/config-conventional (#37) ([7e76ecd](https://github.com/readmeio/oas-to-har/commit/7e76ecd)), closes [#37](https://github.com/readmeio/oas-to-har/issues/37)
* chore(deps-dev): bump eslint from 8.2.0 to 8.3.0 (#38) ([b6c0fa2](https://github.com/readmeio/oas-to-har/commit/b6c0fa2)), closes [#38](https://github.com/readmeio/oas-to-har/issues/38)
* chore(deps-dev): bump jest from 27.3.1 to 27.4.3 (#35) ([f20606b](https://github.com/readmeio/oas-to-har/commit/f20606b)), closes [#35](https://github.com/readmeio/oas-to-har/issues/35)
* chore(deps-dev): bump prettier from 2.4.1 to 2.5.0 (#39) ([8f63cc6](https://github.com/readmeio/oas-to-har/commit/8f63cc6)), closes [#39](https://github.com/readmeio/oas-to-har/issues/39)
* chore(deps): bump @readme/oas-extensions from 14.0.0 to 14.0.1 (#34) ([d110b9e](https://github.com/readmeio/oas-to-har/commit/d110b9e)), closes [#34](https://github.com/readmeio/oas-to-har/issues/34)
* chore(deps): bump actions/checkout from 2.3.5 to 2.4.0 (#32) ([0937308](https://github.com/readmeio/oas-to-har/commit/0937308)), closes [#32](https://github.com/readmeio/oas-to-har/issues/32)
* chore(deps): bump actions/setup-node from 2.4.1 to 2.5.0 (#31) ([fae7aed](https://github.com/readmeio/oas-to-har/commit/fae7aed)), closes [#31](https://github.com/readmeio/oas-to-har/issues/31)
* chore(deps): bump oas from 17.1.0 to 17.1.6 (#36) ([0d2f7ff](https://github.com/readmeio/oas-to-har/commit/0d2f7ff)), closes [#36](https://github.com/readmeio/oas-to-har/issues/36)



## <small>14.0.1 (2021-11-29)</small>

* fix: bug where nested object formData would be improperly converted as a string (#30) ([4f993a6](https://github.com/readmeio/oas-to-har/commit/4f993a6)), closes [#30](https://github.com/readmeio/oas-to-har/issues/30)
* chore(deps-dev): upgrading eslint to v8 ([09f4b27](https://github.com/readmeio/oas-to-har/commit/09f4b27))



## 14.0.0 (2021-11-08)

* feat: upgrading oas to v17 (#29) ([c223f7a](https://github.com/readmeio/oas-to-har/commit/c223f7a)), closes [#29](https://github.com/readmeio/oas-to-har/issues/29)
* chore(deps-dev): bump @commitlint/cli from 13.2.1 to 14.1.0 (#28) ([c901d3e](https://github.com/readmeio/oas-to-har/commit/c901d3e)), closes [#28](https://github.com/readmeio/oas-to-har/issues/28)
* chore(deps-dev): bump @commitlint/config-conventional (#26) ([60fbaad](https://github.com/readmeio/oas-to-har/commit/60fbaad)), closes [#26](https://github.com/readmeio/oas-to-har/issues/26)
* chore(deps): bump actions/checkout from 2.3.4 to 2.3.5 (#25) ([ee57a05](https://github.com/readmeio/oas-to-har/commit/ee57a05)), closes [#25](https://github.com/readmeio/oas-to-har/issues/25)
* chore(deps): bump oas from 16.0.3 to 16.0.4 (#27) ([7680f30](https://github.com/readmeio/oas-to-har/commit/7680f30)), closes [#27](https://github.com/readmeio/oas-to-har/issues/27)



## <small>13.8.1 (2021-10-28)</small>

* fix: upgrading `oas` to fix quirks in typescript iterators ([9b40501](https://github.com/readmeio/oas-to-har/commit/9b40501))



## 13.8.0 (2021-10-28)

* chore(deps-dev): bump @commitlint/cli from 13.1.0 to 13.2.0 (#20) ([f964230](https://github.com/readmeio/oas-to-har/commit/f964230)), closes [#20](https://github.com/readmeio/oas-to-har/issues/20)
* chore(deps-dev): bump @commitlint/config-conventional (#23) ([201a2a1](https://github.com/readmeio/oas-to-har/commit/201a2a1)), closes [#23](https://github.com/readmeio/oas-to-har/issues/23)
* chore(deps-dev): bump jest from 27.2.0 to 27.2.4 (#22) ([3ed4e71](https://github.com/readmeio/oas-to-har/commit/3ed4e71)), closes [#22](https://github.com/readmeio/oas-to-har/issues/22)
* chore(deps-dev): bump jest-expect-har from 2.0.2 to 2.0.3 (#21) ([871291a](https://github.com/readmeio/oas-to-har/commit/871291a)), closes [#21](https://github.com/readmeio/oas-to-har/issues/21)
* chore(deps-dev): upgrading dev deps ([8817ef0](https://github.com/readmeio/oas-to-har/commit/8817ef0))
* chore(deps): bump actions/setup-node from 2.4.0 to 2.4.1 (#19) ([953bc4c](https://github.com/readmeio/oas-to-har/commit/953bc4c)), closes [#19](https://github.com/readmeio/oas-to-har/issues/19)
* chore(deps): upgrading our oas deps to their latest releases ([58db84e](https://github.com/readmeio/oas-to-har/commit/58db84e))
* feat: switch buffer to native Uint8Array (#24) ([1b15998](https://github.com/readmeio/oas-to-har/commit/1b15998)), closes [#24](https://github.com/readmeio/oas-to-har/issues/24)
* docs: adding a code of conduct ([520c0f9](https://github.com/readmeio/oas-to-har/commit/520c0f9))



## <small>13.7.3 (2021-09-17)</small>

* chore(deps): bumping deps ([4aa7ee7](https://github.com/readmeio/oas-to-har/commit/4aa7ee7))
* ci: setting up codeql ([3a81a71](https://github.com/readmeio/oas-to-har/commit/3a81a71))
* docs: adding a security policy ([c46da8f](https://github.com/readmeio/oas-to-har/commit/c46da8f))



## <small>13.7.2 (2021-09-13)</small>

* fix: bug where query parameters with percent signs would crash the library (#18) ([5ef5210](https://github.com/readmeio/oas-to-har/commit/5ef5210)), closes [#18](https://github.com/readmeio/oas-to-har/issues/18)



## <small>13.7.1 (2021-09-08)</small>

* fix: quirks with un-styled query parameters not always being encoded (#17) ([7208473](https://github.com/readmeio/oas-to-har/commit/7208473)), closes [#17](https://github.com/readmeio/oas-to-har/issues/17)



## 13.7.0 (2021-09-02)

* fix: always ensure that query parameters are properly encoded (#16) ([538065d](https://github.com/readmeio/oas-to-har/commit/538065d)), closes [#16](https://github.com/readmeio/oas-to-har/issues/16)
* chore(deps-dev): bump jest from 27.0.6 to 27.1.0 (#13) ([a030bfa](https://github.com/readmeio/oas-to-har/commit/a030bfa)), closes [#13](https://github.com/readmeio/oas-to-har/issues/13)
* chore(deps-dev): removing conventional-changelog-cli in favor of npx ([1fa775b](https://github.com/readmeio/oas-to-har/commit/1fa775b))
* chore(deps): bump @readme/oas-extensions from 13.6.0 to 13.6.1 (#14) ([007c307](https://github.com/readmeio/oas-to-har/commit/007c307)), closes [#14](https://github.com/readmeio/oas-to-har/issues/14)
* chore(deps): bump oas from 14.3.1 to 14.4.0 (#15) ([24d8c37](https://github.com/readmeio/oas-to-har/commit/24d8c37)), closes [#15](https://github.com/readmeio/oas-to-har/issues/15)



## <small>13.6.1 (2021-08-26)</small>

* chore: running npm audit ([15581f7](https://github.com/readmeio/oas-to-har/commit/15581f7))
* chore(deps-dev): bump datauri from 3.0.0 to 4.1.0 (#11) ([962bd99](https://github.com/readmeio/oas-to-har/commit/962bd99)), closes [#11](https://github.com/readmeio/oas-to-har/issues/11)
* chore(deps-dev): bump husky from 7.0.1 to 7.0.2 (#12) ([00ad34a](https://github.com/readmeio/oas-to-har/commit/00ad34a)), closes [#12](https://github.com/readmeio/oas-to-har/issues/12)
* chore(deps): bump actions/setup-node from 2.2.0 to 2.3.0 (#6) ([f9afdbd](https://github.com/readmeio/oas-to-har/commit/f9afdbd)), closes [#6](https://github.com/readmeio/oas-to-har/issues/6)
* chore(deps): bump actions/setup-node from 2.3.0 to 2.4.0 (#9) ([7ce23cf](https://github.com/readmeio/oas-to-har/commit/7ce23cf)), closes [#9](https://github.com/readmeio/oas-to-har/issues/9)
* chore(deps): bump oas from 14.0.0 to 14.3.1 (#10) ([9c8d0b7](https://github.com/readmeio/oas-to-har/commit/9c8d0b7)), closes [#10](https://github.com/readmeio/oas-to-har/issues/10)
* ci: updating the dependabot label ([0243517](https://github.com/readmeio/oas-to-har/commit/0243517))



## 13.6.0 (2021-07-30)

* chore(deps-dev): bumping dev deps ([c939d8c](https://github.com/readmeio/oas-to-har/commit/c939d8c))
* chore(deps): upgrading oas deps ([8dfdd73](https://github.com/readmeio/oas-to-har/commit/8dfdd73))



## 13.5.0 (2021-07-06)

> 📓 This codebase has been migrated over to its own repository from [@readme/api-explorer](https://github.com/readmeio/api-explorer).
