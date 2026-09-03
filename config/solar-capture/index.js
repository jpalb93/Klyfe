const segments = require('./segments');
const cities = require('./cities');

function getSegmentList() {
  return Object.values(segments).map(s => ({
    slug: s.slug,
    label: s.label,
    href: s.urlPath,
    title: s.title
  }));
}

function getCityList() {
  return Object.values(cities).map(c => ({
    slug: c.slug,
    name: c.name,
    stateAbbr: c.stateAbbr,
    href: c.urlPath,
    title: c.title,
    validationStatus: c.validationStatus,
    hqProximity: c.hqProximity
  }));
}

function resolveRelatedLink(key) {
  if (segments[key]) {
    return { label: segments[key].h1, href: segments[key].urlPath };
  }
  const segmentBySlug = Object.values(segments).find(s => s.slug === key);
  if (segmentBySlug) {
    return { label: segmentBySlug.h1, href: segmentBySlug.urlPath };
  }
  if (cities[key]) {
    return { label: `Energia Solar em ${cities[key].name}`, href: cities[key].urlPath };
  }
  const cityBySlug = Object.values(cities).find(c => c.slug === key);
  if (cityBySlug) {
    return { label: `Energia Solar em ${cityBySlug.name}`, href: cityBySlug.urlPath };
  }
  return null;
}

module.exports = {
  segments,
  cities,
  getSegmentList,
  getCityList,
  resolveRelatedLink
};
