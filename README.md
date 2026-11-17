# InfraGuard AI — Infrastructure Health Monitoring, Earthquake History & Seismic Risk Assessment System

> **Integrated AI Civil Health Informatics & National Seismic Intelligence System for India**  
> Built for academic demonstration, structural health monitoring, and disaster risk informatics.

---

## 🌟 Overview

**InfraGuard AI** is a comprehensive full-stack prototype engineered to:
1. **Monitor Fleet Structural Integrity**: Real-time IoT sensor telemetry simulation (crack width, vibration resonance, structural deformation, moisture levels) across Indian bridges, expressways, high-rises, and heritage monuments.
2. **Earthquake History & Damage Intelligence**: Verified historical catalog of destructive Indian earthquakes (1819 to present) with exact dates, magnitudes, depths, casualties, infrastructure damage documentation, and economic losses.
3. **Probabilistic Seismic Risk Analysis**: Compliant with **Bureau of Indian Standards (BIS IS 1893:2016)** zonation, geodetic fault line mapping, soil liquefaction hazards, and Gutenberg-Richter / Poissonian recurrence models.
4. **Earthquake Damage Estimation Engine**: Distinguishes **historical observed damage** from **model-based hypothetical fragility projections** for non-engineered masonry, pre-code RC, and ductile RC structures.

---

## 🚀 Complete Module Architecture

### 🧭 A. Earthquake & Seismic Intelligence

1. **Earthquake History (`eq-history`)**
   - **Comprehensive Archival Catalog**: Spanning 1819 to present (2001 Bhuj, 1993 Latur, 2005 Kashmir, 1950 Assam, 1934 Bihar, 1967 Koyna, 1999 Chamoli, 1991 Uttarkashi, 1997 Jabalpur, 2011 Sikkim, 1819 Kutch, 1905 Kangra, 2004 Indian Ocean, 2023 Nepal/Delhi-NCR sequence, etc.).
   - **State-Wise & City-Wise Search**: Instant filtering by State name (Gujarat, Maharashtra, J&K...), City (Mumbai, Bhuj, Latur, Srinagar...), Year, or Magnitude.
   - **Multi-View Modes**: Detailed interactive cards with casualty & loss breakdowns, Tabular spreadsheet view, and State-wise grouped view.
   - **Verified Data Sources**: National Center for Seismology (NCS), USGS Earthquake Catalog, NDMA India, Geological Survey of India (GSI).
   - **Export CSV**: One-click download of the complete historical catalog.

2. **Interactive India Earthquake Map (`eq-map`)**
   - Interactive **Leaflet & OpenStreetMap** centered on the Indian subcontinent.
   - Color-coded epicenter pins by magnitude:
     - 🔴 **M 8.0+** (Great Earthquakes)
     - 🟠 **M 7.0 – 7.9** (Major Earthquakes)
     - 🟡 **M 6.0 – 6.9** (Strong Earthquakes)
     - 🔵 **M 5.0 – 5.9** (Moderate Earthquakes)
   - **Tectonic Fault Line Overlay**: Visualizes Main Himalayan Thrust (MHT / MBT Front), Kutch Mainland Fault, Narmada-Son Lineament, and Panvel Flexure.
   - Interactive popups displaying focal depth, intensity, casualties, infrastructure damage summary, and source citations.
   - State & period filter controls.

3. **Earthquake Risk Analysis (`eq-risk`)**
   - State-wise and city-wise seismic hazard profiles covering:
     - **BIS IS 1893:2016 Zonation**: Zone II, Zone III, Zone IV, or Zone V with Peak Ground Acceleration (PGA) ratings.
     - **Active Fault Zones**: Tectonic setting and mapped fault systems.
     - **Ground & Soil Amplification**: Deep Gangetic/deltaic alluvium, coastal mudflats, and liquefaction susceptibility.
     - **Infrastructure Vulnerability**: Multi-hazard vulnerability across bridges, roads, and buildings.
     - **Overall Risk Category**: Low, Moderate, High, or Very High.
     - **Scientific Rationale**: Understandable explanation of why an area holds a particular risk rating.
   - **Probabilistic Recurrence Model**: Gutenberg-Richter ($\log_{10} N = a - bM$) and Poissonian probability ($P = 1 - e^{-\lambda t}$) over 10, 25, 50, or 100-year horizons with 95% confidence intervals and explicit methodology statements.
   - **Strict Scientific Integrity Notice**: Rejects fake short-term predictions; emphasizes validated probabilistic hazard mapping.

