from pillow_heif import register_heif_opener
register_heif_opener()

import os
from PIL import Image
import shutil

def compress_image(input_path, output_folder,quality=85):
  
    name = os.path.splitext(os.path.basename(input_path))[0]
    before = os.path.getsize(input_path)
    
    try:
        with Image.open(input_path) as img:
            img.load()

            if img.width > 1920:
                ratio = 1920 / img.width
                img = img.resize((1920, int(img.height * ratio)), Image.Resampling.LANCZOS)
            
            img = img.convert("RGB")
            output_path = os.path.join(output_folder, f"{name}.jpg")
            img.save(output_path, 'JPEG', optimize=True, quality=quality)

          
        after = os.path.getsize(output_path)
        saved = before - after
        
        print(f"{os.path.basename(input_path)} | {after/1024/1024:.2f} MB | saved {saved / 1024/1024:.2f} MB ({saved / before * 100:.1f}%)")
        return {
            "saved":saved,
            "after": after
            }
    except Exception as e:
        print(f"Error compressing {input_path}: {e}")
        return {
            
            "saved":0,
            "after": 0
        }