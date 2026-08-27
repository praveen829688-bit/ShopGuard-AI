def recommend(products, budget=None):
    if budget is not None:
        products = [
            p for p in products
            if p.get("price", 0) <= budget
        ]

    return sorted(
        products,
        key=lambda p: p.get("rating", 0),
        reverse=True
    )
