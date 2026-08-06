import os
from PIL import Image

base_dir = r"c:\projetos-eximus\Klyfe\public\img"

total_deleted_bytes = 0
total_saved_bytes = 0
converted_count = 0

# 1. Safely remove unused original PNG files that have been replaced by WebP
unused_pngs = [
    r"public\img\home-empresa-klyfe.png"
]
blog_dir = os.path.join(base_dir, "blog")
for file in os.listdir(blog_dir):
    if file.endswith(".png"):
        unused_pngs.append(os.path.join("public", "img", "blog", file))

for rel_path in unused_pngs:
    abs_path = os.path.join(r"c:\projetos-eximus\Klyfe", rel_path)
    if os.path.exists(abs_path):
        size = os.path.getsize(abs_path)
        total_deleted_bytes += size
        os.remove(abs_path)
        print(f"[REMOVED UNUSED PNG] {rel_path} ({size//1024} KB saved)")

# 2. Re-optimize all existing WebP images in blog/ and root to max 1200px width & 80% quality
for root, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".webp"):
            webp_path = os.path.join(root, file)
            old_size = os.path.getsize(webp_path)
            
            try:
                with Image.open(webp_path) as img:
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGBA")
                    else:
                        img = img.convert("RGB")
                    
                    w, h = img.size
                    if w > 1200:
                        new_w = 1200
                        new_h = int(h * (1200 / w))
                        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    
                    img.save(webp_path, "WEBP", quality=80, optimize=True)
                
                new_size = os.path.getsize(webp_path)
                if old_size > new_size:
                    saved = old_size - new_size
                    total_saved_bytes += saved
                    converted_count += 1
                    print(f"[RE-OPTIMIZED WEBP] {file}: {old_size//1024} KB -> {new_size//1024} KB")
            except Exception as e:
                print(f"[ERROR] {file}: {e}")

# 3. Convert JPG/JPEG images in public/img/lp and root to WebP
for root, _, files in os.walk(base_dir):
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext in ('.jpg', '.jpeg') and not file.startswith('logo'):
            img_path = os.path.join(root, file)
            webp_path = os.path.splitext(img_path)[0] + '.webp'
            try:
                with Image.open(img_path) as img:
                    img = img.convert("RGB")
                    w, h = img.size
                    if w > 1200:
                        new_w = 1200
                        new_h = int(h * (1200 / w))
                        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    img.save(webp_path, "WEBP", quality=80, optimize=True)
                
                old_size = os.path.getsize(img_path)
                new_size = os.path.getsize(webp_path)
                print(f"[CONVERTED JPG] {file} -> {os.path.basename(webp_path)}: {old_size//1024} KB -> {new_size//1024} KB")
            except Exception as e:
                print(f"[ERROR JPG] {file}: {e}")

print(f"\n==========================================")
print(f"Cleanup Completed!")
print(f"Unused PNGs Removed: {total_deleted_bytes // (1024*1024)} MB ({total_deleted_bytes // 1024} KB)")
print(f"WebP Re-optimization Saved: {total_saved_bytes // 1024} KB")
print(f"Total Disk/Bandwidth Reduced: {(total_deleted_bytes + total_saved_bytes) // (1024*1024)} MB")
print(f"==========================================")
