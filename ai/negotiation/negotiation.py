def negotiate(
    current_price,
    target_price
):
    difference = current_price - target_price

    return {
        "current_price": current_price,
        "target_price": target_price,
        "possible_saving": max(0, difference)
    }
