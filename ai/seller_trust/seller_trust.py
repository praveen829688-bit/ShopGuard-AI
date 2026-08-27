def seller_trust(
    account_score,
    review_score,
    return_score,
    complaint_score
):
    return round(
        account_score * 0.25 +
        review_score * 0.25 +
        return_score * 0.25 +
        complaint_score * 0.25
    )
