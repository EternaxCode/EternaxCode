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
1. User must supply public legal seller name, representative, registration/address/e-commerce registration and support phone. Do not publish their review-only personal phone without permission.
2. Counsel review of Korean consumer/privacy requirements and store seller/agency responsibilities. These pages are not legal clearance.
3. Verify exact Vercel/GitHub log retention and all overseas processing/subprocessor countries, and finalize required disclosures/notification or separate consent. Do not infer Firebase data stays entirely in Korea from Firestore's region.
4. Establish deletion/retention operational process: inspect and purge unnecessary billing references on requests; implement auditable retention expiry for legally retained records. Existing App deletion is not proof of this full backend process.
5. Enforce appropriate under-14 consent/age handling before accepting minors' cloud accounts; currently no guardian-consent flow.
6. Actual Apple/Google trial, cancel, restore, refund lifecycle QA and store configuration. Google auto-cancel code is not real-provider verification.
7. Update store listing support/privacy URLs to the new canonical pages in final store submission.
