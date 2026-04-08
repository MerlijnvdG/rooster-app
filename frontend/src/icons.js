import { html, svg } from 'lit';

export const AppLogo = (size = 36) => html`<svg
  width="${size}" height="${size}" viewBox="0 0 100 100"
  aria-hidden="true" style="display:inline-block;vertical-align:middle;flex-shrink:0">
  ${svg`
    <g transform="scale(0.1953125)"><rect width="512" height="512" rx="112" fill="#1F5F5B"/> <g fill="none" stroke="#fff" stroke-opacity="0.28" stroke-width="6"> <path d="M128 112v288M224 112v288M320 112v288M416 112v288"/> </g> <rect x="96" y="142" width="232" height="58" rx="10" fill="#fff"/> <rect x="176" y="227" width="240" height="58" rx="10" fill="#FCE68A"/> <rect x="128" y="312" width="176" height="58" rx="10" fill="#fff"/></g>
  `}
</svg>`;

const i = (size, children) => html`<svg
  width="${size}" height="${size}" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"
  style="display:inline-block;vertical-align:middle;flex-shrink:0"
>${children}</svg>`;

export const CalendarIcon   = (s=18) => i(s, svg`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`);
export const UsersIcon      = (s=18) => i(s, svg`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`);
export const ChartIcon      = (s=18) => i(s, svg`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>`);
export const UserIcon       = (s=18) => i(s, svg`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`);
export const SearchIcon     = (s=18) => i(s, svg`<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`);
export const PlusIcon       = (s=18) => i(s, svg`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`);
export const EditIcon       = (s=18) => i(s, svg`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`);
export const TrashIcon      = (s=18) => i(s, svg`<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`);
export const ChevronLeft    = (s=18) => i(s, svg`<polyline points="15 18 9 12 15 6"/>`);
export const ChevronRight   = (s=18) => i(s, svg`<polyline points="9 18 15 12 9 6"/>`);
export const ChevronDown    = (s=18) => i(s, svg`<polyline points="6 9 12 15 18 9"/>`);
export const MapPinIcon     = (s=18) => i(s, svg`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`);
export const LockIcon       = (s=18) => i(s, svg`<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`);
export const EyeIcon        = (s=18) => i(s, svg`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`);
export const EyeOffIcon     = (s=18) => i(s, svg`<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`);
export const CheckIcon      = (s=18) => i(s, svg`<polyline points="20 6 9 17 4 12"/>`);
export const AlertIcon      = (s=18) => i(s, svg`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`);
export const LogOutIcon     = (s=18) => i(s, svg`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`);
export const HomeIcon       = (s=18) => i(s, svg`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`);
export const ClockIcon      = (s=18) => i(s, svg`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`);
export const XIcon          = (s=18) => i(s, svg`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`);
export const ArrowRightIcon = (s=18) => i(s, svg`<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`);
export const ShieldIcon     = (s=18) => i(s, svg`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`);
export const KeyIcon        = (s=18) => i(s, svg`<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>`);
export const InfoIcon       = (s=18) => i(s, svg`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`);
export const BuildingIcon   = (s=18) => i(s, svg`<rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>`);
export const TagIcon        = (s=18) => i(s, svg`<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`);
export const UmbrellaIcon   = (s=18) => i(s, svg`<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/>`);
export const BellIcon       = (s=18) => i(s, svg`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`);
export const InboxIcon      = (s=18) => i(s, svg`<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>`);
