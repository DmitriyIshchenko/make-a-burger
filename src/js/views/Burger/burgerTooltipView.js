import imgPng from '../../../img/emojis/emoji-shocked.png';
import imgWebp from '../../../img/emojis/emoji-shocked.webp';
import TooltipView from '../UI/tooltipView';
import { CALORIES_LIMIT_POPUP } from '../../config';

class BurgerTooltipView extends TooltipView {
  _parentElement = document.querySelector('.burger__tooltip ');

  _tooltipMessage = 'Are you sure?';

  _tooltipPngImg = imgPng;

  _tooltipWebpImg = imgWebp;

  update(data) {
    if (data.calories >= CALORIES_LIMIT_POPUP) this._showTooltip();
    else this._hideTooltip();
  }
}

export default new BurgerTooltipView();
