import re
from bs4 import BeautifulSoup

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/anchor_details.txt', 'w', encoding='utf-8') as f:
        # Find any text block containing "no anchor text" or "16 link"
        for tag in soup.find_all(text=re.compile(r'no anchor text|16 link', re.I)):
            f.write(f"TAG: {tag}\n")
            parent = tag.parent
            for i in range(10):
                if parent:
                    f.write(f"  P{i}: {parent.name} class={parent.get('class')} id={parent.get('id')}\n")
                    parent = parent.parent
            f.write("="*40 + "\n")
            
        # Let's search for tables or list elements that might have detailed lists of links
        # Usually they are inside table rows
        rows = soup.find_all('tr')
        f.write(f"\nSearching table rows ({len(rows)}):\n")
        for idx, row in enumerate(rows):
            row_text = row.get_text()
            if 'anchor' in row_text.lower() or 'link' in row_text.lower():
                f.write(f"Row #{idx}: {row_text.strip()[:300]}\n")
                
except Exception as e:
    with open('scratch/anchor_details.txt', 'w', encoding='utf-8') as f:
        f.write("Error: " + str(e))
