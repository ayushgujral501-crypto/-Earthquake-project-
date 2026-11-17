/**
 * InfraGuard AI - Transparent Rule-Based Risk Calculation Engine
 * 
 * NOTE: This is a demonstration assessment model based on empirical structural
 * health thresholds (IRC/IS civil norms simulation), NOT a certified professional
 * engineering prediction.
 */

export function calculateRiskScore(params) {
  const {
    type = 'Bridge',
    age = 10,
    crackMeasurement = 0.5, // mm
    vibrationLevel = 2.0,    // mm/s
    structuralDeformation = 2.0, // mm
    moistureLevel = 30       // %
  } = params;

  const numAge = Number(age) || 0;
  const numCrack = Number(crackMeasurement) || 0;
  const numVibration = Number(vibrationLevel) || 0;
  const numDeformation = Number(structuralDeformation) || 0;
  const numMoisture = Number(moistureLevel) || 0;

  // Weightings by parameter (total = 100%)
  // Crack (30%), Deformation (25%), Vibration (20%), Age (15%), Moisture (10%)
  
  // 1. Crack Severity Sub-score (0 - 100)
  // Normal concrete crack < 0.2mm is minor. 0.3-1.0mm is moderate. 1.0-3.0mm is severe. >3.0mm critical.
  let crackScore = 0;
  if (numCrack <= 0.2) crackScore = (numCrack / 0.2) * 20;
  else if (numCrack <= 1.0) crackScore = 20 + ((numCrack - 0.2) / 0.8) * 35;
  else if (numCrack <= 3.0) crackScore = 55 + ((numCrack - 1.0) / 2.0) * 30;
  else crackScore = Math.min(100, 85 + (numCrack - 3.0) * 5);

  // 2. Structural Deformation Sub-score (0 - 100)
  // Dependent on structure type
  let deformationScore = 0;
  const deflThresh = type === 'Bridge' ? 12 : type === 'Building' ? 8 : 15;
  if (numDeformation <= deflThresh * 0.25) deformationScore = (numDeformation / (deflThresh * 0.25)) * 25;
  else if (numDeformation <= deflThresh * 0.6) deformationScore = 25 + ((numDeformation - deflThresh * 0.25) / (deflThresh * 0.35)) * 35;
  else if (numDeformation <= deflThresh) deformationScore = 60 + ((numDeformation - deflThresh * 0.6) / (deflThresh * 0.4)) * 25;
  else deformationScore = Math.min(100, 85 + ((numDeformation - deflThresh) / deflThresh) * 40);

  // 3. Vibration Level Sub-score (0 - 100)
  // ISO 10816 vibration guidelines: < 2.5 mm/s normal, 2.5-5.0 alert, 5.0-8.0 severe, > 8.0 danger
  let vibrationScore = 0;
  if (numVibration <= 2.5) vibrationScore = (numVibration / 2.5) * 25;
  else if (numVibration <= 5.0) vibrationScore = 25 + ((numVibration - 2.5) / 2.5) * 35;
  else if (numVibration <= 8.0) vibrationScore = 60 + ((numVibration - 5.0) / 3.0) * 25;
  else vibrationScore = Math.min(100, 85 + (numVibration - 8.0) * 5);

  // 4. Age Factor Sub-score (0 - 100)
  // Design lifecycle typical 50-100 years
  let ageScore = 0;
  if (numAge <= 15) ageScore = (numAge / 15) * 20;
  else if (numAge <= 40) ageScore = 20 + ((numAge - 15) / 25) * 35;
  else if (numAge <= 70) ageScore = 55 + ((numAge - 40) / 30) * 30;
  else ageScore = Math.min(100, 85 + ((numAge - 70) / 30) * 15);

  // 5. Moisture Level Sub-score (0 - 100)
  // Rebar corrosion accelerates drastically above 60% relative moisture/permeability
  let moistureScore = 0;
  if (numMoisture <= 35) moistureScore = (numMoisture / 35) * 25;
  else if (numMoisture <= 60) moistureScore = 25 + ((numMoisture - 35) / 25) * 35;
  else if (numMoisture <= 80) moistureScore = 60 + ((numMoisture - 60) / 20) * 25;
  else moistureScore = Math.min(100, 85 + ((numMoisture - 80) / 20) * 15);

  // Weighted aggregation
  const weightedTotal = Math.round(
    crackScore * 0.30 +
    deformationScore * 0.25 +
    vibrationScore * 0.20 +
    ageScore * 0.15 +
    moistureScore * 0.10
  );

  const riskScore = Math.min(100, Math.max(0, weightedTotal));

  // Determine Category
  let riskCategory = 'Low Risk';
  let categoryColor = '#10b981'; // green
  let statusBadge = 'Healthy';
  let actionUrgency = 'Routine Monitoring';
  let recommendedAction = 'Maintain routine quarterly sensor calibration and schedule biennial visual inspection.';

  if (riskScore <= 25) {
    riskCategory = 'Low Risk';
    categoryColor = '#10b981'; // Green
    statusBadge = 'Healthy';
    actionUrgency = 'Routine Monitoring';
    recommendedAction = 'System operating well within permissible tolerance limits. Conduct regular scheduled maintenance every 6 months.';
  } else if (riskScore <= 50) {
    riskCategory = 'Moderate Risk';
    categoryColor = '#f59e0b'; // Yellow / Amber
    statusBadge = 'Moderate';
    actionUrgency = 'Preventative Maintenance';
    recommendedAction = 'Deploy targeted non-destructive testing (NDT), monitor micro-crack propagation bi-weekly, and seal surface hairline fractures.';
  } else if (riskScore <= 75) {
    riskCategory = 'High Risk';
    categoryColor = '#f97316'; // Orange
    statusBadge = 'High Risk';
    actionUrgency = 'Urgent Intervention';
    recommendedAction = 'Impose temporary vehicular/load restrictions, install continuous fiber-optic strain telemetry, and commence structural retrofitting within 30 days.';
  } else {
    riskCategory = 'Critical Risk';
    categoryColor = '#ef4444'; // Red
    statusBadge = 'Critical';
    actionUrgency = 'Immediate Safety Protocol';
    recommendedAction = 'EMERGENCY: Immediate closure or lane cordoning required. Conduct emergency evacuation/re-routing and deploy structural stabilization team.';
  }

  // Contributing factor details
  const contributingFactors = [
    {
      factor: 'Crack Width & Propagation',
      value: `${numCrack.toFixed(2)} mm`,
      impact: Math.round(crackScore * 0.30),
      rawScore: Math.round(crackScore),
      weight: '30%',
      status: crackScore > 65 ? 'Critical' : crackScore > 40 ? 'Moderate' : 'Normal',
      threshold: '< 0.3 mm (Safe limit)'
    },
    {
      factor: 'Structural Deformation / Sag',
      value: `${numDeformation.toFixed(1)} mm`,
      impact: Math.round(deformationScore * 0.25),
      rawScore: Math.round(deformationScore),
      weight: '25%',
      status: deformationScore > 65 ? 'Critical' : deformationScore > 40 ? 'Moderate' : 'Normal',
      threshold: `< ${deflThresh * 0.5} mm (Span tolerance)`
    },
    {
      factor: 'Dynamic Vibration Amplitude',
      value: `${numVibration.toFixed(2)} mm/s`,
      impact: Math.round(vibrationScore * 0.20),
      rawScore: Math.round(vibrationScore),
      weight: '20%',
      status: vibrationScore > 65 ? 'Critical' : vibrationScore > 40 ? 'Moderate' : 'Normal',
      threshold: '< 4.5 mm/s (Velocity limit)'
    },
    {
      factor: 'Asset Age & Fatigue Lifecycle',
      value: `${numAge} years`,
      impact: Math.round(ageScore * 0.15),
      rawScore: Math.round(ageScore),
      weight: '15%',
      status: ageScore > 65 ? 'Critical' : ageScore > 40 ? 'Moderate' : 'Normal',
      threshold: 'Target design life: 75 yrs'
    },
    {
      factor: 'Moisture Permeation & Corrosion Potential',
      value: `${numMoisture}%`,
      impact: Math.round(moistureScore * 0.10),
      rawScore: Math.round(moistureScore),
      weight: '10%',
      status: moistureScore > 65 ? 'Critical' : moistureScore > 40 ? 'Moderate' : 'Normal',
      threshold: '< 50% relative humidity'
    }
  ];

  // Natural language explanation
  let explanation = '';
  if (riskScore <= 25) {
    explanation = `The asset exhibits sound structural integrity. Dynamic vibration (${numVibration} mm/s) and crack measurements (${numCrack} mm) are well within safety boundaries. Structural deflection is negligible.`;
  } else if (riskScore <= 50) {
    explanation = `Noticeable early-stage wear detected. Contributing stresses are observed in ${numCrack > 0.8 ? 'crack broadening' : numMoisture > 55 ? 'elevated moisture absorption' : 'cumulative dynamic vibration'}. Preventative maintenance will prevent exponential structural degradation.`;
  } else if (riskScore <= 75) {
    explanation = `Substantial degradation identified. Combination of structural deformation (${numDeformation} mm) and crack indicators (${numCrack} mm) suggests structural load-bearing capacity is compromised. Structural retrofit required.`;
  } else {
    explanation = `CRITICAL ANOMALY DETECTED. Severe convergence of deformation (${numDeformation} mm), high vibration (${numVibration} mm/s), and active fissure expansion (${numCrack} mm). High probability of structural fatigue failure if unaddressed.`;
  }

  return {
    riskScore,
    healthScore: 100 - riskScore,
    riskCategory,
    categoryColor,
    statusBadge,
    actionUrgency,
    recommendedAction,
    explanation,
    contributingFactors,
    subScores: {
      crack: Math.round(crackScore),
      deformation: Math.round(deformationScore),
      vibration: Math.round(vibrationScore),
      age: Math.round(ageScore),
      moisture: Math.round(moistureScore)
    }
  };
}
