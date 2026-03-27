import os
import shutil

brain = r"C:\Users\default.LAPTOP-UQP63FS1\.gemini\antigravity\brain\b6ed569b-95cb-481a-bc3b-c65d9cefdc8c"
dest  = r"c:\Users\default.LAPTOP-UQP63FS1\n8n\project portfolio\assets"

os.makedirs(dest, exist_ok=True)

files = [
    ("llm_text_emotion_1774557313086.png",     "llm1.png"),
    ("llm_fake_news_1774557327961.png",        "llm2.png"),
    ("llm_ner_system_1774557345194.png",       "llm3.png"),
    ("llm_vision_transformer_1774557362373.png","llm4.png"),
    ("llm_phi2_assistant_1774557377097.png",   "llm5.png"),
]

for src_name, dst_name in files:
    src = os.path.join(brain, src_name)
    dst = os.path.join(dest, dst_name)
    if os.path.exists(src):
        shutil.copyfile(src, dst)
        print("OK: " + dst_name)
    else:
        print("MISSING: " + src_name)

print("All done.")
