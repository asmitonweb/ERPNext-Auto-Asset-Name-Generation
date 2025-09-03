# Script Type: DocType Event
# Reference Doctype: Item
# Event: Before Validate

def two_chars(s):
    return (s[:2] if s else "").upper()

def three_chars(s):
    return (s[:3] if s else "").upper()

# Generate only if missing AND all fields are provided
def safe_get(word_list, index, chars=1):
    if len(word_list) > index and len(word_list[index]) >= chars:
        return word_list[index][:chars].upper()
    return ""

if not doc.item_code and doc.item_name and doc.brand and doc.item_group:
    # --- Name part
    name_words = (doc.item_name or "").strip().split()
    n1 = safe_get(name_words, 0, 2)  # first 2 letters of first word
    n2 = safe_get(name_words, 1, 2)  # first 2 letters of second word
    name_code = f"{n1}{n2}"

    # --- Brand part
    brand_words = (doc.brand or "").strip().split()
    b1 = safe_get(brand_words, 0, 1)  # first letter of first word
    b2 = safe_get(brand_words, 1, 1)  # first letter of second word
    brand_code = f"{b1}{b2}"

    # --- Item Group part
    group_words = (doc.item_group or "").strip().split()
    g1 = safe_get(group_words, 0, 1)
    g2 = safe_get(group_words, 1, 1)
    group_code = f"{g1}{g2}"

    # --- Build final code
    doc.item_code = f"{name_code}-{brand_code}-{group_code}"
    doc.name = doc.item_code
