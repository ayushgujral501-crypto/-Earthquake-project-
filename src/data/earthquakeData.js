/**
 * InfraGuard AI - Verified Indian Historical Earthquake Catalog & Seismic Hazard Database
 * 
 * Sources:
 * - National Center for Seismology (NCS), Ministry of Earth Sciences, Govt. of India
 * - USGS Global Earthquake Catalog
 * - National Disaster Management Authority (NDMA), India
 * - Geological Survey of India (GSI) Seismotectonic Atlas
 * - Gujarat State Disaster Management Authority (GSDMA)
 * - Bureau of Indian Standards (BIS) IS 1893 (Part 1): 2016
 * 
 * Last Data Audit: November 2026
 */

export const DATA_METADATA = {
  title: "National Seismic & Historical Earthquake Catalog of India",
  version: "4.2.0",
  lastUpdated: "2026-11-15",
  primarySources: [
    "National Center for Seismology (NCS), New Delhi",
    "United States Geological Survey (USGS) Earthquake Hazards Program",
    "National Disaster Management Authority (NDMA), Govt. of India",
    "Geological Survey of India (GSI) Special Publications",
    "Bureau of Indian Standards (BIS IS 1893:2016 Criteria for Earthquake Resistant Design of Structures)"
  ],
  disclaimer: "Historical records are drawn from verified seismic archives and post-disaster field engineering surveys. Risk assessments represent probabilistic seismic hazard analyses (PSHA) and BIS zonation, NOT deterministic predictions of exact future dates or locations."
};

