def understand_intent(text):
    text = text.lower()

    categories = {
        "laptop": "Laptops",
        "phone": "Smartphones",
        "shoe": "Fashion",
        "watch": "Wearables",
        "lamp": "Home"
    }

    for keyword, category in categories.items():
        if keyword in text:
            return {
                "intent": "product_search",
                "category": category,
                "keyword": keyword
            }

    return {
        "intent": "general_shopping",
        "category": None,
        "keyword": None
    }
