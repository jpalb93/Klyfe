import os
from PIL import Image

def convert_png_to_webp(folder_path):
    count = 0
    total_saved_bytes = 0

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith('.png') and not file.lower().startswith('logo') and not file.lower().startswith('assinatura'):
                png_path = os.path.join(root, file)
                webp_path = os.path.splitext(png_path)[0] + '.webp'
                
                try:
                    with Image.open(png_path) as img:
                        if img.mode in ("RGBA", "P"):
                            img = img.convert("RGBA")
                        else:
                            img = img.convert("RGB")
                        
                        img.save(webp_path, 'WEBP', quality=88, optimize=True)
                    
                    png_size = os.path.getsize(png_path)
                    webp_size = os.path.getsize(webp_path)
                    saved = png_size - webp_size
                    total_saved_bytes += saved
                    count += 1
                    print(f"[CONVERTED] {file} -> {os.path.basename(webp_path)} ({png_size//1024}KB -> {webp_size//1024}KB, saved {saved//1024}KB)")
                except Exception as e:
                    print(f"[ERROR] Failed to convert {file}: {e}")

    print(f"\nCompleted: {count} images converted. Total space saved: {total_saved_bytes // (1024*1024)} MB ({total_saved_bytes // 1024} KB).")

if __name__ == '__main__':
    base_dir = r"c:\projetos-eximus\Klyfe\public\img"
    convert_png_to_webp(base_dir)
