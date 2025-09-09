export default function Home() {
  return (
    <div>
      {/* TAILWIND EXAMPLE */}
      <div
        className="relative bg-stone-700">
        <div
          className="
            absolute top-0 left-[vwc1(-15)]
            bg-orange-500 w-[vwc1(30)] h-[vwc1(30)]
            min-p2:left-[vwe1(-15)]
            max-p1:left-[vwe0(-15)] max-p1:w-[vwc0(30)] max-p1:h-[vwc0(30)]
            max-p0:left-[vwc0(-15)]
          "></div>
        <div
          className="
            w-[vwc1(1440)] mx-auto bg-black text-white
            text-[length:vwc1(100)]
            max-p1:w-[vwc0(375)] max-p1:text-[length:vwc0(50)]
          ">CLAMP+EXTEND</div>
      </div>
      <div
        className="relative bg-stone-700">
        <div
          className="
            absolute top-0 left-[vwc1(-15)]
            bg-orange-500 w-[vwc1(30)] h-[vwc1(30)]
            max-p1:left-[vwc0(-15)] max-p1:w-[vwc0(30)] max-p1:h-[vwc0(30)]
          "></div>
        <div
          className="
            w-[vwc1(1440)] mx-auto bg-black text-white
            text-[length:vwc1(100)]
            max-p1:w-[vwc0(375)] max-p1:text-[length:vwc0(50)]
          ">CLAMP</div>
      </div>
      <div
        className="relative">
        <div
          className="
            absolute top-0 left-[vw1(-15)]
            bg-orange-500 w-[vw1(30)] h-[vw1(30)]
            max-p1:left-[vw0(-15)] max-p1:w-[vw0(30)] max-p1:h-[vw0(30)]
        "></div>
        <div
          className="
            w-[vw1(1440)] mx-auto bg-black
            text-[length:vw1(100)] text-white
            max-p1:text-[length:vw0(50)]
          ">SCALE</div>
      </div>

      {/* NORMAL CSS EXAMPLE */}
      <div className="clampExtend">
        <div className="oBox"></div>
        <div className="oTxt">CLAMP+EXTEND</div>
      </div>
      <div className="clamp">
        <div className="oBox"></div>
        <div className="oTxt">CLAMP</div>
      </div>
      <div className="scale">
        <div className="oBox"></div>
        <div className="oTxt">SCALE</div>
      </div>
    </div>
  )
}
