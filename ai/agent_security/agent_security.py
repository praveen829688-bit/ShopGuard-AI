def authorize_agent(
    authorized,
    budget_ok,
    seller_ok,
    product_ok,
    risk_ok
):
    allowed = all([
        authorized,
        budget_ok,
        seller_ok,
        product_ok,
        risk_ok
    ])

    return {
        "approved": allowed,
        "status": "APPROVED" if allowed else "BLOCKED"
    }
