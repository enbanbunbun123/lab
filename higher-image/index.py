from PIL import Image, ImageFilter
import numpy as np
import matplotlib.pyplot as plt

# 画像の読み込み
image_path = "./image2.png"
image = Image.open(image_path)

# 画像を配列に変換
image_array = np.array(image)

# 画像の品質を向上させる関数
def enhance_image(image_array):
    # PIL画像に変換
    img = Image.fromarray(image_array)
    
    # エッジを強調するフィルタを適用
    img = img.filter(ImageFilter.SHARPEN)
    img = img.filter(ImageFilter.DETAIL)
    
    # 画像のアップスケール
    upscale_factor = 2
    img = img.resize((img.width * upscale_factor, img.height * upscale_factor), Image.LANCZOS)
    
    return img

# 画像の品質を向上させる
enhanced_image = enhance_image(image_array)

# # 高画質化された画像の保存
# enhanced_image_path = "/mnt/data/図1_enhanced.png"
# enhanced_image.save(enhanced_image_path)

# オリジナルと高画質化された画像を表示
fig, ax = plt.subplots(1, 2, figsize=(12, 6))
ax[0].imshow(image_array)
ax[0].set_title("Original Image")
ax[0].axis("off")

ax[1].imshow(enhanced_image)
ax[1].set_title("Enhanced Image")
ax[1].axis("off")

plt.show()
