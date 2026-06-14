import urllib.request
from bs4 import BeautifulSoup

url = "https://www.klyfeelectric.com.br"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as response:
        html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    links = soup.find_all('a')
    print(f"Total links: {len(links)}")
    
    with open('scratch/empty_anchors_list.txt', 'w', encoding='utf-8') as f:
        f.write("Links and their details:\n\n")
        for idx, link in enumerate(links):
            href = link.get('href')
            text = link.get_text(strip=True)
            aria = link.get('aria-label')
            img_alt = [img.get('alt') for img in link.find_all('img')]
            
            # A link has no anchor text if the text is empty, no aria-label, and no image alt
            is_empty = not text and not aria and not any(img_alt)
            
            f.write(f"Link #{idx}:\n")
            f.write(f"  Href: {href}\n")
            f.write(f"  Text: '{text}'\n")
            f.write(f"  Aria-Label: '{aria}'\n")
            f.write(f"  Img Alts: {img_alt}\n")
            f.write(f"  Is Empty: {is_empty}\n")
            f.write("-" * 40 + "\n")
            
            if is_empty:
                print(f"EMPTY LINK: Href={href}, html={str(link)[:150]}")
except Exception as e:
    print("Error:", e)
