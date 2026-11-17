/**
 * InfraGuard AI - Comprehensive Infrastructure Health Data Repository
 * 
 * Simulated high-fidelity dataset representing major infrastructure across Indian states.
 * Transparently flagged as simulated for demonstration and academic assessment.
 */

export const INITIAL_INFRASTRUCTURE = [
  {
    id: "INF-IN-001",
    name: "Bandra-Worli Sea Link",
    type: "Bridge",
    subType: "Cable-Stayed Sea Bridge",
    state: "Maharashtra",
    city: "Mumbai",
    coordinates: [19.0330, 72.8166],
    age: 15,
    healthScore: 68,
    riskScore: 32,
    riskCategory: "Moderate Risk",
    crackMeasurement: 0.72, // mm
    vibrationLevel: 3.45,   // mm/s
    structuralDeformation: 4.8, // mm
    moistureLevel: 68,      // % (marine atmospheric exposure)
    trafficVolume: "Extreme (120,000 PCU/day)",
    sensorsActive: 48,
    lastInspectionDate: "2026-10-14",
    inspectionOfficer: "Er. A. K. Deshmukh, Chief Structural Assessor",
    keyDefects: [
      "Saline micro-corrosion on stay-cable sheathings near Pier P19",
      "Minor expansion joint sealant degradation at Worli anchorage",
      "Slight elevated lateral sway under monsoon crosswinds"
    ],
    recommendedAction: "Cathodic protection audit and ultrasonic stay-cable tension recalibration.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 2.8, crack: 0.58, deformation: 3.9, health: 74 },
      { month: "Jul 2026", vibration: 3.6, crack: 0.62, deformation: 4.2, health: 71 },
      { month: "Aug 2026", vibration: 3.9, crack: 0.67, deformation: 4.5, health: 69 },
      { month: "Sep 2026", vibration: 3.7, crack: 0.69, deformation: 4.7, health: 68 },
      { month: "Oct 2026", vibration: 3.5, crack: 0.71, deformation: 4.8, health: 68 },
      { month: "Nov 2026", vibration: 3.45, crack: 0.72, deformation: 4.8, health: 68 }
    ]
  },
  {
    id: "INF-IN-002",
    name: "Howrah Bridge (Rabindra Setu)",
    type: "Bridge",
    subType: "Balanced Cantilever Steel Bridge",
    state: "West Bengal",
    city: "Kolkata",
    coordinates: [22.5851, 88.3468],
    age: 81,
    healthScore: 42,
    riskScore: 58,
    riskCategory: "High Risk",
    crackMeasurement: 1.85,
    vibrationLevel: 5.80,
    structuralDeformation: 11.2,
    moistureLevel: 74,
    trafficVolume: "Extreme (150,000+ vehicles + pedestrians)",
    sensorsActive: 36,
    lastInspectionDate: "2026-09-28",
    inspectionOfficer: "Dr. S. Chatterjee, Syama Prasad Mookerjee Port Trust",
    keyDefects: [
      "Severe base riveted flange oxidation at pier hanger junctions",
      "Acidic particulate corrosion on lower chord steel members",
      "High cyclic fatigue due to prolonged peak-hour bottlenecking"
    ],
    recommendedAction: "Load management restrictions; immediate rivet replacement and zinc-silicate protective recoating.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 5.1, crack: 1.62, deformation: 9.8, health: 48 },
      { month: "Jul 2026", vibration: 5.4, crack: 1.68, deformation: 10.2, health: 46 },
      { month: "Aug 2026", vibration: 5.9, crack: 1.74, deformation: 10.6, health: 44 },
      { month: "Sep 2026", vibration: 5.8, crack: 1.80, deformation: 10.9, health: 43 },
      { month: "Oct 2026", vibration: 5.7, crack: 1.82, deformation: 11.1, health: 42 },
      { month: "Nov 2026", vibration: 5.8, crack: 1.85, deformation: 11.2, health: 42 }
    ]
  },
  {
    id: "INF-IN-003",
    name: "Chenab Rail Arch Bridge",
    type: "Bridge",
    subType: "Steel & Concrete Arch Rail Bridge",
    state: "Jammu & Kashmir",
    city: "Reasi",
    coordinates: [33.1517, 74.8817],
    age: 2,
    healthScore: 92,
    riskScore: 8,
    riskCategory: "Low Risk",
    crackMeasurement: 0.08,
    vibrationLevel: 1.20,
    structuralDeformation: 1.4,
    moistureLevel: 28,
    trafficVolume: "Medium (High axle load trains)",
    sensorsActive: 84,
    lastInspectionDate: "2026-11-02",
    inspectionOfficer: "Er. Vikram Singh, Northern Railway Special Project",
    keyDefects: [
      "No structural anomalies; nominal micro-thermal expansions within design limits",
      "Sensor telemetry online with 99.8% uptime"
    ],
    recommendedAction: "Maintain scheduled high-velocity wind anemometer logging and quarterly arch foundation scan.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 1.1, crack: 0.06, deformation: 1.2, health: 94 },
      { month: "Jul 2026", vibration: 1.2, crack: 0.07, deformation: 1.3, health: 93 },
      { month: "Aug 2026", vibration: 1.3, crack: 0.07, deformation: 1.4, health: 92 },
      { month: "Sep 2026", vibration: 1.2, crack: 0.08, deformation: 1.4, health: 92 },
      { month: "Oct 2026", vibration: 1.2, crack: 0.08, deformation: 1.4, health: 92 },
      { month: "Nov 2026", vibration: 1.2, crack: 0.08, deformation: 1.4, health: 92 }
    ]
  },
  {
    id: "INF-IN-004",
    name: "Old Pamban Railway Sea Bridge",
    type: "Bridge",
    subType: "Scherzer Rolling Lift Cantilever Bridge",
    state: "Tamil Nadu",
    city: "Rameswaram",
    coordinates: [9.2813, 79.2088],
    age: 110,
    healthScore: 18,
    riskScore: 82,
    riskCategory: "Critical Risk",
    crackMeasurement: 3.90,
    vibrationLevel: 8.40,
    structuralDeformation: 18.5,
    moistureLevel: 92,
    trafficVolume: "Restricted (Historical heritage transit)",
    sensorsActive: 28,
    lastInspectionDate: "2026-10-30",
    inspectionOfficer: "Er. K. Murugan, Southern Railway Safety Directorate",
    keyDefects: [
      "Severe corrosion loss exceeding 35% on central Scherzer lift rocker span",
      "Intermittent sensor alarms on pier 67 during high tidal swells",
      "High shear stress fissures across underwater foundation substructure"
    ],
    recommendedAction: "CRITICAL: Complete train transit suspension in place. Expedite transition to new vertical lift bridge; decommission aging sub-girders.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 7.2, crack: 3.2, deformation: 16.0, health: 26 },
      { month: "Jul 2026", vibration: 7.6, crack: 3.4, deformation: 16.8, health: 23 },
      { month: "Aug 2026", vibration: 8.1, crack: 3.6, deformation: 17.5, health: 20 },
      { month: "Sep 2026", vibration: 8.3, crack: 3.75, deformation: 18.0, health: 19 },
      { month: "Oct 2026", vibration: 8.4, crack: 3.88, deformation: 18.4, health: 18 },
      { month: "Nov 2026", vibration: 8.4, crack: 3.90, deformation: 18.5, health: 18 }
    ]
  },
  {
    id: "INF-IN-005",
    name: "Bogibeel Rail-cum-Road Bridge",
    type: "Bridge",
    subType: "Double-deck Steel Truss Girder",
    state: "Assam",
    city: "Dibrugarh",
    coordinates: [27.4042, 94.8197],
    age: 6,
    healthScore: 88,
    riskScore: 12,
    riskCategory: "Low Risk",
    crackMeasurement: 0.15,
    vibrationLevel: 1.65,
    structuralDeformation: 2.1,
    moistureLevel: 45,
    trafficVolume: "High (Multi-modal North-East transit)",
    sensorsActive: 52,
    lastInspectionDate: "2026-10-18",
    inspectionOfficer: "Er. P. K. Hazarika, N.F. Railway Infrastructure Cell",
    keyDefects: [
      "Truss weld integrity verified intact; minor debris buildup in drainage ducts",
      "River scour depth at Pier P24 within permissible limits"
    ],
    recommendedAction: "Clear silt and siltation traps prior to next monsoon; routine grease packing on roller bearings.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 1.5, crack: 0.12, deformation: 1.9, health: 90 },
      { month: "Jul 2026", vibration: 1.7, crack: 0.13, deformation: 2.0, health: 89 },
      { month: "Aug 2026", vibration: 1.8, crack: 0.14, deformation: 2.1, health: 88 },
      { month: "Sep 2026", vibration: 1.7, crack: 0.15, deformation: 2.1, health: 88 },
      { month: "Oct 2026", vibration: 1.6, crack: 0.15, deformation: 2.1, health: 88 },
      { month: "Nov 2026", vibration: 1.65, crack: 0.15, deformation: 2.1, health: 88 }
    ]
  },
  {
    id: "INF-IN-006",
    name: "Signature Bridge Wazirabad",
    type: "Bridge",
    subType: "Asymmetric Cable-Stayed Bridge",
    state: "Delhi",
    city: "New Delhi",
    coordinates: [28.7183, 77.2325],
    age: 6,
    healthScore: 84,
    riskScore: 16,
    riskCategory: "Low Risk",
    crackMeasurement: 0.22,
    vibrationLevel: 1.90,
    structuralDeformation: 2.6,
    moistureLevel: 32,
    trafficVolume: "High (75,000 vehicles/day)",
    sensorsActive: 44,
    lastInspectionDate: "2026-09-12",
    inspectionOfficer: "Er. Rajesh Verma, Delhi Tourism & Transportation Dev Corp",
    keyDefects: [
      "Steel pylon apex viewing gallery vibration dampeners functioning correctly",
      "Minor surface carbonation on approach pier splash zone"
    ],
    recommendedAction: "Apply anti-carbonation coating to splash zones; routine damping system oil sample test.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 1.8, crack: 0.20, deformation: 2.4, health: 85 },
      { month: "Jul 2026", vibration: 1.9, crack: 0.21, deformation: 2.5, health: 85 },
      { month: "Aug 2026", vibration: 2.0, crack: 0.21, deformation: 2.6, health: 84 },
      { month: "Sep 2026", vibration: 1.9, crack: 0.22, deformation: 2.6, health: 84 },
      { month: "Oct 2026", vibration: 1.9, crack: 0.22, deformation: 2.6, health: 84 },
      { month: "Nov 2026", vibration: 1.9, crack: 0.22, deformation: 2.6, health: 84 }
    ]
  },
  {
    id: "INF-IN-007",
    name: "Vidyasagar Setu (Second Hooghly Bridge)",
    type: "Bridge",
    subType: "Toll Cable-Stayed Bridge",
    state: "West Bengal",
    city: "Howrah / Kolkata",
    coordinates: [22.5577, 88.3275],
    age: 32,
    healthScore: 63,
    riskScore: 37,
    riskCategory: "Moderate Risk",
    crackMeasurement: 0.95,
    vibrationLevel: 3.80,
    structuralDeformation: 6.2,
    moistureLevel: 70,
    trafficVolume: "High (85,000 vehicles/day)",
    sensorsActive: 40,
    lastInspectionDate: "2026-10-05",
    inspectionOfficer: "Er. B. K. Ganguly, Hooghly River Bridge Commissioners",
    keyDefects: [
      "Stay cable damper elastomeric pads show accelerated aging",
      "Pavement rutting near toll plaza approach spans",
      "Localized micro-cracking around deck expansion joint nosing"
    ],
    recommendedAction: "Replace damper elastomer rings and mill & repave polymer asphalt surface at approaches.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 3.5, crack: 0.88, deformation: 5.6, health: 67 },
      { month: "Jul 2026", vibration: 3.7, crack: 0.90, deformation: 5.8, health: 65 },
      { month: "Aug 2026", vibration: 3.9, crack: 0.92, deformation: 6.0, health: 64 },
      { month: "Sep 2026", vibration: 3.8, crack: 0.94, deformation: 6.1, health: 63 },
      { month: "Oct 2026", vibration: 3.8, crack: 0.95, deformation: 6.2, health: 63 },
      { month: "Nov 2026", vibration: 3.8, crack: 0.95, deformation: 6.2, health: 63 }
    ]
  },
  {
    id: "INF-IN-008",
    name: "Mahatma Gandhi Setu",
    type: "Bridge",
    subType: "Prestressed Concrete Cantilever Box Girder",
    state: "Bihar",
    city: "Patna - Hajipur",
    coordinates: [25.6265, 85.1912],
    age: 42,
    healthScore: 39,
    riskScore: 61,
    riskCategory: "High Risk",
    crackMeasurement: 2.10,
    vibrationLevel: 6.20,
    structuralDeformation: 13.5,
    moistureLevel: 65,
    trafficVolume: "Extreme (Heavy freight interstate link)",
    sensorsActive: 38,
    lastInspectionDate: "2026-10-22",
    inspectionOfficer: "Er. R. N. Yadav, Bihar State Bridge Construction Corp",
    keyDefects: [
      "Remaining non-rehabilitated concrete cantilever spans show tendon fatigue",
      "Significant deflection spikes under overloaded multi-axle freight convoys",
      "Subsurface honeycombing detected via ultrasonic pulse velocity tests"
    ],
    recommendedAction: "Accelerate steel superstructure replacement for remaining northern spans; enforce dynamic axle weighing at toll gates.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 5.8, crack: 1.85, deformation: 12.1, health: 45 },
      { month: "Jul 2026", vibration: 6.0, crack: 1.92, deformation: 12.6, health: 43 },
      { month: "Aug 2026", vibration: 6.4, crack: 2.01, deformation: 13.0, health: 41 },
      { month: "Sep 2026", vibration: 6.3, crack: 2.05, deformation: 13.2, health: 40 },
      { month: "Oct 2026", vibration: 6.2, crack: 2.09, deformation: 13.4, health: 39 },
      { month: "Nov 2026", vibration: 6.2, crack: 2.10, deformation: 13.5, health: 39 }
    ]
  },
  {
    id: "INF-IN-009",
    name: "Mumbai-Pune Expressway (Bhor Ghat Section)",
    type: "Road",
    subType: "6-Lane Concrete Expressway & Tunnel",
    state: "Maharashtra",
    city: "Khandala / Lonavala",
    coordinates: [18.7560, 73.3440],
    age: 22,
    healthScore: 58,
    riskScore: 42,
    riskCategory: "Moderate Risk",
    crackMeasurement: 1.15,
    vibrationLevel: 4.10,
    structuralDeformation: 7.8,
    moistureLevel: 82,
    trafficVolume: "Extreme (60,000+ PCU/day on steep gradients)",
    sensorsActive: 42,
    lastInspectionDate: "2026-10-11",
    inspectionOfficer: "Er. S. M. Gaikwad, MSRDC Expressway Division",
    keyDefects: [
      "Sub-grade soil saturation and rockfall net anchor tension decline",
      "Transverse thermal cracking on concrete pavement slabs near KM 42",
      "Minor drainage cross-culvert silting during intense monsoons"
    ],
    recommendedAction: "High-tensile rockfall barrier retensioning, pressure-grout slab voids, and reconstruct culvert catch-pits.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 3.6, crack: 0.95, deformation: 6.5, health: 64 },
      { month: "Jul 2026", vibration: 4.2, crack: 1.05, deformation: 7.1, health: 60 },
      { month: "Aug 2026", vibration: 4.4, crack: 1.12, deformation: 7.6, health: 58 },
      { month: "Sep 2026", vibration: 4.2, crack: 1.14, deformation: 7.7, health: 58 },
      { month: "Oct 2026", vibration: 4.1, crack: 1.15, deformation: 7.8, health: 58 },
      { month: "Nov 2026", vibration: 4.1, crack: 1.15, deformation: 7.8, health: 58 }
    ]
  },
  {
    id: "INF-IN-010",
    name: "Delhi-Meerut Expressway (NE-3)",
    type: "Road",
    subType: "14-Lane Access-Controlled Highway",
    state: "Delhi / Uttar Pradesh",
    city: "Ghaziabad",
    coordinates: [28.6692, 77.4538],
    age: 4,
    healthScore: 89,
    riskScore: 11,
    riskCategory: "Low Risk",
    crackMeasurement: 0.12,
    vibrationLevel: 1.40,
    structuralDeformation: 1.8,
    moistureLevel: 34,
    trafficVolume: "High (110,000 PCU/day)",
    sensorsActive: 60,
    lastInspectionDate: "2026-10-25",
    inspectionOfficer: "Er. Manpreet Kaur, NHAI Project Implementation Unit",
    keyDefects: [
      "Pavement International Roughness Index (IRI) optimal at 1.8 m/km",
      "Minor thermoplastic lane-marking abrasions on outer freight lanes"
    ],
    recommendedAction: "Conduct routine line re-striping and clean optical lane sensors.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 1.3, crack: 0.10, deformation: 1.6, health: 91 },
      { month: "Jul 2026", vibration: 1.4, crack: 0.11, deformation: 1.7, health: 90 },
      { month: "Aug 2026", vibration: 1.5, crack: 0.11, deformation: 1.8, health: 89 },
      { month: "Sep 2026", vibration: 1.4, crack: 0.12, deformation: 1.8, health: 89 },
      { month: "Oct 2026", vibration: 1.4, crack: 0.12, deformation: 1.8, health: 89 },
      { month: "Nov 2026", vibration: 1.4, crack: 0.12, deformation: 1.8, health: 89 }
    ]
  },
  {
    id: "INF-IN-011",
    name: "Yamuna Expressway",
    type: "Road",
    subType: "6-Lane Rigid Concrete Expressway",
    state: "Uttar Pradesh",
    city: "Greater Noida - Agra",
    coordinates: [27.7500, 77.7200],
    age: 12,
    healthScore: 66,
    riskScore: 34,
    riskCategory: "Moderate Risk",
    crackMeasurement: 0.85,
    vibrationLevel: 3.60,
    structuralDeformation: 5.1,
    moistureLevel: 40,
    trafficVolume: "High (35,000 vehicles/day high-speed)",
    sensorsActive: 38,
    lastInspectionDate: "2026-09-19",
    inspectionOfficer: "Er. Vivek Trivedi, YEIDA Infrastructure Cell",
    keyDefects: [
      "Surface friction micro-texture loss in high-braking curves near Mathura exit",
      "Longitudinal joint sealant peeling over 4.2 km corridor"
    ],
    recommendedAction: "Perform diamond grinding for tyre friction recovery and silicone joint re-sealing.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 3.3, crack: 0.78, deformation: 4.8, health: 69 },
      { month: "Jul 2026", vibration: 3.5, crack: 0.81, deformation: 4.9, health: 68 },
      { month: "Aug 2026", vibration: 3.7, crack: 0.83, deformation: 5.0, health: 67 },
      { month: "Sep 2026", vibration: 3.6, crack: 0.85, deformation: 5.1, health: 66 },
      { month: "Oct 2026", vibration: 3.6, crack: 0.85, deformation: 5.1, health: 66 },
      { month: "Nov 2026", vibration: 3.6, crack: 0.85, deformation: 5.1, health: 66 }
    ]
  },
  {
    id: "INF-IN-012",
    name: "Golden Quadrilateral NH-48 (Bangalore-Tumkur Section)",
    type: "Road",
    subType: "8-Lane High-Density National Highway",
    state: "Karnataka",
    city: "Bengaluru",
    coordinates: [13.1250, 77.3400],
    age: 18,
    healthScore: 46,
    riskScore: 54,
    riskCategory: "High Risk",
    crackMeasurement: 1.70,
    vibrationLevel: 5.20,
    structuralDeformation: 9.6,
    moistureLevel: 62,
    trafficVolume: "Extreme (Heavy container truck traffic)",
    sensorsActive: 32,
    lastInspectionDate: "2026-10-28",
    inspectionOfficer: "Er. C. Ramesh, NHAI Regional Office Bengaluru",
    keyDefects: [
      "Significant rutting depth up to 28 mm in slow-moving freight lanes",
      "Fatigue alligator cracking across multiple sub-base asphalt sections",
      "Shoulder washouts following heavy pre-monsoon squalls"
    ],
    recommendedAction: "Cold in-place recycling (CIR) of binder course and structural asphalt overlay.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 4.7, crack: 1.45, deformation: 8.4, health: 51 },
      { month: "Jul 2026", vibration: 4.9, crack: 1.55, deformation: 8.9, health: 49 },
      { month: "Aug 2026", vibration: 5.3, crack: 1.62, deformation: 9.3, health: 47 },
      { month: "Sep 2026", vibration: 5.2, crack: 1.68, deformation: 9.5, health: 46 },
      { month: "Oct 2026", vibration: 5.2, crack: 1.70, deformation: 9.6, health: 46 },
      { month: "Nov 2026", vibration: 5.2, crack: 1.70, deformation: 9.6, health: 46 }
    ]
  },
  {
    id: "INF-IN-013",
    name: "Cyber Towers HITEC City",
    type: "Building",
    subType: "Commercial Landmark IT Complex",
    state: "Telangana",
    city: "Hyderabad",
    coordinates: [17.4504, 78.3808],
    age: 26,
    healthScore: 82,
    riskScore: 18,
    riskCategory: "Low Risk",
    crackMeasurement: 0.28,
    vibrationLevel: 1.85,
    structuralDeformation: 2.9,
    moistureLevel: 38,
    trafficVolume: "High Occupancy (15,000 personnel daily)",
    sensorsActive: 46,
    lastInspectionDate: "2026-10-15",
    inspectionOfficer: "Er. Sandhya Rao, TSIIC Structural Audit Board",
    keyDefects: [
      "Central atrium glass facade sealant hardening under intense solar exposure",
      "Basement parking floor 2 superficial shrinkage crazing (non-structural)"
    ],
    recommendedAction: "Renew structural silicone glazing gaskets and calibrate seismic tiltmeter nodes.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 1.7, crack: 0.25, deformation: 2.7, health: 84 },
      { month: "Jul 2026", vibration: 1.8, crack: 0.26, deformation: 2.8, health: 83 },
      { month: "Aug 2026", vibration: 1.9, crack: 0.27, deformation: 2.9, health: 82 },
      { month: "Sep 2026", vibration: 1.8, crack: 0.28, deformation: 2.9, health: 82 },
      { month: "Oct 2026", vibration: 1.8, crack: 0.28, deformation: 2.9, health: 82 },
      { month: "Nov 2026", vibration: 1.85, crack: 0.28, deformation: 2.9, health: 82 }
    ]
  },
  {
    id: "INF-IN-014",
    name: "Phiroze Jeejeebhoy Towers (BSE Building)",
    type: "Building",
    subType: "High-Rise Commercial Tower (29 Floors)",
    state: "Maharashtra",
    city: "Mumbai (Fort)",
    coordinates: [18.9298, 72.8335],
    age: 44,
    healthScore: 61,
    riskScore: 39,
    riskCategory: "Moderate Risk",
    crackMeasurement: 0.92,
    vibrationLevel: 3.75,
    structuralDeformation: 5.8,
    moistureLevel: 64,
    trafficVolume: "Dense Urban Center",
    sensorsActive: 50,
    lastInspectionDate: "2026-10-02",
    inspectionOfficer: "Er. Feroze Mehta, Mumbai High-Rise Safety Committee",
    keyDefects: [
      "Spalling observed in coastal-facing upper balcony parapets",
      "Minor column cover carbonation on 3rd floor mechanical podium",
      "HVAC chiller vibration resonance transmitted to adjacent shear wall"
    ],
    recommendedAction: "Install tuned mass spring dampers on chiller pads; polymer-modified mortar repair on parapets.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 3.4, crack: 0.84, deformation: 5.3, health: 65 },
      { month: "Jul 2026", vibration: 3.8, crack: 0.88, deformation: 5.5, health: 63 },
      { month: "Aug 2026", vibration: 3.9, crack: 0.90, deformation: 5.7, health: 62 },
      { month: "Sep 2026", vibration: 3.8, crack: 0.91, deformation: 5.8, health: 61 },
      { month: "Oct 2026", vibration: 3.7, crack: 0.92, deformation: 5.8, health: 61 },
      { month: "Nov 2026", vibration: 3.75, crack: 0.92, deformation: 5.8, health: 61 }
    ]
  },
  {
    id: "INF-IN-015",
    name: "CSMT Central Heritage Administrative Wing",
    type: "Building",
    subType: "Victorian Gothic Heritage Stone Masonry",
    state: "Maharashtra",
    city: "Mumbai",
    coordinates: [18.9398, 72.8354],
    age: 138,
    healthScore: 23,
    riskScore: 77,
    riskCategory: "Critical Risk",
    crackMeasurement: 3.40,
    vibrationLevel: 7.90,
    structuralDeformation: 16.2,
    moistureLevel: 88,
    trafficVolume: "Historic Hub (Heavy Suburban Rail Vibrations)",
    sensorsActive: 34,
    lastInspectionDate: "2026-10-29",
    inspectionOfficer: "Dr. Rohini Kulkarni, Archaeological Structural Bureau",
    keyDefects: [
      "Continuous micro-tremors from suburban train departures causing masonry shear slippage",
      "Vertical stress fracture widening on southern dome support arch (3.4mm)",
      "High subterranean water table ingress in heritage foundation basement"
    ],
    recommendedAction: "URGENT: Install carbon fiber wrap retrofits with lime-mortar compatibility; install vibration trench barrier along platform tracks.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 6.8, crack: 2.8, deformation: 13.9, health: 31 },
      { month: "Jul 2026", vibration: 7.2, crack: 3.0, deformation: 14.7, health: 28 },
      { month: "Aug 2026", vibration: 7.7, crack: 3.2, deformation: 15.5, health: 25 },
      { month: "Sep 2026", vibration: 7.8, crack: 3.3, deformation: 15.9, health: 24 },
      { month: "Oct 2026", vibration: 7.9, crack: 3.4, deformation: 16.2, health: 23 },
      { month: "Nov 2026", vibration: 7.9, crack: 3.4, deformation: 16.2, health: 23 }
    ]
  },
  {
    id: "INF-IN-016",
    name: "Bharat Mandapam (IECC Complex)",
    type: "Building",
    subType: "Modern Elliptical Convention Superstructure",
    state: "Delhi",
    city: "New Delhi",
    coordinates: [28.6186, 77.2415],
    age: 2,
    healthScore: 95,
    riskScore: 5,
    riskCategory: "Low Risk",
    crackMeasurement: 0.05,
    vibrationLevel: 0.95,
    structuralDeformation: 0.9,
    moistureLevel: 24,
    trafficVolume: "High Event Density",
    sensorsActive: 68,
    lastInspectionDate: "2026-11-05",
    inspectionOfficer: "Er. Deepak Sharma, ITPO Project Engineering Wing",
    keyDefects: [
      "Zero structural anomalies observed",
      "Smart BMS vibration and seismic sensor grid operating at 100% precision"
    ],
    recommendedAction: "Maintain automated BIM sensor correlation and scheduled biannual structural health check.",
    historicalTrends: [
      { month: "Jun 2026", vibration: 0.9, crack: 0.04, deformation: 0.8, health: 96 },
      { month: "Jul 2026", vibration: 0.95, crack: 0.05, deformation: 0.9, health: 95 },
      { month: "Aug 2026", vibration: 1.0, crack: 0.05, deformation: 0.9, health: 95 },
      { month: "Sep 2026", vibration: 0.95, crack: 0.05, deformation: 0.9, health: 95 },
      { month: "Oct 2026", vibration: 0.95, crack: 0.05, deformation: 0.9, health: 95 },
      { month: "Nov 2026", vibration: 0.95, crack: 0.05, deformation: 0.9, health: 95 }
    ]
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-2026-001",
    infrastructureId: "INF-IN-004",
    infrastructureName: "Old Pamban Railway Sea Bridge",
    location: "Rameswaram, Tamil Nadu",
    alertType: "Structural Displacement Anomaly",
    riskLevel: "Critical Risk",
    severity: "critical",
    date: "2026-11-16 04:22 IST",
    status: "Active",
    message: "Deformation threshold exceeded (18.5mm vs 12mm max safe limit). High tidal stress trigger."
  },
  {
    id: "ALT-2026-002",
    infrastructureId: "INF-IN-015",
    infrastructureName: "CSMT Central Heritage Administrative Wing",
    location: "Mumbai, Maharashtra",
    alertType: "Vibration Resonance Spike",
    riskLevel: "Critical Risk",
    severity: "critical",
    date: "2026-11-15 17:40 IST",
    status: "Active",
    message: "Dynamic vibration registered 7.90 mm/s on southern heritage support arch."
  },
  {
    id: "ALT-2026-003",
    infrastructureId: "INF-IN-002",
    infrastructureName: "Howrah Bridge (Rabindra Setu)",
    location: "Kolkata, West Bengal",
    alertType: "Fissure Expansion Alert",
    riskLevel: "High Risk",
    severity: "high",
    date: "2026-11-14 09:15 IST",
    status: "Active",
    message: "Crack measurement expanded to 1.85mm along main lower chord cantilever joint."
  },
  {
    id: "ALT-2026-004",
    infrastructureId: "INF-IN-008",
    infrastructureName: "Mahatma Gandhi Setu",
    location: "Patna, Bihar",
    alertType: "Dynamic Load Deflection",
    riskLevel: "High Risk",
    severity: "high",
    date: "2026-11-12 21:05 IST",
    status: "Active",
    message: "Overweight commercial truck convoy triggered 13.5mm mid-span deflection spike."
  },
  {
    id: "ALT-2026-005",
    infrastructureId: "INF-IN-012",
    infrastructureName: "Golden Quadrilateral NH-48",
    location: "Bengaluru, Karnataka",
    alertType: "Pavement Sub-base Rutting",
    riskLevel: "High Risk",
    severity: "high",
    date: "2026-11-10 14:30 IST",
    status: "Active",
    message: "Severe rutting depth exceeded 25mm in Lane 1 northbound near Peenya flyover."
  },
  {
    id: "ALT-2026-006",
    infrastructureId: "INF-IN-001",
    infrastructureName: "Bandra-Worli Sea Link",
    location: "Mumbai, Maharashtra",
    alertType: "Moisture & Salinity Warning",
    riskLevel: "Moderate Risk",
    severity: "moderate",
    date: "2026-11-08 11:20 IST",
    status: "Resolved",
    message: "Localized stay-cable anchor humidity peaked at 76%. Cathodic sealant re-applied."
  },
  {
    id: "ALT-2026-007",
    infrastructureId: "INF-IN-009",
    infrastructureName: "Mumbai-Pune Expressway (Bhor Ghat)",
    location: "Khandala, Maharashtra",
    alertType: "Slope Inclinometer Tilt",
    riskLevel: "Moderate Risk",
    severity: "moderate",
    date: "2026-11-04 08:45 IST",
    status: "Resolved",
    message: "Inclinometer node G-12 recorded 1.2° soil tilt following heavy cloudburst."
  }
];

