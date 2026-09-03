const address = Object.freeze({
  streetAddress: 'Av. Pref. Severino Bezerra Cabral, 1225',
  addressLocality: 'Campina Grande',
  addressRegion: 'PB',
  postalCode: '58410-640',
  addressCountry: 'BR'
});

const formattedAddress = `${address.streetAddress} - Mirante, ${address.addressLocality} - ${address.addressRegion}, ${address.postalCode}`;
const mapsUrl = 'https://maps.app.goo.gl/kFo46599pMn1WoeLA';
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=-7.2342674,-35.868982';
const wazeUrl = 'https://waze.com/ul?ll=-7.2342674,-35.868982&navigate=yes';
const mapEmbedUrl = 'https://maps.google.com/maps?q=-7.2342674,-35.868982&t=&z=16&ie=UTF8&iwloc=&output=embed';

const geo = Object.freeze({
  '@type': 'GeoCoordinates',
  latitude: -7.2342674,
  longitude: -35.868982
});

module.exports = Object.freeze({
  name: 'Klyfe Electric | Engenharia & Energia',
  legalName: '44.390.273 JAMERSON RICARDO DE SOUZA RUFINO',
  taxId: '44.390.273/0001-65',
  url: 'https://www.klyfeelectric.com.br',
  telephone: '+5583991330972',
  displayPhone: '(83) 99133-0972',
  email: 'contato@klyfeelectric.com.br',
  address,
  neighborhood: 'Mirante',
  formattedAddress,
  mapsUrl,
  directionsUrl,
  wazeUrl,
  mapEmbedUrl,
  geo,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00'
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/klyfeelectric',
    'https://www.instagram.com/klyfeelectric'
  ]
});
