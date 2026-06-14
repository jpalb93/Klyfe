import os
import re

views_dir = 'views'
results = []

def count_words(text):
    # Remove EJS tags <% ... %>
    text = re.sub(r'<%.*?%>', ' ', text, flags=re.DOTALL)
    # Remove HTML tags <... >
    text = re.sub(r'<.*?>', ' ', text, flags=re.DOTALL)
    # Get all words
    words = re.findall(r'\b\w+\b', text)
    return len(words)

for root, dirs, files in os.walk(views_dir):
    for file in files:
        if file.endswith('.ejs'):
            path = os.path.join(root, file)
            content = open(path, 'r', encoding='utf-8').read()
            wc = count_words(content)
            results.append((path, wc))

results.sort(key=lambda x: x[1])

with open('scratch/ejs_word_counts.txt', 'w', encoding='utf-8') as f:
    f.write("Word counts of EJS templates:\n")
    for r in results:
        f.write(f"{r[0]}: {r[1]} words\n")
        
print("Saved EJS word counts to scratch/ejs_word_counts.txt")
