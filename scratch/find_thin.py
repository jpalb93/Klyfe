import re
import json

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    print("HTML Report Loaded.")
    
    # Find word counts
    # The report contains audit results. Let's see what we can find.
    # We will search for occurrences of numbers followed by words in context.
    with open('scratch/thin_pages_details.txt', 'w', encoding='utf-8') as f:
        # Search for any page names and word counts
        # Let's search for "words" or "words)" or similar patterns
        matches = list(re.finditer(r'(\d+)\s+words', content, re.IGNORECASE))
        f.write(f"Found {len(matches)} occurrences of 'words':\n\n")
        for m in matches:
            start = max(0, m.start() - 150)
            end = min(len(content), m.end() + 250)
            f.write(f"Match: {m.group(0)}\nContext:\n{content[start:end]}\n\n====================\n\n")
            
        # Let's search for anchor text issues
        anchor_matches = list(re.finditer(r'anchor', content, re.IGNORECASE))
        f.write(f"\n\nFound {len(anchor_matches)} occurrences of 'anchor':\n\n")
        for m in anchor_matches:
            start = max(0, m.start() - 150)
            end = min(len(content), m.end() + 250)
            f.write(f"Context:\n{content[start:end]}\n\n====================\n\n")
            
    print("Saved details to scratch/thin_pages_details.txt")
except Exception as e:
    print("Error:", e)
