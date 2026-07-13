import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Search() {
  const [properties, setProperties] = useState<any[]>([])
  const [bounds, setBounds] = useState({ min_lat: -90, max_lat: 90, min_lng: -180, max_lng: 180 })

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/properties?min_lat=${bounds.min_lat}&max_lat=${bounds.max_lat}&min_lng=${bounds.min_lng}&max_lng=${bounds.max_lng}`)
      const data = await res.json()
      setProperties(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [bounds])

  function MapEvents() {
    useMapEvents({
      moveend(e) {
        const b = e.target.getBounds()
        setBounds({
          min_lat: b.getSouth(),
          max_lat: b.getNorth(),
          min_lng: b.getWest(),
          max_lng: b.getEast(),
        })
      }
    })
    return null
  }

  return (
    <div className="pt-[80px] min-h-screen flex flex-col">
      {/* Search Header */}
      <div className="bg-surface border-b border-border-subtle px-margin-mobile md:px-lg py-md">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-sm items-center">
          <div className="flex-1 flex items-center bg-surface-gray rounded-lg px-md py-sm border border-border-subtle focus-within:border-trust-navy transition-colors">
            <span className="material-symbols-outlined text-outline mr-sm">search</span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline p-0"
              placeholder="Cari lokasi, tipe bisnis, atau nama ruko..."
              type="text"
            />
          </div>
          <div className="flex gap-sm">
            <button className="border border-border-subtle text-on-surface-variant px-md py-sm rounded-lg font-body-sm text-body-sm flex items-center gap-xs hover:border-trust-navy hover:text-trust-navy transition-colors">
              <span className="material-symbols-outlined text-[18px]">tune</span> Filter
            </button>
            <button className="border border-border-subtle text-on-surface-variant px-md py-sm rounded-lg font-body-sm text-body-sm flex items-center gap-xs hover:border-trust-navy hover:text-trust-navy transition-colors">
              <span className="material-symbols-outlined text-[18px]">sort</span> Sort
            </button>
          </div>
        </div>
      </div>

      {/* Split View: Map + Results */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Map */}
        <div className="w-full md:w-1/2 lg:w-2/3 h-[300px] md:h-[calc(100vh-140px)] relative z-0">
          <MapContainer center={[-6.2088, 106.8456]} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEvents />
            {properties.map(p => (
              <Marker key={p.ID} position={[p.Latitude, p.Longitude]}>
                <Popup>
                  <Link to={`/properties/${p.ID}`} className="font-bold text-trust-navy">{p.Title}</Link><br/>
                  Rp {p.PricePerMonth?.toLocaleString()} / bln
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Results List */}
        <div className="w-full md:w-1/2 lg:w-1/3 h-full overflow-y-auto border-l border-border-subtle bg-surface-gray">
          <div className="p-lg">
            <div className="flex justify-between items-center mb-lg">
              <h2 className="font-title-md text-title-md text-trust-navy">Hasil Pencarian</h2>
              <span className="font-label-caps text-label-caps text-on-surface-variant">{properties.length} RESULTS</span>
            </div>
            <div className="flex flex-col gap-md">
              {properties.map(p => (
                <Link
                  key={p.ID}
                  to={`/properties/${p.ID}`}
                  className="bg-surface-container-lowest border border-border-subtle rounded-xl overflow-hidden hover:shadow-[0px_10px_15px_-3px_rgba(15,76,129,0.1)] transition-shadow block"
                >
                  {/* Image placeholder */}
                  <div className="h-40 bg-surface-container-low flex items-center justify-center relative">
                    <span className="material-symbols-outlined text-[48px] text-outline">image</span>
                    <div className="absolute top-sm right-sm bg-success-teal text-on-primary px-sm py-xs rounded flex items-center gap-xs font-label-caps text-label-caps">
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      VERIFIED
                    </div>
                  </div>
                  <div className="p-md space-y-md">
                    <div>
                      <h3 className="font-title-md text-title-md text-trust-navy line-clamp-1">{p.Title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                        <span className="material-symbols-outlined text-[16px]">location_on</span> {p.Address}
                      </p>
                    </div>
                    {/* Technical Strip */}
                    <div className="flex gap-sm border-y border-border-subtle py-sm">
                      <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[14px] text-outline">straighten</span>
                        <span className="font-technical-data text-technical-data text-trust-navy">{p.AreaSqm || '—'} sqm</span>
                      </div>
                      <div className="bg-surface-gray px-sm py-xs rounded border border-border-subtle flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[14px] text-outline">bolt</span>
                        <span className="font-technical-data text-technical-data text-trust-navy">{p.ElectricityPowerWatt || '—'} W</span>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="flex justify-between items-center pt-xs">
                      <div className="font-title-md text-title-md text-trust-navy">
                        Rp {p.PricePerMonth?.toLocaleString()} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/bln</span>
                      </div>
                      <span className="border border-trust-navy text-trust-navy px-sm py-xs rounded font-body-sm font-semibold">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {properties.length === 0 && (
                <div className="flex flex-col items-center justify-center py-2xl text-center gap-md">
                  <span className="material-symbols-outlined text-[48px] text-outline">location_off</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Tidak ada ruko di area ini.</p>
                  <p className="font-body-sm text-body-sm text-outline">Coba geser peta atau ubah filter pencarian.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
