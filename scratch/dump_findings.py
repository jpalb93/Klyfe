from bs4 import BeautifulSoup
import re

try:
    content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()
    soup = BeautifulSoup(content, 'html.parser')
    
    with open('scratch/dump_findings_out.txt', 'w', encoding='utf-8') as f:
        # Search for text containing '239' or 'thin content'
        for tag in soup.find_all(text=re.compile(r'239|thin content', re.I)):
            f.write(f"TAG: {tag}\n")
            parent = tag.parent
            for i in range(5):
                if parent:
                    f.write(f"PARENT {i}: name={parent.name} class={parent.get('class')} id={parent.get('id')}\n")
                    # If it's a div with a specific id or class, print it
                    if parent.name in ['div', 'section', 'li', 'td']:
                        f.write(f"  Attributes: {parent.attrs}\n")
                    parent = parent.parent
            f.write("="*80 + "\n")
except Exception as e:
    with open('scratch/dump_findings_out.txt', 'w', encoding='utf-8') as f:
        f.write("Error: " + str(e))
