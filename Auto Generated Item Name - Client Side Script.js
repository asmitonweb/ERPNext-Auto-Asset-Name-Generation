// Doctype: Item
// Enabled: ✅

function safeGet(arr, index, length = 1) {
    return (arr.length > index && arr[index].length >= length)
        ? arr[index].slice(0, length).toUpperCase()
        : "";
}

function build_code(doc) {
    if (!doc.item_name || !doc.brand || !doc.item_group) return "";

    // --- Name part
    const nameWords = (doc.item_name || "").trim().split(/\s+/);
    const n1 = safeGet(nameWords, 0, 2);
    const n2 = safeGet(nameWords, 1, 2);
    const nameCode = n1 + n2;

    // --- Brand part
    const brandWords = (doc.brand || "").trim().split(/\s+/);
    const b1 = safeGet(brandWords, 0, 1);
    const b2 = safeGet(brandWords, 1, 1);
    const brandCode = b1 + b2;

    // --- Item Group part
    const groupWords = (doc.item_group || "").trim().split(/\s+/);
    const g1 = safeGet(groupWords, 0, 1);
    const g2 = safeGet(groupWords, 1, 1);
    const groupCode = g1 + g2;

    return `${nameCode}-${brandCode}-${groupCode}`;
}

function set_item_code(frm) {
    const code = build_code(frm.doc);

    if (code && frm.is_new() && !frm.doc.item_code) {
        frm.set_value("item_code", code);
    }

    if (frm.get_field("item_code_preview")) {
        frm.set_value("item_code_preview", code);
    }
}

frappe.ui.form.on("Item", {
    refresh: set_item_code,
    item_name: set_item_code,
    brand: set_item_code,
    item_group: set_item_code
});
