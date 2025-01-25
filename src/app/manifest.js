export default function manifest() {
  return {
    name: 'One Map Africa',
    short_name: 'OMA',
    description: 'One Map Africa is a dedicated NGO leveraging innovative mapping and GIS solutions to address pressing challenges across Africa. We empower communities, support sustainable development, and drive impactful decision-making through real-time data and geographic insights. Join us in creating a brighter future for the continent.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}