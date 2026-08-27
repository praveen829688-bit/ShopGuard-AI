def explain_decision(scores):

    explanation = []

    for name, value in scores.items():

        if value >= 85:
            explanation.append(
                f"{name}: strong positive contribution ({value}/100)"
            )

        elif value >= 65:
            explanation.append(
                f"{name}: moderate contribution ({value}/100)"
            )

        else:
            explanation.append(
                f"{name}: requires attention ({value}/100)"
            )

    return explanation
