// utils/generateComplaintPdf.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateComplaintPdf(complaint) {
  if (!complaint) return;

  const {
    caseNumber,
    accessKey,
    reporterName,
    reporterEmail,
    category,
    priority,
    reportingMode,
    submittedAt,
    description,
    evidence = [],
  } = complaint;

  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;
  let cursorY = 40;

  // ===== HEADER =====

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CORPORATE INTEGRITY PORTAL", marginX, cursorY);

  cursorY += 24;
  doc.setFontSize(18);
  doc.text("Official Complaint Record", marginX, cursorY);

  // Status tag (right side)
  doc.setFontSize(10);
  const statusText = "AUTHENTICATED";
  const statusWidth = doc.getTextWidth(statusText) + 18;
  const statusX = pageWidth - marginX - statusWidth;
  const statusY = 40;

  doc.setFillColor(28, 164, 93); // green
  doc.setTextColor(255, 255, 255);
  doc.roundedRect(statusX, statusY, statusWidth, 20, 4, 4, "F");
  doc.text(statusText, statusX + 9, statusY + 13);

  // Meta row: generated on…
  doc.setTextColor(60, 64, 67);
  cursorY += 18;
  const generatedAt =
    new Date(submittedAt || Date.now()).toLocaleString() + " GMT";
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated on ${generatedAt}`, marginX, cursorY);

  // ===== CASE INFO + ACCESS KEY (two small cards) =====
  cursorY += 26;

  const cardWidth = (pageWidth - marginX * 2 - 16) / 2;
  const cardHeight = 50;

  // Case info card
  doc.setDrawColor(225, 227, 232);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(marginX, cursorY, cardWidth, cardHeight, 6, 6, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(125, 130, 135);
  doc.text("CASE INFORMATION", marginX + 12, cursorY + 18);

  doc.setFontSize(10);
  doc.setTextColor(46, 52, 64);
  doc.text("ID:", marginX + 12, cursorY + 36);
  doc.setFont("helvetica", "bold");
  doc.text(caseNumber || "N/A", marginX + 30, cursorY + 36);

  // Access key card
  const rightX = marginX + cardWidth + 16;
  doc.setFont("helvetica", "normal");
  doc.setDrawColor(225, 227, 232);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(rightX, cursorY, cardWidth, cardHeight, 6, 6, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(125, 130, 135);
  doc.text("SECURE ACCESS KEY", rightX + 12, cursorY + 18);

  doc.setFontSize(10);
  doc.setTextColor(46, 52, 64);
  doc.text(accessKey || "N/A", rightX + 12, cursorY + 36);

  cursorY += cardHeight + 30;

  // ===== SECTION: COMPLAINT METADATA =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(46, 52, 64);
  doc.text("COMPLAINT METADATA", marginX, cursorY);

  cursorY += 12;

  const labelStyle = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(125, 130, 135);
  };

  const valueStyle = () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(46, 52, 64);
  };

  const colGap = 180;

  // Row 1: Category + Date
  cursorY += 14;
  labelStyle();
  doc.text("Complaint Category", marginX, cursorY);
  doc.text("Date of Submission", marginX + colGap, cursorY);

  cursorY += 14;
  valueStyle();
  doc.text(category || "N/A", marginX, cursorY);
  doc.text(
    submittedAt ? new Date(submittedAt).toLocaleString() : "N/A",
    marginX + colGap,
    cursorY,
  );

  // Row 2: Reporting Method + Priority
  cursorY += 20;
  labelStyle();
  doc.text("Reporting Method", marginX, cursorY);
  doc.text("Priority Level", marginX + colGap, cursorY);

  cursorY += 14;
  valueStyle();
  doc.text(reportingMode.toUpperCase() || "N/A", marginX, cursorY);

  // priority with color
  if (priority) {
    const prLabel = String(priority);
    let color = [76, 175, 80]; // default green
    if (/high/i.test(prLabel)) color = [239, 68, 68]; // red
    if (/medium/i.test(prLabel)) color = [245, 158, 11]; // amber

    doc.setTextColor(...color);
    doc.text(prLabel, marginX + colGap, cursorY);
  } else {
    doc.text("N/A", marginX + colGap, cursorY);
  }

  // Row 3: Reporter Name + Email
  if (reporterEmail && reporterName) {
    cursorY += 20;
    labelStyle();
    doc.text("Reporter Name", marginX, cursorY);
    doc.text("Reporter Email", marginX + colGap, cursorY);

    cursorY += 14;
    valueStyle();
    doc.text(reporterName || "N/A", marginX, cursorY);
    doc.text(reporterEmail, marginX + colGap, cursorY);
  }

  cursorY += 30;

  // ===== SECTION: INCIDENT DESCRIPTION =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(46, 52, 64);
  doc.text("INCIDENT DESCRIPTION", marginX, cursorY);

  cursorY += 10;

  const textMargin = 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(46, 52, 64);

  const descriptionText =
    description?.trim() || "No description provided for this complaint.";

  const split = doc.splitTextToSize(
    descriptionText,
    pageWidth - marginX * 2 - textMargin * 2,
  );

  //Creating this variable to track the cursorY position after description text to make it dynamic
  const roundedRectHeight = split.length * 12;

  // description box
  doc.setDrawColor(225, 227, 232);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(
    marginX,
    cursorY,
    pageWidth - marginX * 2,
    roundedRectHeight + 5,
    6,
    6,
    "FD",
  );

  doc.text(split, marginX + textMargin, cursorY + textMargin);

  cursorY += roundedRectHeight + 30;

  // ===== SECTION: SUPPORTING EVIDENCE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(46, 52, 64);
  doc.text("SUPPORTING EVIDENCE", marginX, cursorY);

  cursorY += 10;

  if (evidence.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(125, 130, 135);
    doc.text("No supporting evidence uploaded.", marginX, cursorY + 14);
  } else {
    const rows = evidence.map((file, idx) => [
      idx + 1,
      file.originalName || "Attachment",
      `${(file.size / 1024).toFixed(2)} KB` || "",
    ]);

    autoTable(doc, {
      startY: cursorY + 6,
      head: [["#", "File Name", "Size"]],
      body: rows,
      styles: {
        font: "helvetica",
        fontSize: 9,
      },
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [46, 52, 64],
      },
      margin: { left: marginX, right: marginX },
    });
  }

  // ===== FOOTER =====
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 155, 160);
  doc.text(
    "This record is confidential and intended for use by authorized persons only. Unauthorized distribution or reproduction is strictly prohibited",
    marginX,
    pageHeight - 30,
  );

  // Trigger download
  const filename = `Complaint-${caseNumber || "record"}.pdf`;
  doc.save(filename);
}
