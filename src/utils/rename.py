from pillow_heif import register_heif_opener
register_heif_opener()

import os
import shutil
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS
from compress import compress_image

# Rename and copy files based on timestamp created

def get_exif_data(image_path):
    try:
        with Image.open(image_path) as image:
            exif = image.getexif()
            if exif:
                exif_data = {TAGS.get(tag_id, tag_id): value for tag_id, value in exif.items()}
                #print(exif_data)
                for field in ("DateTimeOriginal", "DateTimeDigitized", "DateTime"):
                    if field in exif_data:
                        return datetime.strptime(exif_data[field], '%Y:%m:%d %H:%M:%S')
    except Exception as e:
        print(f"Error getting EXIF data from {image_path}: {e}")
    return datetime.fromtimestamp(os.path.getmtime(image_path))


def rename_images_videos(folder_path):
    output_folder = os.path.join(folder_path, "renamed")
    os.makedirs(output_folder, exist_ok=True)

    extensions = ('.jpg', '.jpeg', '.png', '.heic', '.tiff', '.mov')

    
    for filename in os.listdir(folder_path):

        if not filename.lower().endswith(extensions):
            continue

        file_path = os.path.join(folder_path, filename)
        try:   
            if filename.lower().endswith(('.mov')):
                timestamp = datetime.fromtimestamp(os.path.getmtime(file_path))
            else:
                timestamp = get_exif_data(file_path)
            timestamp_str = timestamp.strftime('%Y-%m-%d_%H-%M-%S')
            _, ext = os.path.splitext(filename)
            new_filename = f"{timestamp_str}{ext.lower()}"

            destination = os.path.join(output_folder, new_filename)
            counter = 1
            while os.path.exists(destination):
                destination = os.path.join(output_folder, f"{timestamp_str}_{counter}{ext.lower()}")
                counter += 1 
                continue
            shutil.copy2(file_path, destination)
            print(f"Renamed and copied {filename} to {new_filename}")
           
            
          
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    folder_path = input("Enter the path to the folder containing images and videos: ")
    rename_images_videos(folder_path)

    if input('Compress images? (y/n): ').lower() == 'y':
        saved_space = 0
        output_folder = os.path.join(folder_path, "compressed")
        os.makedirs(output_folder, exist_ok=True)
        for filename in os.listdir(os.path.join(folder_path, "renamed")):
                file_path = os.path.join(folder_path, "renamed", filename)
                saved_space += compress_image(file_path, output_folder)
        print(f"Compression completed.\n Total space saved: {saved_space/1024/1024:.2f} MB.")
    
    print("Done")