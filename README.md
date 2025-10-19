# 🎁 Anniversary 20/10 Gift Box

Một trang web tương tác đặc biệt để tặng quà vào dịp 20/10 (Ngày Phụ nữ Việt Nam) với hiệu ứng 3D và animations đẹp mắt.

## ✨ Features

### 🎨 Trang Mở Quà (Gift Unwrapping)
- **5 lớp giấy gói** với màu sắc và patterns khác nhau
- Mỗi lần click sẽ "xé" một lớp giấy ra
- Hiệu ứng animations mượt mà với Framer Motion
- Progress bar theo dõi tiến độ
- Confetti effect khi mở xong
- Responsive cho mọi thiết bị

### 💌 Trang Thông Điệp (Message)
- **3D Background** với Three.js:
  - Animated distortion sphere
  - 12 floating 3D hearts với metallic effect
  - 5000 stars background
  - Dynamic lighting system
- **Glassmorphism UI** hiện đại
- **3 Tabs tương tác**:
  - 💌 Lời Nhắn - Thông điệp tình cảm
  - 💝 Kỷ Niệm - Timeline với 3D cards
  - 🌸 Lời Chúc - 6 lời chúc đẹp
- **Parallax scrolling effects**
- **Floating particles** và animated emojis

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Effects**: React Confetti
- **Fonts**: Pacifico + Poppins (Google Fonts)

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/npnhanit/anniversary-2010-giftbox.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Mở [http://localhost:3001](http://localhost:3001) để xem ứng dụng.

## 🛠️ Available Scripts

```bash
npm run dev      # Chạy dev server (port 3001)
npm run build    # Build production
npm start        # Chạy production server
npm run lint     # Lint code
```

## 🎯 Project Structure

```
gift-box-2010/
├── app/
│   ├── components/
│   │   └── Message.tsx         # Component trang thông điệp với 3D
│   ├── globals.css             # Global styles + utilities
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Trang chính (Gift unwrapping)
├── public/                     # Static assets
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
```

## 🎨 Design Highlights

### 5 Lớp Giấy Gói:
1. **Lớp 1**: 🌸 Cam-Vàng với ribbon tím
2. **Lớp 2**: 💚 Xanh lá với ribbon đỏ-hồng  
3. **Lớp 3**: ⭐ Xanh dương với ribbon hồng
4. **Lớp 4**: 💜 Tím với ribbon cam
5. **Lớp 5**: ❤️ Hồng-đỏ với ribbon vàng

### Performance Optimizations:
- ⚡ Mobile detection để giảm particles
- 💾 GPU acceleration với transform3d
- 🎭 Lazy loading cho 3D scene
- 📱 Responsive từ mobile đến desktop

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640-768px (md)
- **Desktop**: > 768px (lg+)

## 🌟 Special Features

- ✅ Progressive disclosure (mở từng lớp)
- ✅ 3D WebGL background với Three.js
- ✅ Glassmorphism + Backdrop blur
- ✅ Smooth spring animations
- ✅ Touch-friendly trên mobile
- ✅ Custom scrollbar
- ✅ Parallax effects
- ✅ Confetti celebration

## 💝 Made with Love

Dự án được tạo ra với tình yêu để tặng một người đặc biệt vào ngày 20/10 💖

---

**Repository**: [https://github.com/npnhanit/anniversary-2010-giftbox.git](https://github.com/npnhanit/anniversary-2010-giftbox.git)

**Created**: October 2025

