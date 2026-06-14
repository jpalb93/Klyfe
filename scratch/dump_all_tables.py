from bs4 import BeautifulSoup

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/all_tables_dump.txt', 'w', encoding='utf-8') as f:
        tables = soup.find_all('table')
        f.write(f"Found {len(tables)} tables:\n\n")
        
        for idx, table in enumerate(tables):
            f.write(f"Table #{idx}:\n")
            headers = [th.get_text(strip=True) for th in table.find_all('th')]
            f.write(f"  Headers: {headers}\n")
            rows = table.find_all('tr')
            f.write(f"  Rows count: {len(rows)}\n")
            for r_idx, row in enumerate(rows[:30]):  # print first 30 rows
                cells = [td.get_text(strip=True) for td in row.find_all('td')]
                if cells:
                    f.write(f"    Row #{r_idx}: {cells}\n")
            f.write("\n" + "="*80 + "\n\n")
except Exception as e:
    with open('scratch/all_tables_dump.txt', 'w', encoding='utf-8') as f:
        f.write("Error: " + str(e))
