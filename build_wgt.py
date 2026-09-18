import os
import zipfile
import shutil
from PIL import Image, ImageDraw, ImageFont

def generate_icon(path):
    size = (512, 512)
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Outer circle shadow
    draw.ellipse([26, 26, 486, 486], fill=(0, 0, 0, 100))
    
    # Wooden Piece Body
    draw.ellipse([20, 20, 480, 480], fill=(235, 205, 155, 255), outline=(139, 69, 19, 255), width=16)
    draw.ellipse([45, 45, 455, 455], fill=(245, 222, 179, 255), outline=(180, 100, 30, 255), width=6)
    
    # Inner ring
    draw.ellipse([65, 65, 435, 435], outline=(160, 82, 45, 200), width=4)
    
    windir = os.environ.get('WINDIR', 'C:\\Windows')
    fonts_dir = os.path.join(windir, 'Fonts')
    
    # Font for Chinese Character
    font_large = None
    for fn in ["simhei.ttf", "msyh.ttc", "simsun.ttc", "arial.ttf"]:
        fp = os.path.join(fonts_dir, fn)
        if os.path.exists(fp):
            try:
                font_large = ImageFont.truetype(fp, 210)
                break
            except Exception:
                pass
    if not font_large:
        font_large = ImageFont.load_default()

    # Font for Vietnamese "CỜ TƯỚNG" (Arial has full Vietnamese Unicode)
    font_sub = None
    for fn in ["arialbd.ttf", "arial.ttf", "segoeuib.ttf", "segoeui.ttf", "tahoma.ttf"]:
        fp = os.path.join(fonts_dir, fn)
        if os.path.exists(fp):
            try:
                font_sub = ImageFont.truetype(fp, 46)
                break
            except Exception:
                pass
    if not font_sub:
        font_sub = ImageFont.load_default()

    # Draw Red "帥" (General)
    char = "帥"
    bbox = draw.textbbox((0, 0), char, font=font_large)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (512 - w) / 2
    y = (512 - h) / 2 - 38
    
    # Carved shadow
    draw.text((x + 4, y + 4), char, font=font_large, fill=(120, 10, 10, 160))
    # Main red character
    draw.text((x, y), char, font=font_large, fill=(215, 25, 25, 255))
    
    # Subtitle: CỜ TƯỚNG
    sub_text = "CỜ TƯỚNG"
    sbbox = draw.textbbox((0, 0), sub_text, font=font_sub)
    sw = sbbox[2] - sbbox[0]
    sx = (512 - sw) / 2
    sy = 360
    draw.text((sx + 2, sy + 2), sub_text, font=font_sub, fill=(100, 20, 20, 140))
    draw.text((sx, sy), sub_text, font=font_sub, fill=(180, 20, 20, 255))
    
    img.save(path, "PNG")
    print(f"Generated icon with crisp Vietnamese typography: {path}")

def build_wgt():
    staging = "d:/co_tuong_tv/wgt_staging"
    if os.path.exists(staging):
        shutil.rmtree(staging)
    os.makedirs(staging, exist_ok=True)
    
    # Copy dist contents
    dist_dir = "d:/co_tuong_tv/dist"
    for item in os.listdir(dist_dir):
        s = os.path.join(dist_dir, item)
        d = os.path.join(staging, item)
        if os.path.isdir(s):
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)
            
    # Generate icon.png
    icon_path = os.path.join(staging, "icon.png")
    generate_icon(icon_path)
    
    # Also copy to root as icon.png for preview
    shutil.copy2(icon_path, "d:/co_tuong_tv/icon.png")
    
    # Write config.xml
    config_xml = '''<?xml version="1.0" encoding="UTF-8"?>
<widget xmlns="http://www.w3.org/ns/widgets" xmlns:tizen="http://tizen.org/ns/widgets" id="http://cotuongtv.app/CoTuongTV0" version="1.0.0" viewmodes="maximized">
    <tizen:application id="CoTuongTV0.CoTuongTV" package="CoTuongTV0" required_version="3.0"/>
    <name>Cờ Tướng</name>
    <description>Trò chơi Cờ Tướng TV Phòng Khách</description>
    <author href="https://kienggggg.github.io/co-tuong-tv/">Kieng</author>
    <tizen:profile name="tv-samsung"/>
    <content src="index.html"/>
    <icon src="icon.png"/>
    <tizen:privilege name="http://tizen.org/privilege/internet"/>
    <tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/>
    <tizen:privilege name="http://tizen.org/privilege/application.launch"/>
    <feature name="http://tizen.org/feature/screen.size.normal.1080.1920"/>
    <tizen:metadata key="http://samsung.com/tv/metadata/multitasking.support" value="true"/>
    <tizen:metadata key="http://samsung.com/tv/metadata/prelaunch.support" value="true"/>
</widget>
'''
    with open(os.path.join(staging, "config.xml"), "w", encoding="utf-8") as f:
        f.write(config_xml)
        
    # Output WGT
    wgt_file = "d:/co_tuong_tv/CoTuongTV.wgt"
    if os.path.exists(wgt_file):
        os.remove(wgt_file)
        
    with zipfile.ZipFile(wgt_file, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(staging):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, staging)
                zf.write(file_path, arcname)
                
    print(f"Successfully created: {wgt_file} ({os.path.getsize(wgt_file)} bytes)")

if __name__ == "__main__":
    build_wgt()
