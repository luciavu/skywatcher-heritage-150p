import os
import shutil
import json
import sys
from datetime import datetime
from add_metadata import get_folder_exif

# Organise images into folders by year, month, date
def organise_images(folder):
    destination_folder = os.path.join(folder, "images")

    for filename in os.listdir(folder):
        try:
            date_part = filename.split("_")[0]
            date = datetime.strptime(date_part, "%Y-%m-%d")
        except ValueError:
            print(f"Skipped invalid filename: {filename}")
            continue
        
        year = str(date.year)
        month = f"{date.month:02d}"
        day = f"{date.day:02d}"
        target_folder = os.path.join(destination_folder, year, month, f"{month}-{day}")
        os.makedirs(target_folder, exist_ok=True)

        source_path = os.path.join(folder, filename)
        destination_path = os.path.join(target_folder, filename)
        shutil.move(source_path, destination_path)
        print(f"Moved {filename} -> {target_folder}")


# Split main metadata file into folders based on date
def split_metadata(metadata_file, images_folder):
    with open(metadata_file, "r", encoding="utf-8") as f:
        metadata = json.load(f)

        folders = {}

        for filename, info in metadata.items():
            date_part = filename.split("_")[0]

            try:
                date = datetime.strptime(date_part, "%Y-%m-%d")
            except ValueError:
                print(f"Error - skipping {filename}")
                continue
            
            year = str(date.year)
            month = f"{date.month:02d}"
            day = f"{date.day:02d}"

            folder = os.path.join(images_folder, year, month, f"{month}-{day}")

            if folder not in folders:
                folders[folder] = []

            folders[folder].append({"file": filename, **info})

        # Write metadata.json for each date folder
        for folder, images in folders.items():
            os.makedirs(folder, exist_ok=True)
            output = os.path.join(folder, "metadata.json")

            with open(output, "w", encoding="utf-8") as f:
                json.dump(images, f, indent=4)
            
            print(f"Created {output}")


def main():

    #if len(sys.argv) != 3:
     #   print("Usage: python write.py <image_folder> <metadata_file>")
      #  return

    source_folder = sys.argv[1]
    main_metadata = sys.argv[2] # Generated after renaming images and before compression

    # Organise
    organise_images(source_folder)

    # Split existing metadata into date folders
    images_folder = os.path.join(source_folder, "images")
    split_metadata(main_metadata, images_folder)

if __name__ == "__main__":
    main()