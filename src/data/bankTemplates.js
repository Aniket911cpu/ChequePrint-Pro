export const bankTemplates = [
  {
    bank_code: "SBI",
    bank_name: "State Bank of India",
    width_mm: 176,
    height_mm: 84,
    orientation: "landscape",
    fields: [
      { field_name: 'payee', x_mm: 34, y_mm: 22, max_width_mm: 120, font_size: 11, is_bold: 0 },
      { field_name: 'amount_num', x_mm: 130, y_mm: 22, max_width_mm: 40, font_size: 11, is_bold: 0 },
      { field_name: 'amount_words', x_mm: 10, y_mm: 38, max_width_mm: 155, font_size: 10, is_bold: 0 },
      { field_name: 'date_dd', x_mm: 136, y_mm: 8, max_width_mm: 8, font_size: 11, is_bold: 0 },
      { field_name: 'date_mm', x_mm: 148, y_mm: 8, max_width_mm: 8, font_size: 11, is_bold: 0 },
      { field_name: 'date_yyyy', x_mm: 158, y_mm: 8, max_width_mm: 16, font_size: 11, is_bold: 0 }
    ]
  },
  {
    bank_code: "HDFC",
    bank_name: "HDFC Bank",
    width_mm: 176,
    height_mm: 84,
    orientation: "landscape",
    fields: [
      { field_name: 'payee', x_mm: 30, y_mm: 20, max_width_mm: 120, font_size: 11, is_bold: 0 },
      { field_name: 'amount_num', x_mm: 135, y_mm: 20, max_width_mm: 35, font_size: 11, is_bold: 0 },
      { field_name: 'amount_words', x_mm: 15, y_mm: 35, max_width_mm: 150, font_size: 10, is_bold: 0 },
      { field_name: 'date_dd', x_mm: 140, y_mm: 5, max_width_mm: 8, font_size: 11, is_bold: 0 },
      { field_name: 'date_mm', x_mm: 150, y_mm: 5, max_width_mm: 8, font_size: 11, is_bold: 0 },
      { field_name: 'date_yyyy', x_mm: 160, y_mm: 5, max_width_mm: 14, font_size: 11, is_bold: 0 }
    ]
  },
  {
    bank_code: "ICICI",
    bank_name: "ICICI Bank",
    width_mm: 176,
    height_mm: 84,
    orientation: "landscape",
    fields: [
      { field_name: 'payee', x_mm: 25, y_mm: 25, max_width_mm: 120, font_size: 11, is_bold: 0 },
      { field_name: 'amount_num', x_mm: 140, y_mm: 25, max_width_mm: 30, font_size: 11, is_bold: 0 },
      { field_name: 'amount_words', x_mm: 10, y_mm: 40, max_width_mm: 160, font_size: 10, is_bold: 0 },
      { field_name: 'date_dd', x_mm: 145, y_mm: 10, max_width_mm: 8, font_size: 11, is_bold: 0 },
      { field_name: 'date_mm', x_mm: 155, y_mm: 10, max_width_mm: 8, font_size: 11, is_bold: 0 },
      { field_name: 'date_yyyy', x_mm: 165, y_mm: 10, max_width_mm: 12, font_size: 11, is_bold: 0 }
    ]
  }
];
