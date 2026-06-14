from bs4 import BeautifulSoup
import re

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/accessibility_out.txt', 'w', encoding='utf-8') as out:
        out.write("Searching report sections and tables...\n\n")
        
        # Check all headers
        for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            out.write(f"Header: {h.get_text().strip()}\n")
            
        out.write("\n" + "="*80 + "\n")
        out.write("Searching all tables in the document:\n")
        tables = soup.find_all('table')
        out.write(f"Found {len(tables)} tables total.\n\n")
        
        for idx, table in enumerate(tables):
            headers = [th.get_text().strip() for th in table.find_all('th')]
            out.write(f"Table #{idx} headers: {headers}\n")
            
            # Let's check if there are columns like 'anchor', 'link', 'text', 'href', 'url'
            has_relevant_col = any(any(x in col.lower() for x in ['anchor', 'link', 'url', 'href', 'text']) for col in headers)
            
            rows = table.find_all('tr')
            out.write(f"  Rows count: {len(rows)}\n")
            
            # Print the first 5 rows regardless, or print all if it looks relevant
            rows_to_print = rows if (has_relevant_col or len(rows) < 15) else rows[:5]
            for r_idx, row in enumerate(rows_to_print):
                cols = [td.get_text().strip() for td in row.find_all(['td', 'th'])]
                out.write(f"    Row #{r_idx}: {cols}\n")
            if len(rows) > len(rows_to_print):
                out.write(f"    ... and {len(rows) - len(rows_to_print)} more rows\n")
            out.write("\n" + "-"*40 + "\n")
            
        out.write("\n" + "="*80 + "\n")
        out.write("Searching for issue messages containing 'anchor' or 'link':\n")
        issues = soup.find_all(class_=re.compile('issue|recommendation|item', re.I))
        for idx, issue in enumerate(issues):
            text = issue.get_text()
            if 'anchor' in text.lower() or 'link' in text.lower() or 'vazio' in text.lower():
                out.write(f"Issue #{idx} [{issue.get('class')}]: {text.strip()[:300]}\n")
                
except Exception as e:
    print("Error:", e)
