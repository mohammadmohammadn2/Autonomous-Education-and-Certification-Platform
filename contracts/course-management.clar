;; Course Management Contract

(define-map courses
  { course-id: uint }
  {
    title: (string-utf8 100),
    description: (string-utf8 500),
    instructor: principal,
    price: uint,
    duration: uint,
    max-students: uint,
    enrolled-students: uint
  }
)

(define-map course-progress
  { course-id: uint, student: principal }
  { completed: bool }
)

(define-data-var course-id-nonce uint u0)

(define-public (create-course (title (string-utf8 100)) (description (string-utf8 500)) (price uint) (duration uint) (max-students uint))
  (let
    (
      (new-course-id (+ (var-get course-id-nonce) u1))
    )
    (map-set courses
      { course-id: new-course-id }
      {
        title: title,
        description: description,
        instructor: tx-sender,
        price: price,
        duration: duration,
        max-students: max-students,
        enrolled-students: u0
      }
    )
    (var-set course-id-nonce new-course-id)
    (ok new-course-id)
  )
)

(define-public (enroll-in-course (course-id uint))
  (let
    (
      (course (unwrap! (map-get? courses { course-id: course-id }) (err u404)))
    )
    (asserts! (< (get enrolled-students course) (get max-students course)) (err u401))
    (try! (stx-transfer? (get price course) tx-sender (get instructor course)))
    (map-set courses
      { course-id: course-id }
      (merge course { enrolled-students: (+ (get enrolled-students course) u1) })
    )
    (map-set course-progress
      { course-id: course-id, student: tx-sender }
      { completed: false }
    )
    (ok true)
  )
)

(define-public (complete-course (course-id uint))
  (let
    (
      (course (unwrap! (map-get? courses { course-id: course-id }) (err u404)))
      (progress (unwrap! (map-get? course-progress { course-id: course-id, student: tx-sender }) (err u404)))
    )
    (asserts! (not (get completed progress)) (err u401))
    (ok (map-set course-progress
      { course-id: course-id, student: tx-sender }
      { completed: true }
    ))
  )
)

(define-read-only (get-course (course-id uint))
  (ok (unwrap! (map-get? courses { course-id: course-id }) (err u404)))
)

(define-read-only (get-course-progress (course-id uint) (student principal))
  (ok (unwrap! (map-get? course-progress { course-id: course-id, student: student }) (err u404)))
)

