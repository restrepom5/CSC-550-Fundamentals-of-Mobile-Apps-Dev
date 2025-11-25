// 1. Interface (The Contract) for Health Resource Data
export interface Disease {
  id: number;
  disease: string;
  remedy: string;
  symptoms: string;
  // Added a key for the detail screen content
  explanation: string; 
}

// 2. The Central Array (The Single Source of Truth)
export const healthProblems: Disease[] = [
  { 
    id: 104, 
    disease: 'Flu', 
    remedy: 'Home rest', 
    symptoms: 'fever, runny nose, discomfort', 
    explanation: 'Influenza is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness, and at times can lead to death. The best way to prevent the flu is by getting a flu vaccine each year.',
  },
  { 
    id: 105, 
    disease: 'COVID-19', 
    remedy: 'Home rest', 
    symptoms: 'fever, runny nose, discomfort, loss of taste and smell', 
    explanation: 'COVID-19 is an infectious disease caused by the SARS-CoV-2 virus. Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment.',
  },
  { 
    id: 106, 
    disease: 'Cancer', 
    remedy: 'Chemotherapy', 
    symptoms: 'weight loss, fever, fatigue', 
    explanation: 'Cancer is a disease in which some of the body’s cells grow uncontrollably and spread to other parts of the body. Treatment often involves chemotherapy, radiation, and/or surgery.',
  },
  { 
    id: 107, 
    disease: 'Urinary Tract Infection', 
    remedy: 'Antibiotics', 
    symptoms: 'burning on urination, urinating frequently, back pain', 
    explanation: 'A UTI is an infection in any part of the urinary system. Infections are common in the bladder (cystitis) and kidneys (pyelonephritis). Antibiotics are the standard treatment.',
  },
  { 
    id: 108, 
    disease: 'Strep Throat', 
    remedy: 'Antibiotics', 
    symptoms: 'sore throat, fever, red and swollen tonsils', 
    explanation: 'Strep throat is a bacterial infection that can make your throat feel sore and scratchy. If left untreated, it can sometimes lead to rheumatic fever. It is most common in children.',
  },
];