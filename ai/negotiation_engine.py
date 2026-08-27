def calculate_negotiation(product):

    price = float(product.get("price", 0))
    original = float(product.get("originalPrice", price))
    quality = float(product.get("qualityScore", 0))
    seller = float(product.get("sellerTrust", 0))
    reviews = float(product.get("reviewTrust", 0))

    if price <= 0:
        return {
            "recommendation": "NO NEGOTIATION",
            "targetPrice": 0,
            "maximumPrice": 0,
            "potentialSavings": 0,
            "message": "Price information is unavailable."
        }

    discount = (
        ((original - price) / original) * 100
        if original else 0
    )

    # Estimate a fair target using multiple signals.
    quality_adjustment = (quality - 80) * 0.0025
    trust_adjustment = (seller - 80) * 0.0015
    review_adjustment = (reviews - 80) * 0.001

    fair_factor = (
        1
        - 0.03
        + quality_adjustment
        + trust_adjustment
        + review_adjustment
    )

    fair_price = round(price * fair_factor)

    # Negotiation target.
    target_price = round(
        price * (
            0.93
            if seller >= 85 and quality >= 85
            else 0.90
        )
    )

    maximum_price = round(price * 0.97)

    # Never recommend a target below a sensible floor.
    floor_price = round(price * 0.82)

    target_price = max(
        floor_price,
        min(target_price, maximum_price)
    )

    potential_savings = max(
        0,
        price - target_price
    )

    if potential_savings >= price * 0.08:
        strength = "STRONG"
    elif potential_savings >= price * 0.05:
        strength = "MODERATE"
    else:
        strength = "LIGHT"

    if target_price < fair_price:
        recommendation = "NEGOTIATE"
    else:
        recommendation = "FAIR PRICE"

    message = (
        f"Hello, I am interested in the {product.get('name', 'product')}. "
        f"I see that the current price is ₹{price:,.0f}. "
        f"Considering the product specifications, seller trust and current "
        f"market value, would you be able to offer it for around "
        f"₹{target_price:,.0f}? I can proceed with the purchase if the "
        f"price works. Thank you."
    )

    reasons = [
        f"Current listed price: ₹{price:,.0f}.",
        f"Estimated fair value: ₹{fair_price:,.0f}.",
        f"Suggested negotiation target: ₹{target_price:,.0f}.",
        f"Seller trust score: {round(seller)}/100.",
        f"Review trust score: {round(reviews)}/100.",
        f"Product quality score: {round(quality)}/100."
    ]

    return {
        "currentPrice": price,
        "originalPrice": original,
        "discountPercent": round(discount, 1),
        "estimatedFairPrice": fair_price,
        "targetPrice": target_price,
        "maximumPrice": maximum_price,
        "potentialSavings": potential_savings,
        "negotiationStrength": strength,
        "recommendation": recommendation,
        "message": message,
        "reasons": reasons,
        "explainable": True,
        "engine": "ShopGuard AI Negotiator v1"
    }
