from bs4 import BeautifulSoup

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/link_profile_dump.txt', 'w', encoding='utf-8') as out:
        out.write("Searching for link profile details...\n\n")
        
        sections = soup.find_all('div', class_='section')
        for section in sections:
            header = section.find(class_='section-header')
            if header and 'link profile' in header.get_text().lower():
                out.write(f"Section Header: {header.get_text().strip()}\n")
                body = section.find(class_='section-body')
                if body:
                    # Dump all paragraphs, divs, tables, etc.
                    out.write(body.prettify())
except Exception as e:
    print("Error:", e)
