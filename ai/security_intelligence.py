def analyze_security(product):

    seller_trust = float(product.get("sellerTrust", 0))
    review_trust = float(product.get("reviewTrust", 0))
    quality = float(product.get("qualityScore", 0))
    return_risk = float(product.get("returnRisk", 0))
    rating = float(product.get("rating", 0))
    reviews = int(product.get("reviews", 0))
    price = float(product.get("price", 0))
    original = float(product.get("originalPrice", price))

    discount = round(
        ((original - price) / original) * 100,
        1
    ) if original else 0

    # -----------------------------
    # SCAMGUARD AI
    # -----------------------------

    seller_risk = max(0, 100 - seller_trust)

    review_risk = max(0, 100 - review_trust)

    price_risk = 0

    if discount > 70:
        price_risk = 80
    elif discount > 50:
        price_risk = 60
    elif discount > 35:
        price_risk = 35
    elif discount > 20:
        price_risk = 15
    else:
        price_risk = 5

    claim_risk = max(0, 100 - quality)

    return_risk_score = return_risk

    scam_score = round(
        seller_risk * 0.30
        + review_risk * 0.25
        + price_risk * 0.20
        + claim_risk * 0.15
        + return_risk_score * 0.10
    )

    scam_score = max(0, min(100, scam_score))

    if scam_score <= 20:
        scam_level = "LOW"
    elif scam_score <= 40:
        scam_level = "MEDIUM"
    elif scam_score <= 65:
        scam_level = "HIGH"
    else:
        scam_level = "CRITICAL"

    scam_signals = []

    if seller_trust >= 90:
        scam_signals.append(
            "Seller credibility is strong."
        )
    elif seller_trust < 70:
        scam_signals.append(
            "Seller trust is below the preferred threshold."
        )

    if review_trust >= 90:
        scam_signals.append(
            "Review authenticity indicators are strong."
        )
    elif review_trust < 70:
        scam_signals.append(
            "Review authenticity requires additional verification."
        )

    if discount > 50:
        scam_signals.append(
            "Unusually large discount detected."
        )
    elif discount > 20:
        scam_signals.append(
            "Discount level should be compared with other sellers."
        )
    else:
        scam_signals.append(
            "Price does not show an extreme discount anomaly."
        )

    if quality >= 85:
        scam_signals.append(
            "Product quality signals support the listed claims."
        )
    else:
        scam_signals.append(
            "Product claim reliability requires additional checking."
        )

    # -----------------------------
    # FAKE REVIEW AI
    # -----------------------------

    estimated_suspicious = round(
        max(
            1,
            min(
                40,
                (100 - review_trust) * 0.55
                + max(0, rating - 4.7) * 12
            )
        )
    )

    if rating >= 4.8 and reviews > 1000:
        rating_anomaly = "HIGH"
    elif rating >= 4.6 and reviews > 500:
        rating_anomaly = "MODERATE"
    else:
        rating_anomaly = "LOW"

    review_authenticity = round(
        max(
            0,
            min(
                100,
                review_trust
                - max(0, rating - 4.5) * 8
            )
        )
    )

    if review_authenticity >= 90:
        review_status = "HIGH TRUST"
    elif review_authenticity >= 75:
        review_status = "TRUSTED"
    elif review_authenticity >= 55:
        review_status = "QUESTIONABLE"
    else:
        review_status = "LOW TRUST"

    review_reasons = [
        f"Review trust score is {round(review_trust)}/100.",
        f"Estimated suspicious reviews: {estimated_suspicious}%.",
        f"Rating anomaly level: {rating_anomaly}.",
        f"Average rating is {rating}/5 from {reviews} reviews."
    ]

    # -----------------------------
    # AGENT SECURITY
    # -----------------------------

    permission_score = 96

    if scam_score > 40:
        permission_score -= 20

    if seller_trust < 75:
        permission_score -= 15

    if review_trust < 75:
        permission_score -= 10

    if return_risk > 30:
        permission_score -= 10

    permission_score = max(
        0,
        min(100, permission_score)
    )

    suspicious_actions = []

    if scam_score > 40:
        suspicious_actions.append(
            "Autonomous purchase should be blocked."
        )

    if discount > 50:
        suspicious_actions.append(
            "Verify unusually large price discount before purchase."
        )

    if seller_trust < 75:
        suspicious_actions.append(
            "Require seller verification."
        )

    if review_trust < 75:
        suspicious_actions.append(
            "Require additional review verification."
        )

    if not suspicious_actions:
        suspicious_actions.append(
            "No high-risk autonomous shopping action detected."
        )

    if scam_score <= 20 and permission_score >= 85:
        agent_action = "ALLOW"
    elif scam_score <= 40 and permission_score >= 70:
        agent_action = "CONFIRM"
    else:
        agent_action = "BLOCK"

    purchase_confirmation = (
        agent_action != "ALLOW"
    )

    # -----------------------------
    # OVERALL SECURITY SCORE
    # -----------------------------

    security_score = round(
        (100 - scam_score) * 0.45
        + review_authenticity * 0.25
        + seller_trust * 0.20
        + permission_score * 0.10
    )

    if security_score >= 85:
        overall_level = "SAFE"
    elif security_score >= 70:
        overall_level = "MODERATE"
    elif security_score >= 50:
        overall_level = "RISKY"
    else:
        overall_level = "DANGEROUS"

    return {
        "overall": {
            "score": security_score,
            "level": overall_level
        },

        "scamGuard": {
            "score": scam_score,
            "level": scam_level,
            "sellerRisk": round(seller_risk),
            "priceManipulationRisk": round(price_risk),
            "claimRisk": round(claim_risk),
            "returnRisk": round(return_risk_score),
            "signals": scam_signals
        },

        "fakeReviewAI": {
            "authenticityScore": review_authenticity,
            "status": review_status,
            "estimatedSuspiciousPercent": estimated_suspicious,
            "ratingAnomaly": rating_anomaly,
            "rating": rating,
            "reviewCount": reviews,
            "reasons": review_reasons
        },

        "agentSecurity": {
            "permissionScore": permission_score,
            "action": agent_action,
            "purchaseConfirmationRequired": purchase_confirmation,
            "autonomousShoppingProtected": True,
            "suspiciousActions": suspicious_actions
        },

        "explainable": True,
        "engine": "ShopGuard Security Intelligence v1"
    }
