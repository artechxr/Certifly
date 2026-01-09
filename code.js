function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Certifly🦋')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 1. SYNC & SEND (Updates Col G row-by-row)
function sendTicketsToNewRegistrants(ssUrl) {
  try {
    const ss = SpreadsheetApp.openByUrl(ssUrl);
    const sheet = ss.getSheetByName("Attendees");
    if (!sheet) return "❌ Error: Tab 'Attendees' not found.";
    
    const data = sheet.getDataRange().getValues();
    let sentCount = 0;

    for (let i = 1; i < data.length; i++) {
      const name = data[i][1];  // Col B
      const email = data[i][2]; // Col C
      const status = data[i][6]; // Col G

      if (email && email.toString().includes("@") && status !== "SENT") {
        try {
          const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(email);
          MailApp.sendEmail({
            to: email,
            subject: "🎟️ Your Ticket - " + name,
            htmlBody: `<div style="text-align:center; font-family:sans-serif; border:2px solid #dbeafe; padding:20px; border-radius:20px; max-width:400px; margin:auto;">
                        <h2 style="color:#6366f1;">Hi ${name}!</h2>
                        <p>Your registration is confirmed. Please present this QR code at the door.</p>
                        <img src="${qrUrl}" width="200" style="border-radius:10px;">
                        <p style="font-size:10px; color:#aaa; margin-top:15px;">Powered by Certifly🦋</p>
                      </div>`
          });
          sheet.getRange(i + 1, 7).setValue("SENT");
          SpreadsheetApp.flush(); 
          sentCount++;
        } catch (emailErr) { continue; }
      }
    }
    return sentCount > 0 ? `✨ Successfully sent ${sentCount} tickets!` : "ℹ️ No new tickets to send.";
  } catch (e) { return "❌ Permission Error: Set Sheet to 'Anyone with link can Edit'"; }
}

// 2. LIVE CHECK-IN (Updates Col F)
function markAttendance(ssUrl, tabName, email) {
  try {
    const ss = SpreadsheetApp.openByUrl(ssUrl);
    const sheet = ss.getSheetByName("Attendees");
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][2].toString().toLowerCase().trim() === email.toLowerCase().trim()) {
        sheet.getRange(i + 1, 6).setValue("Yes"); 
        SpreadsheetApp.flush();
        return "Check-in: " + data[i][1];
      }
    }
    return "User not found.";
  } catch (e) { return "❌ Permission Error: Set Sheet to 'Anyone with link can Edit'"; }
}

// 3. DISPATCH CERTIFICATES (Checks Col F)
function processCertificates(config) {
  try {
    const ss = SpreadsheetApp.openByUrl(config.ssUrl);
    const sheet = ss.getSheetByName("Attendees");
    const data = sheet.getDataRange().getValues();
    const folder = DriveApp.getFolderById(config.folderId);
    const template = DriveApp.getFileById(config.slideId);

    let count = 0;
    for (let i = 1; i < data.length; i++) {
      if (data[i][5] === "Yes") { 
        const name = data[i][1]; 
        const email = data[i][2]; 
        
        const copy = template.makeCopy(`${name} Certificate`, folder);
        const slideDoc = SlidesApp.openById(copy.getId());
        slideDoc.getSlides()[0].replaceAllText('{{Name}}', name);
        
        // CRITICAL: Force save before conversion so name appears in PDF
        slideDoc.saveAndClose();

        MailApp.sendEmail(email, "Your Certificate", `Hi ${name}, attached is your certificate!`, {
          attachments: [copy.getAs(MimeType.PDF)]
        });
        count++;
      }
    }
    return count > 0 ? `${count} Certs Dispatched!` : "No attendees found.";
  } catch (e) { return "❌ Error: Check File/Folder Permissions."; }
}