export const HISTORICAL_EARTHQUAKES = [
  {
    id: "EQ-IN-2001-BHUJ",
    name: "Bhuj Great Earthquake",
    date: "2001-01-26",
    time: "08:46:42 IST",
    year: 2001,
    state: "Gujarat",
    city: "Bhuj / Kutch",
    epicenter: "Chobari, Bhachau taluka, Kutch",
    coordinates: [23.419, 70.232],
    magnitude: 7.7,
    magnitudeType: "Mw",
    depth: 16.0, // km
    intensity: "X (Extreme - MSK)",
    affectedPopulation: "Over 15,000,000 across 21 districts of Gujarat",
    casualties: {
      fatalities: 20005,
      injured: 166800,
      homeless: 600000
    },
    infrastructureDamage: {
      buildings: "Over 340,000 completely destroyed, 844,000 heavily damaged; multi-story RC frames collapsed in Ahmedabad (300 km away)",
      roads: "Extensive longitudinal surface fissures on SH-45 and NH-8A; sub-base subsidence in salt-flat alluvial stretches",
      bridges: "Surajbari Bridge suffered severe pier bearing displacement and girder dislocation; approach embankments collapsed",
      other: "Aina Mahal historic palace collapsed; Kandla Port jetties suffered significant underwater quay wall fissures; power grid collapsed across Kutch"
    },
    estimatedEconomicLoss: "₹25,000 - ₹35,000 Crore (~$5.5 - $7.5 Billion USD in 2001)",
    faultZone: "Kutch Mainland Fault (KMF) & South Wagad Fault (SWF)",
    soilCondition: "Alluvial marine deposits, high liquefaction across Rann flats",
    source: "USGS Catalog / GSDMA Comprehensive Disaster Report / GSI Special Pub No. 67",
    isVerified: true
  },
  {
    id: "EQ-IN-1993-LATUR",
    name: "Killari / Latur Intraplate Earthquake",
    date: "1993-09-30",
    time: "03:56:00 IST",
    year: 1993,
    state: "Maharashtra",
    city: "Latur / Killari",
    epicenter: "Killari, Latur District",
    coordinates: [18.070, 76.620],
    magnitude: 6.2,
    magnitudeType: "Mw",
    depth: 12.0,
    intensity: "IX (Destructive)",
    affectedPopulation: "Approx. 1,200,000 across Latur and Osmanabad districts",
    casualties: {
      fatalities: 9748,
      injured: 30000,
      homeless: 150000
    },
    infrastructureDamage: {
      buildings: "Complete pulverization of 52 villages; traditional stone-mud masonry (dhajji-dewari variant) collapsed with near-zero ductililty",
      roads: "Cracking of rural arterial roads; masonry culvert collapses blocked emergency rescue convoys for 48 hours",
      bridges: "Minor abutment cracking in small masonry arch bridges across Terna river",
      other: "Severe water supply pipeline ruptures and agricultural storage silos collapse"
    },
    estimatedEconomicLoss: "₹1,200 Crore (~$330 Million USD)",
    faultZone: "Kurduvadi-Terna River Lineament (Stable Continental Region Intraplate Fault)",
    soilCondition: "Black cotton soil over Deccan Trap Basalt (shallow soil resonance)",
    source: "Geological Survey of India Memoir Vol 125 / NCS / World Bank Latur Rehabilitation Report",
    isVerified: true
  },
  {
    id: "EQ-IN-2005-KASHMIR",
    name: "Kashmir Great Earthquake",
    date: "2005-10-08",
    time: "08:50:38 IST",
    year: 2005,
    state: "Jammu & Kashmir",
    city: "Uri / Tangdhar / Baramulla",
    epicenter: "Near Muzaffarabad / J&K Border",
    coordinates: [34.493, 73.629],
    magnitude: 7.6,
    magnitudeType: "Mw",
    depth: 26.0,
    intensity: "XI (Extreme)",
    affectedPopulation: "Over 3,500,000 across the western Himalayan corridor",
    casualties: {
      fatalities: 87350, // total across region; ~1,350 in Indian J&K
      injured: 138000,
      homeless: 2800000
    },
    infrastructureDamage: {
      buildings: "Uri and Tangdhar sustained 90%+ structural demolition; non-ductile brick & stone buildings sheared flat; 130,000 structures damaged in J&K",
      roads: "National Highway 1A (Srinagar-Uri) severed at 40+ locations by catastrophic massive debris landslides",
      bridges: "Kaman Aman Setu (Peace Bridge) damaged; multiple steel girder bridges suffered abutment thrust shear",
      other: "Hydroelectric power water tunnels collapsed; military barracks and mountain outposts pulverized"
    },
    estimatedEconomicLoss: "₹24,000 Crore (~$5.2 Billion USD)",
    faultZone: "Balakot-Bagh Fault / Main Boundary Thrust (MBT)",
    soilCondition: "Mountain slope colluvium, severe landslide susceptibility",
    source: "USGS Earthquake Hazards Program / NDMA India Disaster Archive / NCS",
    isVerified: true
  },
  {
    id: "EQ-IN-1950-ASSAM",
    name: "Assam-Tibet Great Himalayan Earthquake",
    date: "1950-08-15",
    time: "19:39:28 IST",
    year: 1950,
    state: "Assam",
    city: "Dibrugarh / Sadiya",
    epicenter: "Mishmi Hills, Indo-Tibetan Border Zone",
    coordinates: [28.380, 96.760],
    magnitude: 8.6,
    magnitudeType: "Mw",
    depth: 15.0,
    intensity: "XI (Catastrophic)",
    affectedPopulation: "Entire Upper Assam & Brahmaputra Valley (~5,000,000)",
    casualties: {
      fatalities: 4800,
      injured: 12000,
      homeless: 500000
    },
    infrastructureDamage: {
      buildings: "Widespread masonry collapse across Dibrugarh, Jorhat, Lakhimpur, and Sadiya; heritage Ahom monuments suffered fissuring",
      roads: "Severe road fissures up to 4 meters wide; railway tracks twisted into serpentines; Dibrugarh rail terminal submerged",
      bridges: "Dozens of timber and steel railway bridges snapped; Subansiri river dammed by landslide, subsequent burst washed away 7 downstream bridges",
      other: "Riverbeds of Brahmaputra and Dihing raised by 3-4 meters, permanently altering river morphology and flood plains"
    },
    estimatedEconomicLoss: "₹1,500 Crore (in 1950 value; equivalent to > ₹40,000 Crore today)",
    faultZone: "Eastern Himalayan Syntaxis / Main Himalayan Thrust (MHT)",
    soilCondition: "Deep Brahmaputra basin alluvium; massive liquefaction & sand boiling",
    source: "Geological Survey of India Records Vol 84 / USGS Historic Earthquakes",
    isVerified: true
  },
  {
    id: "EQ-IN-1897-SHILLONG",
    name: "Great Shillong Earthquake",
    date: "1897-06-12",
    time: "17:15:00 IST",
    year: 1897,
    state: "Meghalaya",
    city: "Shillong / Cherrapunji",
    epicenter: "Northern Shillong Plateau",
    coordinates: [25.900, 91.800],
    magnitude: 8.1,
    magnitudeType: "Mw (Ms 8.7)",
    depth: 32.0,
    intensity: "XII (Extreme - Max possible)",
    affectedPopulation: "Felt across 1,750,000 sq km (from Delhi to Myanmar)",
    casualties: {
      fatalities: 1542,
      injured: 5000,
      homeless: 200000
    },
    infrastructureDamage: {
      buildings: "Every stone building in Shillong, Guwahati, and Cherrapunji flattened; masonry structures suffered complete disintegration",
      roads: "Severe ground tearing; entire hill spurs detached; carriage roads obliterated across Khasi & Garo hills",
      bridges: "All masonry bridges in Assam valley shattered; iron girder bridges twisted or unseated",
      other: "Historic Oldham Fault displacement; vertical ground acceleration exceeded 1g (stones tossed into air)"
    },
    estimatedEconomicLoss: "Historical catastrophic scale (Unquantified in modern currency)",
    faultZone: "Oldham Fault / Chedrang Fault",
    soilCondition: "Granitic gneiss plateau with surrounding alluvial sediment",
    source: "R.D. Oldham, GSI Memoir Vol 29 / Bilham & England (2001)",
    isVerified: true
  },
  {
    id: "EQ-IN-1934-BIHAR",
    name: "Bihar-Nepal Great Earthquake",
    date: "1934-01-15",
    time: "14:13:22 IST",
    year: 1934,
    state: "Bihar",
    city: "Munger / Muzaffarpur / Darbhanga / Patna",
    epicenter: "Northern Bihar / Eastern Nepal Border",
    coordinates: [26.500, 86.500],
    magnitude: 8.0,
    magnitudeType: "Mw",
    depth: 15.0,
    intensity: "X (Extreme)",
    affectedPopulation: "Over 10,000,000 across Indo-Gangetic Plains",
    casualties: {
      fatalities: 10700, // > 7,250 in Bihar alone
      injured: 35000,
      homeless: 1000000
    },
    infrastructureDamage: {
      buildings: "Munger and Muzaffarpur towns completely demolished; Patna suffered severe damage to administrative and residential masonry",
      roads: "Massive ground fissures spanning miles, shooting geysers of sand and water; road networks made impassable",
      bridges: "Multiple railway bridges over Gandak and Kosi distorted; bridge piers tilted up to 25 degrees due to lateral spreading",
      other: "Vast swathes of fertile agricultural land covered in unfertile white sand from extreme liquefaction"
    },
    estimatedEconomicLoss: "₹3,000 Crore (adjusted equivalent)",
    faultZone: "Main Himalayan Thrust (MHT) / Himalayan Frontal Thrust (HFT)",
    soilCondition: "Deep Gangetic alluvium; epic ground liquefaction zone (300 km belt)",
    source: "GSI Special Memoir Vol 73 / Brett (1935) Official Relief Report / USGS",
    isVerified: true
  },
  {
    id: "EQ-IN-1967-KOYNA",
    name: "Koynanagar Dam Earthquake",
    date: "1967-12-11",
    time: "04:21:25 IST",
    year: 1967,
    state: "Maharashtra",
    city: "Koynanagar / Satara",
    epicenter: "Near Koyna Dam, Western Ghats",
    coordinates: [17.370, 73.750],
    magnitude: 6.3,
    magnitudeType: "Mw",
    depth: 10.0,
    intensity: "VIII (Severe)",
    affectedPopulation: "Approx. 400,000 in Satara and Chiplun districts",
    casualties: {
      fatalities: 177,
      injured: 2270,
      homeless: 50000
    },
    infrastructureDamage: {
      buildings: "Koynanagar township 80% destroyed; stone masonry houses with heavy tiled roofs collapsed",
      roads: "Landslides blocked Pune-Chiplun highway at Kumbharli Ghat; road pavement cracked near dam axis",
      bridges: "Approach bridges to Koyna powerhouse suffered shear cracking in piers",
      other: "Horizontal fissures formed across downstream face of Koyna Concrete Dam monoliths; prompted global revisions to dam seismic codes"
    },
    estimatedEconomicLoss: "₹450 Crore (~$60 Million USD)",
    faultZone: "Koyna Fault Line / Reservoir-Triggered Seismicity (RTS)",
    soilCondition: "Deccan Traps massive basalt; steep Western Ghats slopes",
    source: "CWPRS Khadakwasla / UNESCO Earthquake Reconnaissance Report / NCS",
    isVerified: true
  },
  {
    id: "EQ-IN-1999-CHAMOLI",
    name: "Chamoli Himalayan Earthquake",
    date: "1999-03-29",
    time: "00:35:13 IST",
    year: 1999,
    state: "Uttarakhand",
    city: "Chamoli / Gopeshwar",
    epicenter: "Chamoli, Garhwal Himalayas",
    coordinates: [30.410, 79.420],
    magnitude: 6.8,
    magnitudeType: "Mw",
    depth: 15.0,
    intensity: "VIII (Severe)",
    affectedPopulation: "Approx. 500,000 across Chamoli, Rudraprayag, and Tehri",
    casualties: {
      fatalities: 103,
      injured: 395,
      homeless: 60000
    },
    infrastructureDamage: {
      buildings: "2,595 houses collapsed, 10,861 severely damaged; traditional Kath-Kuni structures performed better than unreinforced stone masonry",
      roads: "Rishikesh-Badrinath National Highway (NH-58) severed by 80+ major rockfalls; emergency transport blocked for 5 days",
      bridges: "Suspension footbridges strained; abutment stone cracking on motorable river spans",
      other: "Disrupted water supply networks, telecommunication towers tilted, electric transformers dislodged"
    },
    estimatedEconomicLoss: "₹350 Crore (~$80 Million USD)",
    faultZone: "Alaknanda Fault / Main Central Thrust (MCT)",
    soilCondition: "Himalayan metamorphic slopes, extreme rockfall hazard",
    source: "Wadia Institute of Himalayan Geology / NCS / NDMA",
    isVerified: true
  },
  {
    id: "EQ-IN-1991-UTTARKASHI",
    name: "Uttarkashi Himalayan Earthquake",
    date: "1991-10-20",
    time: "02:53:16 IST",
    year: 1991,
    state: "Uttarakhand",
    city: "Uttarkashi / Bhatwari",
    epicenter: "Near Dunda, Uttarkashi District",
    coordinates: [30.780, 78.780],
    magnitude: 6.8,
    magnitudeType: "Mw",
    depth: 10.0,
    intensity: "IX (Destructive)",
    affectedPopulation: "Approx. 400,000 across Garhwal region",
    casualties: {
      fatalities: 768,
      injured: 5066,
      homeless: 100000
    },
    infrastructureDamage: {
      buildings: "20,184 houses collapsed entirely; Bhatwari and Maneri settlements devastated",
      roads: "Massive landslides blocked Bhagirathi valley roads; debris covered NH-108 for weeks",
      bridges: "Gaurikund and Maneri suspension bridges snapped; several culverts sheared",
      other: "Cracks in Maneri Bhali Stage-I hydel project civil works; power lines down across district"
    },
    estimatedEconomicLoss: "₹500 Crore (~$190 Million USD)",
    faultZone: "Main Central Thrust (MCT)",
    soilCondition: "Unconsolidated valley terrace colluvium on steep terrain",
    source: "GSI Special Publication No. 30 / NCS / USGS",
    isVerified: true
  },
  {
    id: "EQ-IN-1997-JABALPUR",
    name: "Jabalpur Deep Fault Earthquake",
    date: "1997-05-22",
    time: "04:22:15 IST",
    year: 1997,
    state: "Madhya Pradesh",
    city: "Jabalpur / Mandla",
    epicenter: "Near Kosham, Jabalpur District",
    coordinates: [23.080, 80.060],
    magnitude: 5.8,
    magnitudeType: "Mw",
    depth: 32.0, // Unusually deep intraplate event
    intensity: "VIII (Severe)",
    affectedPopulation: "Approx. 1,800,000 in central Madhya Pradesh",
    casualties: {
      fatalities: 38,
      injured: 1000,
      homeless: 45000
    },
    infrastructureDamage: {
      buildings: "8,546 houses destroyed, 52,690 damaged; railway administrative towers and ordnance factory buildings suffered wall cracking",
      roads: "Pavement fissures on Jabalpur-Mandla road; minor bridge approach slumping",
      bridges: "Tilwaraghat bridge over Narmada inspected for pier micro-cracking; bearings serviced",
      other: "Industrial equipment displaced; historic Madan Mahal fort sustained minor masonry spalling"
    },
    estimatedEconomicLoss: "₹380 Crore (~$105 Million USD)",
    faultZone: "Narmada-Son Lineament (NSL) Deep South Narmada Fault",
    soilCondition: "Alluvial plains overlying Gondwana sediments and Archaean basement",
    source: "Geological Survey of India / National Center for Seismology",
    isVerified: true
  },
  {
    id: "EQ-IN-2011-SIKKIM",
    name: "Sikkim Himalayan Earthquake",
    date: "2011-09-18",
    time: "18:10:48 IST",
    year: 2011,
    state: "Sikkim",
    city: "Gangtok / Mangan",
    epicenter: "Kanchenjunga National Park, Sikkim",
    coordinates: [27.720, 88.060],
    magnitude: 6.9,
    magnitudeType: "Mw",
    depth: 19.7,
    intensity: "VII (Very Strong)",
    affectedPopulation: "Entire state of Sikkim and Darjeeling/Kalimpong districts of West Bengal",
    casualties: {
      fatalities: 111, // > 60 in Sikkim
      injured: 1200,
      homeless: 60000
    },
    infrastructureDamage: {
      buildings: "Widespread cracking in RC high-rises in Gangtok built on steep hillsides; heritage Buddhist monasteries (Pemayangtse, Rumtek) damaged",
      roads: "National Highway 31A severed by over 300 landslides, marooning North Sikkim for days",
      bridges: "Teesta river bridges suffered approach settlement; steel suspension links sheared",
      other: "Severe damage to Teesta Urja Stage III hydroelectric dam infrastructure and access tunnels"
    },
    estimatedEconomicLoss: "₹2,500 Crore (~$520 Million USD)",
    faultZone: "Tista Lineament / Kanchanjunga Strike-Slip Fault System",
    soilCondition: "Steep hill slopes with high moisture saturation; triggered massive mudslides",
    source: "NDMA Post-Earthquake Assessment Report / NCS / USGS",
    isVerified: true
  },
  {
    id: "EQ-IN-1819-KUTCH",
    name: "Rann of Kutch Great Earthquake (Allah Bund Event)",
    date: "1819-06-16",
    time: "18:45:00 IST",
    year: 1819,
    state: "Gujarat",
    city: "Bhuj / Kutch",
    epicenter: "Northern Rann of Kutch",
    coordinates: [23.600, 68.600],
    magnitude: 7.8,
    magnitudeType: "Mw",
    depth: 15.0,
    intensity: "XI (Extreme)",
    affectedPopulation: "Felt across western India and present-day Pakistan",
    casualties: {
      fatalities: 1543,
      injured: 3000,
      homeless: 50000
    },
    infrastructureDamage: {
      buildings: "Fort walls of Bhuj demolished; historic temples and palaces razed; Sindri Fort flooded and permanently submerged",
      roads: "Complete geographic alteration; caravan routes drowned by saline lagoon creation",
      bridges: "Primitive stone and wood culverts destroyed",
      other: "Created the legendary 'Allah Bund' (Mound of God) - a natural earthen fault scarp 90 km long and up to 6 meters high"
    },
    estimatedEconomicLoss: "Historic magnitude (Unquantified)",
    faultZone: "Allah Bund Fault / Island Belt Fault",
    soilCondition: "Tidal mudflats & salt marshes; extreme liquefaction",
    source: "Bilham (1998) / Oldham (1926) / Geological Survey of India",
    isVerified: true
  },
  {
    id: "EQ-IN-1905-KANGRA",
    name: "Kangra Valley Great Earthquake",
    date: "1905-04-04",
    time: "06:10:00 IST",
    year: 1905,
    state: "Himachal Pradesh",
    city: "Kangra / Dharamshala",
    epicenter: "Kangra Valley, Western Himalayas",
    coordinates: [32.040, 76.250],
    magnitude: 7.8,
    magnitudeType: "Mw",
    depth: 25.0,
    intensity: "X (Extreme)",
    affectedPopulation: "Over 2,000,000 across Punjab and Himachal hill tracts",
    casualties: {
      fatalities: 20000,
      injured: 53000,
      homeless: 250000
    },
    infrastructureDamage: {
      buildings: "Over 100,000 buildings flattened; historic Kangra Fort and Golden Temple in Kangra destroyed; British cantonments in Dharamshala obliterated",
      roads: "Cart roads and bridle trails buried under thousands of tonnes of landslide debris",
      bridges: "All river bridges across Beas tributaries collapsed",
      other: "Aqueducts, watermills, and terraced irrigation channels smashed"
    },
    estimatedEconomicLoss: "₹1,800 Crore (historic adjusted equivalent)",
    faultZone: "Kangra Re-entrant / Main Boundary Thrust (MBT)",
    soilCondition: "Intermontane valley alluvium and Tertiary Siwalik sandstones",
    source: "Middleton (1910) GSI Memoir Vol 38 / USGS",
    isVerified: true
  },
  {
    id: "EQ-IN-2004-ANDAMAN",
    name: "Indian Ocean Megathrust Earthquake & Tsunami",
    date: "2004-12-26",
    time: "06:28:53 IST",
    year: 2004,
    state: "Andaman & Nicobar Islands / Tamil Nadu / Andhra Pradesh / Kerala",
    city: "Port Blair / Car Nicobar / Chennai / Nagapattinam",
    epicenter: "Off west coast of Northern Sumatra / Andaman Subduction Trench",
    coordinates: [3.316, 95.854],
    magnitude: 9.1,
    magnitudeType: "Mw",
    depth: 30.0,
    intensity: "IX (Ground shaking) + Tsunami XI",
    affectedPopulation: "Over 5,000,000 in coastal India",
    casualties: {
      fatalities: 12405, // India fatalities (TN: 8,009, A&N: 3,513, AP: 107, Kerala: 177)
      injured: 25000,
      homeless: 647000
    },
    infrastructureDamage: {
      buildings: "Coastal fishing villages swept away; Port Blair harbor installations, airport apron flooded; Car Nicobar air force base devastated",
      roads: "East Coast Road (ECR) in Tamil Nadu inundated and severed; coastal highway embankments breached",
      bridges: "Coastal estuary bridges washed out; Pamban Bridge approach tracks flooded; small culverts destroyed",
      other: "Indira Point lighthouse subsided 4.25 meters into the sea; total shoreline erosion across Andaman & Nicobar"
    },
    estimatedEconomicLoss: "₹11,500 Crore (~$2.6 Billion USD in India)",
    faultZone: "Sunda Megathrust Subduction Zone / Andaman Spreading Ridge",
    soilCondition: "Coastal sands, marine alluvium, coral atolls",
    source: "INCOIS / NDMA Comprehensive Tsunami Assessment / USGS",
    isVerified: true
  },
  {
    id: "EQ-IN-1988-BIHAR-NEPAL",
    name: "Udaypur / Bihar-Nepal Earthquake",
    date: "1988-08-21",
    time: "04:39:11 IST",
    year: 1988,
    state: "Bihar",
    city: "Darbhanga / Munger / Patna",
    epicenter: "Near Nepal-Bihar Border",
    coordinates: [26.770, 86.610],
    magnitude: 6.8,
    magnitudeType: "Mw",
    depth: 57.0,
    intensity: "VIII (Severe)",
    affectedPopulation: "Over 3,000,000 in North Bihar",
    casualties: {
      fatalities: 1004, // ~282 in Bihar
      injured: 3766,
      homeless: 100000
    },
    infrastructureDamage: {
      buildings: "Cracking of modern multi-story buildings in Patna; unreinforced masonry collapses in rural Darbhanga and Madhubani",
      roads: "Road subsidence along Kosi river embankments; bridge approach fissures",
      bridges: "Rajendra Setu over Ganga inspected for deck joint displacements",
      other: "Widespread sand boiling and shallow tubewell silting in Gangetic plains"
    },
    estimatedEconomicLoss: "₹650 Crore (~$180 Million USD)",
    faultZone: "Central Himalayan Thrust Fault",
    soilCondition: "Deep Gangetic silty clay; high groundwater table",
    source: "National Center for Seismology / USGS / GSI",
    isVerified: true
  },
  {
    id: "EQ-IN-2023-DELHI-NEPAL",
    name: "Western Nepal / Delhi-NCR Shaking Sequence",
    date: "2023-11-03",
    time: "23:32:54 IST",
    year: 2023,
    state: "Delhi / Uttar Pradesh / Uttarakhand / Bihar",
    city: "New Delhi / Noida / Gurugram / Lucknow",
    epicenter: "Jajarkot, Western Nepal (felt intensely across Northern India)",
    coordinates: [28.840, 82.160],
    magnitude: 6.4,
    magnitudeType: "Mw",
    depth: 10.0,
    intensity: "VI-VII (Strong in epicenter, IV-V in Delhi-NCR)",
    affectedPopulation: "Felt by > 50,000,000 across Delhi-NCR and Gangetic basin",
    casualties: {
      fatalities: 153, // In epicenter region
      injured: 375,
      homeless: 25000
    },
    infrastructureDamage: {
      buildings: "Widespread panic evacuations from Delhi-NCR high-rises; superficial non-structural drywall and plaster cracking in high-rise towers",
      roads: "No primary road failures in Delhi; mountain access roads blocked near epicenter",
      bridges: "Signature Bridge and flyovers inspected by PWD Delhi, reported within normal elastic tolerances",
      other: "Re-emphasized acute vulnerability of unreinforced soft-story apartments and illegal masonry clusters in Delhi"
    },
    estimatedEconomicLoss: "₹180 Crore (regional impact)",
    faultZone: "Main Himalayan Thrust (MHT)",
    soilCondition: "Yamuna alluvium (Delhi) causes 2.5x wave amplification in trans-Yamuna areas",
    source: "National Center for Seismology (NCS), Ministry of Earth Sciences, New Delhi",
    isVerified: true
  },
  {
    id: "EQ-IN-1956-ANJAR",
    name: "Anjar Kutch Earthquake",
    date: "1956-07-21",
    time: "21:02:24 IST",
    year: 1956,
    state: "Gujarat",
    city: "Anjar / Gandhidham",
    epicenter: "Near Anjar, Kutch",
    coordinates: [23.230, 70.070],
    magnitude: 6.1,
    magnitudeType: "Mw",
    depth: 15.0,
    intensity: "IX (Destructive)",
    affectedPopulation: "Approx. 250,000 in Kutch",
    casualties: {
      fatalities: 115,
      injured: 254,
      homeless: 15000
    },
    infrastructureDamage: {
      buildings: "Half of historic Anjar town leveled; 1,350 houses collapsed; modern Kandla Port town buildings survived with minor cracking",
      roads: "Fissures across Bhuj-Kandla highway",
      bridges: "Minor damage to railway bridge piers",
      other: "Telephone and telegraph wires severed between Kutch and mainland Gujarat"
    },
    estimatedEconomicLoss: "₹120 Crore (adjusted equivalent)",
    faultZone: "Katrol Hill Fault (KHF) / Kutch Basin Faults",
    soilCondition: "Alluvial soil on Mesozoic sedimentary formations",
    source: "Tandon (1959) Indian Journal of Meteorology & Geophysics / NCS",
    isVerified: true
  }
];

