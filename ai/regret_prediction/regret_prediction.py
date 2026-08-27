def regret_risk(
    need_score,
    budget_fit,
    preference_match,
    return_risk
):
    satisfaction = (
        need_score * 0.3 +
        budget_fit * 0.25 +
        preference_match * 0.3 +
        (100 - return_risk) * 0.15
    )

    return round(100 - satisfaction)
