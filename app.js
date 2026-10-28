// Pre-populated Bengaluru Disaster Relief & Family Reunification Database
let registryData = JSON.parse(localStorage.getItem("bengaluru_disaster_registry")) || [
  {
    id: 201,
    name: "Karthik Gowda",
    details: "29 / Male",
    location: "Last seen near Silk Board Junction (Waterlogged underpass)",
    status: "MISSING",
    time: "2026-10-28 14:20",
    photo: ""
  },
  {
    id: 202,
    name: "Ananya Rao",
    details: "24 / Female",
    location: "Kanteerava Indoor Stadium Relief Camp, Central Bengaluru",
    status: "SAFE",
    time: "2026-10-28 15:05",
    photo: ""
  },
  {
    id: 203,
    name: "Vinay Kumar",
    details: "34 / Male",
    location: "Transferred to Bowring & Lady Curzon Hospital, Shivajinagar",
    status: "RELOCATED",
    time: "2026-10-28 12:45",
    photo: ""
  },
  {
    id: 204,
    name: "Divya Nambiar",
    details: "27 / Female",
    location: "Indiranagar Club Community Shelter, 100ft Road",
    status: "SAFE",
    time: "2026-10-28 16:10",
    photo: ""
  },
  {
    id: 205,
    name: "Prabhu Chandran",
    details: "51 / Male",
    location: "Last seen near Koramangala Sony World Signal",
    status: "MISSING",
    time: "2026-10-28 11:30",
    photo: ""
  },
  {
    id: 206,
    name: "Meera Hegde",
    details: "42 / Female",
    location: "Jayanagar 4th Block Complex Shelter",
    status: "SAFE",
    time: "2026-10-28 13:15",
    photo: ""
  },
  {
    id: 207,
    name: "Sanjay Prasad",
    details: "22 / Male",
    location: "Manyata Tech Park Back Gate, Hebbal",
    status: "SAFE",
    time: "2026-10-28 16:45",
    photo: ""
  },
  {
    id: 208,
    name: "Lakshmiamma",
    details: "68 / Female",
    location: "Last seen near Majestic Kempegowda Bus Station",
    status: "MISSING",
    time: "2026-10-28 09:10",
    photo: ""
  },
  {
    id: 209,
    name: "Rahul Kamath",
    details: "31 / Male",
    location: "Whitefield Community Hall Relief Post",
    status: "SAFE",
    time: "2026-10-28 17:00",
    photo: ""
  },
  {
    id: 210,
    name: "Sneha Murthy",
    details: "19 / Female",
    location: "Last seen near Banashankari TTMC",
    status: "MISSING",
    time: "2026-10-28 10:05",
    photo: ""
  }
];

// Bengaluru Shelter Data for Map & Info Panel
const shelters = [
  {
    name: "Sree Kanteerava Indoor Stadium Relief Camp",
    address: "Kasturba Road, Sampangi Rama Nagar, Bengaluru",
    capacity: "320 / 400 Beds Occupied",
    triage: "Active (BBMP Medical Team on Duty)"
  },
  {
    name: "Indiranagar Club Community Shelter",
    address: "100ft Road, Defence Colony, Indiranagar, Bengaluru",
    capacity: "140 / 180 Beds Occupied",
    triage: "Food & Dry Rations Distributed"
  },
  {
    name: "Jayanagar Complex Community Hall",
    address: "4th Block, Jayanagar, Bengaluru",
    capacity: "210 / 250 Beds Occupied",
    triage: "Full Mobile Trauma Unit Active"
  }
];

let isOfflineMode = false;
let offlineQueue = [];

function saveRegistry() {
  localStorage.setItem("bengaluru_disaster_registry", JSON.stringify(registryData));
}

