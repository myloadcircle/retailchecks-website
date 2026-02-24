// RetailChecks Configuration - US Retail Biometric Identity
// Configuration for US retail employee verification system
// SECURITY: All credentials must be provided via environment variables

// Retail-specific configuration - Blend of H&M and Uniqlo aesthetics
const RETAIL_CONFIG = {
    // Retail mesh node configuration
    meshNode: "US_RETAIL_FASHION_HM_UNIQLO",
    
    // Retail brands this configuration supports
    supportedBrands: ["H&M", "Uniqlo", "Zara", "Forever 21"],
    
    // Retail-specific features (high turnover, quick selfie-based verification)
    features: ['liveness', 'selfie', 'quick_turnaround'],
    
    // Retail UI styling (blend of H&M minimalism and Uniqlo simplicity)
    ui: {
        // H&M: Minimal black/white with red accents
        // Uniqlo: Clean, functional, blue accents
        colorPalette: {
            primary: "#000000",           // H&M black
            secondary: "#FFFFFF",         // White background
            accent: "#E50010",           // H&M red
            functional: "#0066B3",       // Uniqlo blue
            neutral: "#F5F5F5"           // Light gray
        },
        typography: {
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: "400",
            fontSizeBase: "14px"
        },
        spacing: {
            compact: "8px",              // Uniqlo functional spacing
            standard: "16px",
            relaxed: "24px"
        },
        language: "en",
        theme: "fast-fashion-retail"
    },
    
    // Retail compliance requirements for fashion retail
    compliance: [
        "Fast Fashion Employee Verification",
        "High-Turnover Staff Management",
        "Multi-Brand Retail Compliance",
        "Quick Onboarding Protocol (Under 3 minutes)",
        "Seasonal Staff Verification"
    ],
    
    // Retail-specific document types (international staff common in fashion retail)
    documentTypes: ['ID_CARD', 'PASSPORT', 'DRIVERS_LICENSE', 'WORK_PERMIT'],
    
    // Retail verification thresholds (optimized for fashion retail high-turnover)
    verificationThresholds: {
        livenessConfidence: 0.82,        // Slightly lower for quick verification
        documentMatchConfidence: 0.78,   // Faster processing for seasonal staff
        quickVerificationTimeout: 180,   // 3 minutes for retail quick verification
        batchProcessing: true,           // Support for hiring events
        internationalDocuments: true     // Support for international staff documents
    },
    
    // Fashion retail specific settings
    retailSpecific: {
        seasonalHiring: true,
        storeTransferSupport: true,
        multiLocationVerification: true,
        shiftBasedAccess: true,
        uniformManagement: false          // Separate system
    }
};

// Configuration Validation for Retail
const validateRetailConfig = () => {
    const errors = [];
    const warnings = [];
    
    // Helper function to check for placeholder values
    const containsPlaceholder = (value) => {
        if (!value) return false;
        const placeholderPatterns = [
            'your-', 'test-placeholder-', 'placeholder', 'example', 'sample', 
            'changeme', 'insert-', 'replace-me', 'dummy-', 'mock-'
        ];
        const lowerValue = value.toLowerCase();
        return placeholderPatterns.some(pattern => lowerValue.includes(pattern));
    };
    
    // Helper function to validate URL format
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };
    
    // Retail Supabase validation (separate from construction)
    if (!process.env.RETAIL_SUPABASE_URL) {
        errors.push('RETAIL_SUPABASE_URL environment variable is required for RetailChecks');
    } else {
        if (!isValidUrl(process.env.RETAIL_SUPABASE_URL)) {
            errors.push('RETAIL_SUPABASE_URL must be a valid URL');
        }
        if (containsPlaceholder(process.env.RETAIL_SUPABASE_URL)) {
            warnings.push('RETAIL_SUPABASE_URL appears to contain placeholder values');
        }
    }
    
    if (!process.env.RETAIL_SUPABASE_ANON_KEY) {
        errors.push('RETAIL_SUPABASE_ANON_KEY environment variable is required for RetailChecks');
    } else if (containsPlaceholder(process.env.RETAIL_SUPABASE_ANON_KEY)) {
        warnings.push('RETAIL_SUPABASE_ANON_KEY appears to contain placeholder values');
    }
    
    // Retail Veriff API validation
    if (!process.env.RETAIL_VERIFF_API_KEY) {
        warnings.push('RETAIL_VERIFF_API_KEY not set - retail verification will use demo mode');
    } else if (containsPlaceholder(process.env.RETAIL_VERIFF_API_KEY)) {
        warnings.push('RETAIL_VERIFF_API_KEY appears to contain placeholder values');
    }
    
    // Retail-specific environment checks
    if (!process.env.RETAIL_MESH_NODE) {
        warnings.push('RETAIL_MESH_NODE not set, using default: US_RETAIL_FASHION');
    }
    
    return { errors, warnings };
};

// Get retail Supabase configuration
const getRetailSupabaseConfig = () => {
    return {
        url: process.env.RETAIL_SUPABASE_URL || 'https://placeholder-retail.supabase.co',
        anonKey: process.env.RETAIL_SUPABASE_ANON_KEY || 'placeholder-retail-anon-key',
        serviceRoleKey: process.env.RETAIL_SUPABASE_SERVICE_ROLE_KEY || null
    };
};

// Get retail Veriff configuration
const getRetailVeriffConfig = () => {
    return {
        apiKey: process.env.RETAIL_VERIFF_API_KEY || 'demo-retail-key',
        sessionUrl: process.env.RETAIL_VERIFF_SESSION_URL || 'https://api.veriff.com/v1/sessions',
        baseUrl: process.env.RETAIL_VERIFF_BASE_URL || 'https://api.veriff.com'
    };
};

// Retail-specific initialization
const initializeRetailVerification = () => {
    const validation = validateRetailConfig();
    
    if (validation.errors.length > 0) {
        console.error('RetailChecks Configuration Errors:', validation.errors);
        throw new Error(`RetailChecks configuration failed: ${validation.errors.join(', ')}`);
    }
    
    if (validation.warnings.length > 0) {
        console.warn('RetailChecks Configuration Warnings:', validation.warnings);
    }
    
    console.log('RetailChecks Configuration initialized:', {
        meshNode: RETAIL_CONFIG.meshNode,
        features: RETAIL_CONFIG.features,
        ui: RETAIL_CONFIG.ui
    });
    
    return {
        config: RETAIL_CONFIG,
        supabase: getRetailSupabaseConfig(),
        veriff: getRetailVeriffConfig(),
        validation
    };
};

// Export for use in retail verification modules
export {
    RETAIL_CONFIG,
    validateRetailConfig,
    getRetailSupabaseConfig,
    getRetailVeriffConfig,
    initializeRetailVerification
};