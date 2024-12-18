;; Education NFT Contract

(define-non-fungible-token education-nft uint)

(define-map certificate-details
  { token-id: uint }
  {
    recipient: principal,
    issuer: principal,
    course-id: uint,
    title: (string-utf8 100),
    description: (string-utf8 500),
    issue-date: uint,
    expiration-date: (optional uint)
  }
)

(define-data-var last-token-id uint u0)

(define-public (mint (recipient principal) (course-id uint) (title (string-utf8 100)) (description (string-utf8 500)) (expiration-date (optional uint)))
  (let
    (
      (token-id (+ (var-get last-token-id) u1))
    )
    (try! (nft-mint? education-nft token-id recipient))
    (map-set certificate-details
      { token-id: token-id }
      {
        recipient: recipient,
        issuer: tx-sender,
        course-id: course-id,
        title: title,
        description: description,
        issue-date: block-height,
        expiration-date: expiration-date
      }
    )
    (var-set last-token-id token-id)
    (ok token-id)
  )
)

(define-read-only (get-certificate-details (token-id uint))
  (ok (unwrap! (map-get? certificate-details { token-id: token-id }) (err u404)))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (nft-transfer? education-nft token-id sender recipient)
  )
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? education-nft token-id))
)

(define-data-var contract-owner principal tx-sender)

(define-public (set-contract-owner (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u403))
    (ok (var-set contract-owner new-owner))
  )
)