document.addEventListener("DOMContentLoaded", () => {
  renderLedger();
  updateCounters();
  populateSightingDropdown();

  document.getElementById("searchInput").addEventListener("input", renderLedger);
  document.getElementById("statusFilter").addEventListener("change", renderLedger);

  // Low Bandwidth Mode Toggle
  document.getElementById("bandwidthToggle").addEventListener("click", () => {
    document.body.classList.toggle("low-bandwidth");
    isOfflineMode = document.body.classList.contains("low-bandwidth");
    const toggleBtn = document.getElementById("bandwidthToggle");
    const netStatus = document.getElementById("networkStatus");

    if (isOfflineMode) {
      toggleBtn.textContent = "🌐 Go Online";
      if (netStatus) {
        netStatus.textContent = "Status: 2G Edge / Local Queue Active";
        netStatus.style.color = "#FFD700";
      }
    } else {
      toggleBtn.textContent = "⚡ Low Bandwidth Mode";
      if (netStatus) {
        netStatus.textContent = "Status: Online (Syncing Queue...)";
        netStatus.style.color = "#98FB98";
      }
      if (offlineQueue.length > 0) {
        setTimeout(() => {
          registryData.unshift(...offlineQueue);
          saveRegistry();
          alert(`Synced ${offlineQueue.length} pending offline record(s) to BBMP server.`);
          offlineQueue = [];
          if (netStatus) netStatus.textContent = "Status: Online (Zero Packet Loss)";
          renderLedger();
          updateCounters();
          populateSightingDropdown();
        }, 800);
      }
    }
  });

  // Handle Missing Person Form Submit with Photo Conversion
  document.getElementById("reportForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const photoInput = document.getElementById("repPhoto");
    
    if (photoInput.files && photoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(uploadEvent) {
        saveNewMissingRecord(uploadEvent.target.result);
      };
      reader.readAsDataURL(photoInput.files[0]);
    } else {
      saveNewMissingRecord("");
    }
  });

  // Handle Safe Check-in Form Submit
  document.getElementById("safeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("safeName").value;
    const loc = document.getElementById("safeLocation").value;
    const msg = document.getElementById("safeMsg").value;

    const existingIndex = registryData.findIndex(item => item.name.toLowerCase() === name.toLowerCase());

    if (existingIndex !== -1) {
      registryData[existingIndex].status = "SAFE";
      registryData[existingIndex].location = `${loc} (${msg})`;
      registryData[existingIndex].time = getCurrentTimestamp();
    } else {
      registryData.unshift({
        id: Date.now(),
        name: name,
        details: "N/A",
        location: `${loc} - ${msg}`,
        status: "SAFE",
        time: getCurrentTimestamp(),
        photo: ""
      });
    }

    saveRegistry();
    renderLedger();
    updateCounters();
    populateSightingDropdown();
    closeModal("safeModal");
    document.getElementById("safeForm").reset();
  });

  // Handle Found / Sighting Report Form Submit
  document.getElementById("sightingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const personId = Number(document.getElementById("sightingPersonSelect").value);
    const sightingLoc = document.getElementById("sightingLocation").value;

    const person = registryData.find(p => p.id === personId);
    if (person) {
      person.status = "SAFE";
      person.location = `SIGHTING REPORTED: Found at ${sightingLoc}`;
      person.time = getCurrentTimestamp();
      saveRegistry();
      renderLedger();
      updateCounters();
      populateSightingDropdown();
      alert(`Successfully updated status for ${person.name} to Safe based on Bengaluru sighting!`);
      closeModal("matchModal");
      document.getElementById("sightingForm").reset();
    }
  });
});

function saveNewMissingRecord(photoBase64) {
  const newEntry = {
    id: Date.now(),
    name: document.getElementById("repName").value,
    details: document.getElementById("repDetails").value,
    location: document.getElementById("repLoc").value,
    status: "MISSING",
    time: getCurrentTimestamp(),
    photo: photoBase64
  };

  if (isOfflineMode) {
    offlineQueue.push(newEntry);
    alert("Network unavailable. Record buffered locally.");
  } else {
    registryData.unshift(newEntry);
    saveRegistry();
  }

  renderLedger();
  updateCounters();
  populateSightingDropdown();
  closeModal("reportModal");
  document.getElementById("reportForm").reset();
}

