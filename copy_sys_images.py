import os
import shutil

brain = r"C:\Users\default.LAPTOP-UQP63FS1\.gemini\antigravity\brain\b6ed569b-95cb-481a-bc3b-c65d9cefdc8c"
dest  = r"c:\Users\default.LAPTOP-UQP63FS1\n8n\project portfolio\assets"

files = [
    ("sys1_talent_scout_1774577924882.png",   "workflow1.png"),
    ("sys2_digital_oracle_1774577938473.png",  "workflow2.png"),
    ("sys3_support_agent_1774577961609.png",   "workflow3.png"),
    ("sys4_finance_engine_1774577984283.png",  "workflow4.png"),
    ("sys5_intelligence_hub_1774578004456.png","workflow5.png"),
    ("sys6_security_sentinel_1774578024266.png","workflow6.png"),
]

for src_name, dst_name in files:
    src = os.path.join(brain, src_name)
    dst = os.path.join(dest, dst_name)
    if os.path.exists(src):
        shutil.copyfile(src, dst)
        print("Copied:", dst_name)
    else:
        print("MISSING:", src_name)

print("All done.")
