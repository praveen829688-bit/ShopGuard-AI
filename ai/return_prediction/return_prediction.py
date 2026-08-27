def predict_return(
    size_risk,
    quality_risk,
    expectation_risk
):
    return round(
        size_risk * 0.4 +
        quality_risk * 0.3 +
        expectation_risk * 0.3
    )
