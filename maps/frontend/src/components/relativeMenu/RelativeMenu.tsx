import RelativeMenuAll from "../relativeMenuAll/RelativeMenuAll";
import RelativeMenuMosad from "../relativeMenuMosad/RelativeMenuMosad";
import RelativeMenuTransfer from "../relativeMenuTranfer/RelativeMenuTrasfer";

export default function RelativeMenu({ typeMenu }: { typeMenu: number }) {
  if (typeMenu === 0) {
    return <RelativeMenuAll />
  }
  if (typeMenu === 1) {
    return <RelativeMenuMosad />
  }
  if (typeMenu === 2) {
    return <RelativeMenuTransfer />
  }
}