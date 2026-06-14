from bs4 import BeautifulSoup

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    print("Searching for orphan pages table...")
    # Find all table elements
    tables = soup.find_all('table')
    for idx, table in enumerate(tables):
        headers = [th.get_text().strip().lower() for th in table.find_all('th')]
        if 'incoming links' in headers or 'inbound' in headers:
            print(f"Table #{idx} headers: {headers}")
            rows = table.find_all('tr')
            print(f"Total rows: {len(rows)}")
            for r_idx, row in enumerate(rows):
                cols = [td.get_text().strip() for td in row.find_all(['td', 'th'])]
                # Print rows with 0 or 1 incoming link
                if r_idx == 0:
                    print(f"  Row {r_idx}: {cols}")
                else:
                    try:
                        links_count = int(cols[1])
                        if links_count <= 1:
                            print(f"  Orphan Row {r_idx}: {cols}")
                    except (ValueError, IndexError):
                        print(f"  Raw Row {r_idx}: {cols}")
                        
except Exception as e:
    print("Error:", e)
