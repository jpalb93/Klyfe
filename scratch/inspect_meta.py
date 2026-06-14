from bs4 import BeautifulSoup

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/meta_description_out.txt', 'w', encoding='utf-8') as out:
        out.write("Searching for meta description issues...\n\n")
        
        # Search all issue items
        issues = soup.find_all(class_='issue-item')
        for idx, issue in enumerate(issues):
            text = issue.get_text()
            if 'meta' in text.lower() or 'description' in text.lower():
                out.write(f"Issue #{idx}: {text.strip()}\n")
                
        # Search all tables
        tables = soup.find_all('table')
        for t_idx, table in enumerate(tables):
            headers = [th.get_text().strip().lower() for th in table.find_all('th')]
            rows = table.find_all('tr')
            for r_idx, row in enumerate(rows):
                row_text = row.get_text()
                if 'meta' in row_text.lower() or 'description' in row_text.lower():
                    cols = [td.get_text().strip() for td in row.find_all(['td', 'th'])]
                    out.write(f"Table {t_idx} Row {r_idx}: {cols}\n")
except Exception as e:
    print("Error:", e)