4. **Earthquake Damage Assessment (`eq-damage`)**
   - **Mode 1 — Hypothetical Model Simulation**:
     - Scenario generator: State, City, Magnitude ($M_w 5.0 - 8.5$), Epicentral Distance ($5 - 150\text{ km}$), Focal Depth, Soil Type (Hard Rock, Medium, Soft Alluvium), and Urban Density.
     - Computes estimated PGA (g) and Modified Mercalli Intensity (MMI).
     - Fragility curves for **Unreinforced Masonry**, **Pre-Code RC Frames**, and **Ductile RC (IS 13920)**.
     - Road network damage (pavement fissures, landslide blockages).
     - Bridge network damage (bearing displacement, pier shear cracking).
     - Estimated affected population and casualty ranges.
   - **Mode 2 — Historical Observed Damage**:
     - Direct access to verified post-disaster field inspection data from major Indian historical earthquakes.

5. **State Comparison Feature (`eq-compare`)**
   - Direct side-by-side comparison of 2 Indian States (e.g. Gujarat vs Maharashtra, or Delhi vs Assam).
   - Metrics: Strongest historical earthquake, BIS seismic classification, active fault density, soil amplification, infrastructure vulnerability, and comparative bar charts.

---

### 🏗️ B. Infrastructure Fleet Operations (Maintained & Fully Working)

6. **Dashboard**: Fleet stats (Total, Healthy, Moderate, High, Critical), AI executive summary, risk distribution chart, sector health comparison, recent alerts.
7. **Infrastructure Map**: Geospatial IoT monitoring of 16 civil assets across Indian states.
8. **Bridge Monitoring**: Cable tensions, pier scour, deck vibration velocity, expansion joints.
9. **Road Monitoring**: International Roughness Index (IRI), rutting depth, sub-grade moisture.
10. **Building Monitoring**: Foundation tilt, seismic dampening, masonry fissure widths.
11. **AI Structural Risk Engine**: Interactive rule-based civil assessment (crack, deformation, vibration, age, moisture).
12. **Structural Analysis**: 6-month historical vibration, crack progression, and deflection charts with ISO 10816 threshold lines.
13. **Alerts & Notifications**: Real-time threshold breach alarms with working "Mark Resolved" functionality.
14. **Maintenance SOPs**: Action protocols and estimated budgets in ₹ INR.
15. **Reports**: Official technical audit dossiers with Print-to-PDF formatting and CSV export.

---

## 💻 How to Run the Application

### 1. Prerequisites
Ensure **Node.js** (v18+) is installed.

### 2. Development Mode
Run the following command:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🏛️ Verified Historical Earthquakes in Catalog

- **2001 Bhuj Great Earthquake** (Gujarat, M 7.7)
- **1993 Killari / Latur Intraplate Earthquake** (Maharashtra, M 6.2)
- **2005 Kashmir Great Earthquake** (J&K, M 7.6)
- **1950 Assam-Tibet Great Earthquake** (Assam, M 8.6)
- **1897 Great Shillong Earthquake** (Meghalaya/Assam, M 8.1)
- **1934 Bihar-Nepal Great Earthquake** (Bihar, M 8.0)
- **1967 Koynanagar Dam Earthquake** (Maharashtra, M 6.3)
- **1999 Chamoli Himalayan Earthquake** (Uttarakhand, M 6.8)
- **1991 Uttarkashi Himalayan Earthquake** (Uttarakhand, M 6.8)
- **1997 Jabalpur Deep Fault Earthquake** (Madhya Pradesh, M 5.8)
- **2011 Sikkim Himalayan Earthquake** (Sikkim/WB, M 6.9)
- **1819 Rann of Kutch Allah Bund Event** (Gujarat, M 7.8)
- **1905 Kangra Valley Great Earthquake** (Himachal Pradesh, M 7.8)
- **2004 Indian Ocean Megathrust & Tsunami** (Andaman & Nicobar / TN, M 9.1)
- **1988 Udaypur / Bihar-Nepal Earthquake** (Bihar, M 6.8)
- **2023 Nepal / Delhi-NCR Shaking Sequence** (Delhi/UP/Uttarakhand, M 6.4)
- **1956 Anjar Kutch Earthquake** (Gujarat, M 6.1)
