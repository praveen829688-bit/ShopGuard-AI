def product_truth(claim_score, review_score, specification_score):
    return round(
        claim_score * 0.4 +
        review_score * 0.3 +
        specification_score * 0.3
    )
