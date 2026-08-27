def eco_score(
    material,
    packaging,
    recyclability,
    durability
):
    return round(
        material * 0.25 +
        packaging * 0.20 +
        recyclability * 0.25 +
        durability * 0.30
    )
