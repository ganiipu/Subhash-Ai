import os
import shutil

brain = r"C:\Users\default.LAPTOP-UQP63FS1\.gemini\antigravity\brain\b6ed569b-95cb-481a-bc3b-c65d9cefdc8c"
dest  = r"c:\Users\default.LAPTOP-UQP63FS1\n8n\project portfolio\assets"

os.makedirs(dest, exist_ok=True)

# Map: uploaded file -> target asset filename
files = [
    ("uploaded_media_1_1773670730901.jpg", "workflow1.png"),  # Talent Scout
    ("uploaded_media_0_1773670730901.png", "workflow2.png"),  # Digital Oracle
    ("uploaded_media_2_1773670730901.jpg", "workflow4.png"),  # Finance Engine
]

for src_name, dst_name in files:
    src = os.path.join(brain, src_name)
    dst = os.path.join(dest, dst_name)
    if os.path.exists(src):
        shutil.copyfile(src, dst)
        print("OK: " + src_name + " -> " + dst_name)
    else:
        print("MISSING: " + src)

print("Done.")
