# Disaster Relief & Family Reunification Network

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Domain: Bengaluru Civil Defense](https://img.shields.io/badge/Domain-Bengaluru_Civil_Defense-800000?style=flat-square)

**An offline-first civil relief registry for emergency family reunification and shelter coordination (we have used bengaluru as the city for now).**

A lightweight, zero-dependency web application designed to help manage missing-person reports, survivor check-ins, sighting reports, and relief camp information during urban disasters and severe monsoon flooding.

---

## 📌 Problem Statement

During severe urban disasters and heavy monsoon waterlogging in Bengaluru, communication networks may become unreliable or unavailable. Relief camp records can become fragmented across handwritten registers and disconnected reporting systems, making it difficult for families to locate missing relatives and for relief workers to coordinate survivor check-ins.

The absence of a centralized, accessible registry can delay family reunification and complicate emergency response.

## 💡 Solution

The **Bengaluru Civil Relief & Family Reunification Network** is a lightweight, offline-first civil relief registry that runs directly in a web browser.

It provides a local interface for recording missing-person reports, searching records, reporting sightings, checking survivors into relief camps, and viewing shelter information.

### Key objectives

- Maintain locally accessible emergency records.
- Enable fast searches across missing-person reports.
- Support sighting reports and safe check-ins.
- Provide an interface for viewing relief camp capacity and medical support information.
- Queue submissions locally when network connectivity is unavailable.
- Minimize dependencies on external APIs and cloud services.

> **Note:** The current version stores records locally in the browser. It does not automatically synchronize records between devices or relief camps. Cross-device synchronization and verified real-time shelter data require additional infrastructure.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure, forms, and file uploads |
| CSS3 | Responsive layouts and retro paper-ledger styling |
| Vanilla JavaScript (ES6) | Search, event handling, filtering, and application logic |
| Browser LocalStorage API | Local persistence of application records |
| HTML5 FileReader API | Reading uploaded images for local previews |
| Base64 Encoding | Representing image data as text for local storage |
| Google Fonts | Courier Prime and Playfair Display typography |

**Dependencies:** No frontend frameworks or external database services are required by the current implementation.

**Typography:** The interface uses Courier Prime for a typewriter-inspired ledger aesthetic and Playfair Display for editorial headings. These fonts are loaded from Google Fonts when an internet connection is available; suitable fallback fonts should be provided for offline use.

---

## 🏗️ System Architecture

The application follows a client-side architecture, with the browser handling the user interface, application logic, local persistence, and queued submissions.

```text
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │    UI LAYER      │  │  APPLICATION     │  │  BUFFER QUEUE  │ │
│  │                  │  │     LOGIC        │  │                │ │
│  │ HTML5 / CSS3     │  │ JavaScript ES6   │  │ Pending Local  │ │
│  │ Forms and Search │  │ Events and State │  │ Submissions    │ │
│  └────────┬─────────┘  └────────┬─────────┘  └───────┬────────┘ │
│           │                     │                    │          │
│           └─────────────────────┼────────────────────┘          │
│                                 ▼                               │
│                    ┌────────────────────┐                       │
│                    │ PERSISTENCE LAYER  │                       │
│                    │                    │                       │
│                    │ Browser LocalStorage│                      │
│                    └────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Data flow

1. Users submit information through the application interface.
2. JavaScript validates and processes the submitted information.
3. Records are saved to browser LocalStorage.
4. Search and filtering operate on the locally stored records.
5. When connectivity is unavailable, supported submissions can be placed in a local pending queue.

**Current limitation:** A locally queued submission remains on that browser until synchronization functionality is implemented. The queue does not transmit records to other devices by itself.

---

## 🚀 Installation and Execution

### Prerequisites

- Git (to clone the repository).
- A modern web browser, such as Google Chrome, Microsoft Edge, or Firefox.
- Visual Studio Code with the Live Server extension, or Python for the local HTTP server option.

### Step 1: Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/nandini-anand27/bengaluru-civil-relief-network.git
```

### Step 2: Navigate to the project directory

```bash
cd bengaluru-civil-relief-network
```

### Step 3: Run the application

Choose one of the following methods.

#### Option A: VS Code Live Server (recommended)

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` in the Explorer.
4. Select **Open with Live Server**.
5. The application will open in your browser, typically at `http://127.0.0.1:5500` or `http://localhost:5500`.

#### Option B: Python HTTP server

Open a terminal in the project directory and run:

```bash
python -m http.server 8000
```

Then open the following address in your browser:

```text
http://localhost:8000
```

#### Option C: Open directly in a browser

Double-click `index.html` to open the application in your default browser.

**Recommendation:** Use Live Server or Python's HTTP server for development and testing.

---

## ✨ Key Features

### 1. Missing Persons Registry and Photo Upload

- Record the details of missing individuals.
- Store their last known location in Bengaluru.
- Upload an optional photograph.
- Generate image previews using the HTML5 FileReader API and Base64 encoding.

### 2. Smart Search and Sighting Reports

- Search records by name, keyword, or location.
- Filter records by their reported status.
- Submit sightings associated with Bengaluru landmarks, such as Majestic, Silk Board, and Indiranagar.
- Update a person's status when a sighting or safety report is recorded.

**Important:** A reported sighting should not automatically be treated as verified identity confirmation. A production system should include verification workflows and an authorized review process before changing a missing person's status to confirmed safe.

### 3. Civilian Safe Check-in

- Record survivors arriving at relief camps.
- Associate check-ins with available person records.
- Update relevant missing-person records when appropriate.

### 4. BBMP Shelter Map and Dispatch Matrix

- Display relief camp locations.
- Present shelter capacity information.
- Show medical triage availability and operating hours where data is available.
- Help users identify potentially relevant relief facilities.

Example locations include:

- Kanteerava Stadium
- Indiranagar
- Jayanagar Complex

**Data note:** Shelter capacities, availability, medical services, and operating hours must be sourced and updated through an authoritative process. Static or demonstration data should not be presented as verified live information.

### 5. Low-Bandwidth and Offline Queue

- Store supported records locally.
- Keep pending submissions in a browser-side queue.
- Simulate low-connectivity conditions for testing.
- Retain locally saved information across browser sessions, subject to browser storage availability.

The current queue is a local buffering mechanism, not a complete distributed synchronization system.

---

## 🔐 Privacy and Data Handling

The application is designed around local browser storage, reducing the need to transmit records to a remote server in the current implementation.

However, browser-local storage is not a secure, tamper-proof civil registry. Anyone with access to the same browser profile may be able to access stored records.

For emergency deployment, the following safeguards are recommended:

- Obtain appropriate consent before collecting personal information or photographs.
- Minimize the collection of sensitive information.
- Restrict access to missing-person and survivor records.
- Implement verified identity and report-review workflows.
- Define retention and deletion policies.
- Avoid storing unnecessary personal data in LocalStorage.
- Introduce secure, authenticated synchronization before enabling cross-device access.
- Follow applicable privacy and data-protection requirements.

The prototype should be used with synthetic or appropriately authorized test data until suitable safeguards are implemented.

---

## 🔮 Future Development Roadmap

- [ ] **SMS/USSD Integration:** Enable basic-phone check-ins through supported telecommunications gateways.
- [ ] **Identity Verification:** Introduce privacy-conscious verification and report-authentication workflows, with appropriate legal authorization.
- [ ] **Kannada Localization:** Add a Kannada interface (`kn-IN`) for local relief workers and residents.
- [ ] **Peer-to-Peer Synchronization:** Explore local device-to-device data exchange for areas with limited connectivity.
- [ ] **Secure Multi-Device Sync:** Synchronize verified records across authorized relief camps.
- [ ] **Data Verification:** Integrate authoritative shelter information and report-review mechanisms.
- [ ] **Accessibility Improvements:** Add multilingual support, keyboard navigation, and accessible form labels.
- [ ] **Progressive Web App Support:** Explore service workers and offline asset caching to improve availability during connectivity interruptions.

---

## 👥 Authors and Contributors

- **Nandini Anand** — [GitHub](https://github.com/nandini-anand27)
- **K Rashmi**
- **Nisha P**

---

## 📄 License

This project is distributed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with a descriptive message.
4. Open a pull request explaining the changes.

Please ensure that new features respect user privacy and do not present unverified emergency information as authoritative.

---

**Built to support faster coordination, safer check-ins, and family reunification during emergencies in Bengaluru.**
