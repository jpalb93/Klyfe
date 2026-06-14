import re

content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()

with open('scratch/thin_url_out.txt', 'w', encoding='utf-8') as f:
    for m in re.finditer(r'239', content):
        start = max(0, m.start() - 600)
        end = min(len(content), m.end() + 600)
        f.write(f"MATCH 239:\n{content[start:end]}\n")
        f.write("="*80 + "\n")
