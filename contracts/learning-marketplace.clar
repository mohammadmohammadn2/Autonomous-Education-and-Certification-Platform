;; Learning Marketplace Contract

(define-map tutoring-offers
  { offer-id: uint }
  {
    tutor: principal,
    subject: (string-utf8 100),
    hourly-rate: uint,
    availability: (string-utf8 200)
  }
)

(define-map tutoring-sessions
  { session-id: uint }
  {
    tutor: principal,
    student: principal,
    subject: (string-utf8 100),
    duration: uint,
    total-cost: uint,
    completed: bool
  }
)

(define-data-var offer-id-nonce uint u0)
(define-data-var session-id-nonce uint u0)

(define-public (create-tutoring-offer (subject (string-utf8 100)) (hourly-rate uint) (availability (string-utf8 200)))
  (let
    (
      (new-offer-id (+ (var-get offer-id-nonce) u1))
    )
    (map-set tutoring-offers
      { offer-id: new-offer-id }
      {
        tutor: tx-sender,
        subject: subject,
        hourly-rate: hourly-rate,
        availability: availability
      }
    )
    (var-set offer-id-nonce new-offer-id)
    (ok new-offer-id)
  )
)

(define-public (book-tutoring-session (offer-id uint) (duration uint))
  (let
    (
      (offer (unwrap! (map-get? tutoring-offers { offer-id: offer-id }) (err u404)))
      (total-cost (* (get hourly-rate offer) duration))
      (new-session-id (+ (var-get session-id-nonce) u1))
    )
    (try! (stx-transfer? total-cost tx-sender (get tutor offer)))
    (map-set tutoring-sessions
      { session-id: new-session-id }
      {
        tutor: (get tutor offer),
        student: tx-sender,
        subject: (get subject offer),
        duration: duration,
        total-cost: total-cost,
        completed: false
      }
    )
    (var-set session-id-nonce new-session-id)
    (ok new-session-id)
  )
)

(define-public (complete-tutoring-session (session-id uint))
  (let
    (
      (session (unwrap! (map-get? tutoring-sessions { session-id: session-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get tutor session)) (err u403))
    (ok (map-set tutoring-sessions
      { session-id: session-id }
      (merge session { completed: true })
    ))
  )
)

(define-read-only (get-tutoring-offer (offer-id uint))
  (ok (unwrap! (map-get? tutoring-offers { offer-id: offer-id }) (err u404)))
)

(define-read-only (get-tutoring-session (session-id uint))
  (ok (unwrap! (map-get? tutoring-sessions { session-id: session-id }) (err u404)))
)

