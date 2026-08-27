def compatibility_score(
    product_requirements,
    user_requirements
):
    if not product_requirements:
        return 100

    matches = sum(
        1 for item in product_requirements
        if item in user_requirements
    )

    return round(
        matches / len(product_requirements) * 100
    )
