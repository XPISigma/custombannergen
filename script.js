const banner = document.getElementById("banner");
const colorPicker = document.getElementById("colorPicker");
const emblemIcon = document.getElementById("emblemIcon");
const randomizeIconButton = document.getElementById("randomizeIcon");
const randomizeColorButton = document.getElementById("randomizeColor");
const copyRectangleButton = document.getElementById("copyRectangle");
const iconClasses = [
  "fa-car",
  "fa-house",
  "fa-tree",
  "fa-plane",
  "fa-bicycle",
  "fa-book",
  "fa-camera",
  "fa-gift",
  "fa-mug-hot",
  "fa-pencil",
  "fa-anchor",
  "fa-bell",
  "fa-bolt",
  "fa-cloud",
  "fa-heart",
  "fa-star",
  "fa-music",
  "fa-globe",
  "fa-laptop",
  "fa-tv",
  "fa-mobile",
  "fa-key",
  "fa-lock",
  "fa-unlock",
  "fa-thumbs-up",
  "fa-thumbs-down",
  "fa-lightbulb",
  "fa-dog",
  "fa-cat",
  "fa-crow",
  "fa-fish",
  "fa-spa",
  "fa-apple-alt",
  "fa-lemon",
  "fa-pepper-hot",
  "fa-hamburger",
  "fa-pizza-slice",
  "fa-basketball-ball",
  "fa-football-ball",
  "fa-baseball-ball",
  "fa-volleyball-ball",
  "fa-chess",
  "fa-dice",
  "fa-carrot",
  "fa-rocket",
  "fa-ship",
  "fa-subway",
  "fa-taxi",
  "fa-utensils",
  "fa-wine-glass",
  "fa-beer",
  "fa-birthday-cake",
  "fa-bus",
  "fa-truck",
  "fa-snowflake",
  "fa-umbrella",
  "fa-fighter-jet"
];

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

function setRandomIcon() {
  const randomIndex = Math.floor(Math.random() * iconClasses.length);
  emblemIcon.className = `fas ${iconClasses[randomIndex]}`;
}

function randomizeBannerColor() {
  const randomColor = getRandomColor();
  banner.style.backgroundColor = randomColor;
  colorPicker.value = randomColor;
}

function copyBannerToClipboard() {
  html2canvas(banner).then((canvas) => {
    // Convert the canvas to a Blob
    canvas.toBlob(function (blob) {
      // Create a new ClipboardItem with the image Blob
      const clipboardItem = new ClipboardItem({
        "image/png": blob
      });
      // Write to the clipboard
      navigator.clipboard
        .write([clipboardItem])
        .then(() => {
          alert("Banner image copied to clipboard!");
        })
        .catch((err) => {
          console.error("Error copying image to clipboard: ", err);
        });
    }, "image/png");
  });
}
const initialColor = getRandomColor();
banner.style.backgroundColor = initialColor;
colorPicker.value = initialColor;
colorPicker.addEventListener("input", () => {
  banner.style.backgroundColor = colorPicker.value;
});
randomizeIconButton.addEventListener("click", setRandomIcon);
randomizeColorButton.addEventListener("click", randomizeBannerColor);
copyRectangleButton.addEventListener("click", copyBannerToClipboard);
setRandomIcon();

async function copyBannerToClipboard() {
  const banner = document.getElementById("banner");

  if (!banner) {
    console.error("Banner element not found");
    showNotification("❌ Banner element not found", "error");
    return;
  }

  try {
    console.log("Starting banner capture...");
    const canvas = await html2canvas(banner, {
      backgroundColor: null,
      scale: 2,
      logging: true,
      useCORS: true,
      allowTaint: true
    });

    console.log("Canvas created successfully");
    try {
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        showNotification("✓ Copied to clipboard!", "success");
        return;
      }

      canvas.toBlob(async (blob) => {
        try {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(blob);

          // Create a temporary textarea
          const textarea = document.createElement("textarea");
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);

          // Copy image to clipboard using execCommand
          textarea.focus();
          document.execCommand("paste");

          // Cleanup
          document.body.removeChild(textarea);
          URL.revokeObjectURL(img.src);

          showNotification("✓ Copied to clipboard!", "success");
        } catch (err) {
          console.error("execCommand method failed:", err);
          // If all else fails, offer download
          downloadImage(blob);
        }
      });
    } catch (clipboardErr) {
      console.error("Clipboard operations failed:", clipboardErr);
      // Fallback to download
      canvas.toBlob(downloadImage);
    }
  } catch (err) {
    console.error("Error in copyBannerToClipboard:", err);
    showNotification("❌ Error copying banner", "error");
  }
}

// Helper function to handle downloads
function downloadImage(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "banner.png";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
  showNotification("✓ Banner downloaded as image!", "success");
}

// Helper function to show notifications
function showNotification(message, type = "success") {
  const msg = document.createElement("div");
  msg.className = `notification ${type}-message`;
  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.right = "20px";
  msg.style.padding = "10px 20px";
  msg.style.borderRadius = "4px";
  msg.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
  msg.style.color = "white";
  msg.style.zIndex = "1000";
  msg.textContent = message;
  msg.style.opacity = "0";
  msg.style.transition = "opacity 0.3s ease";

  document.body.appendChild(msg);

  // Trigger animation
  requestAnimationFrame(() => {
    msg.style.opacity = "1";
  });

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 300);
  }, 2000);
}

// Add event listener
document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copyRectangle");
  if (copyButton) {
    copyButton.addEventListener("click", copyBannerToClipboard);
  } else {
    console.error("Copy button not found!");
  }
});
