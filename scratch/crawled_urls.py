import re

content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()

# Let's search for any sections in the HTML report that list page details
# Look for structures that list URL and word count
with open('scratch/crawled_urls.txt', 'w', encoding='utf-8') as f:
    for m in re.finditer(r'href=["\'](https?://[^\s"\']+)["\']', content):
        url = m.group(1)
        if 'klyfe' in url:
            f.write(f"Link found: {url}\n")
