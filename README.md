# 🦙 Llama Desktop App

[🇻🇳 Tiếng Việt](#-tiếng-việt) | [🇬🇧 English](#-english)

---

## 🇻🇳 Tiếng Việt

**Llama Desktop App** là ứng dụng Electron độc lập cho phép khởi chạy và quản lý mô hình AI cục bộ với giao diện Dashboard `llama.cpp` được **Việt Hóa 100% giao diện (UI)**, tích hợp cơ chế dịch ngược Reverse Proxy thông minh và chế độ Cửa sổ thu nhỏ (Mini Window Mode / Always-On-Top).

### 🌟 Tính Năng Nổi Bật:
- 🇻🇳 **Việt Hóa Giao Diện 100%**: Dịch toàn bộ 8 tab Cài đặt (Tổng quan, Hiển thị, Lấy mẫu, Hình phạt, Tác vụ Agent, Lập trình viên, Công cụ, Nhập/Xuất), các hộp thoại modal, tooltip và nút bấm. Bảo toàn nguyên vẹn câu trả lời AI dạng thô từ mô hình.
- 🚀 **Trình Dịch Reverse Proxy 1st-Party**: Chạy máy chủ proxy Node.js (`http://127.0.0.1:8081`) tự động giải nén `gzip` trong RAM và chèn từ điển 600+ cụm từ Tiếng Việt siêu tốc.
- 📌 **Chế Độ Thu Nhỏ & Ghim Nổi (Mini Window Mode)**: Cửa sổ thu nhỏ gọn gàng (440x680px) luôn nổi trên cùng màn hình (Always-On-Top) với 3 nút điều khiển nổi bật:
  - `✕` (Màu đỏ): Thoát chế độ thu nhỏ, khôi phục cửa sổ lớn.
  - `▼` (Màu tím): Mở Pop-up Menu tất cả các chức năng.
  - `💠` (Màu vàng): Ấn giữ và kéo rê để di chuyển vị trí ứng dụng trên desktop.
- 🎨 **Topbar Co Giãn Thông Minh**: Khóa chiều cao cố định 38px chống vỡ khung, tự động thu gọn và hiện nút `▼` khi thiếu không gian màn hình.
- ⚡ **Chạy Độc Lập Chạy Ngay (Portable)**: Bản build tự chạy không cần cài đặt cho Windows (`.exe`) và Linux Bazzite OS (`.tar.gz`).

### 📦 Tải Về Bản Build Thực Thi (Releases):
- **Windows Portable**: [Tải Llama-Desktop-Portable-Windows.exe](https://github.com/Neito112/llama-desktop-app/releases/download/v1.0.0/Llama-Desktop-Portable-Windows.exe)
- **Linux / Bazzite OS**: [Tải llama-desktop-app-1.0.0.tar.gz](https://github.com/Neito112/llama-desktop-app/releases/download/v1.0.0/llama-desktop-app-1.0.0.tar.gz)

---

## 🇬🇧 English

**Llama Desktop App** is a standalone Electron desktop application for running local AI models with the `llama.cpp` WebUI dashboard, featuring **100% Vietnamese UI localization**, a 1st-party reverse proxy translation engine, and a compact Mini Window Mode with Always-On-Top pin support.

### 🌟 Key Features:
- 🇻🇳 **100% UI Localization**: Translates all 8 Settings tabs (General, Display, Sampling, Penalties, Agentic, Developer, Tools, Import/Export), modals, tooltips, buttons, and placeholders while strictly preserving raw AI model chat responses.
- 🚀 **1st-Party Reverse Proxy Engine**: Embedded Node.js proxy server (`http://127.0.0.1:8081`) handling on-the-fly `zlib` gunzip decompression and real-time DOM translation injection.
- 📌 **Mini Window Mode & Always-On-Top**: Compact 440x680px floating window pinned on top of all OS windows with 3 prominent controls:
  - `✕` (Red): Exit mini mode and restore normal window size.
  - `▼` (Purple): Open feature action popup menu.
  - `💠` (Gold): Click and drag to move window position anywhere on desktop.
- 🎨 **Responsive Topbar**: Fixed 38px height preventing line breaks, automatically hiding overflow items into a sleek `▼` popup menu.
- ⚡ **Zero Installation Required**: Portable binaries for Windows (`.exe`) and Linux Bazzite OS (`.tar.gz`).

### 📦 Download Portable Releases:
- **Windows Portable**: [Download Llama-Desktop-Portable-Windows.exe](https://github.com/Neito112/llama-desktop-app/releases/download/v1.0.0/Llama-Desktop-Portable-Windows.exe)
- **Linux / Bazzite OS**: [Download llama-desktop-app-1.0.0.tar.gz](https://github.com/Neito112/llama-desktop-app/releases/download/v1.0.0/llama-desktop-app-1.0.0.tar.gz)

---

## 🛠️ Build from Source / Hướng Dẫn Biên Dịch:

```bash
# Install dependencies
npm install

# Run dev mode
npm start

# Build Windows Portable (.exe)
npm run build:win

# Build Linux Package (.tar.gz)
npm run build:linux
```
