import rawReviewsCsv from "../data/reviews.csv?raw";
import { Testimonial } from "./types";

export function parseReviewsCsv(csvText: string): Testimonial[] {
  const reviews: Testimonial[] = [];
  
  // Parse CSV respecting multi-line strings enclosed in double quotes
  let inQuotes = false;
  let currentField = "";
  let currentRow: string[] = [];
  const rows: string[][] = [];

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      currentField = "";
      if (currentRow.length > 0 && currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }
  
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  // Filter out header row if present
  const dataRows = rows.filter((r, idx) => {
    if (idx === 0 && r[0]?.toLowerCase().includes("reviewer")) return false;
    return r.length >= 2 && r[0] && r[1];
  });

  dataRows.forEach((r, idx) => {
    const name = r[0].trim();
    const text = r[1].trim();
    reviews.push({
      id: `review-${idx + 1}`,
      name,
      role: "Verified Client",
      text,
      rating: 5
    });
  });

  // Sort by length of review descending (longer reviews first)
  reviews.sort((a, b) => b.text.length - a.text.length);

  return reviews;
}

export const DYNAMIC_TESTIMONIALS = parseReviewsCsv(rawReviewsCsv);