export const MAINTENANCE_CATALOG = [
  {
    riskCategory: "Critical Risk",
    color: "#ef4444",
    urgency: "Immediate (0 - 48 Hours)",
    actions: [
      {
        title: "Emergency Cordoning & Weight Restriction",
        desc: "Temporarily halt transit or divert heavy commercial axle weights to prevent catastrophic load failure.",
        costRange: "₹50 L - ₹2.5 Cr",
        frequency: "Immediate Emergency"
      },
      {
        title: "Fiber-Optic Strain Gauge Array Deployment",
        desc: "Install high-frequency micro-strain telemetry across critical failure nodes for 24/7 real-time acoustic emission monitoring.",
        costRange: "₹80 L - ₹1.8 Cr",
        frequency: "Continuous Telemetry"
      },
      {
        title: "Structural Jacking & Carbon-Fiber Retrofitting",
        desc: "Hydraulic jacking to relieve dead-load stresses, followed by carbon-fiber polymer (CFRP) wrapping of compromised columns and steel gussets.",
        costRange: "₹3 Cr - ₹15 Cr",
        frequency: "Major Capital Retrofit"
      }
    ]
  },
  {
    riskCategory: "High Risk",
    color: "#f97316",
    urgency: "Urgent (Within 30 Days)",
    actions: [
      {
        title: "Non-Destructive Testing (NDT) & Ultrasonic Scan",
        desc: "Execute full ultrasonic pulse velocity (UPV) and ground penetrating radar (GPR) to detect hidden internal rebar void formations.",
        costRange: "₹25 L - ₹60 L",
        frequency: "Within 14 Days"
      },
      {
        title: "Crack Injection & Pressure Grouting",
        desc: "Seal propagating structural fissures with low-viscosity structural epoxy injection resins under 0.6 MPa pressure.",
        costRange: "₹40 L - ₹1.2 Cr",
        frequency: "Monthly Cycle"
      },
      {
        title: "Dynamic Vibration Damping Replacement",
        desc: "Recalibrate tuned mass dampers and replace worn elastomeric neoprene bearing pads on bridge piers and tower joints.",
        costRange: "₹75 L - ₹2.0 Cr",
        frequency: "Within 45 Days"
      }
    ]
  },
  {
    riskCategory: "Moderate Risk",
    color: "#f59e0b",
    urgency: "Preventative (Within 60 - 90 Days)",
    actions: [
      {
        title: "Silane Moisture Barrier & Anti-Carbonation Coating",
        desc: "Hydrophobic silane impregnation to block saline atmospheric penetration and arrest early reinforcement steel rust.",
        costRange: "₹15 L - ₹45 L",
        frequency: "Biannual"
      },
      {
        title: "Expansion Joint Resealing & Bearing Greasing",
        desc: "Clean and reseal modular bridge expansion joints; grease mechanical rocker bearings to minimize thermal friction lock.",
        costRange: "₹20 L - ₹50 L",
        frequency: "Quarterly"
      },
      {
        title: "Pavement Diamond Grinding & Asphalt Resurfacing",
        desc: "Micro-mill deformed road surfaces, correct cross-fall gradients, and apply high-friction polymer modified bitumen.",
        costRange: "₹60 L - ₹2.2 Cr",
        frequency: "Annual"
      }
    ]
  },
  {
    riskCategory: "Low Risk",
    color: "#10b981",
    urgency: "Routine Lifecycle Maintenance",
    actions: [
      {
        title: "Quarterly Sensor Calibration & Cleaning",
        desc: "Audit IoT accelerometer sensitivity, optical tiltmeters, solar battery backup, and wireless transmission gateways.",
        costRange: "₹5 L - ₹12 L",
        frequency: "Quarterly"
      },
      {
        title: "Drainage Sump & Outfall Desilting",
        desc: "Clear weep holes, bridge scuppers, highway side drains, and sediment interceptors before rainy seasons.",
        costRange: "₹8 L - ₹18 L",
        frequency: "Pre-Monsoon"
      },
      {
        title: "Biannual Photogrammetry & LiDAR Baseline Audit",
        desc: "Fly automated drone photogrammetry and high-density LiDAR to document 3D baseline geometries and compare millimetric shifts.",
        costRange: "₹12 L - ₹25 L",
        frequency: "Biannual"
      }
    ]
  }
];