export const STATE_SEISMIC_PROFILES = {
  "Gujarat": {
    state: "Gujarat",
    dominantZone: "Zone V / Zone IV / Zone III",
    bisZoneCode: "Zone V (Kutch), Zone IV (Saurashtra/Patan), Zone III (Central/South)",
    maxHistoricalMagnitude: 7.8,
    strongestEvent: "1819 Rann of Kutch (M 7.8) & 2001 Bhuj (M 7.7)",
    pgaRange: "0.24g - 0.36g (Peak Ground Acceleration)",
    activeFaults: [
      "Kutch Mainland Fault (KMF)",
      "Allah Bund Fault",
      "Katrol Hill Fault (KHF)",
      "South Wagad Fault (SWF)",
      "Narmada Fault (South Gujarat)",
      "West Cambay Basin Margin Fault"
    ],
    historicalFrequency: "High (Major catastrophic events every 50-80 years; frequent micro-swarms)",
    soilAndLiquefaction: "Extreme liquefaction hazard in Rann of Kutch and coastal Gulf of Khambhat alluvial sediments. High water table in agricultural corridors exacerbates lateral spreading during cyclic loading.",
    infrastructureVulnerability: "High to Extreme. While post-2001 GSDMA codes drastically improved newer public infrastructure, aging unreinforced masonry in historical settlements and port logistics corridors remain susceptible.",
    overallRisk: "Very High",
    riskCategoryColor: "#ef4444",
    scientificRationale: "Gujarat sits over an active intraplate rift basin (Kutch and Cambay rifts) experiencing ongoing compressive tectonic stresses driven by the northward collision of the Indian Plate into Eurasia. Historical data proves this zone can generate devastating intraplate earthquakes exceeding M 7.5.",
    keyCities: ["Bhuj", "Gandhidham", "Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    totalRecordedEvents: 42
  },
  "Maharashtra": {
    state: "Maharashtra",
    dominantZone: "Zone IV / Zone III",
    bisZoneCode: "Zone IV (Koyna-Warna region), Zone III (Mumbai, Thane, Pune, Konkan coast), Zone II (Eastern Vidarbha)",
    maxHistoricalMagnitude: 6.3,
    strongestEvent: "1967 Koynanagar (M 6.3) & 1993 Killari-Latur (M 6.2)",
    pgaRange: "0.16g - 0.24g",
    activeFaults: [
      "Panvel Flexure & West Coast Fault (Western margin)",
      "Koyna-Warna Fault Zone (Active reservoir-triggered zone)",
      "Kurduvadi-Terna Lineament (Latur intraplate fault)",
      "Ghirni Lineament",
      "Godavari Valley Fault System"
    ],
    historicalFrequency: "Moderate. Koyna-Warna experiences regular micro-earthquakes (M 2.5–4.5); intraplate events like Latur occur on rare, long recurrence cycles.",
    soilAndLiquefaction: "Mumbai coastal and reclaimed areas (Marine Drive, BKC, Navi Mumbai, dockyards) consist of soft tidal mud and loose reclaimed fills prone to substantial ground shaking amplification and localized liquefaction. Inland Maharashtra features black cotton soil over hard Deccan basalt.",
    infrastructureVulnerability: "High in Mumbai Metropolitan Region due to immense density of high-rises, aging pre-1970 masonry buildings, and heavy transport flyovers. Moderate in rural interior.",
    overallRisk: "High",
    riskCategoryColor: "#f97316",
    scientificRationale: "Classified as Stable Continental Region (SCR), yet historical events in Koyna (1967) and Latur (1993) demonstrated that ancient deep-seated fault lines within the peninsular basalt can reactivate. The immense urban density and reclaimed soil of Mumbai elevates the societal risk significantly.",
    keyCities: ["Mumbai", "Pune", "Latur", "Satara", "Nagpur", "Nashik"],
    totalRecordedEvents: 28
  },
  "Jammu & Kashmir": {
    state: "Jammu & Kashmir",
    dominantZone: "Zone V / Zone IV",
    bisZoneCode: "Zone V (Kashmir Valley, Srinagar, Baramulla, Kupwara), Zone IV (Jammu, Udhampur)",
    maxHistoricalMagnitude: 7.6,
    strongestEvent: "2005 Kashmir Earthquake (M 7.6)",
    pgaRange: "0.24g - 0.36g",
    activeFaults: [
      "Main Boundary Thrust (MBT)",
      "Main Central Thrust (MCT)",
      "Balakot-Bagh Fault",
      "Riasi Thrust",
      "Medlicott-Wadia Thrust"
    ],
    historicalFrequency: "Very High. Situated right along the frontal deformation zone of the Himalayan collision.",
    soilAndLiquefaction: "Karewa lacustrine silts and river valley alluvium in Kashmir Valley amplify seismic waves by 2.0x to 3.5x. Steep mountain slopes carry extreme co-seismic landslide and rockfall risks.",
    infrastructureVulnerability: "Extreme. High percentage of non-ductile brick-mud mortar houses (dhajji dewari), mountain highways prone to severance, and critical river bridges across deep gorges.",
    overallRisk: "Very High",
    riskCategoryColor: "#ef4444",
    scientificRationale: "Directly positioned on the active convergent plate boundary where the Indian plate underthrusts Eurasia at ~45 mm/year, accumulating massive elastic strain energy. Geodetic studies identify an active seismic gap with high potential for major future ruptures.",
    keyCities: ["Srinagar", "Baramulla", "Uri", "Jammu", "Anantnag", "Reasi"],
    totalRecordedEvents: 54
  },
  "Delhi": {
    state: "Delhi",
    dominantZone: "Zone IV",
    bisZoneCode: "Zone IV (High Seismic Hazard, Design Factor Z = 0.24)",
    maxHistoricalMagnitude: 6.8,
    strongestEvent: "1803 Mathura-Delhi (M 6.8) & 1960 Gurgaon (M 6.0)",
    pgaRange: "0.24g",
    activeFaults: [
      "Sohna Fault",
      "Mahendragarh-Dehradun Subsurface Fault (MDDF)",
      "Great Boundary Fault (GBF extension)",
      "Moradabad Fault",
      "Delhi-Haridwar Ridge"
    ],
    historicalFrequency: "Moderate local earthquakes; High frequency of felt tremors originating from Himalayan seismic zones (Nepal, Uttarakhand, Hindu Kush).",
    soilAndLiquefaction: "Severe disparity: The Delhi Ridge is stable quartzite rock, but the Yamuna floodplains and eastern trans-Yamuna belt feature deep unconsolidated alluvium with high water tables, creating high liquefaction potential and severe seismic wave amplification.",
    infrastructureVulnerability: "Very High. Intense population density (> 11,000 people/km²), widespread unauthorized multi-story brick masonry with soft ground floors (parking), and aging governmental heritage complexes.",
    overallRisk: "High",
    riskCategoryColor: "#f97316",
    scientificRationale: "Although not situated on a plate boundary, Delhi is crisscrossed by active subsurface faults and lies within 250 km of the seismically explosive Himalayan collision zone. Ground motion simulations reveal deep alluvial resonance under long-period waves from distant great Himalayan earthquakes.",
    keyCities: ["New Delhi", "North Delhi", "South Delhi", "Shahdara", "Dwarka"],
    totalRecordedEvents: 31
  },
  "Assam": {
    state: "Assam",
    dominantZone: "Zone V",
    bisZoneCode: "Zone V (Very High Seismic Hazard, Design Factor Z = 0.36)",
    maxHistoricalMagnitude: 8.6,
    strongestEvent: "1950 Assam-Tibet (M 8.6) & 1897 Shillong (M 8.1)",
    pgaRange: "0.36g+",
    activeFaults: [
      "Main Himalayan Thrust (MHT)",
      "Kopili Fault Zone",
      "Dauki Fault",
      "Naga Thrust & Disang Thrust",
      "Brahmaputra Basin Marginal Faults"
    ],
    historicalFrequency: "Very High. One of the most seismically active continental collision zones globally.",
    soilAndLiquefaction: "Vast Brahmaputra and Barak river basins feature deep saturated silt and sand, causing catastrophic liquefaction, sand boils, and bank collapses during moderate-to-great shocks.",
    infrastructureVulnerability: "Very High. Multi-modal bridges spanning the Brahmaputra, oil and refinery pipeline corridors, and elevated highway embankments across wetlands.",
    overallRisk: "Very High",
    riskCategoryColor: "#ef4444",
    scientificRationale: "Trapped in a tectonic vise between the northward underthrusting of the Indian Plate beneath the Himalayas and the eastward subduction beneath the Indo-Burman Ranges. Historical data confirms recurrent mega-earthquakes (> M 8.0) that fundamentally alter geography and river courses.",
    keyCities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
    totalRecordedEvents: 68
  },
  "Uttarakhand": {
    state: "Uttarakhand",
    dominantZone: "Zone V / Zone IV",
    bisZoneCode: "Zone V (Pithoragarh, Chamoli, Bageshwar, Rudraprayag), Zone IV (Dehradun, Haridwar, Nainital)",
    maxHistoricalMagnitude: 6.8,
    strongestEvent: "1991 Uttarkashi (M 6.8) & 1999 Chamoli (M 6.8)",
    pgaRange: "0.24g - 0.36g",
    activeFaults: [
      "Main Central Thrust (MCT)",
      "Main Boundary Thrust (MBT)",
      "Himalayan Frontal Thrust (HFT)",
      "Alaknanda Fault",
      "Yamuna Tear Fault"
    ],
    historicalFrequency: "High. Part of the 'Central Himalayan Seismic Gap' where no M > 8.0 earthquake has occurred in over 200 years, implying enormous accumulated strain.",
    soilAndLiquefaction: "Steep fragile mountain slopes prone to massive co-seismic landslides and glacial lake outburst floods. Valley bottoms in Dehradun and Haridwar feature alluvial amplification.",
    infrastructureVulnerability: "High to Extreme. Massive hydroelectric dam cascades (Tehri), hill highway tunnels, tourist pilgrimage corridors (Char Dham), and hillside hotels.",
    overallRisk: "Very High",
    riskCategoryColor: "#ef4444",
    scientificRationale: "Lies squarely on the active Himalayan collision front. Paleoseismic and geodetic measurements indicate an elastic slip deficit exceeding 10 meters, making the region vulnerable to future large-scale ruptures.",
    keyCities: ["Dehradun", "Haridwar", "Uttarkashi", "Chamoli", "Nainital", "Rishikesh"],
    totalRecordedEvents: 46
  },
  "Bihar": {
    state: "Bihar",
    dominantZone: "Zone V / Zone IV / Zone III",
    bisZoneCode: "Zone V (Madhubani, Supaul, Sitamarhi, Araria), Zone IV (Patna, Muzaffarpur, Darbhanga), Zone III (South Bihar)",
    maxHistoricalMagnitude: 8.0,
    strongestEvent: "1934 Bihar-Nepal (M 8.0) & 1988 Udaypur-Bihar (M 6.8)",
    pgaRange: "0.16g - 0.36g",
    activeFaults: [
      "Himalayan Frontal Thrust (Adjacent Northern Border)",
      "East Patna Fault",
      "West Patna Fault",
      "Munger-Saharsa Ridge Fault"
    ],
    historicalFrequency: "Moderate local epicenters; High exposure to destructive ground shaking from adjacent Nepalese Himalayan faults.",
    soilAndLiquefaction: "Extremely high liquefaction potential across the entire Kosi, Gandak, and Ganga floodplains. Saturated silty sand deposits with water table within 1-3 meters of surface.",
    infrastructureVulnerability: "High. Densely populated rural brick masonry, major river bridges (Gandhi Setu, Vikramshila), and flood control river embankments prone to seismic slump.",
    overallRisk: "High",
    riskCategoryColor: "#f97316",
    scientificRationale: "The deep Indo-Gangetic foreland basin traps seismic body waves and transforms them into long-duration surface waves, causing severe shaking amplification even when epicenters are across the border in Nepal.",
    keyCities: ["Patna", "Muzaffarpur", "Darbhanga", "Munger", "Gaya", "Bhagalpur"],
    totalRecordedEvents: 34
  },
  "Himachal Pradesh": {
    state: "Himachal Pradesh",
    dominantZone: "Zone V / Zone IV",
    bisZoneCode: "Zone V (Kangra, Chamba, Kullu, Mandi), Zone IV (Shimla, Solan, Sirmaur)",
    maxHistoricalMagnitude: 7.8,
    strongestEvent: "1905 Kangra Great Earthquake (M 7.8)",
    pgaRange: "0.24g - 0.36g",
    activeFaults: [
      "Main Boundary Thrust (MBT)",
      "Jawalamukhi Thrust",
      "Krol Thrust",
      "Main Central Thrust (MCT)",
      "Chamba Thrust"
    ],
    historicalFrequency: "High. Regular shallow crustal events and historic mega-earthquakes.",
    soilAndLiquefaction: "Hillside colluvium and glacio-fluvial scree prone to catastrophic landslides. River valley terraces in Kangra and Kullu show local wave entrapment.",
    infrastructureVulnerability: "Very High. Densely built hillside buildings on steep slopes with multi-story asymmetric load paths, mountain bridges, and hydro tunnels.",
    overallRisk: "Very High",
    riskCategoryColor: "#ef4444",
    scientificRationale: "Extensive tectonic crustal foreshortening along the Sub-Himalayan and Lesser Himalayan thrust sheets. High strain accumulation observed along the Kangra re-entrant.",
    keyCities: ["Shimla", "Dharamshala", "Kangra", "Mandi", "Solan", "Kullu"],
    totalRecordedEvents: 41
  },
  "West Bengal": {
    state: "West Bengal",
    dominantZone: "Zone IV / Zone III",
    bisZoneCode: "Zone IV (Darjeeling, Jalpaiguri, Cooch Behar), Zone III (Kolkata, Howrah, Hooghly, South Bengal)",
    maxHistoricalMagnitude: 6.9,
    strongestEvent: "2011 Sikkim-WB (M 6.9) & 1964 Calcutta Tremor",
    pgaRange: "0.16g - 0.24g",
    activeFaults: [
      "Eocene Hinge Zone / Calcutta Fault",
      "Pingla Fault",
      "Garhmayna-Khandaghosh Fault",
      "Jalpaiguri Fault",
      "Main Boundary Thrust (North)"
    ],
    historicalFrequency: "Moderate. Northern Himalayan foothill districts experience frequent moderate shaking; Kolkata feels tremors from Assam, Sikkim, and Bay of Bengal.",
    soilAndLiquefaction: "Very High in Kolkata and Gangetic delta. Soft deltaic alluvium, reclaimed water bodies, and high subterranean water table cause substantial wave amplification and soil liquefaction.",
    infrastructureVulnerability: "High. Kolkata's immense urban density, thousands of colonial-era unreinforced masonry buildings, and major bridges (Howrah, Vidyasagar Setu).",
    overallRisk: "Moderate",
    riskCategoryColor: "#f59e0b",
    scientificRationale: "Bengal Basin is underlain by thick sediments (up to 15 km) that amplify low-frequency seismic waves. Subsurface hinge zone faults present a latent seismic threat to the megacity.",
    keyCities: ["Kolkata", "Siliguri", "Howrah", "Asansol", "Durgapur", "Darjeeling"],
    totalRecordedEvents: 26
  },
  "Tamil Nadu": {
    state: "Tamil Nadu",
    dominantZone: "Zone III / Zone II",
    bisZoneCode: "Zone III (Chennai, Coimbatore, Cuddalore, Kanchipuram), Zone II (Central & Southern TN)",
    maxHistoricalMagnitude: 6.0,
    strongestEvent: "1900 Coimbatore (M 6.0) & 2004 Indian Ocean Tsunami",
    pgaRange: "0.10g - 0.16g",
    activeFaults: [
      "Moyar-Bhavani Shear Zone",
      "Palghat Gap Shear Zone",
      "Palar Fault",
      "Coromandel Coastal Fault"
    ],
    historicalFrequency: "Low to Moderate. Peninsular shield with occasional intraplate shear tremors.",
    soilAndLiquefaction: "Coastal corridors (Chennai, Nagapattinam, Cuddalore) feature marine sands and alluvium vulnerable to tsunami wave run-up and localized liquefaction.",
    infrastructureVulnerability: "Moderate. Coastal ports, IT corridors on coastal roads, and historical heritage temples.",
    overallRisk: "Low",
    riskCategoryColor: "#10b981",
    scientificRationale: "Located within the relatively stable Archean crystalline shield of South India. Primary historical seismic hazard arises from deep-sea Indian Ocean subduction zone mega-tsunamis rather than direct on-land fault ruptures.",
    keyCities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    totalRecordedEvents: 18
  }
};
