import TooltipView from "./UI/tooltipView";
import imgPng from "url:../../img/emojis/emoji-shocked.png";
import imgWebp from "url:../../img/emojis/emoji-shocked.webp";
import { CALORIES_LIMIT_POPUP } from "../config";

class burgerTooltipView extends TooltipView {
  _parentElement = document.querySelector(".burger__tooltip ");
  _tooltipMessage = "Are you sure?";
  _tooltipPngImg = imgPng;
  _tooltipWebpImg = imgWebp;

  update(data) {
    data.calories >= CALORIES_LIMIT_POPUP
      ? this._showTooltip()
      : this._hideTooltip();
  }
}

export default new burgerTooltipView();
