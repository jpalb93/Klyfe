from bs4 import BeautifulSoup
import re

content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
soup = BeautifulSoup(content, 'html.parser')

with open('scratch/new_report_inspected.txt', 'w', encoding='utf-8') as f:
    # Let's find any text containing 'words' or 'Flesch' or '19.0'
    f.write("Flesch matches:\n")
    for tag in soup.find_all(text=re.compile(r'19\.0|229|readability', re.I)):
        f.write(f"TAG: {tag}\n")
        parent = tag.parent
        for idx in range(3):
            if parent:
                f.write(f"  P{idx}: {parent.name} attrs={parent.attrs}\n")
                parent = parent.parent
        f.write("-"*30 + "\n")