function renderLedger() {
  const tbody = document.getElementById("ledgerBody");
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const filterStatus = document.getElementById("statusFilter").value;

  tbody.innerHTML = "";

  const filtered = registryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) || 
                          item.location.toLowerCase().includes(searchQuery) ||
                          item.details.toLowerCase().includes(searchQuery);
    const matchesStatus = filterStatus === "ALL" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; font-family: 'Courier Prime', monospace;">No matching Bengaluru registry records found.</td></tr>`;
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement("tr");

    let badgeClass = "badge-missing";
    if (item.status === "SAFE") badgeClass = "badge-safe";
    if (item.status === "RELOCATED") badgeClass = "badge-relocated";

    const photoHtml = item.photo ? `<img src="${item.photo}" class="thumb-img" alt="Photo">` : `<div class="thumb-img" style="display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#777;">No Image</div>`;

    tr.innerHTML = `
      <td>${photoHtml}</td>
      <td style="font-weight: bold;">${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.details)}</td>
      <td>${escapeHtml(item.location)}</td>
      <td><span class="status-badge ${badgeClass}">${item.status}</span></td>
      <td class="time-stamp">${item.time}</td>
      <td>
        ${item.status === "MISSING" ? `<span class="action-link" onclick="markSafe(${item.id})">Mark Safe</span>` : '—'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Smart Match Finder
function runSmartMatch() {
  const query = document.getElementById("matchQueryInput").value.toLowerCase().trim();
  const resultsContainer = document.getElementById("matchResultsContainer");
  
  if (!query) {
    resultsContainer.innerHTML = `<span style="font-family: 'Courier Prime', monospace; font-size: 0.8rem; color: #666;">Type above to evaluate potential matches...</span>`;
    return;
  }

  const matches = registryData.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.location.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<span style="font-family: 'Courier Prime', monospace; font-size: 0.8rem; color: #A82424;">No matching records found for "${query}".</span>`;
    return;
  }

  let html = `<ul style="list-style-type: none; padding: 0;">`;
  matches.forEach(m => {
    html += `
      <li style="padding: 6px; border-bottom: 1px dashed #ccc; font-size: 0.85rem;">
        <strong>${escapeHtml(m.name)}</strong> (${escapeHtml(m.details)}) — 
        <span style="color: ${m.status === 'SAFE' ? '#1E6B37' : '#A82424'}; font-weight:bold;">${m.status}</span><br>
        <span style="font-size: 0.75rem; color: #555;">Location: ${escapeHtml(m.location)}</span>
      </li>
    `;
  });
  html += `</ul>`;
  resultsContainer.innerHTML = html;
}

// Populate Sighting Dropdown with active missing records
function populateSightingDropdown() {
  const select = document.getElementById("sightingPersonSelect");
  if (!select) return;
  select.innerHTML = "";
  
  const missingOnly = registryData.filter(item => item.status === "MISSING");
  if (missingOnly.length === 0) {
    select.innerHTML = `<option value="">No missing persons currently listed</option>`;
    return;
  }

  missingOnly.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.name} (${p.details}) - Last seen: ${p.location}`;
    select.appendChild(opt);
  });
}

function selectShelter(index) {
  const s = shelters[index];
  document.getElementById("shelterName").textContent = s.name;
  document.getElementById("shelterAddr").textContent = `Location: ${s.address}`;
  document.getElementById("shelterCap").textContent = `Occupancy: ${s.capacity}`;
  document.getElementById("shelterMed").textContent = `Medical Triage: ${s.triage}`;
}

function markSafe(id) {
  const item = registryData.find(r => r.id === id);
  if (item) {
    item.status = "SAFE";
    item.time = getCurrentTimestamp();
    saveRegistry();
    renderLedger();
    updateCounters();
    populateSightingDropdown();
  }
}

function updateCounters() {
  document.getElementById("totalCount").textContent = registryData.length + offlineQueue.length;
  document.getElementById("safeCount").textContent = registryData.filter(r => r.status === "SAFE").length;
}

function openModal(id) {
  document.getElementById(id).classList.add("active");
  if (id === 'matchModal') {
    populateSightingDropdown();
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString().slice(0, 10) + " " + now.toTimeString().slice(0, 5);
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}