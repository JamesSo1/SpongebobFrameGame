import os

def rename_files_in_folder(folder_path, new_name_prefix):
    # Loop over all files in the folder
    for count, filename in enumerate(os.listdir(folder_path)):
        # Construct the full file path
        old_file_path = os.path.join(folder_path, filename)
        
        # Generate new file name (you can modify this logic)
        new_filename = f"{new_name_prefix}{count+1}{os.path.splitext(filename)[1]}"  # Preserve file extension
        new_file_path = os.path.join(folder_path, new_filename)
        
        # Rename the file
        os.rename(old_file_path, new_file_path)
        print(f"Renamed: {filename} -> {new_filename}")

# Example usage:
folder_path = "/Users/jamesso/SpongebobGame/images/E1"
new_name_prefix = "F"
rename_files_in_folder(folder_path, new_name_prefix)
