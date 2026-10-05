# Haru policies: implementation and release boundary (2026-10-05)

Public documents: `/haru/`, `/haru/terms.html`, `/haru/privacy.html`, `/haru/support.html`. Haru is also in the app portfolio. These describe the currently available free service and planned subscription; not an announcement of public store availability.

## Verified facts
- Firebase Auth US processing: https://firebase.google.com/support/privacy
- Haru Firestore database REST metadata: asia-northeast3 (Seoul).
- Account deletion removes Auth/user/progress client-side; separate purchase verification references remain. Policy does not promise blanket deletion of all payment records.
- No advertising tracking SDK in Haru's app dependency/config scan. Website hosts process access logs.
- Apple requires direct subscription management warning on deletion: https://developer.apple.com/support/offering-account-deletion-in-your-app/
- Google API supports stop-renewal (not refund): https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptionsv2/cancel

## Terms choices
Preserve statutory withdrawal, defects, minors' rights, and mandatory liability. No universal no-refund rule, no immunity for gross negligence, no forced operator-only jurisdiction. Cancellation prevents renewal but does not automatically refund past charges; separate refund requests remain possible. Own devices may share one verified account; multi-person resale/credential abuse restricted with proportionate review/appeal. No JLPT affiliation or pass guarantee.

Primary sources reviewed:
- Korea Electronic Commerce Act, arts.17–18: https://www.law.go.kr/LSW/lsInfoP.do?ancNo=21312&ancYd=20260120&efYd=20260721&lsiSeq=282793
- Terms regulation act, art.7: https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025032399
- PIPA overseas transfer: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1034292881
- Apple Korea terms: https://www.apple.com/legal/internet-services/itunes/kr/terms.html
- Google refunds: https://support.google.com/googleplay/answer/2479637?hl=ko-kr

## Required before paid release — not certified complete
1. Public seller identity copied from the user-designated reference, 빵어전 Google Play listing, on 2026-10-05: 이터낙스코드, 843-27-01908, 2026-제주한경-0059, 제주특별자치도 제주시 한경면 두신로 63 (63002), +82 10-9125-6431. Public contact reuse is authorized. Representative title was not inferred from a support name.
2. Counsel review of Korean consumer/privacy requirements and store seller/agency responsibilities. These pages are not legal clearance.
3. Verify exact Vercel/GitHub log retention and all overseas processing/subprocessor countries, and finalize required disclosures/notification or separate consent. Do not infer Firebase data stays entirely in Korea from Firestore's region.
4. Server deletion and daily retention cleanup implemented and emulator-tested on 2026-10-05. Auth identity, study data, renewable proofs/mappings and sandbox history are purged; production verification evidence has a private expiry queue. Real user data was not deleted in QA. Monitor the protected daily worker after deployment.
5. Login now requires 14+ self-declaration and terms acknowledgement before OAuth, with guest alternative and no date-of-birth collection. There is no guardian-consent flow; under-14 cloud accounts remain unsupported.
6. Actual Apple/Google trial, cancel, restore, refund lifecycle QA and store configuration. Google auto-cancel code is not real-provider verification.
7. Update store listing support/privacy URLs to the new canonical pages in final store submission.
