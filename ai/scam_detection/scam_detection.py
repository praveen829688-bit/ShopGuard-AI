def scam_score(
    seller_risk,
    price_anomaly,
    review_risk,
    payment_risk
):
    return round(
        seller_risk * 0.3 +
        price_anomaly * 0.25 +
        review_risk * 0.25 +
        payment_risk * 0.2
    )
