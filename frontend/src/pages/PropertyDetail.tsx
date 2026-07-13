import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function PropertyDetail() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const [propertyData, setPropertyData] = useState<any>(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('13:00')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`)
      .then(res => res.json())
      .then(data => setPropertyData(data))
      .catch(err => console.error(err))
  }, [id])

  const handleBook = async () => {
    if (!user) return alert("Silakan login terlebih dahulu.")
    if (user.role !== 'tenant') return alert("Hanya penyewa yang dapat memesan survei.")
    
    try {
      const datetime = `${bookingDate}T${bookingTime}:00`
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        },
        body: JSON.stringify({
          property_id: id,
          requested_datetime: new Date(datetime).toISOString()
        })
      })
      if (!res.ok) throw new Error("Gagal membuat jadwal")
      alert("Jadwal survei berhasil diajukan!")
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (!propertyData) return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg pt-3xl pb-3xl mt-xl flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-md text-on-surface-variant">
        <span className="material-symbols-outlined text-[48px] animate-pulse text-trust-navy">hourglass_top</span>
        <p className="font-body-md text-body-md">Memuat detail properti...</p>
      </div>
    </div>
  )

  const { property } = propertyData

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-lg pt-3xl pb-3xl mt-xl">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-sm text-on-surface-variant font-body-sm text-body-sm mb-lg">
        <Link className="hover:text-trust-navy transition-colors" to="/">Home</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link className="hover:text-trust-navy transition-colors" to="/search">Pencarian</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">{property.Title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-8 flex flex-col gap-xl">
          {/* Hero Gallery */}
          <div className="relative bg-surface rounded-xl overflow-hidden border border-border-subtle shadow-sm group">
            <div className="w-full h-[400px] md:h-[500px] bg-surface-gray flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-outline">image</span>
            </div>
            <div className="absolute top-lg right-lg flex gap-sm">
              <span className={`text-on-primary px-sm py-xs rounded flex items-center gap-xs font-label-caps text-label-caps uppercase shadow-sm ${
                property.LegalityStatus === 'verified' 
                  ? 'bg-success-teal' 
                  : 'bg-action-amber text-trust-navy'
              }`}>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {property.LegalityStatus === 'verified' ? 'verified' : 'pending_actions'}
                </span>
                {property.LegalityStatus === 'verified' ? 'Verified' : 'In-Review'}
              </span>
            </div>
            <div className="absolute bottom-lg right-lg flex gap-md">
              <button className="bg-surface/90 backdrop-blur border border-border-subtle text-trust-navy px-md py-sm rounded flex items-center gap-sm hover:bg-surface transition-colors font-body-md text-body-md shadow-sm">
                <span className="material-symbols-outlined">imagesmode</span> Gallery
              </button>
              <button className="bg-action-amber text-trust-navy px-md py-sm rounded flex items-center gap-sm hover:opacity-90 transition-opacity font-body-md text-body-md font-bold shadow-sm">
                <span className="material-symbols-outlined">360</span> 360° View
              </button>
            </div>
          </div>

          {/* Header Info */}
          <div className="flex flex-col gap-sm">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">{property.Title}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">location_on</span> {property.Address}
            </p>
          </div>

          {/* Technical Specs (Bento Style) */}
          <div className="bg-surface rounded-xl border border-border-subtle p-lg shadow-sm">
            <h2 className="font-title-md text-title-md text-on-surface mb-md border-b border-border-subtle pb-sm">Technical Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div className="flex flex-col gap-xs p-md bg-surface-gray rounded border border-border-subtle">
                <span className="material-symbols-outlined text-trust-navy text-[24px]">electric_bolt</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Electricity</span>
                <span className="font-technical-data text-technical-data text-on-surface">{property.ElectricityPowerWatt} Watt</span>
              </div>
              <div className="flex flex-col gap-xs p-md bg-surface-gray rounded border border-border-subtle">
                <span className="material-symbols-outlined text-trust-navy text-[24px]">water_drop</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Water Supply</span>
                <span className="font-technical-data text-technical-data text-on-surface">{property.WaterSource || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-xs p-md bg-surface-gray rounded border border-border-subtle">
                <span className="material-symbols-outlined text-trust-navy text-[24px]">domain</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Zoning</span>
                <span className="font-technical-data text-technical-data text-on-surface">{property.ZoningType || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-xs p-md bg-surface-gray rounded border border-border-subtle">
                <span className="material-symbols-outlined text-trust-navy text-[24px]">local_parking</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Parking</span>
                <span className="font-technical-data text-technical-data text-on-surface">{property.ParkingSpaces || 0} Cars</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface rounded-xl border border-border-subtle p-lg shadow-sm">
            <h2 className="font-title-md text-title-md text-on-surface mb-md">Description</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {property.Description || 'Belum ada deskripsi untuk properti ini.'}
            </p>
          </div>

          {/* Area Info */}
          <div className="bg-surface rounded-xl border border-border-subtle p-lg shadow-sm">
            <h2 className="font-title-md text-title-md text-on-surface mb-md">Property Details</h2>
            <div className="grid grid-cols-2 gap-md">
              <div className="flex items-center gap-md p-sm">
                <span className="material-symbols-outlined text-trust-navy">straighten</span>
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">Area</span>
                  <span className="font-technical-data text-technical-data text-on-surface">{property.AreaSqm} sqm</span>
                </div>
              </div>
              <div className="flex items-center gap-md p-sm">
                <span className="material-symbols-outlined text-trust-navy">gavel</span>
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block">Legality</span>
                  <span className="font-technical-data text-technical-data text-on-surface">{property.LegalityStatus?.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Booking Widget */}
        <div className="lg:col-span-4 flex flex-col gap-xl">
          <div className="sticky top-[100px] flex flex-col gap-lg">
            {/* Pricing & Primary CTA Card */}
            <div className="bg-surface rounded-xl border border-border-subtle p-lg shadow-sm flex flex-col gap-md">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-xs">Lease Rate</span>
                <div className="font-display-lg text-display-lg text-trust-navy">
                  Rp {property.PricePerMonth?.toLocaleString()}
                  <span className="font-body-md text-body-md text-on-surface-variant">/bln</span>
                </div>
              </div>
              <div className="flex items-center gap-sm bg-surface-gray p-sm rounded border border-border-subtle">
                <span className="material-symbols-outlined text-success-teal">shield</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Secure Escrow Payment Available</span>
              </div>
              <button className="w-full bg-trust-navy text-on-primary py-md rounded font-body-md text-body-md font-bold hover:opacity-90 transition-opacity flex justify-center items-center gap-sm">
                Sewa Sekarang
              </button>
            </div>

            {/* Booking Widget */}
            <div className="bg-surface rounded-xl border border-border-subtle p-lg shadow-sm flex flex-col gap-md">
              <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-trust-navy">event_available</span> Jadwalkan Survei
              </h3>
              <div className="flex flex-col gap-sm">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Pilih Tanggal</label>
                <input
                  className="w-full border border-border-subtle rounded px-md py-sm font-body-md text-body-md text-on-surface focus:ring-trust-navy focus:border-trust-navy bg-surface-gray"
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-sm">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Pilih Waktu</label>
                <div className="grid grid-cols-3 gap-sm">
                  {['10:00', '13:00', '15:00'].map(time => (
                    <button
                      key={time}
                      onClick={() => setBookingTime(time)}
                      className={`border rounded py-xs text-center font-body-sm text-body-sm transition-colors ${
                        bookingTime === time
                          ? 'border-trust-navy bg-surface-container-low text-trust-navy font-bold'
                          : 'border-border-subtle text-on-surface hover:border-trust-navy hover:text-trust-navy bg-surface-gray'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleBook}
                className="w-full bg-surface text-trust-navy border border-trust-navy py-sm rounded font-body-md text-body-md font-bold hover:bg-surface-container-low transition-colors mt-sm"
              >
                Book Slot
              </button>
              {!user && (
                <p className="text-xs text-center text-on-surface-variant">
                  Harap <Link to="/login" className="text-trust-navy underline font-semibold">login</Link> terlebih dahulu
                </p>
              )}
            </div>

            {/* QR Code Section */}
            <div className="bg-inverse-surface rounded-xl p-lg shadow-sm flex items-center gap-md relative overflow-hidden group cursor-pointer hover:bg-on-surface transition-colors">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-trust-navy opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="bg-surface p-sm rounded shrink-0 z-10 border border-outline">
                <img
                  src={`${import.meta.env.VITE_API_URL}/properties/${id}/qrcode`}
                  alt="QR Code"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="z-10">
                <h4 className="font-title-md text-title-md text-inverse-on-surface mb-xs">On-Site Scanner</h4>
                <p className="font-body-sm text-body-sm text-outline-variant">Scan di lokasi untuk info instan & akses properti.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
