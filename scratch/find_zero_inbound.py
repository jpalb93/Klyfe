from bs4 import BeautifulSoup
import re

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/zero_inbound_out.txt', 'w', encoding='utf-8') as out:
        out.write("Searching for zero inbound link pages in text/tables...\n\n")
        
        # Search all issue items and recommendations
        issues = soup.find_all(class_='issue-item')
        for issue in issues:
            text = issue.get_text()
            if 'zero' in text.lower() or '0' in text.lower() or 'orphan' in text.lower():
                out.write(f"Issue: {text.strip()}\n")
                
        # Search sections
        sections = soup.find_all('div', class_='section')
        for section in sections:
            header = section.find(class_='section-header')
            if header and ('link' in header.get_text().lower() or 'orphan' in header.get_text().lower() or 'profile' in header.get_text().lower()):
                out.write(f"Section: {header.get_text().strip()}\n")
                tables = section.find_all('table')
                for t_idx, table in enumerate(tables):
                    rows = table.find_all('tr')
                    out.write(f"  Table {t_idx} (rows: {len(rows)})\n")
                    for r_idx, row in enumerate(rows):
                        cols = [td.get_text().strip() for td in row.find_all(['td', 'th'])]
                        out.write(f"    Row {r_idx}: {cols}\n")
except Exception as e:
    print("Error:", e)
