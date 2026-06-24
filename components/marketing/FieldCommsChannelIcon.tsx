type FieldCommsChannelIconProps = {
  channelId: string;
  size?: number;
  className?: string;
};

/** Brand-circle icons for dark Field Comms pills — not tiny favicons. */
export default function FieldCommsChannelIcon({
  channelId,
  size = 24,
  className = '',
}: FieldCommsChannelIconProps) {
  const iconSize = Math.round(size * 0.52);

  const shell = `inline-flex shrink-0 items-center justify-center rounded-full ${className}`;

  switch (channelId) {
    case 'imessage':
      return (
        <span
          className={`${shell} bg-gradient-to-b from-[#5de374] to-[#2ecc55] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]`}
          style={{ width: size, height: size }}
          aria-hidden
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.55 1.28 4.82 3.28 6.3-.14.98-.52 2.37-1.12 3.43 0 0 2.2-.45 3.65-1.35 1.35.37 2.78.57 4.19.57 4.97 0 9-3.58 9-8.07C22 6.58 17.97 3 13 3h-1Z"
              fill="white"
            />
          </svg>
        </span>
      );

    case 'telegram':
      return (
        <span
          className={`${shell} bg-[#2AABEE] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]`}
          style={{ width: size, height: size }}
          aria-hidden
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <path
              d="M5.5 11.8 18.2 6.5c.7-.3 1.3.2 1.1.9l-2 9.4c-.2.7-.8.9-1.3.6l-3.6-2.7-1.7 1.6c-.2.2-.4.2-.6 0l.2-2.9 6.7-6.1c.3-.3-.1-.4-.4-.2L8.6 13.8l-3.5-1.1c-.8-.2-.8-.8.4-1.2Z"
              fill="white"
            />
          </svg>
        </span>
      );

    case 'whatsapp':
      return (
        <span
          className={`${shell} bg-[#25D366] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]`}
          style={{ width: size, height: size }}
          aria-hidden
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.9-1.1A8.5 8.5 0 1 0 12 3Zm0 15.4a6.9 6.9 0 0 1-3.5-.95l-.25-.15-2.9.66.62-2.82-.16-.27A6.9 6.9 0 1 1 12 18.4Zm3.9-5.1c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.2-.5 0-.2-.1-.9-.3-1.7-1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.2 0-.3 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.3 0-.4.2-.1.2-.6.6-.6 1.5 0 .9.7 1.8.8 1.9.1.1 1.4 2.1 3.3 2.9.5.2.8.3 1.1.4.5.2.9.2 1.2.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1 0-.1-.2-.1-.4-.2Z"
              fill="white"
            />
          </svg>
        </span>
      );

    case 'email':
      return (
        <span
          className={`${shell} bg-gradient-to-br from-[#fbbc04] via-[#ea4335] to-[#4285f4] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]`}
          style={{ width: size, height: size }}
          aria-hidden
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
              fill="white"
              fillOpacity="0.95"
            />
            <path d="m5.5 8 6.5 4.5L18.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      );

    default:
      return (
        <span
          className={`${shell} bg-white/15 text-[10px] font-bold text-white/70`}
          style={{ width: size, height: size }}
          aria-hidden
        >
          {channelId.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}
