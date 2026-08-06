import os
from PIL import Image

base_dir = r"c:\projetos-eximus\Klyfe\public\img"

heavy_images = []
all_images = []
total_size_bytes = 0

for root, _, files in os.walk(base_dir):
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext in ('.png', '.jpg', '.jpeg', '.webp', '.svg'):
            filepath = os.path.join(root, file)
            size = os.path.getsize(filepath)
            total_size_bytes += size
            rel_path = os.path.relpath(filepath, base_dir)
            
            dim = ("N/A", "N/A")
            if ext != '.svg':
                try:
                    with Image.open(filepath) as img:
                        dim = img.size
                except Exception:
                    pass
            
            info = {
                'file': rel_path,
                'ext': ext,
                'size_kb': size // 1024,
                'dim': dim
            }
            all_images.append(info)
            if size > 100 * 1024:  # > 100 KB
                heavy_images.append(info)

print(f"Total Images Found: {len(all_images)}")
print(f"Total Size of All Images: {total_size_bytes // (1024*1024)} MB ({total_size_bytes // 1024} KB)")
print(f"Images > 100 KB: {len(heavy_images)}\n")

heavy_images.sort(key=lambda x: x['size_kb'], reverse=True)
for item in heavy_images:
    print(f"- {item['file']} ({item['ext']}): {item['size_kb']} KB, dimensions {item['dim']}")
