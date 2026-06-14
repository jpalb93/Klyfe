import json

try:
    try:
        with open('scratch/anchor_audit_out_new.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('scratch/anchor_audit_out_new.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
    empty_anchors = data.get('examples', {}).get('empty_anchors', [])
    print(f"Total empty anchors found: {len(empty_anchors)}")
    for idx, link in enumerate(empty_anchors):
        print(f"Empty Anchor #{idx}:")
        print(f"  Source: {link.get('source')}")
        print(f"  Target: {link.get('target')}")
        print(f"  Rel: {link.get('rel')}")
        print(f"  Nofollow: {link.get('nofollow')}")
except Exception as e:
    print("Error:", e)
