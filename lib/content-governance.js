const CATEGORY_TO_VERTICAL = {
    engenharia: 'engenharia',
    eletrica: 'eletrica',
    automacao: 'automacao',
    solar: 'solar'
};

function buildServiceContentRecord({ serviceKey, service, cityKey, cityData, canonical }) {
    const category = service.category || 'geral';
    return {
        id: `service:${serviceKey}:${cityKey}`,
        vertical: serviceKey === 'instalacoes-industriais'
            ? 'industrial'
            : (CATEGORY_TO_VERTICAL[category] || category),
        pageType: 'service',
        primaryIntent: service.primaryIntent || 'commercial-service',
        canonicalPath: canonical,
        parentId: `hub:${category}`,
        relatedIds: Array.isArray(service.relatedIds) ? service.relatedIds : [],
        serviceStatus: service.serviceStatus || 'declared',
        operationalScope: {
            includes: Array.isArray(service.whatsIncluded) ? service.whatsIncluded : [],
            exclusions: Array.isArray(service.exclusions) ? service.exclusions : [],
            conditions: Array.isArray(service.conditions) ? service.conditions : []
        },
        locations: [cityKey],
        sources: Array.isArray(service.sources) ? service.sources : [],
        reviewStatus: service.reviewStatus || 'needs-validation',
        claims: Array.isArray(service.claims) ? service.claims : [],
        cta: {
            objective: 'request-quote',
            service: service.label,
            location: cityData.name
        },
        indexable: true,
        homeEligible: false
    };
}

function validateContentRecord(record) {
    const errors = [];
    if (!record || typeof record !== 'object') return { valid: false, errors: ['record is required'] };
    ['id', 'vertical', 'pageType', 'primaryIntent', 'canonicalPath', 'reviewStatus'].forEach(field => {
        if (!record[field]) errors.push(`${field} is required`);
    });
    if (!Array.isArray(record.locations)) errors.push('locations must be an array');
    if (!Array.isArray(record.claims)) errors.push('claims must be an array');
    if (record.reviewStatus === 'needs-validation' && Array.isArray(record.claims) && record.claims.length > 0) {
        errors.push('claims require validation before publication');
    }
    if (!record.operationalScope || typeof record.operationalScope !== 'object') {
        errors.push('operationalScope is required');
    } else {
        ['includes', 'exclusions', 'conditions'].forEach(field => {
            if (!Array.isArray(record.operationalScope[field])) errors.push(`operationalScope.${field} must be an array`);
        });
    }
    if (!record.cta || typeof record.cta !== 'object' || !record.cta.objective || !record.cta.service) {
        errors.push('cta objective and service are required');
    }
    if (typeof record.indexable !== 'boolean') errors.push('indexable must be boolean');
    if (typeof record.homeEligible !== 'boolean') errors.push('homeEligible must be boolean');
    return { valid: errors.length === 0, errors };
}

module.exports = { CATEGORY_TO_VERTICAL, buildServiceContentRecord, validateContentRecord };
