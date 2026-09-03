const test = require('node:test');
const assert = require('node:assert/strict');
const business = require('../config/business');
const locations = require('../config/locations');

test('mantém o endereço canônico da sede em todas as configurações locais', () => {
  assert.equal(business.name, 'Klyfe Electric | Engenharia & Energia');
  assert.equal(business.address.streetAddress, 'Av. Pref. Severino Bezerra Cabral, 1225');
  assert.equal(business.address.addressLocality, 'Campina Grande');
  assert.equal(business.address.postalCode, '58410-640');
  assert.equal(business.taxId, '44.390.273/0001-65');
  assert.equal(business.legalName, '44.390.273 JAMERSON RICARDO DE SOUZA RUFINO');
  assert.deepEqual(business.geo, {
    '@type': 'GeoCoordinates',
    latitude: -7.2342674,
    longitude: -35.868982
  });
  assert.equal(business.mapsUrl, 'https://maps.app.goo.gl/kFo46599pMn1WoeLA');
  assert.equal(business.directionsUrl, 'https://www.google.com/maps/dir/?api=1&destination=-7.2342674,-35.868982');
  assert.equal(business.wazeUrl, 'https://waze.com/ul?ll=-7.2342674,-35.868982&navigate=yes');
  assert.equal(business.mapEmbedUrl, 'https://maps.google.com/maps?q=-7.2342674,-35.868982&t=&z=16&ie=UTF8&iwloc=&output=embed');

  for (const location of Object.values(locations)) {
    assert.equal(location.address, business.formattedAddress);
  }
});
