Certifly🦋: Aesthetic Event Management & Automation
Certifly is a premium, all-in-one event automation suite designed for organizers who value both efficiency and aesthetic excellence.It handles the entire lifecycle of an 
event from registration sync and QR ticket distribution to live check-ins and automated PDF certification all via a floating, glass-morphic web dashboard.

🌟 Key Features
1. Aesthetic Dashboard: A glass-morphic, pastel-themed UI with floating animations.
2. One-Click Ticket Sync: Instantly emails unique QR codes to all new registrants.
3. Live QR Scanner: Turn any smartphone into a professional check-in device.
4. Smart Automation: Automatically marks attendance in Google Sheets upon scanning.
5. Automated Certification: Generates high-quality PDF certificates using Google Slides templates and emails them to attendees.
6. Zero-Config for Strangers: Built so anyone can use it by simply pasting their own Google Sheet and Folder links.

🚀 Setup Checklist (Follow Carefully)
To ensure the automation runs fluently, please follow these steps exactly:
1. Prepare Your Spreadsheet
Create a Google Sheet and rename the tab to Attendees (Case Sensitive). Ensure your data columns follow this exact order:
Column - Header Name (Row 1), Purpose
Col B - Full Name, Used for the guest's name on the certificate.
Col C - Email Address, Destination for tickets and certificates.
Col F - Attended, "Do not touch. The scanner writes ""Yes"" here.
Col G - QR Status, "Do not touch. The sync writes ""SENT"" here.

Configure Certificate Template
Open a Google Slide to act as your certificate design.
Add a text box and type {{Name}} exactly.
Note: This tag is case-sensitive. The script will search for this exact placeholder to swap with the guest's name from Column B.

Vital Permissions (The "Permission" Fix) 🔓
For the automation to access your files, you must set the following three items to "Anyone with the link" as Editor:
Google Sheet (The database)
Google Slide (The template)
Drive Folder (The destination where generated certificates are saved)

Extract Your IDs
Slide ID: Copy the long string between /d/ and /edit in your Google Slide URL.
Folder ID: Copy the final string of characters at the end of your Google Drive Folder URL.

Usage Guide
Step 1: Configuration
Paste your Sheet URL (must be linked to the form) , Slide ID (template of the certificate) , and Folder ID (Event Certificates - folder name, This is where all the certificates will be stored)  into the configuration panel at the top of the dashboard.
Step 2: Registration Sync
Click "Sync & Send QR Tickets". The system scans your sheet and emails tickets to any row where QR Status is not yet marked "SENT".
Step 3: Live Check-in
Click "Open Scanner" at the event entrance. Scanning a guest's QR code updates their status in Column F to "Yes" in real-time.
Step 4: Final Dispatch
After the event, click "Dispatch All Certificates". The system generates personalized PDFs only for those marked "Yes" and emails them instantly.

⚠️ Troubleshooting
Issue,Solution
Permission Denied - Ensure Sheet, Slide, and Folder are all set to "Anyone with link: Editor"
Name not on Certificate - Double-check that your tag on the slide is exactly {{Name}} with capital 'N' and no extra spaces.
Not Syncing - Ensure the tab name is exactly Attendees and emails are in Column C and Names in column B.





