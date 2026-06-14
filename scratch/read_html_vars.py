import re
import json

content = open('seo-report-www_klyfeelectric_com_br.html', 'r', encoding='utf-8').read()

# Let's search for script tags containing JSON data or data objects
scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
print(f"Found {len(scripts)} script tags.")

for idx, script in enumerate(scripts):
    if 'chart' in script or 'data' in script or 'pages' in script:
        print(f"Script {idx} length: {len(script)}")
        # Look for JSON-like structure
        json_matches = re.findall(r'(\[.*?\]|\{.*?\})', script, re.DOTALL)
        for jidx, jm in enumerate(json_matches):
            if len(jm) > 1000:
                print(f"  JSON Match {jidx} length: {len(jm)}")
                # Write to scratch
                with open(f'scratch/script_{idx}_json_{jidx}.json', 'w', encoding='utf-8') as f:
                    f.write(jm)
