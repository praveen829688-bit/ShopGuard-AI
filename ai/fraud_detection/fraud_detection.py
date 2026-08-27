def fraud_score(
    transaction_amount,
    unusual_activity,
    account_risk
):
    amount_risk = min(100, transaction_amount / 1000)

    return round(
        amount_risk * 0.3 +
        unusual_activity * 0.4 +
        account_risk * 0.3
    )
