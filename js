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

    // Try multiple methods to copy to clipboard
    try {
      // Method 1: Try canvas.toBlob() with clipboard API
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

      // Method 2: Try dataURL with execCommand
      canvas.toBlob(async (blob) => {
        try {
          // Create a temporary image element
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
