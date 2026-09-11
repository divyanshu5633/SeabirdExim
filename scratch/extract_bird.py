from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

img = Image.open('public/images/cinematic/bird_crop_test.jpg')
arr = np.array(img)
r, g, b = arr[:,:,0].astype(float), arr[:,:,1].astype(float), arr[:,:,2].astype(float)
brightness = (r + g + b) / 3.0

# In bird_crop_test.jpg:
# Water background is roughly 80 to 140
# White/grey bird plumage is > 148
# Dark wing tips are < 75
# Yellow beak: r > 140, g > 85, b < 70
is_bird = (brightness > 146) | ((brightness < 78) & (r < 75)) | ((r > 135) & (g > 80) & (b < 75))

# Clean up noise
opened = ndimage.binary_opening(is_bird, structure=np.ones((4,4)))
closed = ndimage.binary_closing(opened, structure=np.ones((9,9)))
filled = ndimage.binary_fill_holes(closed)

lbl, num = ndimage.label(filled)
counts = np.bincount(lbl.flat)[1:]
best_label = np.argmax(counts) + 1
bird_mask = (lbl == best_label)

# Slight morphological dilation to preserve feather tips
dilated = ndimage.binary_dilation(bird_mask, structure=np.ones((3,3)))

# Anti-alias mask
mask_img = Image.fromarray((dilated * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=2))
mask_arr = np.array(mask_img)

# Create RGBA
rgba = np.dstack([arr, mask_arr])
out = Image.fromarray(rgba)
# Crop transparent padding
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)
out.save('public/images/cinematic/seabird_alpha_clean.png')
print('Saved seabird_alpha_clean.png with size', out.size)
