#!/usr/bin/env bash
set -euo pipefail

# Script to download core team images into public/coreteam
# It attempts to convert common Google Drive share URLs into direct download URLs.
# Run from repository root: bash scripts/download_coreteam_images.sh

mkdir -p public/coreteam

# Mapping: filename -> source url
declare -a MAPPING=(
  "01_Anish_Sahu.jpg|https://drive.google.com/file/d/125vFsbhbX7JRGEy0IMW5-FyGW_8xUN7X/view?usp=drivesdk"
  "03_Sujal_Jain.jpg|https://drive.google.com/file/d/1seWK38DsbPBVQYmNP4-0VIgd5K_MmZE8/view?usp=sharing"
  "07_Vyom_Pratap_Singh.jpg|https://drive.google.com/file/d/1DJ4bsJboOcGyNvmFOWowu0aWiBaOW6uX/view?usp=drivesdk"
  "08_Aaditya_Vanara.jpg|https://drive.google.com/file/d/1CR7HPb5LmkYR1nz3sWSVlpJZdQOyUFps/view?usp=drivesdk"
  "09_Akshat_Srivastava.jpg|https://drive.google.com/file/d/13o9U3ggnD3HMOGwpc1inwLxWf4gr5S4F/view?usp=sharing"
  "10_Ashutosh_Anand.jpg|https://photos.app.goo.gl/834RPHiRxbPq7Mya7"
  "11_Mrunmay.jpg|https://drive.google.com/file/d/1xj_2enQoBcUN1Urd1xoNX3m-augswoq0/view?usp=drivesdk"
  "21_Sarthak_Patil.jpg|https://drive.google.com/file/d/15u_uR0ISZWIOHLqEEHbNFefRXeSaYNer/view?usp=drivesdk"
  "24_Singh_Princekumar.jpg|https://drive.google.com/file/d/1k_2mqFqEv-Rdz6PM3AyqSHcwJUHc3loN/view?usp=drivesdk"
  "28_Aryan_Jadon.jpg|https://drive.google.com/file/d/1i-diugnaJ47k41lMkYtjzGOTWUApR8VQ/view?usp=drive_link"
)

for entry in "${MAPPING[@]}"; do
  filename="${entry%%|*}"
  url="${entry##*|}"

  # Convert common drive share URLs to direct download endpoint if possible
  dl="$url"
  if [[ "$url" =~ /file/d/([^/]+)/ ]]; then
    id="${BASH_REMATCH[1]}"
    dl="https://drive.google.com/uc?export=download&id=${id}"
  elif [[ "$url" =~ /open\?id=([^&]+) ]]; then
    id="${BASH_REMATCH[1]}"
    dl="https://drive.google.com/uc?export=download&id=${id}"
  fi

  echo "Downloading $filename from $dl"
  # Use curl with redirects and fail on HTTP error
  curl -L --fail -o "public/coreteam/${filename}" "$dl" || {
    echo "Failed to download $url -> saved as public/coreteam/${filename}"
  }
done

echo "Done. Images saved to public/coreteam/."