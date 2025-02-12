import { renderBellIcon } from "./BellIcon";

export function renderNotificationsBadge(total: number) {
  return /* HTML */ `<div class="notifications-badge">
    <div class="notifications-badge__content">
      <div class="notifications-badge__icon">
        ${renderBellIcon()}
        <div class="notifications-badge__icon__number">${total}</div>
      </div>
      <div class="notifications-badge__text">
        ${total ? "New documents added" : "Notifications"}
      </div>
    </div>
  </div>`;
}
