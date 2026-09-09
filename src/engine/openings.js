/**
 * XIANGQI OPENINGS & ENDGAME PUZZLES (SÁCH KHAI CUỘC & CỜ THẾ)
 * Contains classical openings and tactical endgame puzzles.
 */

// Classical Openings mapped by FEN prefixes or move sequences
export const OPENINGS = [
  // Trung Pháo (Pháo 2 bình 5 hoặc Pháo 8 bình 5)
  {
    name: "Trung Pháo (Pháo Đầu)",
    moves: [
      { from: { r: 7, c: 1 }, to: { r: 7, c: 4 } }, // C8.5
      { from: { r: 7, c: 7 }, to: { r: 7, c: 4 } }  // C2.5
    ]
  },
  // Khởi Mã Cuộc (Mã 2 tiến 3 hoặc Mã 8 tiến 7)
  {
    name: "Khởi Mã Cuộc",
    moves: [
      { from: { r: 9, c: 1 }, to: { r: 7, c: 2 } }, // H8+7
      { from: { r: 9, c: 7 }, to: { r: 7, c: 6 } }  // H2+3
    ]
  },
  // Tiên Nhân Chỉ Lộ (Binh 7 tiến 1 hoặc Binh 3 tiến 1)
  {
    name: "Tiên Nhân Chỉ Lộ",
    moves: [
      { from: { r: 6, c: 2 }, to: { r: 5, c: 2 } }, // P7+1
      { from: { r: 6, c: 6 }, to: { r: 5, c: 6 } }  // P3+1
    ]
  },
  // Phi Tượng Cuộc (Tượng 3 tiến 5 hoặc Tượng 7 tiến 5)
  {
    name: "Phi Tượng Cuộc",
    moves: [
      { from: { r: 9, c: 2 }, to: { r: 7, c: 4 } }, // E7+5
      { from: { r: 9, c: 6 }, to: { r: 7, c: 4 } }  // E3+5
    ]
  }
];

// Classic Black responses to Trung Pháo
export const BLACK_RESPONSES_TO_TRUNG_PHAO = [
  // Bình Phong Mã (Mã 8 tiến 7 / Mã 2 tiến 3)
  { from: { r: 0, c: 1 }, to: { r: 2, c: 2 } },
  { from: { r: 0, c: 7 }, to: { r: 2, c: 6 } },
  // Thuận Pháo (Pháo 8 bình 5)
  { from: { r: 2, c: 1 }, to: { r: 2, c: 4 } },
  // Nghịch Pháo (Pháo 2 bình 5)
  { from: { r: 2, c: 7 }, to: { r: 2, c: 4 } }
];

// Famous Endgame Puzzles (Cờ Thế Kinh Điển)
export const CLASSIC_PUZZLES = [
  {
    id: "puzzle-1",
    title: "Đơn Mã Ẩm Tuyền (Ngựa uống nước suối)",
    description: "Thế cờ tàn nghệ thuật: Đỏ đi trước, dùng Xe và Mã phối hợp khóa chặt cung cấm của Đen.",
    difficulty: "Kỳ thủ",
    fen: "3k5/4a4/4b4/9/9/9/9/4H4/4R4/4K4 w - - 0 1",
    solutionHint: "Xe 5 tiến 1 ép Tướng Đen lộ diện, sau đó Mã nhảy ngọa tào chiếu bí!"
  },
  {
    id: "puzzle-2",
    title: "Khổng Minh Mượn Tên",
    description: "Thế cờ Pháo ngòi liên hoàn: Đỏ đi trước chiếu bí trong 3 nước.",
    difficulty: "Cao thủ",
    fen: "3ak4/4a4/9/9/9/9/9/1C5C1/4R4/4K4 w - - 0 1",
    solutionHint: "Dùng Xe làm ngòi cho Pháo sau lộn vào giữa cung cấm!"
  },
  {
    id: "puzzle-3",
    title: "Thất Tinh Tụ Hội (Tuyệt phẩm Cờ Thế)",
    description: "Ván cờ giang hồ lừng danh: Bên Đỏ quân ít hơn nhưng có thế liên hoàn kích sát.",
    difficulty: "Thần cơ",
    fen: "2ba1k3/4a4/4b4/p7p/9/9/P7P/4B4/4A4/2BAK4 w - - 0 1",
    solutionHint: "Đẩy Binh áp sát bờ sông, tạo thế gọng kìm triệt hạ phòng tuyến."
  }
];
