// RetailChecks Integration - Simple Non-Module Version
// For browsers that don't support ES6 modules or have CORS issues

(function() {
    'use strict';
    
    // Retail configuration
    const RETAIL_CONFIG = {
        meshNode: "US_RETAIL_FASHION_HM_UNIQLO",
        supportedBrands: ["H&M", "Uniqlo", "Zara", "Forever 21"],
        features: ['liveness', 'selfie', 'quick_turnaround'],
        ui: {
            colorPalette: {
                primary: "#000000",
                secondary: "#FFFFFF",
                accent: "#E50010",
                functional: "#0066B3",
                neutral: "#F5F5F5"
            }
        }
    };
    
    // Main retail verification function
    window.triggerRetailVerification = function(employee) {
        console.log('=== RetailChecks Verification Triggered ===');
        console.log('Employee:', employee);
        
        // Create retail session
        const retailSession = {
            vendorData: RETAIL_CONFIG.meshNode,
            features: RETAIL_CONFIG.features,
            person: { firstName: employee.name, lastName: employee.surname },
            ui: RETAIL_CONFIG.ui
        };
        
        console.log('Onboarding via Retail Mesh Node...', retailSession);
        
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = {
                    success: true,
                    message: 'Retail verification successful (demo mode)',
                    retailSession: retailSession,
                    verification: {
                        id: `retail_${Date.now()}`,
                        status: 'verified',
                        timestamp: new Date().toISOString()
                    },
                    demoMode: true,
                    timestamp: new Date().toISOString()
                };
                
                console.log('Verification result:', result);
                resolve(result);
            }, 1000);
        });
    };
    
    // Initialize
    console.log('RetailChecks integration (simple) loaded');
    console.log('Configuration:', RETAIL_CONFIG);
    
    // Make configuration available
    window.RetailChecks = {
        config: RETAIL_CONFIG,
        triggerRetailVerification: window.triggerRetailVerification,
        version: '1.0.0-simple'
    };
})();