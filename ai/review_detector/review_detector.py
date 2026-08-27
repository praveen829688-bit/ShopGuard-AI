def review_trust(total_reviews, suspicious_reviews):
    if total_reviews == 0:
        return 0

    suspicious_ratio = suspicious_reviews / total_reviews

    return round(
        max(0, (1 - suspicious_ratio) * 100)
    )
