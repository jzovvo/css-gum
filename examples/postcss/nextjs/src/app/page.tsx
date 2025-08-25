export default function Home() {
  return (
    <div>
      <div
        className="relative bg-stone-700">
        <div
          className="
              absolute top-0 left-[vwc2(-15)]
              bg-orange-500 w-[vwc2(30)] h-[vwc2(30)]
              min-p2:left-[vwe2(-15)]
              max-p1:left-[vwe1(-15)] max-p1:w-[vwc1(30)] max-p1:h-[vwc1(30)]
              max-p0:left-[vwc1(-15)]
            "></div>
        <div
          className="
              w-[vwc2(1440)] mx-auto bg-black text-white
              text-[length:vwc2(100)]
              max-p1:w-[vwc1(375)] max-p1:text-[length:vwc1(50)]
            ">CLAMP+EXTEND</div>
      </div>
      <div
        className="relative bg-stone-700">
        <div
          className="
              absolute top-0 left-[vwc2(-15)]
              bg-orange-500 w-[vwc2(30)] h-[vwc2(30)]
              max-p1:left-[vwc1(-15)] max-p1:w-[vwc1(30)] max-p1:h-[vwc1(30)]
            "></div>
        <div
          className="
              w-[vwc2(1440)] mx-auto bg-black text-white
              text-[length:vwc2(100)]
              max-p1:w-[vwc1(375)] max-p1:text-[length:vwc1(50)]
            ">CLAMP</div>
      </div>
      <div
        className="relative">
        <div
          className="
              absolute top-0 left-[vw2(-15)]
              bg-orange-500 w-[vw2(30)] h-[vw2(30)]
              max-p1:left-[vw1(-15)] max-p1:w-[vw1(30)] max-p1:h-[vw1(30)]
          "></div>
        <div
          className="
              w-[vw2(1440)] mx-auto bg-black
              text-[length:vw2(100)] text-white
              max-p1:text-[length:vw1(50)]
            ">SCALE</div>
      </div>

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
