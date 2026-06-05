from pillow_heif import register_heif_opener
register_heif_opener()

import os
import json
import subprocess
import shutil
from datetime import datetime
from compress import compress_image

EXIF_TOOL = "C:\\Users\\lucia\\exiftool-13.59_64\\exiftool-13.59_64\\exiftool.exe"

# All the code in the utils folder aren't used directly in the website
# and was just written for personal use to pre-process the large amount of images I have before uploading them
# so if you use this code, just get ready to possibly download some things and change some lines to suit your case

def get_folder_exif(file_path):
    result = subprocess.run([EXIF_TOOL, "-j", file_path], capture_output=True, text=True)
    data = json.loads(result.stdout)
    results = {}

    for item in data:
        file_path = item.get("SourceFile")
        if not file_path:
            continue
        filename = os.path.basename(file_path)

        results[filename] = {
            "taken": item.get("DateTimeOriginal"),
            "device": item.get("Model"),
            "lens": item.get("LensModel"),
            "shutter": item.get("ExposureTime"),
            "aperture": item.get("FNumber"),
            "iso": item.get("ISO"),
            "resolution": f"{item.get('ImageWidth')}x{item.get('ImageHeight')}",
            "megapixels": item.get("Megapixels")
        }
    return results


# Rename and copy files based on timestamp created
def rename_and_add_metadata(folder_path):
    output_folder = os.path.join(folder_path, "renamed")
    os.makedirs(output_folder, exist_ok=True)
    
    print("Retrieving EXIF data")
    exif_data = get_folder_exif(folder_path)
    metadata = {}

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        if not os.path.isfile(file_path):
            continue

        if filename.lower().endswith(".json"):
            continue
        try: 
            exif = exif_data.get(filename,{})  
            taken = exif.get("taken")

            if taken:
                dt = datetime.strptime(taken.split(".")[0], "%Y:%m:%d %H:%M:%S")
            else:
                dt = datetime.fromtimestamp(os.path.getmtime(file_path))
            
            timestamp = dt.strftime("%Y-%m-%d_%H-%M-%S")
            ext = ".jpg"
            new_filename = f"{timestamp}{ext}"

            destination = os.path.join(output_folder, new_filename)

            counter = 1

            while os.path.exists(destination):
                # Handle duplicate timestamps
                new_filename = f"{timestamp}_{counter}{ext}"
                destination = os.path.join(output_folder, new_filename)
                counter +=1
           
            shutil.copy2(file_path, destination)
            
            # Record original name
            metadata[new_filename] = {"original_name": filename, **exif}
            print(f"Renamed and copied {filename} to {new_filename}") 
             
        
        except Exception as e:
            print(f"Error processing {filename}: {e}")
    return metadata    


def save_metadata(metadata, output_folder):
    print("Writing metadata to JSON file")
    json_path = os.path.join(output_folder, "metadata.json")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=4)
    
    print(f"Saved metadata to {json_path}")


if __name__ == "__main__":
    folder_path = input("Enter the path to the folder containing images and videos: ").strip().strip('"')
  
    metadata = rename_and_add_metadata(folder_path)
    save_metadata(metadata, os.path.join(folder_path, "renamed"))

    if input('Compress images? (y/n): ').lower() == "y":
        saved_space = 0
        total_size = 0
        renamed_folder = os.path.join(folder_path, "renamed")
        compressed_folder = os.path.join(folder_path, "compressed")

        os.makedirs(compressed_folder, exist_ok=True)

        for filename in os.listdir(renamed_folder):
                if filename.lower().endswith(".json"):
                    continue
                file_path = os.path.join(renamed_folder, filename)
                if not os.path.isfile(file_path):
                    continue

                result = compress_image(file_path, compressed_folder)
                saved_space += result["saved"]
                total_size += result["after"]
        print(f"Compression completed.\n Final size: {total_size/1024/1024:.2f} MB\n Total space saved: {saved_space/1024/1024:.2f} MB.")
    
    print("Done")
    