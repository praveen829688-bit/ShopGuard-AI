def fair_price(current_price, original_price):
    discount = (
        (original_price - current_price)
        / original_price
    ) * 100

    score = min(100, max(0, round(70 + discount)))

    return {
        "current_price": current_price,
        "original_price": original_price,
        "price_score": score
    }
