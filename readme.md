# Bengaluru Civil Relief & Family Reunification Network

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License-MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Domain-Bengaluru_Civil_Defense](https://img.shields.io/badge/Domain-Bengaluru_Civil_Defense-maroon?style=flat-square)

A zero-dependency, local-first civil registry designed for emergency family reunification and BBMP shelter coordination during urban disaster scenarios in Bengaluru.

---

## 📌 Problem Statement
During severe urban disaster emergencies or heavy monsoon waterlogging in Bengaluru, cellular network towers degrade to 2G or fail entirely. Relief camp records become fragmented across manual paper ledgers, leaving families without a centralized, high-trust system to locate missing relatives or verify safe check-ins.

---

## 💡 Solution
A lightweight, offline-first civil defense ledger that runs locally inside client browsers. It provides real-time search, status filtering, photo upload processing, smart match/sighting reporting, and a low-bandwidth queue buffer—all operating seamlessly without external APIs, cloud servers, or database dependencies.

---

## 🛠️ Technologies Used
- **Frontend Core:** Vanilla HTML5, CSS3 (Custom Retro Paper Ledger Styling), JavaScript (ES6)
- **Data Persistence:** Browser LocalStorage API
- **File Processing:** HTML5 FileReader API (Base64 Image Data Encoding)
- **Typography:** Courier Prime & Playfair Display (Google Fonts)

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                              │
└────────────────────────────────────────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│     UI LAYER     │    │    APP LOGIC     │    │  BUFFER QUEUE    │
│ HTML5 / CSS3     │    │ app.js Events &  │    │ 2G Offline Local │
│ Paper Aesthetic  │    │ State Handling   │    │ Submission Array │
└──────────────────┘    └──────────────────┘    └──────────────────┘
                                   │
                                   ▼
                        ┌──────────────────┐
                        │ PERSISTENCE LAYER│
                        │ LocalStorage API │
                        └──────────────────┘
                        
                        
## 🚀 Installation & Execution Steps
Follow these instructions to install and run the project locally on your machine or another laptop via localhost:

Step 1: Clone the Repository
Open your terminal or command prompt and run the following command to clone the project:

Bash
git clone [https://github.com/nandini-anand27/bengaluru-civil-relief-network.git](https://github.com/nandini-anand27/bengaluru-civil-relief-network.git)
Step 2: Navigate to Project Directory
Change your current directory into the cloned repository folder:

Bash
cd bengaluru-civil-relief-network
Step 3: Run on Localhost
You can execute and test the application locally using any of the following methods:

Option A (VS Code Live Server - Recommended):

Open the project folder in Visual Studio Code.

Right-click on index.html in the file explorer.

Select Open with Live Server to launch it automatically on http://localhost:5500.

Option B (Python HTTP Server):
If you have Python installed, run this command in your terminal:

Bash
python -m http.server 8000
Then open your browser and go to: http://localhost:8000

Option C (Direct Browser Launch):
Double-click the index.html file to open it directly in Google Chrome, Microsoft Edge, or Firefox.

✨ Key Features & Functionality
Missing Persons Registry & Photo Upload:

Log missing individuals with full details, last known location in Bengaluru, and optional photograph uploads which convert to Base64 thumbnail previews.

Smart Match & Sighting System:

Search missing records instantly by keyword, name, or area.

Report sightings of missing individuals at Bengaluru landmarks (e.g., Majestic, Silk Board, Indiranagar) to automatically update their status to SAFE.

Civilian Safe Check-in:

Allows survivors reaching a relief camp to check in and clear or update their missing status.

BBMP Shelter Map & Dispatch Matrix:

Interactive pins displaying live bed capacities and medical triage hours for major Bengaluru relief camps (Kanteerava Stadium, Indiranagar Club, Jayanagar Complex).

Low-Bandwidth Queue Buffer:

Simulates 2G network drops and queues submissions locally in an offline buffer until connection restores.

🔮 Future Development Roadmap
[ ] SMS / USSD Integration: Allow check-ins via basic feature phones using GSM gateways.

[ ] Aadhaar / Voter ID Verification: Verify report authentications via light OTP verification.

[ ] Regional Language Localisation: Add full Kannada interface support (kn-IN) for local relief workers.

[ ] P2P Local Mesh Sync: WebRTC-based local device sync for areas with zero cellular connectivity.

👥 Authors & Contributors
Nandini Anand (nandini-anand27)
K Rashmi
Nisha P
## 🔮 Future Development Roadmap
- [ ] **SMS/USSD Integration:** Allow check-ins via basic feature phones using GSM gateway.
- [ ] **Aadhaar / Voter ID Verification:** Verify report authentications via light OTP verification.
- [ ] **Regional Language Localisation:** Add full Kannada interface support (`kn-IN`) for local relief workers.
- [ ] **P2P Local Mesh Sync:** WebRTC-based local device sync for areas with zero cellular connectivity.