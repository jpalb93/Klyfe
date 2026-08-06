import os
from PIL import Image

src_path = r"c:\projetos-eximus\Klyfe\public\img\blog\energia-solar-para-condominios.png"
if not os.path.exists(src_path):
    src_path = r"c:\projetos-eximus\Klyfe\public\img\blog\energia-solar-para-condominios.webp"

dest_path = r"c:\projetos-eximus\Klyfe\public\img\hero-solar-condominios.webp"

with Image.open(src_path) as img:
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")
    
    # Resize to max 1440 width for optimal desktop display
    w, h = img.size
    if w > 1440:
        new_w = 1440
        new_h = int(h * (1440 / w))
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    img.save(dest_path, "WEBP", quality=75, optimize=True)

src_size = os.path.getsize(src_path) // 1024
dest_size = os.path.getsize(dest_path) // 1024
print(f"Hero Image Optimized: {src_size} KB -> {dest_size} KB ({os.path.basename(dest_path)})")
