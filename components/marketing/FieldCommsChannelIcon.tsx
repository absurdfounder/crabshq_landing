type FieldCommsChannelIconProps = {
  channelId: string;
  size?: number;
  className?: string;
};

/**
 * Crisp brand marks for Field Comms chips — inline SVG so we never ship
 * zoomed PNG crops (the Gmail asset was unusable at chip size).
 */
export default function FieldCommsChannelIcon({
  channelId,
  size = 22,
  className = '',
}: FieldCommsChannelIconProps) {
  const shell = `inline-flex shrink-0 items-center justify-center overflow-hidden ${className}`;
  const r = Math.round(size * 0.22);

  switch (channelId) {
    case 'imessage':
      return (
        <span
          className={shell}
          style={{
            width: size,
            height: size,
            borderRadius: r,
            background: 'linear-gradient(180deg, #5de374 0%, #20c45a 100%)',
          }}
          aria-hidden
        >
          <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3.2C7.2 3.2 3.3 6.7 3.3 11c0 2.4 1.2 4.5 3.1 5.9-.1.9-.5 2.2-1.1 3.2 0 0 2.1-.4 3.5-1.3 1.3.35 2.6.55 4.0.55 4.8 0 8.7-3.5 8.7-7.85C21.5 6.7 17.6 3.2 12.8 3.2H12Z"
              fill="#fff"
            />
          </svg>
        </span>
      );

    case 'whatsapp':
      return (
        <span
          className={shell}
          style={{ width: size, height: size, borderRadius: r, background: '#25D366' }}
          aria-hidden
        >
          <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
            <path
              fill="#fff"
              d="M12 2.2A9.8 9.8 0 0 0 3.7 16.9L2.4 21.6l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.6a7.8 7.8 0 0 1-4-.1l-.3-.1-2.9.8.8-2.9-.2-.3a7.8 7.8 0 1 1 6.6 2.6Zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.3-.4c.1-.1.1-.2.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5c-.1 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.2 1.5 2.4 3.7 3.3.5.2.9.4 1.2.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z"
            />
          </svg>
        </span>
      );

    case 'telegram':
      return (
        <span
          className={shell}
          style={{ width: size, height: size, borderRadius: r, background: '#2AABEE' }}
          aria-hidden
        >
          <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
            <path
              fill="#fff"
              d="M9.4 15.5 9.2 18.8c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.3.2 1.5-.7L20.9 6c.3-1.2-.4-1.7-1.2-1.4L4.2 10.3c-1.1.4-1.1 1.1-.2 1.4l4.1 1.3 9.5-6c.5-.3.9-.1.5.2l-7.7 7Z"
            />
          </svg>
        </span>
      );

    case 'email':
      // Official Gmail M — not the zoomed black-bg PNG.
      return (
        <span
          className={`${shell} bg-white ring-1 ring-black/10`}
          style={{ width: size, height: size, borderRadius: r }}
          aria-hidden
        >
          <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 24 24" fill="none">
            <path d="M2.5 5.5v13h4.2V11.4L12 15.6l5.3-4.2v7.1h4.2v-13L12 12.1 2.5 5.5Z" fill="#EA4335" />
            <path d="M2.5 5.5 12 12.1 6.7 8.3V5.5H2.5Z" fill="#C5221F" />
            <path d="M21.5 5.5H17.3v2.8L12 12.1l9.5-6.6Z" fill="#FBBC04" />
            <path d="M6.7 11.4V18.5H2.5v-13l4.2 2.9v3Z" fill="#4285F4" />
            <path d="M21.5 5.5v13h-4.2V11.4l4.2-2.9V5.5Z" fill="#34A853" />
          </svg>
        </span>
      );

    case 'slack':
      return (
        <span
          className={`${shell} bg-white ring-1 ring-black/10`}
          style={{ width: size, height: size, borderRadius: r }}
          aria-hidden
        >
          <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24" fill="none">
            <path d="M8.5 14.7a1.6 1.6 0 1 1-1.6-1.6h1.6v1.6Z" fill="#E01E5A" />
            <path d="M9.3 14.7a1.6 1.6 0 1 1 3.2 0v4a1.6 1.6 0 0 1-3.2 0v-4Z" fill="#E01E5A" />
            <path d="M9.3 8.5a1.6 1.6 0 1 1 1.6-1.6v1.6H9.3Z" fill="#36C5F0" />
            <path d="M9.3 9.3a1.6 1.6 0 1 1 0 3.2h-4a1.6 1.6 0 1 1 0-3.2h4Z" fill="#36C5F0" />
            <path d="M15.5 9.3a1.6 1.6 0 1 1 1.6 1.6h-1.6V9.3Z" fill="#2EB67D" />
            <path d="M14.7 9.3a1.6 1.6 0 1 1-3.2 0v-4a1.6 1.6 0 0 1 3.2 0v4Z" fill="#2EB67D" />
            <path d="M14.7 15.5a1.6 1.6 0 1 1-1.6 1.6v-1.6h1.6Z" fill="#ECB22E" />
            <path d="M14.7 14.7a1.6 1.6 0 1 1 0-3.2h4a1.6 1.6 0 1 1 0 3.2h-4Z" fill="#ECB22E" />
          </svg>
        </span>
      );

    case 'discord':
      return (
        <span
          className={shell}
          style={{ width: size, height: size, borderRadius: r, background: '#5865F2' }}
          aria-hidden
        >
          <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24" fill="none">
            <path
              fill="#fff"
              d="M19.3 5.4A17 17 0 0 0 15 3.7l-.2.4a15.7 15.7 0 0 1 4 1.9 14.6 14.6 0 0 0-13.6 0 15.4 15.4 0 0 1 4-1.9l-.2-.4a17 17 0 0 0-4.3 1.7C2.7 9.3 2 13.1 2.3 16.8A17.3 17.3 0 0 0 7.5 19.5l.6-.9a11.2 11.2 0 0 1-1.7-.8l.4-.3a12.3 12.3 0 0 0 10.4 0l.4.3c-.5.3-1.1.6-1.7.8l.6.9a17.2 17.2 0 0 0 5.2-2.7c.4-4.2-.7-7.9-2.8-11.4ZM8.7 14.7c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8-.7 1.8-1.6 1.8Zm6.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8-.7 1.8-1.6 1.8Z"
            />
          </svg>
        </span>
      );

    case 'sms':
      return (
        <span
          className={shell}
          style={{ width: size, height: size, borderRadius: r, background: '#34C759' }}
          aria-hidden
        >
          <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
            <path
              fill="#fff"
              d="M4 4.8A2.8 2.8 0 0 1 6.8 2h10.4A2.8 2.8 0 0 1 20 4.8v9.2a2.8 2.8 0 0 1-2.8 2.8H9.2L5 20.2V16.8A2.8 2.8 0 0 1 4 14V4.8Z"
            />
          </svg>
        </span>
      );

    case 'teams':
      return (
        <span
          className={shell}
          style={{
            width: size,
            height: size,
            borderRadius: r,
            background: 'linear-gradient(145deg, #7B83EB 0%, #5059C9 100%)',
          }}
          aria-hidden
        >
          <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
            <path
              fill="#fff"
              d="M16.5 7.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM20.2 9.2h-4.1c-.4 1-.7 2.2-.7 3.5v1.6c0 2.4 1.1 4.4 3.2 5.1V9.6c0-.2.2-.4.4-.4h1.2c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1-1.1-1ZM10.8 8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm3.6 1.5H7.2C5.4 10 4 11.4 4 13.2v5.1c0 .6.5 1.1 1.1 1.1h9.3c.6 0 1.1-.5 1.1-1.1v-5.1c0-1.8-1.4-3.2-3.1-3.2Z"
            />
          </svg>
        </span>
      );

    default:
      return (
        <span
          className={`${shell} bg-neutral-200 text-[9px] font-bold text-neutral-600`}
          style={{ width: size, height: size, borderRadius: r }}
          aria-hidden
        >
          {channelId.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}
