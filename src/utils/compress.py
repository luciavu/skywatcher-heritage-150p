import os
from PIL import Image
import shutil

def compress_image(input_path, output_folder,quality=85):
  
    ext = os.path.splitext(input_path)[1].lower()
    name = os.path.splitext(os.path.basename(input_path))[0]
    
    output_path = os.path.join(output_folder, os.path.basename(input_path))

    before = os.path.getsize(input_path)

    try:
        if ext in ('.jpg', '.jpeg', '.png'):
            # Resize
            with Image.open(input_path) as img:
                if img.width > 1920:
                    ratio = 1920 / img.width
                    img = img.resize((1920, int(img.height * ratio)), Image.Resampling.LANCZOS)
                
                if ext == '.png': # Convert PNG to JPEG
                    img = img.convert('RGB')
                    output_path = os.path.join(output_folder, f"{name}.jpg")
                    img.save(output_path, 'JPEG', optimize=True, quality=quality)
                else:
                    img.save(output_path, optimize=True, quality=quality)

       
        else:
        # HEIC, TIFF, mov, etc. - no change
            shutil.copy2(input_path, output_path)
        
        after = os.path.getsize(output_path)
        saved = before - after
        print(f"{os.path.basename(input_path)} | saved {saved / 1024:.2f} KB ({saved / before * 100:.1f}%)")
        return saved
    except Exception as e:
        print(f"Error compressing {input_path}: {e}")
        return 0