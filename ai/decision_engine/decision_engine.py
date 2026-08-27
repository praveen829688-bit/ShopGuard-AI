def calculate_decision(
    price_score,
    quality_score,
    seller_trust,
    review_trust,
    compatibility,
    return_risk,
    eco_score,
    personalization
):

    return_safety = 100 - return_risk

    score = round(
        price_score * 0.15 +
        quality_score * 0.15 +
        seller_trust * 0.15 +
        review_trust * 0.10 +
        compatibility * 0.10 +
        return_safety * 0.10 +
        eco_score * 0.05 +
        personalization * 0.20
    )

    if score >= 80:
        decision = "BUY"
    elif score >= 65:
        decision = "WAIT"
    else:
        decision = "AVOID"

    return {
        "score": score,
        "decision": decision
    }
