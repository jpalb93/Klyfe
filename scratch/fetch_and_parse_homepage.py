import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://www.klyfeelectric.com.br"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as response:
        html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    # Remove script and style elements
    for script in soup(["script", "style"]):
        script.extract()
        
    text = soup.get_text()
    
    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text_content = [c for c in chunks if c]
    
    with open('scratch/homepage_text_seen.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(text_content))
        
    # Let's count words
    words = re.findall(r'\b\w+\b', "\n".join(text_content))
    print(f"Total Words Extracted: {len(words)}")
except Exception as e:
    print("Error:", e)
